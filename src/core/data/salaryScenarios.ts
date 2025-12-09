export interface SalaryScenario {
    slug: string;
    ctc: number; // Annual CTC
    isMetro: boolean; // For HRA Calculation (True = 50%, False = 40%)
    city: string;
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const salaryScenarios: SalaryScenario[] = [
    {
        slug: '12-lpa-in-bangalore',
        ctc: 1200000,
        isMetro: false, // Bangalore is Non-Metro for HRA (40%)
        city: 'Bangalore',
        metaTitle: 'In-hand Salary Calculator for 12 LPA in Bangalore',
        metaDescription: 'Calculate your monthly in-hand salary for a 12 LPA package in Bangalore. Check tax deductions, PF, and take-home pay under New vs Old Regime.',
        content: {
            title: '12 LPA Salary in Bangalore: In-Hand Calculation',
            description: 'Earning 12 LPA in Bangalore? Understand your salary structure including HRA (40% for Bangalore), PF deductions, and income tax liability. See exactly how much hits your bank account monthly.'
        }
    },
    {
        slug: '20-lpa-in-mumbai',
        ctc: 2000000,
        isMetro: true, // Mumbai is Metro for HRA (50%)
        city: 'Mumbai',
        metaTitle: '20 LPA In-hand Salary in Mumbai - Tax & Deductions',
        metaDescription: 'Got a 20 LPA offer in Mumbai? Calculate your monthly take-home salary with 50% HRA benefit. accurate breakdown of taxes and PF.',
        content: {
            title: '20 LPA Salary Breakdown for Mumbai',
            description: 'Mumbai is a Metro city eligible for 50% HRA exemption. This calculator provides a detailed breakdown of a 20 LPA salary package, helping you plan your finances in the financial capital.'
        }
    },
    {
        slug: '15-lpa-in-delhi',
        ctc: 1500000,
        isMetro: true, // Delhi is Metro (50%)
        city: 'Delhi',
        metaTitle: '15 LPA Salary Calculator Delhi - In-Hand & Tax',
        metaDescription: 'Calculate monthly in-hand salary for 15 Lakhs package in Delhi. Includes 50% HRA tax exemption benefits and New Tax Regime calculations.',
        content: {
            title: '15 LPA In-Hand Salary in Delhi',
            description: 'Living in Delhi offers the advantage of 50% HRA exemption. Calculate your exact take-home pay from a 15 LPA CTC, accounting for the latest income tax slabs.'
        }
    },
    {
        slug: '8-lpa-in-pune',
        ctc: 800000,
        isMetro: false, // Pune is Non-Metro (40%)
        city: 'Pune',
        metaTitle: '8 LPA In-hand Salary Calculator Pune',
        metaDescription: 'Starting with 8 LPA in Pune? Check your monthly take-home salary. Zero tax under New Regime for income up to 7 Lakhs (with margin relief/rebate checks for 8L).',
        content: {
            title: '8 LPA Salary Calculator for Pune',
            description: 'An 8 LPA package in Pune is a great start. Calculate your monthly earnings after PF and Professional Tax deductions. Note that Pune is classified as non-metro (40% HRA) for tax purposes.'
        }
    },
    {
        slug: '30-lpa-in-hyderabad',
        ctc: 3000000,
        isMetro: false, // Hyderabad is Non-Metro (40%)
        city: 'Hyderabad',
        metaTitle: '30 LPA In-hand Salary Calculator Hyderabad',
        metaDescription: 'Calculate tax liability and in-hand salary for a 30 LPA high-income package in Hyderabad. Compare Old vs New Tax Regime savings.',
        content: {
            title: '30 LPA Salary Breakdown: Hyderabad Edition',
            description: 'For a high CTC like 30 LPA in Hyderabad, tax planning becomes crucial. Ensure you understand the impact of the 40% HRA limit and compare tax regimes to maximize your in-hand pay.'
        }
    },
    {
        slug: '6-lpa-in-chennai',
        ctc: 600000,
        isMetro: true, // Chennai is Metro (50%)
        city: 'Chennai',
        metaTitle: '6 LPA In-hand Salary Calculator Chennai',
        metaDescription: 'Calculate monthly salary for 6 LPA in Chennai. Enjoy zero income tax rebate benefits under the New Tax Regime.',
        content: {
            title: '6 LPA Salary in Chennai: Tax Free?',
            description: 'With a 6 LPA package in Chennai, your tax liability is likely zero under the New Tax Regime rebate. Calculate your exact in-hand salary after PF deductions.'
        }
    }
];
