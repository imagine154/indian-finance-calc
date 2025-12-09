"use client";

import React, { useState } from "react";
import ClientOnly from "@/components/utils/ClientOnly";
import dynamic from 'next/dynamic';
import { Shield, Rocket, Info, Wallet } from "lucide-react";
import {
    getInvestmentAdvice,
    InvestmentInput,
    InvestmentAdvice,
} from "@/core/logic/investment-advisor";
import { RelatedCalculators } from "../ui/RelatedCalculators";

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
    // ✅ Derived State (Calculated on every render, SSR friendly)
    const input: InvestmentInput = { amount, horizonYears, riskProfile };
    const advice = getInvestmentAdvice(input);

    // Generate Growth Chart Data
    const currentYear = new Date().getFullYear();
    const growthData: GrowthPoint[] = [];

    for (let i = 0; i <= horizonYears; i++) {
        const value = amount * Math.pow(1 + advice.expectedReturnRate / 100, i);
        growthData.push({
            year: currentYear + i,
            value: Math.round(value),
            label: `Year ${i}`,
        });
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);

    const formatCompact = (value: number) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)} L`;
        } else {
            return formatCurrency(value);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
                                step="1000"
                            />
                            <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                <ClientOnly fallback={<span>...</span>}>
                                    {formatCompact(amount)}
                                </ClientOnly>
                            </p>
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
                                <h2 className="text-4xl font-bold mb-2">
                                    <ClientOnly fallback={<span>...</span>}>
                                        {formatCurrency(advice.projectedValue)}
                                    </ClientOnly>
                                </h2>
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

                        {/* Allocation Details Table */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:col-span-2">
                            <h3 className="font-bold text-slate-900 mb-4">Allocation Details</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-slate-600">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 rounded-l-lg">Asset Class</th>
                                            <th scope="col" className="px-6 py-3">Allocation</th>
                                            <th scope="col" className="px-6 py-3 rounded-r-lg text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {advice.allocation.map((item, index) => (
                                            <tr key={index} className="bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"][index % 5] }}></span>
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                        {item.percentage}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-slate-900">
                                                    <ClientOnly fallback={<span>...</span>}>
                                                        {formatCurrency((item.percentage / 100) * amount)}
                                                    </ClientOnly>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
            <RelatedCalculators toolId="investment-advisor" category="investments" />
        </div>
    );
}