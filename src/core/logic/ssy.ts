export interface SsyInput {
    girlAge: number;
    startYear: number;
    investmentFrequency: 'Monthly' | 'Yearly';
    investmentAmount: number;
    interestRate: number;
    withdrawalAge: number | null;
    withdrawalPercentage: number;
}

export interface YearlyBreakdown {
    year: number;
    age: number;
    openingBalance: number;
    deposit: number;
    interest: number;
    withdrawal: number;
    closingBalance: number;
    isGrowthPhase: boolean;
}

export interface SsyResult {
    maturityCorpus: number;
    educationFund: number;
    totalInvested: number;
    totalInterest: number;
    yearlyBreakdown: YearlyBreakdown[];
}

export const calculateSSY = (input: SsyInput): SsyResult => {
    const {
        girlAge,
        startYear,
        investmentFrequency,
        investmentAmount,
        interestRate,
        withdrawalAge,
        withdrawalPercentage,
    } = input;

    let balance = 0;
    let totalInvested = 0;
    let educationFund = 0;
    const totalInterestBeforeWithdrawal = 0; // To track interest part of the balance
    const yearlyBreakdown: YearlyBreakdown[] = [];

    // SSY Rules
    const MATURITY_YEARS = 21;
    const DEPOSIT_YEARS = 15;
    const MAX_ANNUAL_INVESTMENT = 150000;

    // Calculate annual deposit based on frequency
    let annualDeposit =
        investmentFrequency === 'Monthly' ? investmentAmount * 12 : investmentAmount;

    // Cap at 1.5L
    if (annualDeposit > MAX_ANNUAL_INVESTMENT) {
        annualDeposit = MAX_ANNUAL_INVESTMENT;
    }

    for (let year = 1; year <= MATURITY_YEARS; year++) {
        const currentAge = girlAge + year;
        const currentYear = startYear + year - 1; // Financial Year Start

        const isDepositPhase = year <= DEPOSIT_YEARS;
        const deposit = isDepositPhase ? annualDeposit : 0;

        const openingBalance = balance;
        let withdrawal = 0;

        // Interest Calculation
        // Interest is compounded annually.
        // For monthly deposits, interest is calculated on monthly balances, but for simplicity in this annual loop,
        // we can approximate or use a standard formula.
        // However, SSY interest is usually credited annually.
        // If monthly, the average balance for interest would be different, but standard calculators often treat it as:
        // Balance + Deposit + Interest.
        // Let's stick to a standard compounding approach.
        // If monthly, we can assume deposits happen at start of month.
        // But to keep it robust and simple:
        // If Yearly: Deposit at start (usually April 5th deadline for max benefit, but let's assume start).
        // If Monthly: 12 installments.

        // Let's refine interest for Monthly vs Yearly.
        // Yearly: Interest on (Opening + Deposit)
        // Monthly: Interest on Opening + Interest on Monthly Deposits (approx 6.5 months average for 12 deposits)

        let interestEarned = 0;

        if (isDepositPhase) {
            if (investmentFrequency === 'Yearly') {
                // Deposit at start of year
                interestEarned = (openingBalance + deposit) * (interestRate / 100);
            } else {
                // Monthly deposits
                // Interest on opening balance
                const interestOnOpening = openingBalance * (interestRate / 100);
                // Interest on deposits (using I = P * n * (n+1) / 2 * r/1200 formula for recurring deposit style or simple average)
                // Simple approximation: Average time money is in account is 6.5 months for the year's deposits
                // Or calculate strictly:
                // Month 1: Amt * 12/12 * r
                // ...
                // Month 12: Amt * 1/12 * r
                // Sum = Amt * r/12 * (12+11+...+1) = Amt * r/12 * 78 = Amt * r * 6.5
                const monthlyAmt = isDepositPhase ? (annualDeposit / 12) : 0;
                const interestOnDeposits = monthlyAmt * (interestRate / 100) * 6.5;
                interestEarned = interestOnOpening + interestOnDeposits;
            }
        } else {
            // No deposits, just interest on opening
            interestEarned = openingBalance * (interestRate / 100);
        }

        // Handle Withdrawal
        // Rule: Allowed after age 18. Max 50% of balance at end of PREVIOUS year.
        // We check if this is the withdrawal year.
        if (withdrawalAge && currentAge === withdrawalAge && withdrawalPercentage > 0) {
            // Can only withdraw if age >= 18
            if (currentAge >= 18) {
                const maxAllowed = openingBalance * 0.5;
                const desiredAmount = (openingBalance * withdrawalPercentage) / 100;
                withdrawal = Math.min(maxAllowed, desiredAmount);

                // Withdrawal happens, reducing the balance for interest calculation?
                // Usually withdrawal is allowed for education.
                // If we assume withdrawal happens at START of year (for admission), 
                // then interest for this year should be on reduced balance.
                // Let's adjust:

                // Re-calculate interest with reduced opening balance
                const effectiveOpening = openingBalance - withdrawal;

                if (isDepositPhase) {
                    // It's rare to withdraw while still depositing (18y vs 15y overlap possible if started at age 3)
                    if (investmentFrequency === 'Yearly') {
                        interestEarned = (effectiveOpening + deposit) * (interestRate / 100);
                    } else {
                        const interestOnOpening = effectiveOpening * (interestRate / 100);
                        const monthlyAmt = annualDeposit / 12;
                        const interestOnDeposits = monthlyAmt * (interestRate / 100) * 6.5;
                        interestEarned = interestOnOpening + interestOnDeposits;
                    }
                } else {
                    interestEarned = effectiveOpening * (interestRate / 100);
                }

                educationFund = withdrawal;
            }
        }

        balance = openingBalance + deposit + interestEarned - withdrawal;
        totalInvested += deposit;

        yearlyBreakdown.push({
            year: currentYear,
            age: currentAge,
            openingBalance,
            deposit,
            interest: Math.round(interestEarned),
            withdrawal: Math.round(withdrawal),
            closingBalance: Math.round(balance),
            isGrowthPhase: !isDepositPhase
        });
    }

    const maturityCorpus = Math.round(balance);
    const totalInterest = Math.round(maturityCorpus + educationFund - totalInvested);

    return {
        maturityCorpus,
        educationFund: Math.round(educationFund),
        totalInvested,
        totalInterest,
        yearlyBreakdown,
    };
};
