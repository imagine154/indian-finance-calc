export interface HomeLoanScenario {
    slug: string;
    loanAmount: number;
    tenure: number; // Years
    interestRate?: number; // Optional default
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const homeLoanScenarios: HomeLoanScenario[] = [
    {
        slug: '30-lakh-home-loan-emi-20-years',
        loanAmount: 3000000,
        tenure: 20,
        interestRate: 8.5,
        metaTitle: '30 Lakh Home Loan EMI for 20 Years - Calculator',
        metaDescription: 'Calculate EMI for a 30 Lakh home loan for 20 years. Check affordability, total interest payable, and amortization schedule.',
        content: {
            title: '30 Lakh Home Loan EMI: 20 Years Tenure',
            description: 'Planning to buy a budget home? A 30 Lakh loan is a common starting point in Tier-2 cities. Use this calculator to see your monthly EMI commitment for a 20-year tenure.'
        }
    },
    {
        slug: '75-lakh-home-loan-emi',
        loanAmount: 7500000,
        tenure: 20, // Defaulting to 20 years if not specified in slug, but common for this amount
        interestRate: 8.5,
        metaTitle: '75 Lakh Home Loan EMI Calculator - Interest & Schedule',
        metaDescription: 'Buying a premium apartment? Calculate EMI for a 75 Lakh home loan. See how tenure changes impact your monthly outflow.',
        content: {
            title: '75 Lakh Home Loan EMI Calculator',
            description: 'For a standard 2BHK or 3BHK in metro cities, a 75 Lakh loan is typical. Calculate your EMI and total interest burden before approaching the bank.'
        }
    },
    {
        slug: '1-crore-home-loan-emi',
        loanAmount: 10000000,
        tenure: 20,
        interestRate: 8.5,
        metaTitle: '1 Crore Home Loan EMI Calculator - Luxury Home Planning',
        metaDescription: 'Planning for a luxury home? Check monthly EMI for a 1 Crore home loan. Analyze amortization and total repayment amount.',
        content: {
            title: '1 Crore Home Loan EMI Analysis',
            description: 'A 1 Crore loan is a significant financial commitment. Use this tool to understand the monthly EMI requirement and plan your budget for your dream luxury home.'
        }
    },
    {
        slug: '50-lakh-home-loan-emi-15-years',
        loanAmount: 5000000,
        tenure: 15,
        interestRate: 8.5,
        metaTitle: '50 Lakh Home Loan EMI for 15 Years',
        metaDescription: 'Calculate EMI for 50 Lakhs loan for 15 years tenure. Save on interest by choosing a shorter duration.',
        content: {
            title: '50 Lakh Loan: 15 Years vs 20 Years',
            description: 'Opting for a 15-year tenure instead of 20 can save you a lot of interest. Calculate the EMI for a 50 Lakh loan and compare the costs.'
        }
    },
    {
        slug: '25-lakh-home-loan-emi',
        loanAmount: 2500000,
        tenure: 20,
        interestRate: 9.0, // Affordable housing rates might differ slightly, checking general
        metaTitle: '25 Lakh Home Loan EMI Calculator',
        metaDescription: 'Affordable housing loan EMI calculator. Check monthly payments for a 25 Lakh rupee loan.',
        content: {
            title: '25 Lakh Home Loan EMI',
            description: 'Apply for PMAY or affordable housing? Calculate your EMI for a 25 Lakh loan to plan your monthly budget effectively.'
        }
    },
    {
        slug: '40-lakh-home-loan-emi-20-years',
        loanAmount: 4000000,
        tenure: 20,
        interestRate: 8.5,
        metaTitle: '40 Lakh Home Loan EMI Calculator (20 Years)',
        metaDescription: 'Find out the EMI for a 40 Lakh home loan for 20 years. Plan your repayment schedule.',
        content: {
            title: '40 Lakh Home Loan EMI Calculation',
            description: 'A 40 Lakh loan is common for starter homes. Check your EMI for a 20-year tenure and plan your pre-payments to close the loan faster.'
        }
    }
];
