export interface PpfInput {
    yearlyInvestment: number;
    duration: number; // Minimum 15 years
    interestRate: number; // Current default 7.1%
}

export interface YearlyBreakdown {
    year: number;
    openingBalance: number;
    deposit: number;
    interest: number;
    closingBalance: number;
}

export interface PpfResult {
    totalInvested: number;
    totalInterest: number;
    maturityAmount: number;
    yearlyData: YearlyBreakdown[];
}

export const calculatePPF = (input: PpfInput): PpfResult => {
    const { yearlyInvestment, duration, interestRate } = input;

    let currentBalance = 0;
    let totalInvested = 0;
    const yearlyData: YearlyBreakdown[] = [];

    for (let i = 1; i <= duration; i++) {
        const openingBalance = currentBalance;
        const deposit = yearlyInvestment;

        // PPF Interest is calculated on the lowest balance between 5th and end of month.
        // Assuming annual deposit is made before 5th April for max interest (standard assumption in calculators)
        // Interest = (Opening Balance + Deposit) * Rate / 100
        const interest = Math.round((openingBalance + deposit) * (interestRate / 100));

        const closingBalance = openingBalance + deposit + interest;

        yearlyData.push({
            year: i,
            openingBalance,
            deposit,
            interest,
            closingBalance
        });

        currentBalance = closingBalance;
        totalInvested += deposit;
    }

    return {
        totalInvested,
        totalInterest: currentBalance - totalInvested,
        maturityAmount: currentBalance,
        yearlyData
    };
};
