export interface PositionSizeInput {
    accountCapital: number;
    riskPercentage: number;
    entryPrice: number;
    stopLossPrice: number;
}

export interface PositionSizeResult {
    quantity: number;
    totalRiskAmount: number;
    capitalRequired: number;
    riskPerShare: number;
}

export const calculatePositionSize = (input: PositionSizeInput): PositionSizeResult => {
    const { accountCapital, riskPercentage, entryPrice, stopLossPrice } = input;

    // Basic validation to prevent division by zero or negative values
    if (entryPrice <= 0 || stopLossPrice <= 0 || accountCapital <= 0) {
        return {
            quantity: 0,
            totalRiskAmount: 0,
            capitalRequired: 0,
            riskPerShare: 0,
        };
    }

    const riskPerShare = Math.abs(entryPrice - stopLossPrice);

    // Prevent division by zero if entry and stop loss are same
    if (riskPerShare === 0) {
        return {
            quantity: 0,
            totalRiskAmount: 0,
            capitalRequired: 0,
            riskPerShare: 0,
        };
    }

    const totalRiskAmount = accountCapital * (riskPercentage / 100);
    const quantity = Math.floor(totalRiskAmount / riskPerShare);
    const capitalRequired = quantity * entryPrice;

    return {
        quantity,
        totalRiskAmount,
        capitalRequired,
        riskPerShare,
    };
};
