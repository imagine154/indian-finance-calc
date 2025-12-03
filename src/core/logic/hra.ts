export interface HraInput {
    basicSalary: number;
    da: number;
    hraReceived: number;
    totalRentPaid: number;
    isMetro: boolean;
}

export interface HraResult {
    exemptAmount: number;
    taxableAmount: number;
    breakdown: {
        actualHra: number;
        rentMinusTenPercent: number;
        salaryCap: number;
    };
}

export const calculateHRA = (input: HraInput): HraResult => {
    const { basicSalary, da, hraReceived, totalRentPaid, isMetro } = input;
    const salary = basicSalary + da;

    // Rule 1: Actual HRA Received
    const actualHra = hraReceived;

    // Rule 2: Rent Paid - 10% of Salary
    const rentMinusTenPercent = Math.max(0, totalRentPaid - 0.10 * salary);

    // Rule 3: 50% of Salary (Metro) or 40% of Salary (Non-Metro)
    const salaryCap = isMetro ? 0.50 * salary : 0.40 * salary;

    // Exempt Amount is the least of the above three
    const exemptAmount = Math.min(actualHra, rentMinusTenPercent, salaryCap);

    // Taxable Amount
    const taxableAmount = Math.max(0, hraReceived - exemptAmount);

    return {
        exemptAmount,
        taxableAmount,
        breakdown: {
            actualHra,
            rentMinusTenPercent,
            salaryCap,
        },
    };
};
