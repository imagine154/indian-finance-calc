export interface SipScenario {
    slug: string;
    targetAmount: number;
    duration: number; // Years
    rate: number; // Expected Annual Return %
    metaTitle: string;
    metaDescription: string;
    content: {
        title: string;
        description: string;
    };
}

export const sipScenarios: SipScenario[] = [
    {
        slug: '1-crore-in-10-years',
        targetAmount: 10000000,
        duration: 10,
        rate: 12,
        metaTitle: 'SIP for 1 Crore in 10 Years Calculator - Plan Your Investment',
        metaDescription: 'Calculate the monthly SIP required to reach ₹1 Crore in 10 years. Start your journey to becoming a Crorepati with our free SIP tool.',
        content: {
            title: 'How to make ₹1 Crore in 10 Years?',
            description: 'Accumulating ₹1 Crore is a dream for many. With disciplined investing and the power of compounding, achieving this goal in 10 years is possible. Use this calculator to see exactly how much you need to invest monthly to hit the 1 Crore mark.'
        }
    },
    {
        slug: '50-lakhs-in-5-years',
        targetAmount: 5000000,
        duration: 5,
        rate: 12,
        metaTitle: 'SIP for 50 Lakhs in 5 Years Calculator',
        metaDescription: 'Want to save ₹50 Lakhs in 5 years? Calculate the required monthly mutual fund investment to achieve your short-term financial goal.',
        content: {
            title: 'Target: ₹50 Lakhs in 5 Years',
            description: 'Saving ₹50 Lakhs in just 5 years requires an aggressive investment strategy. This calculator helps you determine the monthly SIP amount needed to reach this substantial corpus in a short timeframe.'
        }
    },
    {
        slug: '2-crores-in-15-years',
        targetAmount: 20000000,
        duration: 15,
        rate: 12,
        metaTitle: 'Monthly SIP to get ₹2 Crores - Financial Planning Tool',
        metaDescription: 'Find out the monthly SIP needed to build a wealth of ₹2 Crores in 15 years. Plan your retirement or long-term wealth creation today.',
        content: {
            title: 'Building a Corpus of ₹2 Crores',
            description: 'Aiming for ₹2 Crores? Long-term equity investing is the best way to get there. Check the monthly investment required to reach this milestone in 15 years assuming a standard market return.'
        }
    },
    {
        slug: '1-crore-in-15-years',
        targetAmount: 10000000,
        duration: 15,
        rate: 12,
        metaTitle: 'SIP to reach ₹1 Crore in 15 Years | RupeeTools',
        metaDescription: 'Calculate the SIP amount for ₹1 Crore in 15 years. See the magic of compounding over a longer period.',
        content: {
            title: '₹1 Crore in 15 Years: The Power of Patience',
            description: 'With a 15-year horizon, the power of compounding works wonders. You need significantly less monthly investment to reach ₹1 Crore compared to a 10-year plan. Check the numbers below.'
        }
    },
    {
        slug: '1-crore-in-20-years',
        targetAmount: 10000000,
        duration: 20,
        rate: 12,
        metaTitle: 'How much SIP for 1 Crore in 20 Years?',
        metaDescription: 'Plan your retirement or child\'s future. Calculate the monthly SIP required to accumulate ₹1 Crore in 20 years.',
        content: {
            title: 'Retirement Goal: ₹1 Crore in 20 Years',
            description: 'A 20-year horizon is ideal for wealth creation. Even a small monthly SIP can grow into ₹1 Crore. Use the calculator to find your starting point.'
        }
    },
    {
        slug: '5-crores-in-20-years',
        targetAmount: 50000000,
        duration: 20,
        rate: 12,
        metaTitle: 'SIP for 5 Crores in 20 Years Calculator',
        metaDescription: 'Aiming high? Calculate the SIP investment needed to build a massive corpus of ₹5 Crores in 20 years.',
        content: {
            title: 'Wealth Creation: ₹5 Crores in 20 Years',
            description: 'Targeting a High Net Worth? Building ₹5 Crores requires discipline and time. Calculate the SIP amount needed to achieve this ambitious financial goal.'
        }
    }
];
