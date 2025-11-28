import { calculatePPF } from './ppf';

describe('calculatePPF', () => {
    it('should calculate correct maturity amount for standard inputs', () => {
        // Test Case: 1.5L/year for 15 years @ 7.1%
        // Expected Maturity: ~40,68,209
        const result = calculatePPF({
            yearlyInvestment: 150000,
            duration: 15,
            interestRate: 7.1
        });

        expect(result.totalInvested).toBe(2250000);
        // Allow small rounding difference
        expect(result.maturityAmount).toBeGreaterThan(4068000);
        expect(result.maturityAmount).toBeLessThan(4068500);
        expect(result.yearlyData).toHaveLength(15);
    });

    it('should handle minimum investment and duration', () => {
        const result = calculatePPF({
            yearlyInvestment: 500,
            duration: 15,
            interestRate: 7.1
        });

        expect(result.totalInvested).toBe(7500);
        expect(result.yearlyData).toHaveLength(15);
        expect(result.maturityAmount).toBeGreaterThan(result.totalInvested);
    });

    it('should handle extended duration', () => {
        const result = calculatePPF({
            yearlyInvestment: 100000,
            duration: 20,
            interestRate: 7.1
        });

        expect(result.totalInvested).toBe(2000000);
        expect(result.yearlyData).toHaveLength(20);
    });
});
