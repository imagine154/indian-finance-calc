export type CompoundingFrequency = 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly';

export interface FdInput {
    investmentAmount: number;
    interestRate: number;
    durationYears: number;
    compoundingFrequency: CompoundingFrequency;
}

export interface YearlyFdData {
    year: number;
    balance: number;
    interestEarned: number;
}

export interface FdResult {
    maturityAmount: number;
    totalInterest: number;
    totalInvestment: number;
    yearlyData: YearlyFdData[];
}

export const calculateFD = (input: FdInput): FdResult => {
    const { investmentAmount, interestRate, durationYears, compoundingFrequency } = input;

    let n = 1; // Frequency per year
    switch (compoundingFrequency) {
        case 'Monthly': n = 12; break;
        case 'Quarterly': n = 4; break;
        case 'Half-Yearly': n = 2; break;
        case 'Yearly': n = 1; break;
    }

    const r = interestRate / 100;
    const t = durationYears;

    // Formula: A = P * (1 + r/n)^(n*t)
    const maturityAmount = Math.round(investmentAmount * Math.pow(1 + r / n, n * t));
    const totalInterest = maturityAmount - investmentAmount;

    // Generate yearly data for chart
    const yearlyData: YearlyFdData[] = [];
    for (let i = 1; i <= t; i++) {
        const balance = Math.round(investmentAmount * Math.pow(1 + r / n, n * i));
        const interest = balance - investmentAmount;
        yearlyData.push({
            year: i,
            balance,
            interestEarned: interest
        });
    }

    return {
        maturityAmount,
        totalInterest,
        totalInvestment: investmentAmount,
        yearlyData
    };
};
