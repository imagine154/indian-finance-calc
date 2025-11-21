import { compareTaxRegimes, TaxInput } from './tax';

export interface SalaryInput {
    ctc: number;
    basicPercentage: number; // e.g., 50

    // Deductions / Retirals
    vpfAmount: number; // Monthly
    professionalTax: number; // Monthly
    foodCoupon: number; // Monthly
    superAnnuation: number; // Annual (Replaces Bonus as the pre-calc deduction)
    npsEmployer: number; // Annual (Corporate NPS)

    isMetro: boolean; // True = 50% HRA, False = 40% HRA
    taxRegime: 'Old' | 'New';
}

export interface SalaryResult {
    monthly: {
        basic: number;
        hra: number;
        special: number;
        grossCash: number;

        pfEmployee: number;
        vpf: number;
        professionalTax: number;
        tax: number;
        totalDeductions: number;

        netInHand: number;
    };
    annual: {
        ctc: number;
        basic: number;
        hra: number;
        special: number;
        foodCoupon: number;
        npsEmployer: number;
        employerPF: number;
        superAnnuation: number;

        grossTaxableSalary: number;
        totalTax: number;
    };
}

export function calculateSalaryBreakdown(input: SalaryInput): SalaryResult {
    const {
        ctc,
        basicPercentage,
        vpfAmount,
        professionalTax,
        foodCoupon,
        superAnnuation,
        npsEmployer,
        isMetro,
        taxRegime
    } = input;

    // 1. Calculate Components (Annual)
    // CTC = Basic + HRA + Special + EmpPF + NPS_Emp + SuperAnn + FoodCoupon
    // We derive Special as the balancing figure.

    // Basic is calculated on (CTC - SuperAnnuation) to maintain the "inplace of bonus" logic
    // assuming SuperAnnuation is excluded from the base for Basic split.
    const annualBasic = (ctc - superAnnuation) * (basicPercentage / 100);
    const annualHRA = annualBasic * (isMetro ? 0.50 : 0.40); // 50% for Metro, 40% for Non-Metro

    // Employer PF
    // 12% of Basic. Uncapped as per requirement to remove cap option.
    const annualEmployerPF = annualBasic * 0.12;

    const annualFoodCoupon = foodCoupon * 12;

    // Special Allowance = Balancing Figure
    // CTC = Basic + HRA + Special + EmpPF + NPS_Emp + SuperAnn + FoodCoupon
    const annualSpecial = Math.max(0, ctc - (annualBasic + annualHRA + annualEmployerPF + npsEmployer + superAnnuation + annualFoodCoupon));

    // 2. Calculate Gross Salary for Tax
    // Gross Salary for tax includes Basic, HRA, Special, NPS Employer.
    // Food Coupon is assumed exempt or not part of taxable cash for this calculation context if handled as allowance.
    // However, usually Food Coupon is part of Gross and then exempted. 
    // For simplicity and standard "In-Hand" calc, we exclude it from Taxable Gross if it's a coupon.

    const grossSalaryForTax = annualBasic + annualHRA + annualSpecial + npsEmployer;

    // 3. Calculate Deductions for Tax Engine
    // Employee PF = 12% of Basic (Uncapped)
    const annualEmployeePF = annualBasic * 0.12;

    const annualVPF = vpfAmount * 12;
    const section80C = annualEmployeePF + annualVPF;

    const annualProfessionalTax = professionalTax * 12;

    // 4. Calculate Tax
    const taxInput: TaxInput = {
        grossSalary: grossSalaryForTax,
        npsEmployer80CCD2: npsEmployer,
        section80C: section80C,
        otherDeductions: annualProfessionalTax,
    };

    const taxResult = compareTaxRegimes(taxInput);
    const totalTax = taxRegime === 'Old' ? taxResult.oldRegime.totalTaxPayable : taxResult.newRegime.totalTaxPayable;

    // 5. Monthly In-Hand Calculation
    const monthlyBasic = annualBasic / 12;
    const monthlyHRA = annualHRA / 12;
    const monthlySpecial = annualSpecial / 12;
    const monthlyGrossCash = monthlyBasic + monthlyHRA + monthlySpecial;

    // Monthly Deductions
    const monthlyEmployeePF = annualEmployeePF / 12;
    const monthlyTax = totalTax / 12;

    const monthlyTotalDeductions = monthlyEmployeePF + vpfAmount + professionalTax + monthlyTax;

    const netInHand = monthlyGrossCash - monthlyTotalDeductions;

    return {
        monthly: {
            basic: monthlyBasic,
            hra: monthlyHRA,
            special: monthlySpecial,
            grossCash: monthlyGrossCash,
            pfEmployee: monthlyEmployeePF,
            vpf: vpfAmount,
            professionalTax: professionalTax,
            tax: monthlyTax,
            totalDeductions: monthlyTotalDeductions,
            netInHand
        },
        annual: {
            ctc,
            basic: annualBasic,
            hra: annualHRA,
            special: annualSpecial,
            foodCoupon: annualFoodCoupon,
            npsEmployer,
            employerPF: annualEmployerPF,
            superAnnuation,
            grossTaxableSalary: grossSalaryForTax,
            totalTax
        }
    };
}
