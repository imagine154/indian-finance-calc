import { calculateRD, RdInput } from './rd';

describe('calculateRD', () => {
    test('should calculate correct maturity amount for 1 year', () => {
        // Standard HDFC/SBI Example:
        // Monthly: 5000, Rate: 7%, Years: 1
        // Total Investment: 60,000
        // Expected Interest: ~2298 (approx)
        // Maturity: ~62298

        const input: RdInput = {
            monthlyInvestment: 5000,
            interestRate: 7,
            timePeriodYears: 1
        };

        const result = calculateRD(input);

        expect(result.totalInvestment).toBe(60000);
        // Allowing small margin for rounding diffs between standard calculators
        expect(result.maturityAmount).toBeGreaterThan(62200);
        expect(result.maturityAmount).toBeLessThan(62400);
        expect(result.yearlyData.length).toBe(1);
    });

    test('should calculate correct maturity amount for 5 years', () => {
        // Monthly: 1000, Rate: 6%, Years: 5
        // Investment: 60,000
        // Expected Maturity: ~70119 (approx using quarterly compounding)

        const input: RdInput = {
            monthlyInvestment: 1000,
            interestRate: 6,
            timePeriodYears: 5
        };

        const result = calculateRD(input);

        expect(result.totalInvestment).toBe(60000);
        expect(result.maturityAmount).toBeGreaterThan(69500);
        expect(result.maturityAmount).toBeLessThan(70500);
        expect(result.yearlyData.length).toBe(5);
    });
});
