export type ToolId =
    | 'salary' | 'income-tax' | 'pf' | 'rent-vs-buy' | 'nps' | 'hra' | 'ppf'
    | 'home-loan' | 'balance-transfer' | 'sip' | 'lumpsum' | 'sip-analyzer'
    | 'goal' | 'swp' | 'fire' | 'freelance' | 'gst' | 'ssy'
    | 'position-size' | 'capital-gains' | 'investment-advisor' | 'apy' | 'mssc' | 'fd' | 'gratuity' | 'mutual-fund-analyzer';

interface Recommendation {
    id: ToolId;
    text: string;
}

export const RECOMMENDATIONS: Record<string, Recommendation[]> = {
    'salary': [
        { id: 'income-tax', text: "Check your tax liability on this salary." },
        { id: 'pf', text: "See how much your EPF will grow by retirement." },
        { id: 'rent-vs-buy', text: "Is this salary enough to buy a home?" },
    ],
    'income-tax': [
        { id: 'nps', text: "Save an extra ₹50,000 in tax under 80CCD(1B)." },
        { id: 'hra', text: "Maximize your House Rent Allowance claim." },
        { id: 'ppf', text: "Explore tax-free returns with PPF." },
    ],
    'home-loan': [
        { id: 'rent-vs-buy', text: "Should you really buy? Check the math." },
        { id: 'balance-transfer', text: "Can you save money by switching banks?" },
        { id: 'income-tax', text: "Calculate Section 24 & 80C tax benefits." },
    ],
    'sip': [
        { id: 'sip-analyzer', text: "Analyze the probability of your returns." },
        { id: 'goal', text: "Is this investment enough for your dream goal?" },
        { id: 'swp', text: "Plan your monthly income from this corpus." },
    ],
    'lumpsum': [
        { id: 'sip-analyzer', text: "Analyze the probability of your returns." },
        { id: 'goal', text: "Is this investment enough for your dream goal?" },
        { id: 'swp', text: "Plan your monthly income from this corpus." },
    ],
    'fire': [
        { id: 'swp', text: "Simulate your post-retirement withdrawals." },
        { id: 'nps', text: "Secure your government-backed pension." },
        { id: 'investment-advisor', text: "Get an automated asset allocation plan." },
    ],
    'freelance': [
        { id: 'gst', text: "Do you need to file GST? Check calculation." },
        { id: 'income-tax', text: "Compare New vs Old regime for freelancers." },
    ],
    'ssy': [
        { id: 'ppf', text: "Another government-backed tax saver." },
        { id: 'goal', text: "Plan for her higher education costs." },
    ],
    'gst': [
        { id: 'freelance', text: "Calculate presumptive tax (44ADA)." },
        { id: 'capital-gains', text: "Check tax on your investments." },
    ],
    'position-size': [
        { id: 'capital-gains', text: "Calculate tax on your trading profits." },
        { id: 'investment-advisor', text: "Diversify your risk with asset allocation." },
    ],
};
