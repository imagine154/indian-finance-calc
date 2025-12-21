export interface AmfiSchemeData {
    name: string;
    category: string;
    inflow: number;
    outflow: number;
    netFlow: number;
    aum: number;
}

export function parseAmfiCsv(csvContent: string): AmfiSchemeData[] {
    const lines = csvContent.split('\n');
    const result: AmfiSchemeData[] = [];
    let currentCategory = "Other";

    const categoryMap: { [key: string]: string } = {
        'I': 'Debt',
        'II': 'Equity',
        'III': 'Hybrid',
        'IV': 'Solution Oriented',
        'V': 'Other'
    };

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // Robust CSV split that respects quotes
        const cols = trimmedLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.trim().replace(/^"|"$/g, ''));

        if (cols.length < 2) continue;

        // Use column 0 for identification
        const col0 = cols[0];

        // 1. Detect Category
        if (['I', 'II', 'III', 'IV', 'V'].includes(col0)) {
            currentCategory = categoryMap[col0] || "Other";
            continue;
        }

        // 2. Detect Data Rows (lowerroman OR number)
        const isRomanLower = /^[ivx]+$/.test(col0); // matches i, ii, iii, iv, v, vi...
        const isNumber = /^\d+$/.test(col0);

        if (isRomanLower || isNumber) {
            const name = cols[1];
            // Basic validation: Name should essentially always participate if it's a data row
            if (!name) continue;

            const parseNum = (val: string) => {
                if (!val) return 0;
                // Handle parentheses for negative numbers if present (Excel sometimes exports (100) as -100)
                // Check for " (INR in crore)" text? Probably not in data cells.
                // clean: remove commas
                const clean = val.replace(/,/g, '').trim();
                // If wrapped in parens (123.45), treat as negative? usually banking format, but standard CSV might just be -123.45.
                // Let's stick to simple parseFloat first.
                const num = parseFloat(clean);
                return isNaN(num) ? 0 : num;
            };

            // Inflow: Col 4
            // Outflow: Col 5
            // Net Inflow: Col 6
            // AUM: Col 7

            // Safety check on array bounds
            if (cols.length <= 7) continue;

            const inflow = parseNum(cols[4]);
            const outflow = parseNum(cols[5]);
            const netFlow = parseNum(cols[6]);
            const aum = parseNum(cols[7]);

            // Filter out rows that are effectively empty/headers repeated? 
            // The logic on col0 should handle most.

            result.push({
                name,
                category: currentCategory,
                inflow,
                outflow,
                netFlow,
                aum
            });
        }
    }

    return result;
}
