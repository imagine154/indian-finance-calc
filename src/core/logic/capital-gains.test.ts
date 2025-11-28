import { calculateCapitalGains } from './capital-gains';

describe('calculateCapitalGains', () => {

    // --- EQUITY TESTS ---
    it('should calculate Equity STCG correctly (20%)', () => {
        // Profit 1L, < 12 months
        const result = calculateCapitalGains({
            assetType: 'Equity',
            purchasePrice: 100000,
            salePrice: 200000,
            holdingPeriodMonths: 11,
            userIncomeSlab: 30
        });
        expect(result.capitalGain).toBe(100000);
        expect(result.taxPayable).toBe(20000); // 20% of 1L
        expect(result.taxType).toBe('Short Term');
    });

    it('should calculate Equity LTCG correctly (12.5% above 1.25L)', () => {
        // Profit 2.25L, > 12 months
        // Taxable = 2.25L - 1.25L = 1L
        // Tax = 12.5% of 1L = 12500
        const result = calculateCapitalGains({
            assetType: 'Equity',
            purchasePrice: 100000,
            salePrice: 325000,
            holdingPeriodMonths: 13,
            userIncomeSlab: 30
        });
        expect(result.capitalGain).toBe(225000);
        expect(result.exemptionApplied).toBe(125000);
        expect(result.taxPayable).toBe(12500);
        expect(result.taxType).toBe('Long Term');
    });

    // --- DEBT TESTS ---
    it('should calculate Debt Fund tax correctly (Slab Rate)', () => {
        // Profit 1L, Slab 30%
        const result = calculateCapitalGains({
            assetType: 'DebtFund',
            purchasePrice: 100000,
            salePrice: 200000,
            holdingPeriodMonths: 36, // Long term holding, but still slab rate
            userIncomeSlab: 30
        });
        expect(result.taxPayable).toBe(30000); // 30% of 1L
        expect(result.taxType).toBe('Short Term');
    });

    // --- REAL ESTATE TESTS ---
    it('should calculate Real Estate LTCG correctly (12.5% No Indexation)', () => {
        // Profit 10L, > 24 months
        // Tax = 12.5% of 10L = 1,25,000
        const result = calculateCapitalGains({
            assetType: 'RealEstate',
            purchasePrice: 5000000,
            salePrice: 6000000,
            holdingPeriodMonths: 25,
            userIncomeSlab: 30
        });
        expect(result.capitalGain).toBe(1000000);
        expect(result.taxPayable).toBe(125000);
        expect(result.taxType).toBe('Long Term');
    });

    it('should calculate Real Estate STCG correctly (Slab Rate)', () => {
        // Profit 1L, < 24 months, Slab 20%
        const result = calculateCapitalGains({
            assetType: 'RealEstate',
            purchasePrice: 1000000,
            salePrice: 1100000,
            holdingPeriodMonths: 12,
            userIncomeSlab: 20
        });
        expect(result.taxPayable).toBe(20000); // 20% of 1L
        expect(result.taxType).toBe('Short Term');
    });

});
