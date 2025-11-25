import { calculateFreelanceTax } from './freelance';

describe('Freelance Tax Calculator (44ADA)', () => {

    test('Scenario 1: Pure Freelancer (20L Revenue)', () => {
        // Revenue: 20L
        // Presumptive Income: 10L (50%)
        // Taxable Income: 10L
        // New Regime Tax on 10L:
        // 0-4L: 0
        // 4-8L: 5% of 4L = 20k
        // 8-10L: 10% of 2L = 20k
        // Total Tax = 40k + 4% Cess = 41,600
        // (Note: Rebate 87A applies if Taxable Income <= 12L? Yes. 
        // Wait, New Regime Rebate limit is 12L taxable income.
        // So Tax on 10L is fully rebated? Yes. Tax should be 0.)

        const result = calculateFreelanceTax({
            annualRevenue: 2000000
        });

        expect(result.presumptiveIncome).toBe(1000000);
        expect(result.totalTaxableIncome).toBe(1000000);

        // Check New Regime Tax
        const newRegime = result.taxComparison.newRegime;
        expect(newRegime.taxableSlabIncome).toBe(1000000);
        // Rebate should cover the tax
        expect(newRegime.totalTaxPayable).toBe(0);
    });

    test('Scenario 2: High Income Freelancer (50L Revenue)', () => {
        // Revenue: 50L
        // Presumptive Income: 25L
        // Taxable Income: 25L
        // New Regime Tax on 25L:
        // ... (Standard slabs apply)

        const result = calculateFreelanceTax({
            annualRevenue: 5000000
        });

        expect(result.presumptiveIncome).toBe(2500000);
        expect(result.totalTaxableIncome).toBe(2500000);

        // Tax should be > 0
        expect(result.taxComparison.newRegime.totalTaxPayable).toBeGreaterThan(0);
    });

    test('Scenario 3: Freelancer with Other Income', () => {
        // Revenue: 20L -> 10L
        // Other Income: 5L
        // Total Taxable: 15L

        const result = calculateFreelanceTax({
            annualRevenue: 2000000,
            otherIncome: 500000
        });

        expect(result.presumptiveIncome).toBe(1000000);
        expect(result.totalTaxableIncome).toBe(1500000);
    });

    test('Scenario 4: Tax Saved Calculation', () => {
        // Revenue: 20L
        // Actual Taxable (50%): 10L -> Tax 0 (Rebate)
        // Hypothetical Taxable (100%): 20L -> Tax significant
        // Saved should be > 0

        const result = calculateFreelanceTax({
            annualRevenue: 2000000
        });

        expect(result.taxSavedIfDeclaredFully).toBeGreaterThan(0);
    });
});
