
/**
 * Formats a number as Indian Currency (e.g., ₹ 1,20,000)
 */
export const formatCurrency = (amount: number, maximumFractionDigits: number = 0) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits,
    }).format(amount);
};

/**
 * Formats a number into Indian Compact notation (e.g., 1.2 L, 5.0 Cr)
 */
export const formatIndianNumberCompact = (number: number): string => {
    const val = Math.abs(number);
    if (val >= 10000000) {
        return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
        return `₹ ${(val / 100000).toFixed(2)} L`;
    } else if (val >= 1000) {
        return `₹ ${(val / 1000).toFixed(1)} K`;
    } else {
        return formatCurrency(number);
    }
};
