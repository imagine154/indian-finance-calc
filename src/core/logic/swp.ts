export interface SwpInput {
    totalInvestment: number;
    withdrawalAmount: number;
    expectedReturn: number;
    duration: number;
}

export interface YearlySwpData {
    year: number;
    balance: number;
    withdrawn: number;
    interestEarned: number;
}

export interface SwpResult {
    totalWithdrawn: number;
    finalValue: number;
    totalInterestEarned: number;
    yearlyData: YearlySwpData[];
    isDepleted: boolean;
    depletionYear?: number;
}

export const calculateSWP = (input: SwpInput): SwpResult => {
    const { totalInvestment, withdrawalAmount, expectedReturn, duration } = input;

    let currentBalance = totalInvestment;
    let totalWithdrawn = 0;
    let totalInterestEarned = 0;
    const yearlyData: YearlySwpData[] = [];
    let isDepleted = false;
    let depletionYear: number | undefined;

    const monthlyRate = expectedReturn / 100 / 12;

    for (let year = 1; year <= duration; year++) {
        let yearlyWithdrawn = 0;
        let yearlyInterest = 0;

        for (let month = 1; month <= 12; month++) {
            // 1. Withdraw first (usually SWP happens at start or specific date, let's assume start of period logic for simplicity or end, 
            // but standard calculators often deduct then add interest or add interest then deduct. 
            // Most standard: Balance -> Interest -> Withdraw OR Balance -> Withdraw -> Interest.
            // Let's stick to: Withdraw -> Interest on remaining balance (Conservative view).

            let withdrawal = withdrawalAmount;

            if (currentBalance < withdrawal) {
                withdrawal = currentBalance;
                isDepleted = true;
                depletionYear = year;
            }

            currentBalance -= withdrawal;
            totalWithdrawn += withdrawal;
            yearlyWithdrawn += withdrawal;

            if (currentBalance <= 0) {
                currentBalance = 0;
                break;
            }

            const interest = currentBalance * monthlyRate;
            currentBalance += interest;
            yearlyInterest += interest;
            totalInterestEarned += interest;
        }

        yearlyData.push({
            year,
            balance: Math.round(currentBalance),
            withdrawn: Math.round(totalWithdrawn), // Cumulative withdrawn for chart
            interestEarned: Math.round(yearlyInterest)
        });

        if (isDepleted) break;
    }

    return {
        totalWithdrawn: Math.round(totalWithdrawn),
        finalValue: Math.round(currentBalance),
        totalInterestEarned: Math.round(totalInterestEarned),
        yearlyData,
        isDepleted,
        depletionYear
    };
};
