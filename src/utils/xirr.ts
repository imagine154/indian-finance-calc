
// @ts-expect-error - No types available for xirr library
import xirr from 'xirr';

export interface Transaction {
    amount: number; // Negative for investment, Positive for return
    date: Date;
}

/**
 * Calculates the XIRR (Extended Internal Rate of Return) for a series of transactions
 * using the 'xirr' library.
 * 
 * @param transactions Array of transactions { amount, date }
 * @returns XIRR as a percentage (e.g., 12.5 for 12.5%) or null if calculation fails
 */
export function calculateXIRR(transactions: Transaction[]): number | null {
    if (transactions.length < 2) return null;

    try {
        // Convert to format expected by xirr library: { amount, when }
        const formattedTransactions = transactions.map(t => ({
            amount: t.amount,
            when: t.date
        }));

        // Calculate
        const result = xirr(formattedTransactions);

        // Result is decimal (e.g., 0.125), convert to percentage
        return result * 100;
    } catch (error) {
        console.error("XIRR calculation failed:", error);
        return null;
    }
}

/**
 * Generates regular SIP transactions based on parameters.
 */
export function generateSIPTransactions(
    amount: number,
    frequency: 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly',
    startDate: Date,
    endDate: Date,
    currentValue: number
): Transaction[] {
    const transactions: Transaction[] = [];
    let currentDate = new Date(startDate);
    const maturityDate = new Date(endDate);

    // Safety to prevent infinite loops if dates are wrong
    if (currentDate >= maturityDate) {
        return [{ amount: currentValue, date: maturityDate }];
    }

    // Interval mapping in days (approximate for Bi-Weekly) or logic for months
    while (currentDate <= maturityDate) {
        transactions.push({
            amount: -amount, // Investment is outflow
            date: new Date(currentDate)
        });

        // Increment date
        switch (frequency) {
            case 'Bi-Weekly':
                currentDate.setDate(currentDate.getDate() + 14);
                break;
            case 'Monthly':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'Quarterly':
                currentDate.setMonth(currentDate.getMonth() + 3);
                break;
            case 'Half-Yearly':
                currentDate.setMonth(currentDate.getMonth() + 6);
                break;
            case 'Yearly':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
        }
    }

    // Add the final redemption value
    transactions.push({
        amount: currentValue, // Current value is inflow
        date: maturityDate
    });

    return transactions;
}
