"use client";

import React, { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    Legend,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { Shield, Rocket, Info } from "lucide-react";
import {
    getInvestmentAdvice,
    InvestmentInput,
    InvestmentAdvice,
} from "@/core/logic/investment-advisor";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function InvestmentAdvisor() {
    const [amount, setAmount] = useState<number>(500000);
    const [horizonYears, setHorizonYears] = useState<number>(5);
    const [riskProfile, setRiskProfile] = useState<"Conservative" | "Aggressive">(
        "Conservative"
    );
    const [advice, setAdvice] = useState<InvestmentAdvice | null>(null);
    const [growthData, setGrowthData] = useState<any[]>([]);

    useEffect(() => {
        const input: InvestmentInput = { amount, horizonYears, riskProfile };
        const result = getInvestmentAdvice(input);
        setAdvice(result);

        // Generate Growth Chart Data
        const data = [];
        for (let i = 0; i <= horizonYears; i++) {
            const value = amount * Math.pow(1 + result.expectedReturnRate / 100, i);
            data.push({
                year: `Year: ${i}`,
                value: Math.round(value),
            });
        }
        setGrowthData(data);
    }, [amount, horizonYears, riskProfile]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                    Your Investment Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Amount & Horizon */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Investment Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    step="1000"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Time Horizon: <span className="text-blue-600 font-bold">{horizonYears} Years</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="25"
                                value={horizonYears}
                                onChange={(e) => setHorizonYears(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>1 Yr</span>
                                <span>5 Yrs</span>
                                <span>10 Yrs</span>
                                <span>15 Yrs</span>
                                <span>25 Yrs</span>
                            </div>
                        </div>
                    </div>

                    {/* Risk Profile */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-4">
                            Risk Appetite
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setRiskProfile("Conservative")}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${riskProfile === "Conservative"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                                    }`}
                            >
                                <Shield className="w-8 h-8" />
                                <span className="font-semibold">Conservative</span>
                            </button>
                            <button
                                onClick={() => setRiskProfile("Aggressive")}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${riskProfile === "Aggressive"
                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                                    }`}
                            >
                                <Rocket className="w-8 h-8" />
                                <span className="font-semibold">Aggressive</span>
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                            {riskProfile === "Conservative"
                                ? "Prioritizes capital safety and steady returns. Willing to accept lower growth for peace of mind."
                                : "Seeks maximum growth. Willing to tolerate high market volatility for higher long-term wealth."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {advice && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Hero Card */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-8 rounded-2xl shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Projected Value</p>
                                <h3 className="text-4xl font-bold text-white">
                                    {formatCurrency(advice.projectedValue)}
                                </h3>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Expected Return</p>
                                <h3 className="text-4xl font-bold text-emerald-400">
                                    {advice.expectedReturnRate}%
                                </h3>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-200 leading-relaxed">
                                        {advice.reasoning}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Asset Allocation Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">
                            Recommended Allocation
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={advice.allocation as any}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="percentage"
                                    >
                                        {advice.allocation.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3">
                            {advice.allocation.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-slate-800">
                                        {item.percentage}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">
                            Wealth Growth Projection
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 12, fill: "#334155" }} // Slate 700
                                        tickLine={false}
                                        axisLine={false}
                                        interval={Math.ceil(horizonYears / 5)}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: "#334155" }} // Slate 700
                                        tickFormatter={(value) =>
                                            `₹${(value / 100000).toFixed(1)}L`
                                        }
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <RechartsTooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{
                                            backgroundColor: "#fff",
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                        itemStyle={{ color: "#1e293b" }} // Slate 800
                                        labelStyle={{ color: "#64748b", marginBottom: "0.25rem" }} // Slate 500
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        name="Projected Value"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
