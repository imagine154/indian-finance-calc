/**
 * Indian Income Tax Calculator Engine - FY 2025-26 (AY 2026-27)
 * Supports: Income Sources, House Property (Let Out vs Self), Crypto, NPS 80CCD(2)
 */

export interface TaxInput {
    // --- Income Sources ---
    grossSalary: number;
    interestIncome?: number;       // Savings/FD Interest
    rentalIncome?: number;         // Rent received from Let Out property
    digitalAssetsIncome?: number;  // Crypto/NFTs (Flat 30% Tax)
    otherIncome?: number;          // Freelance, Dividends, etc.

    // --- Deductions (House Property) ---
    homeLoanSelfOccupied?: number; // Interest on Self Occupied (Max 2L Old Regime)
    homeLoanLetOut?: number;       // Interest on Let Out Property

    // --- Exemptions (Old Regime) ---
    hraExemption?: number;
    ltaExemption?: number;

    // --- Deductions (Shared) ---
    npsEmployer80CCD2?: number;    // Allowed in BOTH Regimes

    // --- Deductions (Old Regime Only) ---
    section80C?: number;
    section80D?: number;
    section80CCD1B?: number;       // Self contribution NPS (50k)
    section80G?: number;
    section80E?: number;
    otherDeductions?: number;
}
export interface TaxSlabItem {
    range: string;
    rate: number;
    amount: number;
}

export interface TaxCalculationDetail {
    regime: 'Old' | 'New';
    grossTotalIncome: number;      // Sum of all income heads (before deductions)
    housePropertyIncome: number;   // Can be negative (Loss)
    deductions: number;            // Total deductions
    taxableSlabIncome: number;     // Income subject to slab rates
    taxableSpecialIncome: number;  // Income subject to special rates (Crypto)

    taxFromSlabs: number;
    taxFromSpecial: number;        // Crypto Tax

    rebate87A: number;
    taxAfterRebate: number;
    surcharge: number;
    cess: number;
    totalTaxPayable: number;
    effectiveTaxRate: number;
    slabBreakdown: TaxSlabItem[];
}

export interface TaxComparisonResult {
    oldRegime: TaxCalculationDetail;
    newRegime: TaxCalculationDetail;
    recommendation: {
        betterRegime: 'Old' | 'New';
        savingsAmount: number;
        reason: string;
    };
}

// --- CONSTANTS ---
const STANDARD_DEDUCTION_NEW = 75000;
const STANDARD_DEDUCTION_OLD = 50000;
const CESS_RATE = 0.04;

const OLD_REGIME_SLABS = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
];

const NEW_REGIME_SLABS = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 5 },
    { min: 800000, max: 1200000, rate: 10 },
    { min: 1200000, max: 1600000, rate: 15 },
    { min: 1600000, max: 2000000, rate: 20 },
    { min: 2000000, max: 2400000, rate: 25 },
    { min: 2400000, max: Infinity, rate: 30 },
];

// --- HELPER: Slab Calculator ---
function calculateSlabTax(taxableIncome: number, slabs: typeof OLD_REGIME_SLABS) {
    let remaining = taxableIncome;
    let tax = 0;
    const breakdown = [];

    for (const slab of slabs) {
        if (remaining <= 0) break;
        const slabWidth = slab.max - slab.min;
        const taxableInSlab = Math.min(Math.max(0, taxableIncome - slab.min), slabWidth);

        if (taxableInSlab > 0) {
            const taxInSlab = taxableInSlab * (slab.rate / 100);
            tax += taxInSlab;
            breakdown.push({
                range: slab.max === Infinity ? `> ${(slab.min / 100000).toFixed(1)}L` : `${(slab.min / 100000).toFixed(1)}L-${(slab.max / 100000).toFixed(1)}L`,
                rate: slab.rate,
                amount: Math.round(taxInSlab)
            });
        }
    }
    return { tax, breakdown };
}

