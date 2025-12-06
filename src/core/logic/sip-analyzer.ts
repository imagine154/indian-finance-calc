import { CATEGORY_RETURNS } from '../data/category-returns';

// Deprecate static rates, use CATEGORY_RETURNS instead
export const CATEGORY_RATES = {};

// Map Categories to Broad Types for Pie Chart
// Helper to get expected rate based on years
function getExpectedRate(category: string, years: number): number {
    const data = CATEGORY_RETURNS[category];
    if (!data) return 10; // Default fallback

    // Logic: Closest lower bound or direct mapping
    // Available keys: 1Y, 3Y, 5Y, 7Y, 10Y
    let val = 10;
    if (years <= 1) val = data.returns["1Y"];
    if (years <= 3) val = data.returns["3Y"];
    if (years <= 5) val = data.returns["5Y"];
    if (years <= 7) val = data.returns["7Y"];
    else val = data.returns["10Y"];

    // Round to nearest 0.5
    return Math.round(val * 2) / 2;
}

// Map Categories to Broad Types for Pie Chart
export const CATEGORY_TYPE: Record<string, 'Equity' | 'Debt' | 'Hybrid' | 'Gold'> = {};
// Populate CATEGORY_TYPE from CATEGORY_RETURNS
Object.keys(CATEGORY_RETURNS).forEach(cat => {
    const type = CATEGORY_RETURNS[cat].category;
    if (['Equity', 'Debt', 'Hybrid', 'Gold'].includes(type)) {
        CATEGORY_TYPE[cat] = type as any;
    } else {
        CATEGORY_TYPE[cat] = 'Equity'; // Default
    }
});

export interface UserSip {
    id: string;
    category: string; // Key from CATEGORY_RATES
    amount: number;
    frequency: 'Weekly' | 'Fortnightly' | 'Monthly';
    existingBalance: number;
}

export interface PortfolioAnalysis {
    projectedCorpus: number;
    gap: number;
    currentMonthlyInvestment: number;
    allocation: {
        Equity: number;
        Debt: number;
        Hybrid: number;
        Gold: number;
    };
    weightedAvgReturn: number;
    isGoalMet: boolean;
    categoryBreakdown: Record<string, CategoryBreakdown>;
}

export interface CategoryBreakdown {
    allocationPercent: number;
    totalMonthlyInvestment: number;
    totalInvestedAmount: number; // New field
    expectedReturnRate: number;
    projectedValue: number;
}

export function analyzePortfolio(goalAmount: number, years: number, sips: UserSip[]): PortfolioAnalysis {
    let projectedCorpus = 0;
    let currentMonthlyInvestment = 0;

    const allocation = {
        Equity: 0,
        Debt: 0,
        Hybrid: 0,
        Gold: 0
    };

    let totalWeightedReturn = 0;
    let totalInvestmentForAvg = 0;

    const categoryStats: Record<string, { monthlyInvestment: number, projectedValue: number, rate: number, totalInvested: number }> = {};


    sips.forEach(sip => {
        // 1. Convert frequency to Monthly Equivalent
        let monthlyAmount = sip.amount;
        if (sip.frequency === 'Weekly') monthlyAmount = sip.amount * 4.33;
        if (sip.frequency === 'Fortnightly') monthlyAmount = sip.amount * 2.16;

        currentMonthlyInvestment += monthlyAmount;


        // 2. Lookup expected rate
        const rate = getExpectedRate(sip.category, years);
        const annualRate = rate / 100;
        const monthlyRate = annualRate / 12;
        const months = years * 12;

        // 3. Calculate Future Value of SIP (Monthly compounding)
        // FV = P * [ (1+i)^n - 1 ] * (1+i) / i
        const sipFV = monthlyAmount * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate) / monthlyRate;

        // 4. Calculate Future Value of Existing Balance (Lumpsum growth)
        // FV = P * (1+r)^n
        const balanceFV = sip.existingBalance * Math.pow(1 + annualRate, years);

        const fundTotal = sipFV + balanceFV;
        projectedCorpus += fundTotal;

        // Allocation (based on current monthly investment, could also use projected value but requirement says "Split % between Equity / Debt / Hybrid")
        // Usually allocation is based on CURRENT value or INVESTMENT amount. 
        // Let's use Monthly Investment Amount for allocation split as it reflects "where the money is going".
        const type = CATEGORY_TYPE[sip.category] || 'Equity';
        allocation[type] += monthlyAmount;

        // Weighted Avg Return calculation
        // Weight by monthly investment amount
        totalWeightedReturn += rate * monthlyAmount;
        totalInvestmentForAvg += monthlyAmount;

        // Populate category stats
        if (!categoryStats[sip.category]) {
            categoryStats[sip.category] = { monthlyInvestment: 0, projectedValue: 0, rate: rate, totalInvested: 0 };
        }
        categoryStats[sip.category].monthlyInvestment += monthlyAmount;
        categoryStats[sip.category].projectedValue += fundTotal;
        // Total Invested = Monthly * 12 * Years + Existing Lumpsum
        categoryStats[sip.category].totalInvested += (monthlyAmount * years * 12) + sip.existingBalance;
    });

    const categoryBreakdown: Record<string, CategoryBreakdown> = {};
    if (totalInvestmentForAvg > 0) {
        Object.entries(categoryStats).forEach(([category, stats]) => {
            categoryBreakdown[category] = {
                allocationPercent: (stats.monthlyInvestment / totalInvestmentForAvg) * 100,
                totalMonthlyInvestment: stats.monthlyInvestment,
                totalInvestedAmount: stats.totalInvested,
                expectedReturnRate: stats.rate,
                projectedValue: stats.projectedValue
            };
        });
    }

    // Calculate percentages for allocation
    const totalAllocation = allocation.Equity + allocation.Debt + allocation.Hybrid + allocation.Gold;
    if (totalAllocation > 0) {
        allocation.Equity = (allocation.Equity / totalAllocation) * 100;
        allocation.Debt = (allocation.Debt / totalAllocation) * 100;
        allocation.Hybrid = (allocation.Hybrid / totalAllocation) * 100;
        allocation.Gold = (allocation.Gold / totalAllocation) * 100;
    }

    const weightedAvgReturn = totalInvestmentForAvg > 0 ? totalWeightedReturn / totalInvestmentForAvg : 0;
    const gap = Math.max(0, goalAmount - projectedCorpus);

    return {
        projectedCorpus,
        gap,
        currentMonthlyInvestment,
        allocation,
        weightedAvgReturn,
        isGoalMet: gap === 0,
        categoryBreakdown
    };
}
