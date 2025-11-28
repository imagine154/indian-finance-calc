import { calculateLumpsum } from './lumpsum';

describe('calculateLumpsum', () => {
    it('should calculate correct maturity value for standard inputs', () => {
        // Test Case: 1L for 10 years @ 12%
        // Expected: 100000 * (1.12)^10 = ~310585
        const result = calculateLumpsum({
            investmentAmount: 100000,
            duration: 10,
            expectedReturn: 12
        });

        expect(result.totalInvested).toBe(100000);
        expect(result.maturityValue).toBeGreaterThan(310500);
        expect(result.maturityValue).toBeLessThan(310600);
        expect(result.yearlyData).toHaveLength(10);
    });

    it('should handle short duration', () => {
        const result = calculateLumpsum({
            investmentAmount: 50000,
            duration: 1,
            expectedReturn: 10
        });

        expect(result.maturityValue).toBe(55000);
        expect(result.wealthGained).toBe(5000);
    });

    it('should handle high returns', () => {
        const result = calculateLumpsum({
            investmentAmount: 10000,
            duration: 5,
            expectedReturn: 20
        });

        // 10000 * (1.2)^5 = 24883.2
        expect(result.maturityValue).toBe(24883);
    });
});
