/**
 * NPS (National Pension System) Calculator Logic
 * Pure TypeScript financial logic
 */

export interface NpsInput {
    currentAge: number;
    retirementAge: number;
    monthlyContribution: number;
    expectedReturn: number; // Annual ROI %
    annuityPercentage: number; // % of corpus to buy annuity (40-100)
    annuityRate: number; // Annual Annuity Rate %
}

export interface NpsResult {
    totalCorpus: number;
    totalInvested: number;
    totalInterest: number;
    lumpSumValue: number;
    annuityValue: number;
    monthlyPension: number;
    yearlyData: NpsYearlyData[];
}

export interface NpsYearlyData {
    year: number;
    age: number;
    invested: number;
    interest: number;
    balance: number;
}

/**
 * Calculate NPS Corpus and Pension
 */
export function calculateNPS(input: NpsInput): NpsResult {
    const {
        currentAge,
        retirementAge,
        monthlyContribution,
        expectedReturn,
        annuityPercentage,
        annuityRate
    } = input;

    const yearsToInvest = retirementAge - currentAge;
    const monthsToInvest = yearsToInvest * 12;
    const monthlyRate = expectedReturn / 12 / 100;

    let balance = 0;
    let totalInvested = 0;
    const yearlyData: NpsYearlyData[] = [];
    const currentYear = new Date().getFullYear();

    // If already retired or invalid input
    if (monthsToInvest <= 0) {
        return {
            totalCorpus: 0,
            totalInvested: 0,
            totalInterest: 0,
            lumpSumValue: 0,
            annuityValue: 0,
            monthlyPension: 0,
            yearlyData: []
        };
    }

    // Monthly compounding simulation for accurate yearly data
    for (let i = 0; i < yearsToInvest; i++) {
        const year = currentYear + i;
        const age = currentAge + i;

        // Simulate 12 months of contribution and growth
        for (let m = 0; m < 12; m++) {
            // Contribution at start of month, then interest for the month
            balance = (balance + monthlyContribution) * (1 + monthlyRate);
            totalInvested += monthlyContribution;
        }

        yearlyData.push({
            year,
            age,
            invested: Math.round(totalInvested),
            interest: Math.round(balance - totalInvested),
            balance: Math.round(balance)
        });
    }

    const totalCorpus = Math.round(balance);
    const totalInterest = Math.round(balance - totalInvested);

    const annuityValue = Math.round(totalCorpus * (annuityPercentage / 100));
    const lumpSumValue = totalCorpus - annuityValue;

    // Monthly Pension = (Annuity Value * Annuity Rate) / 12
    const monthlyPension = Math.round((annuityValue * (annuityRate / 100)) / 12);

    return {
        totalCorpus,
        totalInvested: Math.round(totalInvested),
        totalInterest,
        lumpSumValue,
        annuityValue,
        monthlyPension,
        yearlyData
    };
}
