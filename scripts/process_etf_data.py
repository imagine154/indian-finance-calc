import pandas as pd
import json
import os

def process_data():
    excel_path = 'src/data/etf_holdings.xlsx'
    perf_table_path = 'src/data/Performance_table.csv'
    output_path = 'src/data/etf_data.json'

    # 1. Read Performance Table to map Sectors/Segments to ETFs
    print(f"Reading {perf_table_path}...")
    df_perf = pd.read_csv(perf_table_path)
    
    # Structure: segment -> { stocks: [], etfs: [] }
    data = {}

    # Get unique segments and their ETFs
    # Assuming 'Sector' column is the Segment, based on user request mapping
    # "Reads the Performance_table.csv to get a list of all unique Segments (from the Sector column)."
    # Wait, the user said "Key Columns: Scrip (ETF Name), Segment (This matches the "Segment Name" from the holdings files)."
    # In the file view I saw 'Segment' column at index 1.
    
    # Columns in csv: Scrip,Segment,LCP,1D,1W,1M,3M,6M,1Y,3Y,5Y,10Y,For Period
    
    all_segments = df_perf['Segment'].unique()
    
    for segment in all_segments:
        segment_name = str(segment).strip()
        etfs_in_segment = df_perf[df_perf['Segment'] == segment][['Scrip']].to_dict('records')
        # Rename Scrip to name for cleaner json
        etfs_list = [{'name': item['Scrip']} for item in etfs_in_segment]
        
        data[segment_name] = {
            'etfs': etfs_list,
            'stocks': []
        }

    # 2. Read Excel file sheets
    print(f"Reading {excel_path}...")
    xl = pd.ExcelFile(excel_path)
    sheet_names = xl.sheet_names
    print(f"Found sheets: {sheet_names}")

    # Map sheets to segments
    # The user said: "The filename contains the "Segment Name" (e.g., "ETF - Nifty 50")."
    # But here we have one XLSX file with multiple sheets (presumably).
    # Let's assume sheet names match the Segment names or contain them.
    
    for sheet in sheet_names:
        # User said: "Holdings Data: A set of files named like etf_holdings.xlsx - ETF - Nifty 50.csv"
        # But we found a single 'etf_holdings.xlsx'. 
        # It's likely the user combined them or the sheet names correspond to "ETF - Nifty 50" etc.
        
        # We will try to match sheet name to segment key in `data`.
        # Exact match or "ETF - " prefix handling.
        
        clean_sheet_name = sheet.strip()
        matched_segment = None
        
        if clean_sheet_name in data:
            matched_segment = clean_sheet_name
        else:
            # Fuzzy match by normalizing both strings
            # Remove spaces, colons, dashes, case-insensitive
            def normalize(s):
                return ''.join(e for e in s if e.isalnum()).lower()
            
            norm_sheet = normalize(clean_sheet_name)
            
            for seg in data.keys():
                norm_seg = normalize(seg)
                
                # Check for exact normalized match
                if norm_sheet == norm_seg:
                    matched_segment = seg
                    break
                    
                # Check if "ETF - " prefix was the only diff (already handled by normalization mostly)
                # Check for "Momentum Quality" truncations seen in output
                # e.g. Sheet: 'ETF - Nifty Midsmallcap400 Mome' vs Key: 'ETF - Nifty Midsmallcap400 Momentum Quality 100'
                
                if norm_sheet in norm_seg and len(norm_sheet) > 15: # Partial match for long names (sheet name truncated)
                     matched_segment = seg
                     break
                
                # Reverse check (unlikely for sheet name to be longer than full name, but possible)
                if norm_seg in norm_sheet and len(norm_seg) > 15:
                     matched_segment = seg
                     break
        
        if matched_segment:
            print(f"Processing sheet '{sheet}' for segment '{matched_segment}'")
            df_sheet = pd.read_excel(excel_path, sheet_name=sheet)
            
            # Expected columns: Stock, Allocation
            # Print columns to be safe during first run (we can inspect output)
            # print(f"Columns: {df_sheet.columns.tolist()}")
            
            # Normalize column names
            df_sheet.columns = [c.strip() for c in df_sheet.columns]
            
            if 'Stock' in df_sheet.columns and 'Allocation' in df_sheet.columns:
                stock_list = []
                for _, row in df_sheet.iterrows():
                    stock_name = str(row['Stock']).strip()
                    # Allocation might be string "10.5%" or float 0.105 or 10.5
                    raw_alloc = row['Allocation']
                    weight = 0.0
                    
                    try:
                        if isinstance(raw_alloc, str):
                            clean_alloc = raw_alloc.replace('%', '').strip()
                            weight = float(clean_alloc)
                        else:
                            weight = float(raw_alloc) * 100 if raw_alloc < 1 else float(raw_alloc) # Heuristic for 0.1 vs 10
                            # Wait, usually 10% is 10 in standard financial exports or 0.1
                            # Let's inspect raw values in next step if this is wrong.
                            # Standard assumption: if max value in column <= 1, multiply by 100.
                            pass
                    except:
                        weight = 0.0
                    
                    stock_list.append({
                        'name': stock_name,
                        'weight': weight
                    })
                
                # Sort by weight desc
                stock_list.sort(key=lambda x: x['weight'], reverse=True)
                
                # Overwrite/Add stocks to the segment
                data[matched_segment]['stocks'] = stock_list
            else:
                print(f"Warning: Sheet '{sheet}' missing 'Stock' or 'Allocation' columns.")
        else:
            print(f"Notice: Sheet '{sheet}' did not match any segment in Performance_table.")

    # 3. Save to JSON
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Saved data to {output_path}")

if __name__ == "__main__":
    process_data()
