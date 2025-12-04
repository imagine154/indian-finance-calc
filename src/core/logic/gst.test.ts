import { calculateGST } from './gst';

describe('GST Calculator Logic', () => {
    test('Exclusive GST Calculation (18%)', () => {
        const result = calculateGST({ amount: 1000, rate: 18, type: 'Exclusive' });
        expect(result.netPrice).toBe(1000);
        expect(result.gstAmount).toBe(180);
        expect(result.totalAmount).toBe(1180);
        expect(result.cgst).toBe(90);
        expect(result.sgst).toBe(90);
    });

    test('Inclusive GST Calculation (18%)', () => {
        const result = calculateGST({ amount: 1180, rate: 18, type: 'Inclusive' });
        expect(result.netPrice).toBeCloseTo(1000, 2);
        expect(result.gstAmount).toBeCloseTo(180, 2);
        expect(result.totalAmount).toBe(1180);
    });

    test('Exclusive GST Calculation (5%)', () => {
        const result = calculateGST({ amount: 100, rate: 5, type: 'Exclusive' });
        expect(result.netPrice).toBe(100);
        expect(result.gstAmount).toBe(5);
        expect(result.totalAmount).toBe(105);
    });

    test('Inclusive GST Calculation (5%)', () => {
        const result = calculateGST({ amount: 105, rate: 5, type: 'Inclusive' });
        expect(result.netPrice).toBeCloseTo(100, 2);
        expect(result.gstAmount).toBeCloseTo(5, 2);
        expect(result.totalAmount).toBe(105);
    });

    test('Exclusive GST Calculation (40%) - GST 2.0', () => {
        const result = calculateGST({ amount: 1000, rate: 40, type: 'Exclusive' });
        expect(result.netPrice).toBe(1000);
        expect(result.gstAmount).toBe(400);
        expect(result.totalAmount).toBe(1400);
    });

    test('Inclusive GST Calculation (40%) - GST 2.0', () => {
        const result = calculateGST({ amount: 1400, rate: 40, type: 'Inclusive' });
        expect(result.netPrice).toBeCloseTo(1000, 2);
        expect(result.gstAmount).toBeCloseTo(400, 2);
        expect(result.totalAmount).toBe(1400);
    });
});
