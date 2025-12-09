export interface PpfScenario {
    slug: string;
    yearlyInvestment: number;
    duration: number;
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const ppfScenarios: PpfScenario[] = [
    {
        slug: 'ppf-return-on-1.5-lakh-yearly',
        yearlyInvestment: 150000,
        duration: 15,
        metaTitle: 'PPF Return on 1.5 Lakh Yearly Investment',
        metaDescription: 'Calculate maturity amount for full ₹1.5 Lakh annual investment in PPF for 15 years. Tax-free returns calculator.',
        content: {
            title: 'PPF Returns: ₹1.5 Lakh Annual Investment',
            description: 'Maximize your tax savings under Section 80C. See how much a full ₹1.5 Lakh yearly investment grows in a Public Provident Fund over 15 years.'
        }
    },
    {
        slug: 'ppf-return-on-50000-yearly',
        yearlyInvestment: 50000,
        duration: 15,
        metaTitle: 'PPF Return on 50000 Yearly Investment',
        metaDescription: 'Calculate PPF maturity amount for ₹50,000 yearly contribution. Check interest earned over 15 years.',
        content: {
            title: 'PPF Maturity for ₹50,000 Yearly Investment',
            description: 'Building a safe corpus? Calculate the maturity value of investing ₹50,000 every year in PPF at current interest rates.'
        }
    },
    {
        slug: 'ppf-account-for-20-years',
        yearlyInvestment: 100000,
        duration: 20,
        metaTitle: 'PPF Calculator for 20 Years (With Extension)',
        metaDescription: 'Calculate PPF returns if extended to 20 years. The power of compounding with 5-year block extension.',
        content: {
            title: 'PPF 20-Year Calculator (Extended)',
            description: 'Extend your PPF block by 5 years to enjoy the magic of compounding. See the difference between a standard 15-year and an extended 20-year term.'
        }
    }
];
