import Papa from 'papaparse';
import { Holding, HoldingType } from './tax-harvesting';

export const parseHoldingsCsv = (file: File): Promise<Holding[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.toLowerCase().trim(),
            complete: (results) => {
                const parsedHoldings: Holding[] = [];

                if (results.errors.length > 0) {
                    console.error("CSV Parsing Errors:", results.errors);
                }

                results.data.forEach((row: any) => {
                    // Map various header possibilities to our schema
                    const name = row['stock name'] || row['symbol'] || row['stock'] || row['name'];

                    // Sanitize numeric inputs (remove ₹, commas, etc)
                    const cleanNumber = (val: any) => {
                        if (typeof val === 'number') return val;
                        if (!val) return 0;
                        return parseFloat(val.toString().replace(/[₹,]/g, ''));
                    };

                    const quantity = cleanNumber(row['quantity'] || row['qty']);
                    const pnl = cleanNumber(row['unrealized p&l'] || row['p&l'] || row['net change'] || row['profit/loss']);

                    // Normalize Type
                    let rawType = (row['type'] || '').toString().toUpperCase();
                    let type: HoldingType = 'STCG';
                    if (rawType.includes('LONG') || rawType === 'LTCG') {
                        type = 'LTCG';
                    }

                    // Validate
                    if (name && quantity > 0 && !isNaN(pnl)) {
                        parsedHoldings.push({
                            id: Math.random().toString(36).substr(2, 9),
                            name: name.toString().trim(),
                            quantity: quantity,
                            unrealizedPnL: pnl,
                            type: type
                        });
                    }
                });

                resolve(parsedHoldings);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};
