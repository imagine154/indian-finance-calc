export interface LumpsumInput {
    investmentAmount: number;
    expectedReturn: number;
    duration: number;
}

export interface YearlyBreakdown {
    year: number;
    investedAmount: number;
    wealthGained: number;
    totalValue: number;
}

export interface LumpsumResult {
    totalInvested: number;
    wealthGained: number;
    maturityValue: number;
    yearlyData: YearlyBreakdown[];
}

export const calculateLumpsum = (input: LumpsumInput): LumpsumResult => {
    const { investmentAmount, expectedReturn, duration } = input;

    const yearlyData: YearlyBreakdown[] = [];
    const r = expectedReturn / 100;

    for (let i = 1; i <= duration; i++) {
        // Formula: A = P * (1 + r)^t
        const totalValue = Math.round(investmentAmount * Math.pow(1 + r, i));
        const wealthGained = totalValue - investmentAmount;

        yearlyData.push({
            year: i,
            investedAmount: investmentAmount,
            wealthGained,
            totalValue
        });
    }

    const maturityValue = Math.round(investmentAmount * Math.pow(1 + r, duration));
    const wealthGained = maturityValue - investmentAmount;

    return {
        totalInvested: investmentAmount,
        wealthGained,
        maturityValue,
        yearlyData
    };
};
