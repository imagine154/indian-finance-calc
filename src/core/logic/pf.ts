/**
 * EPF (Employee Provident Fund) Calculator Logic
 * Pure TypeScript financial logic - NO React code
 */

export interface EpfInput {
    currentAge: number;
    retirementAge: number;
    basicSalary: number; // Monthly Basic Salary
    vpfAmount: number; // Monthly Voluntary PF
    annualIncrease: number; // Expected annual salary hike %
    currentBalance: number; // Existing EPF corpus
    interestRate: number; // Annual Interest Rate (default 8.25%)
}

export interface EpfResult {
    totalCorpus: number;
    totalInvested: number;
    totalInterest: number;
    yearlyData: EpfYearlyData[];
}

export interface EpfYearlyData {
    year: number;
    age: number;
    invested: number;
    interest: number;
    balance: number;
    salary: number; // Monthly basic for that year
}

/**
 * Calculate EPF Corpus
 */
export function calculateEPFCorpus(input: EpfInput): EpfResult {
    const {
        currentAge,
        retirementAge,
        vpfAmount,
        annualIncrease,
        currentBalance,
        interestRate
    } = input;

    let { basicSalary } = input;
    let balance = currentBalance;
    let totalInvested = currentBalance; // Initial balance is treated as invested principal for simplicity, or we can track separately. 
    // Usually "Total Invested" means what YOU put in. But for corpus projection, we often just want to see the split.
    // Let's track *fresh* investment separately if needed, but for the chart "Invested" usually implies Principal.
    // If currentBalance has interest component, it's hard to separate. Let's assume currentBalance is Principal for the sake of the "Invested" line starting point, or just track cumulative additions.
    // Better approach: 
    // Total Invested = Current Balance + Sum of all future contributions.
    // Total Interest = Final Corpus - Total Invested.

    const yearlyData: EpfYearlyData[] = [];

    // If already retired
    if (currentAge >= retirementAge) {
        return {
            totalCorpus: currentBalance,
            totalInvested: currentBalance,
            totalInterest: 0,
            yearlyData: []
        };
    }

    const yearsToInvest = retirementAge - currentAge;

    for (let i = 0; i < yearsToInvest; i++) {
        const year = new Date().getFullYear() + i;
        const age = currentAge + i;

        // 1. Calculate Monthly Contributions
        // Employee: 12% of Basic + VPF
        const employeeMonthly = (0.12 * basicSalary) + vpfAmount;

        // Employer: 12% of Basic - EPS
        // EPS is 8.33% of Basic, capped at wage ceiling of 15,000.
        // So EPS max is 15000 * 8.33% = 1250 (approx).
        // Actually the rule is: 8.33% of (Basic capped at 15000).
        const wageCeiling = 15000;
        const epsBasis = Math.min(basicSalary, wageCeiling);
        const epsMonthly = 0.0833 * epsBasis;

        // Employer Share to EPF = (12% of Basic) - EPS
        // Note: Employer contributes 12% of Basic (capped? usually companies pay 12% of actual basic if > 15k, but EPS is strictly capped).
        // Let's assume standard corporate structure where Employer pays 12% of Actual Basic, but EPS is capped.
        const employerMonthlyTotal = 0.12 * basicSalary;
        const employerEpfMonthly = employerMonthlyTotal - epsMonthly;

        const totalMonthlyContribution = employeeMonthly + employerEpfMonthly;
        const totalYearlyContribution = totalMonthlyContribution * 12;

        // 2. Interest Calculation
        // Interest is credited on the opening balance + monthly contributions.
        // The exact EPFO method is monthly running balance, but for annual projection:
        // Interest ~ (Opening Balance * Rate) + (Yearly Contrib * Rate / 2) (Average approximation)
        // Or more accurately, simulate monthly.

        // Let's do monthly simulation for better precision within the year
        const yearOpeningBalance = balance;

        // Reset balance to opening for the clean annual formula application to avoid double counting if we did monthly above.
        // Let's use the standard approximation:
        balance = yearOpeningBalance + totalYearlyContribution;
        const interestForYear = (yearOpeningBalance * interestRate / 100) + (totalYearlyContribution * interestRate / 100 / 2);

        balance += interestForYear;
        totalInvested += totalYearlyContribution;

        yearlyData.push({
            year,
            age,
            invested: Math.round(totalInvested),
            interest: Math.round(balance - totalInvested),
            balance: Math.round(balance),
            salary: Math.round(basicSalary)
        });

        // 3. Salary Hike for next year
        basicSalary = basicSalary * (1 + annualIncrease / 100);
    }

    return {
        totalCorpus: Math.round(balance),
        totalInvested: Math.round(totalInvested),
        totalInterest: Math.round(balance - totalInvested),
        yearlyData
    };
}
