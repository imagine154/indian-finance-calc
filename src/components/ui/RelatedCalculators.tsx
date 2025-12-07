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
    ArrowRight
} from "lucide-react";

interface RelatedCalculatorsProps {
    currentPath: string;
    category?: "investments" | "income" | "loans" | "govt" | "trading";
}

const CALCULATORS = [
    // Income & Tax
    { name: "Salary Calculator", href: "/calculators/salary", icon: Wallet, category: "income", description: "Calculate in-hand salary" },
    { name: "Income Tax", href: "/calculators/income-tax", icon: Building2, category: "income", description: "Old vs New Regime" },
    { name: "HRA Calculator", href: "/calculators/hra", icon: Building2, category: "income", description: "Tax exemption on rent" },
    { name: "Freelance Tax", href: "/calculators/freelance", icon: Briefcase, category: "income", description: "Tax for freelancers" },

    // Investments
    { name: "SIP Calculator", href: "/calculators/sip", icon: TrendingUp, category: "investments", description: "Calculate SIP returns" },
    { name: "Lumpsum", href: "/calculators/lumpsum", icon: Coins, category: "investments", description: "One-time investment" },
    { name: "Step Up SIP", href: "/calculators/sip", icon: TrendingUp, category: "investments", description: "Growing investments" },
    { name: "SWP Calculator", href: "/calculators/swp", icon: Coins, category: "investments", description: "Regular withdrawals" },
    { name: "Mutual Fund Analyzer", href: "/calculators/mutual-fund-analyzer", icon: TrendingUp, category: "investments", description: "Analyze fund performance" },
    { name: "Goal Planner", href: "/calculators/goal", icon: TrendingUp, category: "investments", description: "Plan financial goals" },

    // Govt Schemes
    { name: "PPF Calculator", href: "/calculators/ppf", icon: PiggyBank, category: "govt", description: "Public Provident Fund" },
    { name: "EPF Calculator", href: "/calculators/pf", icon: PiggyBank, category: "govt", description: "Employee Provident Fund" },
    { name: "NPS Calculator", href: "/calculators/nps", icon: Landmark, category: "govt", description: "Pension planning" },
    { name: "SSY Calculator", href: "/calculators/ssy", icon: PiggyBank, category: "govt", description: "Sukanya Samriddhi Yojana" },
    { name: "APY Calculator", href: "/calculators/apy", icon: Landmark, category: "govt", description: "Atal Pension Yojana" },

    // Loans
    { name: "Home Loan EMI", href: "/calculators/loan", icon: Building2, category: "loans", description: "Calculate monthly EMI" },
    { name: "Rent vs Buy", href: "/calculators/rent-vs-buy", icon: Building2, category: "loans", description: "Buying vs Renting decision" },
    { name: "Prepayment", href: "/calculators/loan", icon: Percent, category: "loans", description: "Save on loan interest" },
    { name: "Balance Transfer", href: "/calculators/balance-transfer", icon: Percent, category: "loans", description: "Should you switch loan?" },

    // Trading
    { name: "Position Size", href: "/calculators/position-size", icon: Calculator, category: "trading", description: "Risk management" },

    // More Investments
    { name: "FD Calculator", href: "/calculators/fd", icon: PiggyBank, category: "investments", description: "Fixed Deposit returns" },
    { name: "SIP Analyzer", href: "/calculators/sip-analyzer", icon: TrendingUp, category: "investments", description: "Deep dive into SIPs" },
    { name: "Investment Advisor", href: "/calculators/investment-advisor", icon: Briefcase, category: "investments", description: "Personalized advice" },

    // More Income
    { name: "Capital Gains", href: "/calculators/capital-gains", icon: TrendingUp, category: "income", description: "LTCG & STCG Tax" },
    { name: "GST Calculator", href: "/calculators/gst", icon: Percent, category: "income", description: "Calculate GST amount" },
    { name: "Gratuity", href: "/calculators/gratuity", icon: Coins, category: "income", description: "Gratuity benefits" },

    // More Govt
    { name: "Mahila Samman", href: "/calculators/mssc", icon: PiggyBank, category: "govt", description: "MSSC Scheme" },
];

export function RelatedCalculators({ currentPath, category }: RelatedCalculatorsProps) {
    // Filter out current page
    const filtered = CALCULATORS.filter(calc => calc.href !== currentPath);

    // Sort by category match first, then others
    const sorted = filtered.sort((a, b) => {
        if (category && a.category === category && b.category !== category) return -1;
        if (category && a.category !== category && b.category === category) return 1;
        return 0;
    });

    // Take top 6 recommendations
    const recommendations = sorted.slice(0, 6);

    return (
        <div className="mt-16 border-t border-slate-200 pt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                    Explore More Tools
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
