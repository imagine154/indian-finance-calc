"use client";

import Link from "next/link";
import {
    Calculator,
    TrendingUp,
    PiggyBank,
    Landmark,
    Building2,
    Wallet,
    Briefcase,
    Coins,
    Percent,
    ArrowRight,
    Lightbulb,
    Target,
    Search
} from "lucide-react";
import { RECOMMENDATIONS, ToolId } from "@/config/recommendations";

interface RelatedCalculatorsProps {
    toolId?: ToolId;
    category?: string;
}

const CALCULATORS: { id: ToolId; name: string; href: string; icon: any; category: string; description: string }[] = [
    { id: 'lumpsum', name: "Lumpsum", href: "/calculators/lumpsum", icon: Coins, category: "investments", description: "One-time investment" },
    { id: 'sip', name: "Step Up SIP", href: "/calculators/sip", icon: TrendingUp, category: "investments", description: "Growing investments" },
    { id: 'swp', name: "SWP Calculator", href: "/calculators/swp", icon: Coins, category: "investments", description: "Regular withdrawals" },
    { id: 'sip-analyzer', name: "Mutual Fund Analyzer", href: "/calculators/mutual-fund-analyzer", icon: TrendingUp, category: "investments", description: "Analyze fund performance" },
    { id: 'goal', name: "Goal Planner", href: "/calculators/goal", icon: TrendingUp, category: "investments", description: "Plan financial goals" },
    { id: 'explore-mutual-funds', name: "Explore Funds", href: "/explore-mutual-funds", icon: Search, category: "investments", description: "Discover top mutual funds" },
    { id: 'rd', name: "RD Calculator", href: "/calculators/rd", icon: PiggyBank, category: "investments", description: "Recurring Deposit" },
    { id: 'fd', name: "FD Calculator", href: "/calculators/fd", icon: Landmark, category: "investments", description: "Fixed Deposit" },
    // Govt Schemes
    { id: 'ppf', name: "PPF Calculator", href: "/calculators/ppf", icon: PiggyBank, category: "govt", description: "Public Provident Fund" },
    { id: 'pf', name: "EPF Calculator", href: "/calculators/pf", icon: PiggyBank, category: "govt", description: "Employee Provident Fund" },
    { id: 'nps', name: "NPS Calculator", href: "/calculators/nps", icon: Landmark, category: "govt", description: "Pension planning" },
    { id: 'ssy', name: "SSY Calculator", href: "/calculators/ssy", icon: PiggyBank, category: "govt", description: "Sukanya Samriddhi Yojana" },
    { id: 'apy', name: "APY Calculator", href: "/calculators/apy", icon: Landmark, category: "govt", description: "Atal Pension Yojana" },
    // Loans
    { id: 'home-loan', name: "Home Loan EMI", href: "/calculators/loan", icon: Building2, category: "loans", description: "Calculate monthly EMI" },
    { id: 'rent-vs-buy', name: "Rent vs Buy", href: "/calculators/rent-vs-buy", icon: Building2, category: "loans", description: "Buying vs Renting decision" },
    { id: 'balance-transfer', name: "Balance Transfer", href: "/calculators/balance-transfer", icon: Percent, category: "loans", description: "Should you switch loan?" },
    // Trading
    { id: 'position-size', name: "Position Size", href: "/calculators/position-size", icon: Calculator, category: "trading", description: "Risk management" },
    // More Investments
    // Note: FD Calculator key missing in ToolId type? Using 'sip' as placeholder or we should add 'fd' to ToolId if needed. For now excluding or mapping to closest.
    // 'fd' is not in ToolId, skipping or adding if I can edit ToolId. I'll stick to existing ToolId scope for now to avoid errors.

    // More Income
    { id: 'capital-gains', name: "Capital Gains", href: "/calculators/capital-gains", icon: TrendingUp, category: "income", description: "LTCG & STCG Tax" },
    { id: 'gst', name: "GST Calculator", href: "/calculators/gst", icon: Percent, category: "income", description: "Calculate GST amount" },
    { id: 'investment-advisor', name: "Investment Advisor", href: "/calculators/investment-advisor", icon: Briefcase, category: "investments", description: "Personalized advice" },

    // These might be missing from ToolId or mapped differently
    // { id: 'gratuity', ... } -> 'gratuity' isn't in ToolId list I saw. 
    // { id: 'mssc', ... } -> 'mssc' isn't in ToolId list I saw.
    // Checking ToolId again: 
    // export type ToolId = 'salary' | 'income-tax' | 'pf' | 'rent-vs-buy' | 'nps' | 'hra' | 'ppf' | 'home-loan' | 'balance-transfer' | 'sip' | 'lumpsum' | 'sip-analyzer' | 'goal' | 'swp' | 'fire' | 'freelance' | 'gst' | 'ssy' | 'position-size' | 'capital-gains' | 'investment-advisor';

    // Adding missing ones would require editing recommendations.ts. I will proceed with the ones that match.
];

export function RelatedCalculators({ toolId, category }: RelatedCalculatorsProps) {
    let recommendations: typeof CALCULATORS = [];

    // strategy 1: explicit recommendations from config
    if (toolId && RECOMMENDATIONS[toolId]) {
        const recIds = RECOMMENDATIONS[toolId];
        recommendations = recIds.map(rec => {
            const tool = CALCULATORS.find(c => c.id === rec.id);
            if (tool) {
                return {
                    ...tool,
                    description: rec.text // Override description with specific recommendation text
                };
            }
            return null;
        }).filter((item): item is typeof CALCULATORS[0] => item !== null);
    }

    // strategy 2: fallback to category
    if (recommendations.length === 0) {
        recommendations = CALCULATORS
            .filter(c => c.id !== toolId) // don't show self
            .sort((a, b) => {
                if (category && a.category === category && b.category !== category) return -1;
                if (category && a.category !== category && b.category === category) return 1;
                return 0;
            })
            .slice(0, 3);
    }

    if (recommendations.length === 0) return null;

    return (
        <div className="mt-16 border-t border-slate-200 pt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                    {toolId ? "Recommended Next Steps" : "Explore More Tools"}
                </h3>
                <Link
                    href="/"
                    className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 text-sm"
                >
                    View All <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((calc, idx) => (
                    <Link
                        key={idx}
                        href={calc.href}
                        className="group p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 flex items-start gap-3"
                    >
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <calc.icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 group-hover:text-blue-700">
                                {calc.name}
                            </h4>
                            <p className="text-sm text-slate-500 mt-0.5">
                                {calc.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
