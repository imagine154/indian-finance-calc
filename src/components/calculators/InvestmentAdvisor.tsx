"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { Shield, Rocket, Info, Wallet } from "lucide-react";
import {
    getInvestmentAdvice,
    InvestmentInput,
    InvestmentAdvice,
} from "@/core/logic/investment-advisor";

const AdvisorAllocationChart = dynamic(() => import('@/components/charts/AdvisorResultChart').then(mod => mod.AdvisorAllocationChart), {
    ssr: false,
    loading: () => <div className="h-[250px] w-full bg-slate-50 rounded-lg animate-pulse"></div>
});

const AdvisorGrowthChart = dynamic(() => import('@/components/charts/AdvisorResultChart').then(mod => mod.AdvisorGrowthChart), {
    ssr: false,
    loading: () => <div className="h-[250px] w-full bg-slate-50 rounded-lg animate-pulse"></div>
});

// ✅ Defined Strict Type
type GrowthPoint = {
    year: number;
    value: number;
    label: string;
};

export default function InvestmentAdvisor() {
    const [amount, setAmount] = useState<number>(500000);
    const [horizonYears, setHorizonYears] = useState<number>(5);
    const [riskProfile, setRiskProfile] = useState<"Conservative" | "Aggressive">("Conservative");
    const [advice, setAdvice] = useState<InvestmentAdvice | null>(null);

    // ✅ Applied Type Safety
    const [growthData, setGrowthData] = useState<GrowthPoint[]>([]);

    useEffect(() => {
        const input: InvestmentInput = { amount, horizonYears, riskProfile };
        const result = getInvestmentAdvice(input);
        setAdvice(result);

        // Generate Growth Chart Data
        const currentYear = new Date().getFullYear();
        const data: GrowthPoint[] = [];

        for (let i = 0; i <= horizonYears; i++) {
            const value = amount * Math.pow(1 + result.expectedReturnRate / 100, i);
            data.push({
                year: currentYear + i,
                value: Math.round(value),
                label: `Year ${i}`,
            });
        }
        setGrowthData(data);

    }, [amount, horizonYears, riskProfile]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);

    if (!advice) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT PANEL: INPUTS */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" /> Your Profile
                    </h2>

                    {/* Investment Amount */}
                    <div className="mb-6">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                            <Wallet className="w-4 h-4 text-blue-600" />
                            One-time Investment
                        </label>
                        <input
                            type="number"
                            min="0" // ✅ HTML5 Validation
                            value={amount === 0 ? "" : amount} // Avoid showing "0" when user wants to clear
                            onChange={(e) => {
                                // ✅ Fix: Prevent NaN by defaulting to 0
                                const val = e.target.value;
                                setAmount(val === "" ? 0 : Number(val));
                            }}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Time Horizon */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-slate-700">Time Horizon</label>
                            <span className="text-sm font-bold text-blue-600">{horizonYears} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="25"
                            step="1"
                            value={horizonYears}
                            onChange={(e) => setHorizonYears(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>1 Yr</span>
                            <span>25 Yrs</span>
                        </div>
                    </div>

                    {/* Risk Profile */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-3 block">Risk Appetite</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setRiskProfile("Conservative")}
                                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${riskProfile === "Conservative"
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                                    }`}
                            >
                                <Shield className="w-6 h-6" />
                                <span className="text-sm font-bold">Conservative</span>
                            </button>

                            <button
                                onClick={() => setRiskProfile("Aggressive")}
                                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${riskProfile === "Aggressive"
                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                                    }`}
                            >
                                <Rocket className="w-6 h-6" />
                                <span className="text-sm font-bold">Aggressive</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: RESULTS */}
            <div className="lg:col-span-8 space-y-6">
                {/* Hero Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-slate-300 text-sm font-medium mb-1">Projected Corpus</p>
                            <h2 className="text-4xl font-bold mb-2">{formatCurrency(advice.projectedValue)}</h2>
                            <p className="text-xs text-slate-400">
                                @ {advice.expectedReturnRate}% average annual return
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Asset Allocation (Pie) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                        <h3 className="font-bold text-slate-900 mb-4">Recommended Allocation</h3>
                        <AdvisorAllocationChart data={advice.allocation} />
                    </div>

                    {/* Wealth Growth (Area) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                        <h3 className="font-bold text-slate-900 mb-4">Wealth Projection</h3>
                        <AdvisorGrowthChart data={growthData} horizonYears={horizonYears} formatCurrency={formatCurrency} />
                    </div>
                </div>

                {/* Reasoning Section */}
                <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-900">Why this strategy?</h4>
                            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                                {advice.reasoning}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}