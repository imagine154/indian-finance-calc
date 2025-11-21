/**
 * Home Loan Calculator Logic
 * Supports standard EMI calculation and smart pre-payment simulation.
 */

export type PrepaymentFrequency = 'Monthly' | 'Yearly';

export interface LoanInput {
    loanAmount: number;
    interestRate: number; // Annual percentage
    tenureYears: number;
    prepaymentAmount?: number;
    prepaymentFrequency?: PrepaymentFrequency;
}

export interface YearlyBreakdown {
    year: number;
    principalPaid: number;
    interestPaid: number;
    balance: number;
    prepayment: number;
}

export interface MonthlyData {
    month: number;
    year: number;
    openingBalance: number;
    emi: number;
    principalPaid: number;
    interestPaid: number;
    prepayment: number;
    closingBalance: number;
}

export interface LoanResult {
    monthlyEMI: number;
    totalInterest: number;
    totalAmount: number;
    actualTenureMonths: number;
    actualTenureYears: number;
    savings: {
        interestSaved: number;
        timeSavedYears: number;
        timeSavedMonths: number;
    };
    yearlyBreakdown: YearlyBreakdown[];
    monthlyBreakdown: MonthlyData[];
}

/**
 * Calculate Home Loan details with optional pre-payment simulation
 */
export function calculateLoan(input: LoanInput): LoanResult {
    const {
        loanAmount,
        interestRate,
        tenureYears,
        prepaymentAmount = 0,
        prepaymentFrequency = 'Monthly',
    } = input;

    // Standard EMI Calculation
    // P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    let emi = 0;
    if (monthlyRate === 0) {
        emi = loanAmount / totalMonths;
    } else {
        emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // Calculate Standard Scenario (No Pre-payment) for comparison
    const standardTotalPayment = emi * totalMonths;
    const standardTotalInterest = standardTotalPayment - loanAmount;

    // Simulation for Actual Scenario (With Pre-payment)
    let currentBalance = loanAmount;
    let totalInterestPaid = 0;
    let monthsElapsed = 0;
    const yearlyBreakdown: YearlyBreakdown[] = [];
    const monthlyBreakdown: MonthlyData[] = [];

    let currentYearPrincipal = 0;
    let currentYearInterest = 0;
    let currentYearPrepayment = 0;

    // Loop until loan is paid or max tenure reached
    // We allow loop to go slightly beyond totalMonths to catch edge cases, but logically it shouldn't if EMI covers interest
    while (currentBalance > 1 && monthsElapsed < totalMonths * 2) { // *2 safety break
        monthsElapsed++;

        // Interest for this month
        const interestForMonth = currentBalance * monthlyRate;

        // Principal part of EMI
        let principalForMonth = emi - interestForMonth;

        // If last month (balance < EMI), adjust
        if (currentBalance < emi) {
            // This is the final payment. 
            // Actually, usually we pay the remaining balance + interest.
            // Let's stick to: We pay EMI, but if (Principal + Interest) > Balance, we adjust.
            // Easier: If Balance + Interest < EMI, we pay Balance + Interest.
            if (currentBalance + interestForMonth < emi) {
                principalForMonth = currentBalance;
            }
        }

        // Apply Pre-payment
        let extraPayment = 0;
        if (prepaymentAmount > 0) {
            if (prepaymentFrequency === 'Monthly') {
                extraPayment = prepaymentAmount;
            } else if (prepaymentFrequency === 'Yearly' && monthsElapsed % 12 === 0) {
                extraPayment = prepaymentAmount;
            }
        }

        // Cap extra payment to balance
        if (extraPayment > currentBalance - principalForMonth) {
            extraPayment = currentBalance - principalForMonth;
        }

        // Update State
        totalInterestPaid += interestForMonth;

        const openingBalance = currentBalance;
        currentBalance -= (principalForMonth + extraPayment);

        // Push Monthly Data
        monthlyBreakdown.push({
            month: monthsElapsed,
            year: Math.ceil(monthsElapsed / 12),
            openingBalance: Math.round(openingBalance),
            emi: Math.round(principalForMonth + interestForMonth),
            principalPaid: Math.round(principalForMonth),
            interestPaid: Math.round(interestForMonth),
            prepayment: Math.round(extraPayment),
            closingBalance: Math.round(currentBalance < 0 ? 0 : currentBalance),
        });

        // Accumulate Yearly Data
        currentYearPrincipal += principalForMonth;
        currentYearInterest += interestForMonth;
        currentYearPrepayment += extraPayment;

        // End of Year or End of Loan
        if (monthsElapsed % 12 === 0 || currentBalance <= 1) {
            const year = Math.ceil(monthsElapsed / 12);

            // If it's the same year (e.g. loan ends in middle of year), update existing or push new
            // Actually, simpler to just push every 12 months or at end.
            // If loan ends at month 15, we have Year 1 (1-12) and Year 2 (13-15).

            // Logic: Push at 12, 24, 36... AND if loan ends at non-multiple.
            // But we need to reset accumulators.

            // Let's just push if it's a multiple of 12 OR balance is 0
            // But if balance is 0 at month 13, we pushed at 12. We need to push at 13 too.

            // Better: Just track current year index.

            yearlyBreakdown.push({
                year,
                principalPaid: Math.round(currentYearPrincipal),
                interestPaid: Math.round(currentYearInterest),
                balance: Math.round(currentBalance < 0 ? 0 : currentBalance),
                prepayment: Math.round(currentYearPrepayment),
            });

            currentYearPrincipal = 0;
            currentYearInterest = 0;
            currentYearPrepayment = 0;
        }

        if (currentBalance <= 1) break;
    }

    const totalAmountPaid = loanAmount + totalInterestPaid;
    const interestSaved = Math.max(0, standardTotalInterest - totalInterestPaid);
    const monthsSaved = Math.max(0, totalMonths - monthsElapsed);

    const timeSavedYears = Math.floor(monthsSaved / 12);
    const timeSavedMonths = monthsSaved % 12;

    return {
        monthlyEMI: Math.round(emi),
        totalInterest: Math.round(totalInterestPaid),
        totalAmount: Math.round(totalAmountPaid),
        actualTenureMonths: monthsElapsed,
        actualTenureYears: Number((monthsElapsed / 12).toFixed(1)),
        savings: {
            interestSaved: Math.round(interestSaved),
            timeSavedYears,
            timeSavedMonths,
        },
        yearlyBreakdown,
        monthlyBreakdown,
    };
}
