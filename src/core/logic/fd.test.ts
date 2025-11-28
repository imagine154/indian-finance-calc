import { calculateFD } from './fd';

describe('calculateFD', () => {
    it('should calculate correct maturity amount for standard inputs (Quarterly)', () => {
        // Case: 1L, 7%, 5 Years, Quarterly
        // A = 100000 * (1 + 0.07/4)^(4*5)
        // A = 100000 * (1.0175)^20
        // A = ~141478
        const result = calculateFD({
            investmentAmount: 100000,
            interestRate: 7,
            durationYears: 5,
            compoundingFrequency: 'Quarterly'
        });

        expect(result.maturityAmount).toBeGreaterThan(141470);
        expect(result.maturityAmount).toBeLessThan(141485);
        expect(result.totalInterest).toBe(result.maturityAmount - 100000);
    });

    it('should handle Monthly compounding', () => {
        // Case: 10000, 12%, 1 Year, Monthly
        // A = 10000 * (1 + 0.12/12)^(12*1) = 10000 * (1.01)^12
        // A = 10000 * 1.1268 = 11268
        const result = calculateFD({
            investmentAmount: 10000,
            interestRate: 12,
            durationYears: 1,
            compoundingFrequency: 'Monthly'
        });

        expect(result.maturityAmount).toBe(11268);
    });

    it('should handle Yearly compounding', () => {
        // Case: 10000, 10%, 2 Years, Yearly
        // A = 10000 * (1.1)^2 = 12100
        const result = calculateFD({
            investmentAmount: 10000,
            interestRate: 10,
            durationYears: 2,
            compoundingFrequency: 'Yearly'
        });

        expect(result.maturityAmount).toBe(12100);
    });
});
