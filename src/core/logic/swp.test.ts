import { calculateSWP } from './swp';

describe('calculateSWP', () => {
    it('should calculate correct values for standard inputs (Capital Growth)', () => {
        // Case: 10L inv, 6k withdrawal, 10% return
        // Monthly rate = 0.833%
        // Withdrawal (6000) < Interest (~8333), so capital should grow.
        const result = calculateSWP({
            totalInvestment: 1000000,
            withdrawalAmount: 6000,
            expectedReturn: 10,
            duration: 5
        });

        expect(result.totalWithdrawn).toBe(6000 * 12 * 5); // 3,60,000
        expect(result.finalValue).toBeGreaterThan(1000000); // Capital grew
        expect(result.isDepleted).toBe(false);
    });

    it('should handle capital depletion', () => {
        // Case: 1L inv, 10k withdrawal, 10% return
        // Should deplete quickly
        const result = calculateSWP({
            totalInvestment: 100000,
            withdrawalAmount: 10000,
            expectedReturn: 10,
            duration: 5
        });

        expect(result.isDepleted).toBe(true);
        expect(result.finalValue).toBe(0);
        expect(result.depletionYear).toBeLessThanOrEqual(2);
    });

    it('should handle zero duration', () => {
        const result = calculateSWP({
            totalInvestment: 100000,
            withdrawalAmount: 5000,
            expectedReturn: 10,
            duration: 0
        });

        expect(result.totalWithdrawn).toBe(0);
        expect(result.finalValue).toBe(100000);
    });
});
