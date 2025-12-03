export interface MsscInput {
    investmentAmount: number;
}

export interface QuarterlyBreakdown {
    quarter: number;
    month: number;
    openingBalance: number;
    interestEarned: number;
    closingBalance: number;
}

export interface MsscResult {
    maturityAmount: number;
    totalInterest: number;
    quarterlyBreakdown: QuarterlyBreakdown[];
}

export const calculateMSSC = (input: MsscInput): MsscResult => {
    let { investmentAmount } = input;

    // Constants
    const RATE = 7.5;
    const TENURE_YEARS = 2;
    const QUARTERS_PER_YEAR = 4;
    const TOTAL_QUARTERS = TENURE_YEARS * QUARTERS_PER_YEAR;
    const MAX_INVESTMENT = 200000;

    // Validation
    if (investmentAmount > MAX_INVESTMENT) {
        investmentAmount = MAX_INVESTMENT;
    }

    let currentBalance = investmentAmount;
    const quarterlyBreakdown: QuarterlyBreakdown[] = [];

    for (let q = 1; q <= TOTAL_QUARTERS; q++) {
        const openingBalance = currentBalance;
        // Interest for one quarter: P * (R/400)
        const interest = currentBalance * (RATE / 400);
        const closingBalance = openingBalance + interest;

        quarterlyBreakdown.push({
            quarter: q,
            month: q * 3,
            openingBalance: Math.round(openingBalance),
            interestEarned: Math.round(interest),
            closingBalance: Math.round(closingBalance),
        });

        currentBalance = closingBalance;
    }

    const maturityAmount = Math.round(currentBalance);
    const totalInterest = Math.round(maturityAmount - investmentAmount);

    return {
        maturityAmount,
        totalInterest,
        quarterlyBreakdown,
    };
};
