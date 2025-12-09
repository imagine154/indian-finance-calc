export interface SsyScenario {
    slug: string;
    investmentAmount: number;
    girlAge: number;
    startYear: number;
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const ssyScenarios: SsyScenario[] = [
    {
        slug: 'ssy-maturity-for-1000-per-month',
        investmentAmount: 12000, // 1000 * 12
        girlAge: 0, // Default assumption for new account
        startYear: new Date().getFullYear(),
        metaTitle: 'SSY Maturity Amount for ₹1000 per Month',
        metaDescription: 'Calculate Sukanya Samriddhi Yojana maturity amount for ₹1000 monthly investment. Check total interest and maturity value.',
        content: {
            title: 'SSY Maturity for ₹1,000 Monthly Investment',
            description: 'Start small for her big dreams. See how investing just ₹1,000 per month grows over 21 years in the Sukanya Samriddhi Yojana.'
        }
    },
    {
        slug: 'ssy-maturity-for-1.5-lakh-per-year',
        investmentAmount: 150000,
        girlAge: 0,
        startYear: new Date().getFullYear(),
        metaTitle: 'SSY Maturity Amount for 1.5 Lakh Year (Max Limit)',
        metaDescription: 'Calculate max returns on Sukanya Samriddhi Yojana with ₹1.5 Lakh yearly investment. Tax-free maturity corpus calculator.',
        content: {
            title: 'SSY Max Investment Returns (₹1.5 Lakh/Year)',
            description: 'Maximize your daughter\'s future by investing the full ₹1.5 Lakh limit annually. Calculate the massive tax-free corpus she will receive at maturity.'
        }
    },
    {
        slug: 'ssy-calculator-for-girl-age-5',
        investmentAmount: 50000,
        girlAge: 5,
        startYear: new Date().getFullYear(),
        metaTitle: 'SSY Calculator for 5 Year Old Girl',
        metaDescription: 'Calculate SSY maturity amount if you start investing when your daughter is 5 years old.',
        content: {
            title: 'Sukanya Samriddhi Plan for 5-Year-Old',
            description: 'It\'s never too late to start. If your daughter is 5 today, calculate how the SSY scheme benefits her by the time she turns 21.'
        }
    }
];
