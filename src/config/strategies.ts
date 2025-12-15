export interface Strategy {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: string;
    colorTheme: 'indigo' | 'emerald' | 'amber' | 'violet' | 'cyan' | 'blue' | 'rose';
    riskLevel: 'Low' | 'Medium' | 'High' | 'Dynamic' | 'Extreme';
    targetAudience: string;
    seo?: {
        title: string;
        description: string;
        keywords: string[];
        jsonLdType: string;
    };
}

export const STRATEGIES: Strategy[] = [
    {
        id: 'core-satellite',
        title: 'Core & Satellite',
        description: 'The balanced approach. Combine safety with growth.',
        href: '/strategies/core-satellite',
        icon: 'Orbit',
        colorTheme: 'indigo',
        riskLevel: 'Medium',
        targetAudience: 'Passive Investors',
        seo: {
            title: "Core & Satellite Portfolio Strategy | RupeeTools",
            description: "Calculate the perfect mix of Index Funds (Core) and Small Caps (Satellite). A professional asset allocation tool for Indian investors.",
            keywords: ["core satellite strategy india", "portfolio sizing calculator", "mutual fund asset allocation", "nifty 50 strategy"],
            jsonLdType: "HowTo"
        }
    },
    {
        id: 'three-bucket',
        title: '3-Bucket Strategy',
        description: 'Generate inflation-proof income for retirement.',
        href: '/strategies/three-bucket',
        icon: 'Layers',
        colorTheme: 'emerald',
        riskLevel: 'Low',
        targetAudience: 'Retirees',
        seo: {
            title: "3-Bucket Retirement Strategy Calculator | RupeeTools",
            description: "Plan your retirement income using the 3-Bucket Strategy. allocate corpus into Immediate, Medium-term, and Long-term growth buckets to beat inflation.",
            keywords: ["Retirement Bucket Strategy Calculator", "SWP Calculator India", "Inflation Proof Retirement", "Bucket Strategy for Retirement India"],
            jsonLdType: "HowTo"
        }
    },
    {
        id: 'coffee-can',
        title: 'Coffee Can Investing',
        description: 'Buy high-quality stocks and hold for 10 years.',
        href: '/strategies/coffee-can',
        icon: 'Trophy',
        colorTheme: 'amber',
        riskLevel: 'Medium',
        targetAudience: 'Long Term Growth',
        seo: {
            title: "Coffee Can Investing Strategy Calculator | RupeeTools",
            description: "Implement the Coffee Can Investing method. Filter high-quality Indian stocks with consistent revenue growth and high ROCE, then hold for 10 years.",
            keywords: ["Coffee Can Investing India", "Saurabh Mukherjea Portfolio", "Consistent Compounders", "Long Term Stock Strategy India"],
            jsonLdType: "HowTo"
        }
    },
    {
        id: 'smart-beta',
        title: 'Factor Investing (Smart Beta)',
        description: 'Target specific drivers of return like Momentum, Value, or Low Volatility.',
        href: '/strategies/factor-investing',
        icon: 'Activity',
        colorTheme: 'violet',
        riskLevel: 'High',
        targetAudience: 'Advanced Investors',
        seo: {
            title: "Factor Investing Strategy Planner (Smart Beta) | RupeeTools",
            description: "Explore Factor Investing in India. Construct a portfolio based on Momentum, Value, Quality, or Low Volatility factors to outperform the Nifty 50.",
            keywords: ["Smart Beta India", "Momentum Investing Strategy", "Nifty 200 Momentum 30", "Factor Investing Calculator"],
            jsonLdType: "HowTo"
        }
    },
    {
        id: 'barbell',
        title: 'Barbell Strategy',
        description: 'Combine extreme safety (90%) with extreme risk (10%).',
        href: '/strategies/barbell',
        icon: 'Dumbbell',
        colorTheme: 'cyan',
        riskLevel: 'Extreme',
        targetAudience: 'Risk-Takers',
        seo: {
            title: "Barbell Strategy Calculator: Safety + Extreme Risk | RupeeTools",
            description: "The Barbell Strategy: Protect 90% of your capital in safe assets (FD/Bonds) and bet 10% on high-risk, high-reward assets (Crypto/Options).",
            keywords: ["Barbell Strategy India", "Nassim Taleb Investing", "Safe vs Risky Portfolio", "Asymmetric Betting"],
            jsonLdType: "HowTo"
        }
    },
    {
        id: 'magic-formula',
        title: 'Magic Formula',
        description: 'Quantitative Value Investing: High Quality + Low Price.',
        href: '/strategies/magic-formula',
        icon: 'Wand2',
        colorTheme: 'rose',
        riskLevel: 'High',
        targetAudience: 'Contrarian Investors',
        seo: {
            title: "Magic Formula Investing Strategy (India) | RupeeTools",
            description: "Implement Joel Greenblatt's Magic Formula in the Indian stock market. Find high-quality companies at bargain prices using ROCE and Earnings Yield.",
            keywords: ["Magic Formula India", "Joel Greenblatt Screener", "High ROCE Low PE Stocks", "Value Investing India"],
            jsonLdType: "HowTo"
        }
    },
];
