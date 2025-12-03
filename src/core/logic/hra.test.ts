import { calculateHRA } from './hra';

describe('calculateHRA', () => {
    it('should calculate HRA correctly for Metro city (Scenario 1)', () => {
        // Basic: 5L, DA: 0, HRA: 2.5L, Rent: 2.4L, Metro
        // 1. Actual HRA: 2,50,000
        // 2. Rent - 10% Basic: 2,40,000 - 50,000 = 1,90,000
        // 3. 50% Basic: 2,50,000
        // Exempt: 1,90,000
        const result = calculateHRA({
            basicSalary: 500000,
            da: 0,
            hraReceived: 250000,
            totalRentPaid: 240000,
            isMetro: true,
        });

        expect(result.exemptAmount).toBe(190000);
        expect(result.taxableAmount).toBe(60000);
        expect(result.breakdown.actualHra).toBe(250000);
        expect(result.breakdown.rentMinusTenPercent).toBe(190000);
        expect(result.breakdown.salaryCap).toBe(250000);
    });

    it('should calculate HRA correctly for Non-Metro city (Scenario 2)', () => {
        // Basic: 5L, DA: 0, HRA: 2.5L, Rent: 2.4L, Non-Metro
        // 1. Actual HRA: 2,50,000
        // 2. Rent - 10% Basic: 1,90,000
        // 3. 40% Basic: 2,00,000
        // Exempt: 1,90,000
        const result = calculateHRA({
            basicSalary: 500000,
            da: 0,
            hraReceived: 250000,
            totalRentPaid: 240000,
            isMetro: false,
        });

        expect(result.exemptAmount).toBe(190000);
        expect(result.taxableAmount).toBe(60000);
        expect(result.breakdown.salaryCap).toBe(200000);
    });

    it('should return 0 exemption if Rent is less than 10% of Basic', () => {
        // Basic: 5L, Rent: 40k (less than 50k)
        const result = calculateHRA({
            basicSalary: 500000,
            da: 0,
            hraReceived: 200000,
            totalRentPaid: 40000,
            isMetro: false,
        });

        expect(result.exemptAmount).toBe(0);
        expect(result.taxableAmount).toBe(200000);
        expect(result.breakdown.rentMinusTenPercent).toBe(0);
    });

    it('should handle DA correctly', () => {
        // Basic: 5L, DA: 1L => Salary = 6L
        // Rent: 1L
        // Rent - 10% Salary = 1L - 60k = 40k
        const result = calculateHRA({
            basicSalary: 500000,
            da: 100000,
            hraReceived: 200000,
            totalRentPaid: 100000,
            isMetro: false,
        });

        expect(result.breakdown.rentMinusTenPercent).toBe(40000);
    });
});
