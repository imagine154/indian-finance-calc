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
CACHE_DIR = "scripts/cache"
MAX_WORKERS = 10
MFAPI_BASE = "https://api.mfapi.in/mf/"
HTTP_HEADERS = {"User-Agent": "Mozilla/5.0", "Accept": "application/json"}
SIP_AMOUNT = 10000
SIP_DAY = 1

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

os.makedirs(CACHE_DIR, exist_ok=True)

# ==========================================
# CORE LOGIC
# ==========================================

def xirr(cashflows, dates, guess=0.1):
    """Compute XIRR using Newton–Raphson method."""
    def npv(rate):
        return sum([cf / ((1 + rate) ** ((d - dates[0]).days / 365)) for cf, d in zip(cashflows, dates)])

    rate = guess
    for _ in range(100):
        try:
            f_value = npv(rate)
            f_derivative = sum([-cf * ((d - dates[0]).days / 365) / ((1 + rate) ** (((d - dates[0]).days / 365) + 1)) for cf, d in zip(cashflows, dates)])
            if f_derivative == 0: break
            new_rate = rate - f_value / f_derivative
            if abs(new_rate - rate) < 1e-6: return new_rate
            rate = new_rate
        except:
            return None
    return rate

def fetch_nav_history(scheme_code):
    """Fetch NAV from API (Forced Refresh)."""
    cache_path = os.path.join(CACHE_DIR, f"{scheme_code}.csv")
    
    # NOTE: Cache read is DISABLED to force fresh data
    # if os.path.exists(cache_path): ...

    url = f"{MFAPI_BASE}{scheme_code}"
    try:
        response = requests.get(url, headers=HTTP_HEADERS, timeout=10)
        if response.status_code != 200: return None, None
        
        data = response.json()
        if "data" not in data or not data["data"]: return None, None

        df = pd.DataFrame(data["data"])
        df["date"] = pd.to_datetime(df["date"], dayfirst=True, errors="coerce")
        df["nav"] = pd.to_numeric(df["nav"], errors="coerce")
        df = df.dropna(subset=["date", "nav"])
        df = df[df["nav"] > 0].sort_values("date").reset_index(drop=True)
        
        # We still save to cache as a backup
        df.to_csv(cache_path, index=False)
        
        df = df.set_index("date")
        return df, data.get("meta", {}).get("scheme_name")
    except Exception as e:
        print(f"Error fetching {scheme_code}: {e}")
        return None, None

def simulate_sip(nav_df, start_date, end_date):
    """Simulate monthly SIP investments and handle split adjustments."""
    if nav_df is None or nav_df.empty:
        return None, None, None, None

    # Generate SIP Dates
    months = pd.date_range(start=start_date.replace(day=1), end=end_date, freq="MS")
    sip_dates = []
    for m in months:
        try:
            candidate = m.replace(day=SIP_DAY)
            if candidate <= end_date:
                sip_dates.append(candidate)
        except ValueError:
            continue

    # --- SPLIT DETECTION LOGIC (From periodic_return.py) ---
    nav_series = nav_df["nav"].sort_index().values
    for i in range(1, len(nav_series)):
        prev_nav, curr_nav = nav_series[i - 1], nav_series[i]
        if prev_nav <= 0 or curr_nav <= 0:
            continue
            
        ratio = prev_nav / curr_nav
        rev_ratio = curr_nav / prev_nav
        
        # Forward Split (Price drops)
        for possible in [2, 3, 4, 5, 10, 50, 100]:
            if abs(ratio - possible) / possible < 0.05:
                print(f"🔧 Forward split ×{possible} detected: {prev_nav:.2f} -> {curr_nav:.2f}")
                nav_df.iloc[i:, nav_df.columns.get_loc("nav")] *= possible
                nav_series[i:] *= possible # Update local array for next iteration
                break
        
        # Reverse Split (Price jumps)
        for possible in [2, 3, 4, 5, 10, 50, 100]:
            if abs(rev_ratio - possible) / possible < 0.05:
                print(f"🔄 Reverse split ÷{possible} detected: {prev_nav:.2f} -> {curr_nav:.2f}")
                nav_df.iloc[i:, nav_df.columns.get_loc("nav")] /= possible
                nav_series[i:] /= possible
                break

    # --- SIP CALCULATION ---
    units, cashflows, dates = [], [], []
    for d in sip_dates:
        df_sel = nav_df[nav_df.index >= d]
        if df_sel.empty:
            continue
        nav = float(df_sel["nav"].iloc[0])
        units.append(SIP_AMOUNT / nav)
        cashflows.append(-SIP_AMOUNT)
        dates.append(df_sel.index[0])

    if not units:
        return None, None, None, None

    total_units = sum(units)
    total_invested = len(units) * SIP_AMOUNT
    latest_nav = float(nav_df["nav"].iloc[-1])
    current_value = total_units * latest_nav

    cashflows.append(current_value)
    dates.append(nav_df.index[-1])

    return total_invested, current_value, dates, cashflows

def calculate_returns(nav_df):
    """Calculate SIP returns (Absolute/XIRR)."""
    if nav_df is None or nav_df.empty: return {}
    
    end_date = nav_df.index[-1]
    first_date = nav_df.index[0]
    results = {}

    for label, days in PERIODS.items():
        start_date = end_date - timedelta(days=days)
        
        if start_date < first_date:
            results[label] = None
            continue

        # Important: Pass a COPY so simulate_sip's split logic doesn't compound 
        # if we were running it multiple times (though here it cleans it once per call)
        invested, value, dates, cashflows = simulate_sip(nav_df.copy(), start_date, end_date)
        
        if invested is None:
            results[label] = None
            continue

        if label in ["1M", "3M", "6M", "1Y"]:
            returns = ((value / invested) - 1) * 100 # Absolute
        else:
            returns = xirr(cashflows, dates) * 100 # XIRR

        results[label] = round(returns, 2) if returns is not None else None

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

        # Calculate using the SIP Logic
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
        return None

# ==========================================
# MAIN EXECUTION
# ==========================================
def main():
    print(f"🚀 Starting Data Update (Forced Fresh Fetch)...")
    
    if not os.path.exists(INPUT_FILE):
        print(f"❌ Error: {INPUT_FILE} not found.")
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

    if results:
        df_out = pd.DataFrame(results)
        df_out.to_csv(OUTPUT_FILE, index=False)
        print(f"\n🎉 Success! Updated {OUTPUT_FILE} with {len(results)} records.")
    else:
        print("\n⚠️ No results generated.")

if __name__ == "__main__":
    main()