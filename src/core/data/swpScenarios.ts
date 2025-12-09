export interface SwpScenario {
    slug: string;
    totalInvestment: number;
    withdrawalAmount: number;
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const swpScenarios: SwpScenario[] = [
    {
        slug: 'swp-from-50-lakhs',
        totalInvestment: 5000000,
        withdrawalAmount: 30000, // Reasonable withdrawal for 50L
        metaTitle: 'SWP from 50 Lakhs Investment - Monthly Income',
        metaDescription: 'Calculate monthly pension from ₹50 Lakhs corpus using SWP. How long will 50 Lakhs last?',
        content: {
            title: 'Monthly Income from ₹50 Lakh Investment',
            description: 'Retiring with ₹50 Lakhs? Use our SWP calculator to plan a sustainable monthly withdrawal that keeps your capital growing.'
        }
    },
    {
        slug: 'monthly-pension-from-1-crore',
        totalInvestment: 10000000,
        withdrawalAmount: 60000,
        metaTitle: 'Monthly Pension from 1 Crore Investment (SWP)',
        metaDescription: 'Plan your retirement with 1 Crore corpus. Calculate safe monthly withdrawal rate (SWP) from 1 Crore.',
        content: {
            title: 'Retirement Plan: 1 Crore Corpus',
            description: 'A corpus of ₹1 Crore can provide a comfortable retirement. Calculate your ideal monthly pension using Systematic Withdrawal Plan.'
        }
    },
    {
        slug: 'swp-for-25000-monthly-pension',
        totalInvestment: 4000000, // Estimated corpus needed
        withdrawalAmount: 25000,
        metaTitle: 'SWP Calculator for 25000 Monthly Pension',
        metaDescription: 'How much investment is needed for 25k monthly pension? Calculate SWP for regular income.',
        content: {
            title: 'Generate ₹25,000 Monthly Pension',
            description: 'Need ₹25,000 per month? See how long your investment will last or check if your corpus is sufficient for this withdrawal rate.'
        }
    }
];
