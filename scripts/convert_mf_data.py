import csv
import json
import os
import ast

def convert_data():
    # Define paths
    # Define paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    schemes_csv = os.path.join(project_root, "schemeswithcodes.csv")
    returns_csv = os.path.join(project_root, "precomputed_clean.csv")
    output_dir = os.path.join(project_root, "src", "data")

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    print(f"Reading {schemes_csv}...")
    
    # Process returns data first
    returns_map = {}
    print(f"Reading {returns_csv}...")
    
    with open(returns_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                code = str(row.get('scheme_code', '')).strip()
                if not code: continue

                # Parse results_json safely
                results_json = row.get('results_json', '')
                results_data = {}
                
                if results_json:
                    try:
                        results_data = ast.literal_eval(results_json)
                    except (ValueError, SyntaxError):
                        results_data = {}
                
                # Fallback to individual columns
                if not results_data:
                    mapping = {
                        'return_1m': '1M', 'return_3m': '3M', 'return_6m': '6M',
                        'return_1y': '1Y', 'return_3y': '3Y', 'return_5y': '5Y',
                        'return_7y': '7Y', 'return_10y': '10Y'
                    }
                    for col, key in mapping.items():
                        val = row.get(col, '')
                        if val and val.strip():
                            try:
                                results_data[key] = float(val)
                            except ValueError:
                                pass # Ignore non-numeric

                returns_map[code] = results_data
            except Exception as e:
                print(f"Error processing return row: {e}")

    # Process schemes metadata
    schemes_list = []
    filters = {
        "amc": set(),
        "category": set(),
        "subcategory": set(),
        "plan": set(),
        "type": set()
    }

    print("Processing schemes metadata...")
    with open(schemes_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                code = str(row.get('schemeCode', '')).strip()
                if not code: continue
                
                name = str(row.get('schemeName', '')).strip()
                amc = str(row.get('AMC', '')).strip()
                category = str(row.get('schemeCategory', '')).strip()
                subcategory = str(row.get('schemeSubCategory', '')).strip()
                plan = str(row.get('Plan', '')).strip()
                option = str(row.get('Option', '')).strip()
                
                # Determine type
                is_etf = "ETF" in subcategory.upper() or "ETF" in option.upper()
                scheme_type = "ETF" if is_etf else "Mutual Fund"

                scheme_obj = {
                    "code": code,
                    "name": name,
                    "amc": amc,
                    "category": category,
                    "subcategory": subcategory,
                    "plan": plan,
                    "option": option,
                    "type": scheme_type
                }
                
                schemes_list.append(scheme_obj)

                if amc: filters["amc"].add(amc)
                if category: filters["category"].add(category)
                if subcategory: filters["subcategory"].add(subcategory)
                if plan: filters["plan"].add(plan)
                filters["type"].add(scheme_type)

            except Exception as e:
                print(f"Error processing scheme row: {e}")

    # Convert sets to sorted lists
    filters_json = {k: sorted(list(v)) for k, v in filters.items()}

    # Save files
    print("Saving JSON files...")
    
    with open(os.path.join(output_dir, "mf_schemes.json"), "w") as f:
        json.dump(schemes_list, f)
        
    with open(os.path.join(output_dir, "mf_returns.json"), "w") as f:
        json.dump(returns_map, f)
        
    with open(os.path.join(output_dir, "mf_filters.json"), "w") as f:
        json.dump(filters_json, f)

    print(f"Successfully generated data in {output_dir}")
    print(f"Schemes: {len(schemes_list)}")
    print(f"Returns: {len(returns_map)}")

if __name__ == "__main__":
    convert_data()
