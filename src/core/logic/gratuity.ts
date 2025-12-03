export interface GratuityResult {
    totalGratuity: number;
    exemptAmount: number;
    taxableAmount: number;
    isEligible: boolean;
}

export interface GratuityInput {
    basicSalary: number; // Monthly Basic + DA
    yearsOfService: number;
    isCoveredByAct: boolean;
}

export const calculateGratuity = (input: GratuityInput): GratuityResult => {
    const { basicSalary, yearsOfService, isCoveredByAct } = input;

    // Eligibility check: Generally 5 years, but we calculate anyway and just flag it
    const isEligible = yearsOfService >= 5;

    let gratuityAmount = 0;

    if (isCoveredByAct) {
        // Formula: (15 * last drawn salary * years of service) / 26
        gratuityAmount = (15 * basicSalary * yearsOfService) / 26;
    } else {
        // Formula: (15 * last drawn salary * years of service) / 30
        gratuityAmount = (15 * basicSalary * yearsOfService) / 30;
    }

    // Round to 2 decimal places
    gratuityAmount = Math.round(gratuityAmount * 100) / 100;

    // Tax Exemption Limit: ₹20 Lakhs
    const MAX_TAX_FREE_LIMIT = 2000000;
    const exemptAmount = Math.min(gratuityAmount, MAX_TAX_FREE_LIMIT);
    const taxableAmount = Math.max(0, gratuityAmount - exemptAmount);

    return {
        totalGratuity: gratuityAmount,
        exemptAmount,
        taxableAmount,
        isEligible
    };
};
