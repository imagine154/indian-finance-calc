export interface FdScenario {
    slug: string;
    investmentAmount: number;
    interestRate: number;
    duration: number; // Years
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const fdScenarios: FdScenario[] = [
    {
        slug: 'interest-on-1-lakh-fd',
        investmentAmount: 100000,
        interestRate: 7.0, // Standard assumption
        duration: 1,
        metaTitle: 'Interest on 1 Lakh FD - Calculator (Monthly/Yearly)',
        metaDescription: 'Calculate interest on 1 Lakh FD for 1 year. Check maturity amount and monthly interest payout for standard bank rates.',
        content: {
            title: 'Interest on 1 Lakh Fixed Deposit',
            description: 'Planning to invest ₹1 Lakh in an FD? See how much interest you can earn in a year at current bank rates. Compare monthly vs quarterly compounding.'
        }
    },
    {
        slug: 'monthly-interest-on-10-lakh-fd',
        investmentAmount: 1000000,
        interestRate: 7.5, // Slightly higher for senior citizens often associated with this amount
        duration: 5,
        metaTitle: 'Monthly Interest on 10 Lakh FD Calculator',
        metaDescription: 'Calculate monthly interest income on 10 Lakh Fixed Deposit. Ideal for retirees planning regular income from FD interest.',
        content: {
            title: 'Monthly Interest Payout for 10 Lakh FD',
            description: 'For retirees or those seeking passive income, a 10 Lakh FD can generate significant monthly interest. Calculate your exact monthly payout here.'
        }
    },
    {
        slug: 'interest-on-5-lakh-fd-for-5-years',
        investmentAmount: 500000,
        interestRate: 7.25,
        duration: 5,
        metaTitle: 'Interest on 5 Lakh FD for 5 Years - Tax Saver?',
        metaDescription: 'Calculate maturity amount for 5 Lakh FD invested for 5 years. Check returns for Tax Saving FDs vs Regular FDs.',
        content: {
            title: '5 Lakh FD for 5 Years: Returns Calculator',
            description: 'Investing 5 Lakhs for 5 years matches the lock-in for Tax Saver FDs. Calculate your maturity amount and total interest earned over this tenure.'
        }
    },
    {
        slug: 'interest-on-2-crore-fd',
        investmentAmount: 20000000,
        interestRate: 7.0,
        duration: 1,
        metaTitle: 'Interest on 2 Crore FD - High Value Deposit Calculator',
        metaDescription: 'Calculate interest income on 2 Crore Fixed Deposit. Understand TDS implications and bulk deposit rates.',
        content: {
            title: 'Interest on 2 Crore Bulk Deposit',
            description: 'Deposits above 2 Crores often qualify as bulk deposits with different interest rates. Calculate the massive interest potential of a ₹2 Crore FD.'
        }
    },
    {
        slug: 'interest-on-50000-fd',
        investmentAmount: 50000,
        interestRate: 6.8,
        duration: 1,
        metaTitle: 'Interest on 50000 FD - Small Savings Calculator',
        metaDescription: 'Check returns on ₹50,000 Fixed Deposit. Ideal for beginners starting their savings journey.',
        content: {
            title: 'Returns on ₹50,000 Fixed Deposit',
            description: 'Starting small? A ₹50,000 FD is a great way to secure your savings. Calculate how much your money will grow in one year.'
        }
    },
    {
        slug: 'monthly-interest-on-5-lakh-fd',
        investmentAmount: 500000,
        interestRate: 7.0,
        duration: 3,
        metaTitle: 'Monthly Interest on 5 Lakh FD Calculator',
        metaDescription: 'How much monthly interest does 5 Lakh FD give? Calculate monthly payout for 3 years tenure.',
        content: {
            title: 'Monthly Income from 5 Lakh FD',
            description: 'Need a steady income stream? Find out the monthly interest payout you can expect from a ₹5 Lakh Fixed Deposit investment.'
        }
    }
];
