export type AssetType = 'Equity' | 'DebtFund' | 'RealEstate' | 'Gold' | 'FD';

export interface CapitalGainsInput {
    assetType: AssetType;
    purchasePrice: number;
    salePrice: number;
    holdingPeriodMonths: number;
    userIncomeSlab: number; // e.g., 30 for 30%
}

export interface CapitalGainsResult {
    capitalGain: number;
    taxPayable: number;
    postTaxProfit: number;
    taxType: 'Short Term' | 'Long Term';
    taxRateApplied: string;
    exemptionApplied: number;
}

export const calculateCapitalGains = (input: CapitalGainsInput): CapitalGainsResult => {
    const { assetType, purchasePrice, salePrice, holdingPeriodMonths, userIncomeSlab } = input;

    const capitalGain = salePrice - purchasePrice;

    // If loss, no tax
    if (capitalGain <= 0) {
        return {
            capitalGain,
            taxPayable: 0,
            postTaxProfit: capitalGain,
            taxType: 'Short Term', // Default
            taxRateApplied: '0% (Loss)',
            exemptionApplied: 0
        };
    }

    let taxPayable = 0;
    let taxType: 'Short Term' | 'Long Term' = 'Short Term';
    let taxRateApplied = '';
    let exemptionApplied = 0;

    switch (assetType) {
        case 'Equity':
            if (holdingPeriodMonths < 12) {
                // STCG
                taxType = 'Short Term';
                taxPayable = capitalGain * 0.20;
                taxRateApplied = '20% (STCG)';
            } else {
                // LTCG
                taxType = 'Long Term';
                const taxableAmount = Math.max(0, capitalGain - 125000);
                exemptionApplied = capitalGain - taxableAmount;
                taxPayable = taxableAmount * 0.125;
                taxRateApplied = '12.5% (LTCG above ₹1.25L)';
            }
            break;

        case 'DebtFund':
        case 'FD':
            // Always taxed at slab rate
            taxType = 'Short Term'; // Technically treated as income
            taxPayable = capitalGain * (userIncomeSlab / 100);
            taxRateApplied = `${userIncomeSlab}% (Slab Rate)`;
            break;

        case 'RealEstate':
        case 'Gold':
            if (holdingPeriodMonths < 24) {
                // STCG - Slab Rate
                taxType = 'Short Term';
                taxPayable = capitalGain * (userIncomeSlab / 100);
                taxRateApplied = `${userIncomeSlab}% (Slab Rate)`;
            } else {
                // LTCG - 12.5% without indexation (New Rule FY 25-26)
                taxType = 'Long Term';
                taxPayable = capitalGain * 0.125;
                taxRateApplied = '12.5% (LTCG)';
            }
            break;
    }

    // Rounding
    taxPayable = Math.round(taxPayable);
    const postTaxProfit = Math.round(capitalGain - taxPayable);

    return {
        capitalGain,
        taxPayable,
        postTaxProfit,
        taxType,
        taxRateApplied,
        exemptionApplied
    };
};
