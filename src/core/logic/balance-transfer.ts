export interface BalanceTransferInput {
    outstandingPrincipal: number;
    existingRate: number;
    newRate: number;
    remainingTenure: number; // in years
    processingFee: number;
    processingFeeType: 'percentage' | 'flat';
}

export interface BalanceTransferResult {
    oldEMI: number;
    newEMI: number;
    totalInterestOld: number;
    totalInterestNew: number;
    totalAmountOld: number;
    totalAmountNew: number;
    processingFeeAmount: number;
    totalSavings: number;
    breakEvenMonths: number;
    isProfitable: boolean;
}

export const calculateBalanceTransfer = (input: BalanceTransferInput): BalanceTransferResult => {
    const {
        outstandingPrincipal,
        existingRate,
        newRate,
        remainingTenure,
        processingFee,
        processingFeeType,
    } = input;

    const tenureMonths = remainingTenure * 12;

    // Helper to calculate EMI
    const calculateEMI = (principal: number, rate: number, months: number) => {
        if (rate === 0) return principal / months;
        const r = rate / 12 / 100;
        return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    };

    const oldEMI = calculateEMI(outstandingPrincipal, existingRate, tenureMonths);
    const newEMI = calculateEMI(outstandingPrincipal, newRate, tenureMonths);

    const totalAmountOld = oldEMI * tenureMonths;
    const totalAmountNew = newEMI * tenureMonths;

    const totalInterestOld = totalAmountOld - outstandingPrincipal;
    const totalInterestNew = totalAmountNew - outstandingPrincipal;

    let processingFeeAmount = 0;
    if (processingFeeType === 'percentage') {
        processingFeeAmount = (outstandingPrincipal * processingFee) / 100;
    } else {
        processingFeeAmount = processingFee;
    }

    // Savings calculation
    // Gross Savings = Total Amount Old - Total Amount New
    // Net Savings = Gross Savings - Processing Fee
    const grossSavings = totalAmountOld - totalAmountNew;
    const totalSavings = grossSavings - processingFeeAmount;

    const isProfitable = totalSavings > 0;

    // Break Even Point
    // Monthly Savings = Old EMI - New EMI
    // Break Even Months = Processing Fee / Monthly Savings
    const monthlySavings = oldEMI - newEMI;
    let breakEvenMonths = 0;
    if (monthlySavings > 0) {
        breakEvenMonths = Math.ceil(processingFeeAmount / monthlySavings);
    } else {
        breakEvenMonths = -1; // Never breaks even if new EMI is higher (which shouldn't happen if rate is lower)
    }

    return {
        oldEMI,
        newEMI,
        totalInterestOld,
        totalInterestNew,
        totalAmountOld,
        totalAmountNew,
        processingFeeAmount,
        totalSavings,
        breakEvenMonths,
        isProfitable,
    };
};