// --- MAIN ENGINE ---
function calculateEngine(input: TaxInput, regime: 'Old' | 'New'): TaxCalculationDetail {

    // --- 1. HOUSE PROPERTY CALCULATION ---
    // Logic: Rent - 30% Std Ded - Interest
    let hpIncome = 0;

    // A. Let Out Property (Rent - 30% - Interest)
    if (input.rentalIncome && input.rentalIncome > 0) {
        const netRent = input.rentalIncome * 0.7; // 30% Standard Deduction
        hpIncome += (netRent - (input.homeLoanLetOut || 0));
    }

    // B. Self Occupied Property (Interest Deduction)
    // Old Regime: Loss allowed up to 2L. New Regime: 0.
    if (regime === 'Old') {
        const selfOccInterest = Math.min(input.homeLoanSelfOccupied || 0, 200000);
        hpIncome -= selfOccInterest;
    }

    // C. Set-off Rules
    // Old Regime: Loss can be set off against Salary up to ₹2L.
    // New Regime: Loss CANNOT be set off against Salary.
    if (hpIncome < 0) {
        if (regime === 'Old') {
            hpIncome = Math.max(hpIncome, -200000); // Cap loss at 2L
        } else {
            hpIncome = 0; // New Regime doesn't allow set-off
        }
    }

    // --- 2. OTHER SOURCES ---
    const incomeFromOther = (input.interestIncome || 0) + (input.otherIncome || 0);

    // Special: Crypto (Digital Assets) - Flat 30%
    const cryptoIncome = input.digitalAssetsIncome || 0;

    // --- 3. DEDUCTIONS ---
    let standardDeduction = regime === 'Old' ? STANDARD_DEDUCTION_OLD : STANDARD_DEDUCTION_NEW;
    let totalDeductions = standardDeduction;

    // NPS 80CCD(2) (Employer) - Allowed in BOTH
    if (input.npsEmployer80CCD2) {
        totalDeductions += input.npsEmployer80CCD2;
    }

    // Old Regime Specifics
    if (regime === 'Old') {
        const exemptions = (input.hraExemption || 0) + (input.ltaExemption || 0);
        // We subtract exemptions directly from Gross Salary usually, but here we add to "Deductions" for simple math flow
        totalDeductions += exemptions;

        totalDeductions += (input.section80C || 0) +
            (input.section80D || 0) +
            (input.section80CCD1B || 0) + // Self NPS
            (input.section80G || 0) +
            (input.section80E || 0) +
            (input.otherDeductions || 0);
    }

    // --- 4. TAXABLE INCOME ---
    // Gross Total = Salary + HP + Other + Crypto
    const grossTotalIncome = input.grossSalary + incomeFromOther + cryptoIncome + Math.max(0, hpIncome); // If HP is positive

    // Slab Income = (Salary + Other + HP) - Deductions
    // Note: Crypto is NOT reduced by deductions.
    let taxableSlabIncome = (input.grossSalary + incomeFromOther + hpIncome) - totalDeductions;
    taxableSlabIncome = Math.max(0, taxableSlabIncome);

    // --- 5. TAX CALCULATION ---
    const slabs = regime === 'Old' ? OLD_REGIME_SLABS : NEW_REGIME_SLABS;
    const { tax: taxFromSlabs, breakdown } = calculateSlabTax(taxableSlabIncome, slabs);

    // Special Tax: Crypto (30% Flat)
    const taxFromCrypto = cryptoIncome * 0.30;

    let totalTaxBeforeRebate = taxFromSlabs + taxFromCrypto;

    // --- 6. REBATE 87A ---
    // Rebate applies to TOTAL tax, provided Total Income is within limits.
    // Does Rebate apply to Crypto tax? Generally yes, against total liability.
    let rebate = 0;
    const totalTaxableIncomeForRebate = taxableSlabIncome + cryptoIncome;

    if (regime === 'Old') {
        if (totalTaxableIncomeForRebate <= 500000) {
            rebate = Math.min(totalTaxBeforeRebate, 12500);
        }
    } else {
        if (totalTaxableIncomeForRebate <= 1200000) {
            rebate = Math.min(totalTaxBeforeRebate, 60000); // Full tax rebate
        } else {
            // Marginal Relief (Simple version)
            const excess = totalTaxableIncomeForRebate - 1200000;
            if (totalTaxBeforeRebate > excess) {
                // Reduce tax to match excess income
                rebate = totalTaxBeforeRebate - excess;
            }
        }
    }

    const taxAfterRebate = Math.max(0, totalTaxBeforeRebate - rebate);
    const cess = taxAfterRebate * 0.04;
    const totalTaxPayable = Math.round(taxAfterRebate + cess);

    return {
        regime,
        grossTotalIncome,
        housePropertyIncome: hpIncome,
        deductions: totalDeductions,
        taxableSlabIncome,
        taxableSpecialIncome: cryptoIncome,
        taxFromSlabs,
        taxFromSpecial: taxFromCrypto,
        rebate87A: rebate,
        taxAfterRebate,
        surcharge: 0, // Simplified for brevity
        cess,
        totalTaxPayable,
        effectiveTaxRate: grossTotalIncome > 0 ? (totalTaxPayable / grossTotalIncome) * 100 : 0,
        slabBreakdown: breakdown
    };
}

export function compareTaxRegimes(input: TaxInput): TaxComparisonResult {
    const oldRegime = calculateEngine(input, 'Old');
    const newRegime = calculateEngine(input, 'New');

    const savingsAmount = Math.abs(oldRegime.totalTaxPayable - newRegime.totalTaxPayable);
    const betterRegime = oldRegime.totalTaxPayable < newRegime.totalTaxPayable ? 'Old' : 'New';

    let reason = '';
    if (savingsAmount === 0) reason = "Both regimes result in the same tax.";
    else if (betterRegime === 'New') reason = `New Regime saves ₹${savingsAmount.toLocaleString('en-IN')} due to lower slab rates and Section 87A rebate up to ₹12L.`;
    else reason = `Old Regime saves ₹${savingsAmount.toLocaleString('en-IN')} due to House Property set-off and high deductions.`;

    return { oldRegime, newRegime, recommendation: { betterRegime, savingsAmount, reason } };
}