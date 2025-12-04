import csv
import json
import re
import os

def clean_percentage(val):
    if not val:
        return 0.0
    val = val.replace('%', '').strip()
    try:
        return float(val)
    except ValueError:
        return 0.0

def clean_aum(val):
    if not val:
        return 0.0
    val = val.replace(',', '').strip()
    try:
        return float(val)
    except ValueError:
        return 0.0

def clean_managers(val):
    if not val:
        return []
    # Split by comma and strip whitespace
    # Handle quoted strings in CSV properly by csv module, but here we get the string
    return [m.strip() for m in val.split(',') if m.strip()]

def create_slug(name):
    if not name:
        return ""
    # Convert to lowercase
    slug = name.lower()
    # Remove special characters
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    return slug

def main():
    input_file = 'src/data/groww_mutual_funds_cleaned.csv'
    output_file = 'src/data/mutual-funds.json'
    
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return

    print(f"Reading from {input_file}...")
    
    funds = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Columns in CSV: Fund Name,Fund House,Category,Sub Category,Groww Rating,Risk,Return 1Y (%),Return 3Y (%),Return 5Y (%),Sub Category Avg Return 3Y (%),Expense Ratio (%),AUM (Cr),NAV,Min SIP,Fund Manager,Groww Rating,Launch Date
            
            # Note: DictReader handles duplicate column names by appending suffix, but let's rely on keys present.
            # We need to be careful about 'Groww Rating'.
            
            rating = row.get('Groww Rating')
            # If there are duplicates, csv might have renamed one. Let's check keys if needed.
            # But usually the first one is picked or we can inspect row keys.
            # For now, let's assume 'Groww Rating' gives the rating.
            
            fund = {
                "name": row.get('Fund Name', ''),
                "slug": create_slug(row.get('Fund Name', '')),
                "amc": row.get('Fund House', ''),
                "category": row.get('Category', ''),
                "subCategory": row.get('Sub Category', ''),
                "rating": clean_percentage(rating),
                "risk": row.get('Risk', ''),
                "returns": {
                    "1Y": clean_percentage(row.get('Return 1Y (%)', '0')),
                    "3Y": clean_percentage(row.get('Return 3Y (%)', '0')),
                    "5Y": clean_percentage(row.get('Return 5Y (%)', '0'))
                },
                "expenseRatio": clean_percentage(row.get('Expense Ratio (%)', '0')),
                "aum": clean_aum(row.get('AUM (Cr)', '0')),
                "nav": clean_aum(row.get('NAV', '0')),
                "minSip": clean_aum(row.get('Min SIP', '0')),
                "managers": clean_managers(row.get('Fund Manager', ''))
            }
            funds.append(fund)
        
    print(f"Processed {len(funds)} funds.")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(funds, f, indent=2)
        
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    main()
