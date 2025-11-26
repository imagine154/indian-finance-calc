import argparse
import json
import os
import time
import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed

# ==========================================
# CONFIGURATION
# ==========================================
INPUT_FILE = "schemeswithcodes.csv"
OUTPUT_FILE = "precomputed_clean.csv"
CACHE_DIR = "scripts/cache"  # Stores NAV data to speed up re-runs
MAX_WORKERS = 10             # Parallel threads
MFAPI_BASE = "https://api.mfapi.in/mf/"
HTTP_HEADERS = {"User-Agent": "Mozilla/5.0", "Accept": "application/json"}

# Periods to calculate
PERIODS = {
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    "3Y": 365 * 3,
    "5Y": 365 * 5,
    "7Y": 365 * 7,
    "10Y": 365 * 10,
}

# Ensure cache directory exists
os.makedirs(CACHE_DIR, exist_ok=True)

# ==========================================
# CORE LOGIC
# ==========================================

def clean_nav_data(nav_df):
    """
    Detects and adjusts for stock splits and reverse splits in NAV data.
    Logic ported from periodic_return.py.
    """
    if nav_df is None or nav_df.empty:
        return nav_df

    # Sort by date just in case
    nav_df = nav_df.sort_index()
    
    # Get values as numpy array for fast iteration
    nav_series = nav_df["nav"].values
    
    # We iterate through the array to find sudden jumps
    for i in range(1, len(nav_series)):
        prev = nav_series[i - 1]
        curr = nav_series[i]
        
        if prev <= 0 or curr <= 0:
            continue
            
        ratio = prev / curr
        rev_ratio = curr / prev
        
        # Split ratios to check (e.g., 1:10 split means price drops 10x)
        possible_splits = [2, 3, 4, 5, 10, 50, 100]
        
        # Detect forward split (NAV drops sharply, e.g. 100 -> 10)
        # Ratio prev/curr will be close to N (e.g. 10)
        found_split = False
        for possible in possible_splits:
            if abs(ratio - possible) / possible < 0.05: # 5% tolerance
                print(f"🔧 Detected forward stock split ×{possible} at index {i} ({nav_df.index[i].date()}) NAV: {prev:.2f} -> {curr:.2f}")
                # Adjust all SUBSEQUENT NAVs to match the pre-split scale? 
                # Actually, `periodic_return.py` multiplied the *subsequent* data.
                # "nav_df.loc[nav_df.index[i]:, "nav"] *= possible"
                # This normalizes the *new* lower prices UP to the old higher prices.
                nav_df.iloc[i:, nav_df.columns.get_loc("nav")] *= possible
                
                # Update our local array so next iteration sees adjusted values
                nav_series[i:] *= possible
                found_split = True
                break
        
        if found_split: continue

        # Detect reverse split (NAV jumps sharply, e.g. 10 -> 100)
        # Ratio curr/prev will be close to N
        for possible in possible_splits:
            if abs(rev_ratio - possible) / possible < 0.05:
                print(f"🔄 Detected reverse stock split ÷{possible} at index {i} ({nav_df.index[i].date()}) NAV: {prev:.2f} -> {curr:.2f}")
                # Adjust subsequent NAVs DOWN
                nav_df.iloc[i:, nav_df.columns.get_loc("nav")] /= possible
                nav_series[i:] /= possible
                break

    return nav_df

def xirr(cashflows, dates, guess=0.1):
    """Compute XIRR using Newton–Raphson method."""
    def npv(rate):
        return sum([cf / ((1 + rate) ** ((d - dates[0]).days / 365)) for cf, d in zip(cashflows, dates)])

    rate = guess
    for _ in range(100): # Limit iterations
        try:
            f_value = npv(rate)
            f_derivative = sum([-cf * ((d - dates[0]).days / 365) / ((1 + rate) ** (((d - dates[0]).days / 365) + 1)) for cf, d in zip(cashflows, dates)])
            if f_derivative == 0: break
            new_rate = rate - f_value / f_derivative
            if abs(new_rate - rate) < 1e-6: return new_rate
            rate = new_rate
        except:
            return None # Calculation error
    return rate

