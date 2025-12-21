export interface RdInput {
    monthlyInvestment: number;
    interestRate: number;
    timePeriodYears: number; // Duration in years
}

export interface YearlyRdData {
    year: number;
    balance: number;
    interestEarned: number;
    investedAmount: number;
}

export interface RdResult {
    maturityAmount: number;
    totalInterest: number;
    totalInvestment: number;
    yearlyData: YearlyRdData[];
    maturityDate: Date;
}

/**
 * Calculates Recurring Deposit (RD) maturity amount based on Indian Quarterly Compounding formula.
 * Formula for each installment: A = P * (1 + R/400)^(n)
 * where n is remaining quarters.
 * However, standard formula used by banks for RD:
 * A = P * (1 + R/400)^(N) + P * (1 + R/400)^(N-1) + ...
 * But usually it's calculated as Simple Interest on each monthly deposit if < 1 quarter?
 * 
 * Standard General Formula often used:
 * M = P * [ (1+R/400)^(n) - 1 ] / [ 1 - (1+R/400)^(-1/3) ] ... (Complex)
 * 
 * We will use the Iterative Quarterly Compounding approach which is perfectly accurate.
 * Interest is compounded quarterly.
 */
export const calculateRD = (input: RdInput): RdResult => {
    const { monthlyInvestment, interestRate, timePeriodYears } = input;

    const months = timePeriodYears * 12;
    const rate = interestRate / 100;

    let totalMaturityAmount = 0;
    const totalInvestment = monthlyInvestment * months;

    // Iterative approach: consistent with Indian Bank standards where interest is compounded quarterly.
    // For every monthly installment, we calculate the interest it earns until maturity.
    // Time remaining for i-th installment (in months) = months - (i - 1)

    // However, the standard formula used by many online calculators for Indian RDs is simpler:
    // It assumes quarterly compounding on the running balance.

    // Let's use a month-by-month simulation to be precise with Quarterly Compounding.

    let balance = 0;
    const yearlyData: YearlyRdData[] = [];

    for (let m = 1; m <= months; m++) {
        // Add monthly installment
        balance += monthlyInvestment;

        // Apply interest if it's a quarter end (3rd, 6th, 9th, 12th month etc.)
        // Actually, interest is calculated on daily/monthly products but compounded quarterly.
        // Standard Bank practice: Compounded Quarterly.

        // Let's stick to the widely accepted formula approximation for RD:
        // A = P * (1+r/4)^(n*4) is for Lumpsum.

        // For RD, we can treat each deposit as a separate FD with duration = (TotalMonths - CurrentMonth)/12 years.
        // Then we sum them up.
        // Duration in quarters for a deposit made at month 'm' (0-indexed):
        // Remaining months = TotalMonths - m
        // We need to be careful with "Quarterly Compounding".

        // Let's use the simulation approach which simulates the bank account state.
        // But banks compound on specific dates.

        // Simpler approach that matches HDFC/SBI calculators:
        // Treat each specific installment as a mini-FD compounded quarterly.

        // Installment 1: Earns interest for N months.
        // Installment 2: Earns interest for N-1 months.
        // ...
        // Installment K: Earns interest for N-K+1 months.

        // Formula for Compounded Quarterly amount for 't' years: A = P * (1 + r/4)^(4t)
        // Here 't' can be fractional (e.g. 5 months = 5/12 years).

    }

    // Re-doing the calculation using the "Sum of FDs" method which is accurate for RD.

    totalMaturityAmount = 0;

    for (let i = 0; i < months; i++) {
        // i is the number of months passed since start.
        // Or better: loop for each installment.
        // Installment at month 0 (start) stays for 'months' duration.
        // Installment at month 1 stays for 'months - 1' duration.

        const monthsRemaining = months - i;
        const yearsRemaining = monthsRemaining / 12;

        // Compounded Quarterly Formula: A = P * (1 + R/400)^(4 * n) where n is years
        const quarters = 4 * yearsRemaining;

        const installmentMaturity = monthlyInvestment * Math.pow(1 + interestRate / 400, quarters);
        totalMaturityAmount += installmentMaturity;
    }

    const totalInterest = totalMaturityAmount - totalInvestment;

    /**
     * Generate Yearly Growth Data
     * For the chart, we need the accumulated value at the end of each year.
     * We'll run a parallel simulation effectively to snapshot the balance at years.
     */

    const runningBalance = 0;
    const runningInvested = 0;

    // We need to re-calculate "Balance at Year Y" correctly.
    // At year Y (month M=Y*12), what is the value?
    // It is the sum of all installments paid so far, compounded till month M.

    for (let y = 1; y <= timePeriodYears; y++) {
        const monthsInYear = y * 12;
        let balanceAtYear = 0;
        const investedAtYear = monthlyInvestment * monthsInYear;

        // Calculate value of all installments paid up to this year, valued at this year end.
        for (let i = 0; i < monthsInYear; i++) {
            const monthsInvestedDuration = monthsInYear - i; // How long this specific installment has been in (till year end)
            const yearsInvested = monthsInvestedDuration / 12;
            const quarters = 4 * yearsInvested;

            const val = monthlyInvestment * Math.pow(1 + interestRate / 400, quarters);
            balanceAtYear += val;
        }

        yearlyData.push({
            year: y,
            balance: Math.round(balanceAtYear),
            interestEarned: Math.round(balanceAtYear - investedAtYear),
            investedAmount: investedAtYear
        });
    }


    const today = new Date();
    const maturityDate = new Date(today);
    maturityDate.setMonth(today.getMonth() + months);

    return {
        maturityAmount: Math.round(totalMaturityAmount),
        totalInterest: Math.round(totalInterest),
        totalInvestment: Math.round(totalInvestment),
        yearlyData,
        maturityDate
    };
};
