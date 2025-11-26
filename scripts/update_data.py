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
# CORE LOGIC (From periodic_return.py)
# ==========================================

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
                return df, None # Name not stored in simple cache
            except:
                pass # Invalid cache, fetch fresh

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
        
        # Save to Cache
        df.to_csv(cache_path, index=False, date_format="%d-%m-%Y")
        
        df.set_index("date", inplace=True)
        return df, data.get("meta", {}).get("scheme_name")
    except Exception as e:
        print(f"Error fetching {scheme_code}: {e}")
        return None, None

def calculate_returns(nav_df):
    """Calculate Absolute and XIRR returns for all periods."""
    if nav_df is None or nav_df.empty: return {}
    
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
            cagr = ((latest_nav / start_nav) ** (1 / years) - 1) * 100
            results[label] = round(cagr, 2)

    return results

# ==========================================
# WORKER FUNCTION
# ==========================================
def process_scheme(row):
    code = str(row["schemeCode"])
    name = row["schemeName"]
    category = row.get("schemeCategory", "")
    
    try:
        nav_df, api_name = fetch_nav_history(code)
        if nav_df is None: return None

        returns = calculate_returns(nav_df)
        
        # Structure for CSV
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
            "results_json": json.dumps(returns) # Full object for frontend
        }
    except Exception as e:
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
    
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [executor.submit(process_scheme, row) for _, row in schemes.iterrows()]
        
        for future in as_completed(futures):
            res = future.result()
            if res:
                results.append(res)
            
            processed += 1
            if processed % 50 == 0:
                print(f"✅ Processed {processed}/{total}...")

    # Save to CSV
    if results:
        df_out = pd.DataFrame(results)
        df_out.to_csv(OUTPUT_FILE, index=False)
        print(f"\n🎉 Success! Updated {OUTPUT_FILE} with {len(results)} records.")
        print("Next Step: Run 'python scripts/convert_mf_data.py' to update the JSON for the app.")
    else:
        print("\n⚠️ No results generated. Check internet connection or API limits.")

if __name__ == "__main__":
    main()