def fetch_nav_history(scheme_code):
    """Fetch NAV from API or Cache."""
    cache_path = os.path.join(CACHE_DIR, f"{scheme_code}.csv")
    
    # 1. Check Cache (Valid for 24 hours)
    if os.path.exists(cache_path):
        file_age = time.time() - os.path.getmtime(cache_path)
        if file_age < 86400: # 24 hours
            try:
                df = pd.read_csv(cache_path)
                df["date"] = pd.to_datetime(df["date"], format="%d-%m-%Y")
                df.set_index("date", inplace=True)
                # Note: We don't adjust for splits in cache, we adjust in memory after load
                return df, None 
            except:
                pass # Invalid cache

    # 2. Fetch from API
    url = f"{MFAPI_BASE}{scheme_code}"
    try:
        response = requests.get(url, headers=HTTP_HEADERS, timeout=10)
        if response.status_code != 200: return None, None
        
        data = response.json()
        if "data" not in data or not data["data"]: return None, None

        # Process
        df = pd.DataFrame(data["data"])
        df["date"] = pd.to_datetime(df["date"], format="%d-%m-%Y", errors="coerce")
        df["nav"] = pd.to_numeric(df["nav"], errors="coerce")
        df = df.dropna().sort_values("date")
        
        # Save to Cache (Raw Data)
        df.to_csv(cache_path, index=False, date_format="%d-%m-%Y")
        
        df.set_index("date", inplace=True)
        return df, data.get("meta", {}).get("scheme_name")
    except Exception as e:
        print(f"Error fetching {scheme_code}: {e}")
        return None, None

def calculate_returns(nav_df):
    """Calculate Absolute and XIRR returns for all periods."""
    if nav_df is None or nav_df.empty: return {}
    
    # --- APPLY SPLIT CORRECTION ---
    # This ensures 'latest_nav' is comparable to 'start_nav' even if a split occurred
    nav_df = clean_nav_data(nav_df)
    
    end_date = nav_df.index[-1]
    start_date_limit = nav_df.index[0]
    latest_nav = nav_df["nav"].iloc[-1]
    
    results = {}
    
    for label, days in PERIODS.items():
        target_date = end_date - timedelta(days=days)
        if target_date < start_date_limit:
            results[label] = None
            continue
            
        # Find NAV on or closest after target_date
        idx = nav_df.index.searchsorted(target_date)
        if idx >= len(nav_df): 
            results[label] = None
            continue
            
        start_nav = nav_df["nav"].iloc[idx]
        start_real_date = nav_df.index[idx]
        
        # 1. Lumpsum Return (CAGR/Absolute)
        # For < 1Y use Absolute, > 1Y use CAGR
        years = (end_date - start_real_date).days / 365
        if years == 0: years = 0.001
        
        if days <= 365:
            abs_ret = ((latest_nav - start_nav) / start_nav) * 100
            results[label] = round(abs_ret, 2)
        else:
            try:
                cagr = ((latest_nav / start_nav) ** (1 / years) - 1) * 100
                results[label] = round(cagr, 2)
            except:
                results[label] = None

    return results

# ==========================================
# WORKER FUNCTION
# ==========================================
def process_scheme(row):
    code = str(row["schemeCode"])
    name = row["schemeName"]
    
    try:
        nav_df, api_name = fetch_nav_history(code)
        if nav_df is None: return None

        # 'calculate_returns' now handles split cleaning internally
        returns = calculate_returns(nav_df)
        
        return {
            "scheme_code": code,
            "scheme_name": name,
            "type": "ETF" if "ETF" in str(row.get("Option", "")).upper() else "Mutual Fund",
            "plan": row.get("Plan", ""),
            "option": row.get("Option", ""),
            "return_1m": returns.get("1M"),
            "return_3m": returns.get("3M"),
            "return_6m": returns.get("6M"),
            "return_1y": returns.get("1Y"),
            "return_3y": returns.get("3Y"),
            "return_5y": returns.get("5Y"),
            "return_7y": returns.get("7Y"),
            "return_10y": returns.get("10Y"),
            "results_json": json.dumps(returns),
            "updated_at": datetime.now().strftime("%Y-%m-%d")
        }
    except Exception as e:
        # print(f"Error processing {code}: {e}") # Optional: uncomment for debugging
        return None

# ==========================================
# MAIN EXECUTION
# ==========================================
def main():
    print(f"🚀 Starting Data Update...")
    print(f"Reading {INPUT_FILE}...")
    
    if not os.path.exists(INPUT_FILE):
        print(f"❌ Error: {INPUT_FILE} not found in root directory.")
        return

    schemes = pd.read_csv(INPUT_FILE)
    total = len(schemes)
    print(f"Found {total} schemes to process.")

    results = []
    processed = 0
    
    # Adjust max_workers based on your CPU/Network limits
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [executor.submit(process_scheme, row) for _, row in schemes.iterrows()]
        
        for future in as_completed(futures):
            res = future.result()
            if res:
                results.append(res)
            
            processed += 1
            if processed % 50 == 0:
                print(f"✅ Processed {processed}/{total}...")

    if results:
        df_out = pd.DataFrame(results)
        df_out.to_csv(OUTPUT_FILE, index=False)
        print(f"\n🎉 Success! Updated {OUTPUT_FILE} with {len(results)} records.")
    else:
        print("\n⚠️ No results generated.")

if __name__ == "__main__":
    main()