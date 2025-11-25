import { compareTaxRegimes, TaxInput, TaxComparisonResult } from './tax';

export interface FreelanceTaxInput {
    annualRevenue: number;
    otherIncome?: number;
    deductions?: {
        section80C?: number;
        section80D?: number;
        section80CCD1B?: number; // Self NPS
        otherDeductions?: number;
    };
}

export interface FreelanceTaxResult {
    presumptiveIncome: number; // 50% of Revenue
    totalTaxableIncome: number;
    taxComparison: TaxComparisonResult;
    taxSavedIfDeclaredFully: number; // Difference between 100% income tax and 50% income tax
}

export function calculateFreelanceTax(input: FreelanceTaxInput): FreelanceTaxResult {
    // 1. Calculate Presumptive Income (50% of Revenue)
    const presumptiveIncome = input.annualRevenue * 0.50;

    // 2. Total Taxable Income
    const totalTaxableIncome = presumptiveIncome + (input.otherIncome || 0);

    // 3. Prepare Input for Tax Engine (44ADA Scenario)
    // Key: Gross Salary is 0. "Income" is passed as Other Income or similar.
    // However, compareTaxRegimes expects specific heads.
    // We will treat the Total Taxable Income as 'otherIncome' for the tax engine
    // because 44ADA income is "Business/Profession" but for tax calc purposes (slabs),
    // it behaves like normal taxable income without salary standard deduction.
    const taxInput: TaxInput = {
        grossSalary: 0, // No Salary -> No Standard Deduction
        otherIncome: totalTaxableIncome,
        section80C: input.deductions?.section80C,
        section80D: input.deductions?.section80D,
        section80CCD1B: input.deductions?.section80CCD1B,
        otherDeductions: input.deductions?.otherDeductions,
    };

    const taxComparison = compareTaxRegimes(taxInput);

    // 4. Calculate "Tax Saved" (Hypothetical: If they declared 100% revenue)
    // We only compare New Regime for this hypothetical to show "Potential Savings"
    // or we can just compare the 'Better' regime of actual vs hypothetical.
    // Let's keep it simple: Compare New Regime Tax on 100% vs New Regime Tax on 50%.

    const fullIncome = input.annualRevenue + (input.otherIncome || 0);
    const hypotheticalInput: TaxInput = {
        grossSalary: 0,
        otherIncome: fullIncome,
        section80C: input.deductions?.section80C, // Deductions still apply
        section80D: input.deductions?.section80D,
        section80CCD1B: input.deductions?.section80CCD1B,
        otherDeductions: input.deductions?.otherDeductions,
    };

    const hypotheticalTax = compareTaxRegimes(hypotheticalInput);

    // We use the 'New Regime' tax for the savings calculation as a baseline, 
    // or we can take the difference of the 'Better' regimes.
    // Let's use the actual payable tax from the main calculation.
    const actualTaxPayable = taxComparison.recommendation.betterRegime === 'Old'
        ? taxComparison.oldRegime.totalTaxPayable
        : taxComparison.newRegime.totalTaxPayable;

    const hypotheticalTaxPayable = hypotheticalTax.recommendation.betterRegime === 'Old'
        ? hypotheticalTax.oldRegime.totalTaxPayable
        : hypotheticalTax.newRegime.totalTaxPayable;

    const taxSaved = Math.max(0, hypotheticalTaxPayable - actualTaxPayable);

    return {
        presumptiveIncome,
        totalTaxableIncome,
        taxComparison,
        taxSavedIfDeclaredFully: taxSaved
    };
}
