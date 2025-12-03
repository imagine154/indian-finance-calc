import { calculateGratuity } from './gratuity';

describe('calculateGratuity', () => {
    it('should calculate correctly for Covered by Act', () => {
        const result = calculateGratuity({
            basicSalary: 50000,
            yearsOfService: 10,
            isCoveredByAct: true
        });
        // (15 * 50000 * 10) / 26 = 288461.54
        expect(result.totalGratuity).toBeCloseTo(288461.54, 1);
        expect(result.exemptAmount).toBeCloseTo(288461.54, 1);
        expect(result.taxableAmount).toBe(0);
        expect(result.isEligible).toBe(true);
    });

    it('should calculate correctly for Not Covered by Act', () => {
        const result = calculateGratuity({
            basicSalary: 50000,
            yearsOfService: 10,
            isCoveredByAct: false
        });
        // (15 * 50000 * 10) / 30 = 250000
        expect(result.totalGratuity).toBe(250000);
        expect(result.exemptAmount).toBe(250000);
        expect(result.taxableAmount).toBe(0);
    });

    it('should cap exemption at 20 Lakhs', () => {
        const result = calculateGratuity({
            basicSalary: 400000, // High salary
            yearsOfService: 10,
            isCoveredByAct: true
        });
        // (15 * 400000 * 10) / 26 = 23,07,692.31
        expect(result.totalGratuity).toBeGreaterThan(2000000);
        expect(result.exemptAmount).toBe(2000000);
        expect(result.taxableAmount).toBeCloseTo(result.totalGratuity - 2000000, 1);
    });

    it('should mark as ineligible if years < 5', () => {
        const result = calculateGratuity({
            basicSalary: 50000,
            yearsOfService: 4,
            isCoveredByAct: true
        });
        expect(result.isEligible).toBe(false);
        // Calculation still happens
        expect(result.totalGratuity).toBeGreaterThan(0);
    });

    it('should be eligible for exactly 5 years', () => {
        const result = calculateGratuity({
            basicSalary: 50000,
            yearsOfService: 5,
            isCoveredByAct: true
        });
        expect(result.isEligible).toBe(true);
    });
});
