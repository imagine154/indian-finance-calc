export type GstRate = 5 | 18 | 40;
export type GstType = 'Exclusive' | 'Inclusive';

export interface GstInput {
    amount: number;
    rate: number; // Can be custom, so number instead of GstRate union for flexibility, but UI will guide standard rates
    type: GstType;
}

export interface GstResult {
    netPrice: number;
    gstAmount: number;
    totalAmount: number;
    cgst: number;
    sgst: number;
}

export function calculateGST(input: GstInput): GstResult {
    const { amount, rate, type } = input;

    let netPrice = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    if (type === 'Exclusive') {
        gstAmount = amount * (rate / 100);
        totalAmount = amount + gstAmount;
        netPrice = amount;
    } else {
        // Inclusive
        netPrice = amount / (1 + rate / 100);
        gstAmount = amount - netPrice;
        totalAmount = amount;
    }

    return {
        netPrice,
        gstAmount,
        totalAmount,
        cgst: gstAmount / 2,
        sgst: gstAmount / 2,
    };
}
