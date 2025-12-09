"use client";

import React, { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { calculateAPY, ApyResult } from "@/core/logic/apy";
import { RelatedCalculators } from "../ui/RelatedCalculators";

const ApyCalculator = () => {
    const [joiningAge, setJoiningAge] = useState<number>(25);
    const [desiredPension, setDesiredPension] = useState<1000 | 2000 | 3000 | 4000 | 5000>(5000);
    const result = calculateAPY({
        joiningAge,
        desiredPension,
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatCompact = (value: number) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)} L`;
        } else {
            return formatCurrency(value);
        }
    };

    // Generate Chart Data
    const generateChartData = () => {
        if (!result) return [];
        const data = [];
        const yearsToInvest = result.yearsToInvest;
        const monthlyContribution = result.monthlyContribution;
        const annualRate = 0.085;
        const monthlyRate = annualRate / 12;

        let currentCorpus = 0;
        let totalInvested = 0;

        for (let year = 1; year <= yearsToInvest; year++) {
            const months = year * 12;
            totalInvested = monthlyContribution * months;

            // FV of SIP formula for 'months' duration
            currentCorpus = monthlyContribution *
                ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
                (1 + monthlyRate);

            data.push({
                year: joiningAge + year,
                invested: Math.round(totalInvested),
                value: Math.round(currentCorpus),
            });
        }
        return data;
    };

    const chartData = generateChartData();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-8">
                        {/* Joining Age Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-medium text-slate-700">
                                    Joining Age
                                </label>
                                <span className="text-2xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                    {joiningAge} Years
                                </span>
                            </div>
                            <input
                                type="range"
                                min="18"
                                max="40"
                                step="1"
                                value={joiningAge}
                                onChange={(e) => setJoiningAge(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-2">
                                <span>18 Yrs</span>
                                <span>40 Yrs</span>
                            </div>
                        </div>

                        {/* Desired Pension Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-4">
                                Desired Monthly Pension
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[1000, 2000, 3000, 4000, 5000].map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setDesiredPension(amount as any)}
                                        className={`py-3 px-2 rounded-xl border-2 transition-all font-semibold text-sm ${desiredPension === amount
                                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                                            : "border-slate-200 hover:border-blue-200 text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        ₹{amount / 1000}k
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Key Insight */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <h4 className="font-semibold text-amber-800 text-sm mb-1">
                                        Why Start Early?
                                    </h4>
                                    <p className="text-xs text-amber-700 leading-relaxed">
                                        Joining at 18 vs 40 makes a huge difference.
                                        At 18, you pay just ₹42/mo for ₹1k pension.
                                        At 40, you pay ₹291/mo for the same benefit!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-6">
                                Contribution Summary
                            </h3>

                            {/* Hero Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 text-center">
                                <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wide">
                                    You Need To Invest
                                </p>
                                <p className="text-4xl font-bold text-slate-900 mb-2">
                                    {result ? formatCurrency(result.monthlyContribution) : "₹0"}
                                    <span className="text-lg text-slate-400 font-normal"> / mo</span>
                                </p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    <span>Until Age 60</span>
                                    <span>•</span>
                                    <span>{result?.yearsToInvest} Years</span>
                                </div>
                            </div>

                            {/* Breakdown Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-white rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-1">Total Investment</p>
                                    <p className="text-lg font-semibold text-slate-800">
                                        {result ? formatCompact(result.totalInvestment) : "₹0"}
                                    </p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 mb-1">Est. Corpus (8.5%)</p>
                                    <p className="text-lg font-semibold text-slate-800">
                                        {result ? formatCompact(result.maturityCorpus) : "₹0"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="h-48 w-full mt-auto">
                            <p className="text-xs text-slate-400 mb-2 text-center">Wealth Growth Projection</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis hide={true} />
                                    <Tooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        labelFormatter={(label) => `Age: ${label}`}
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                        strokeWidth={2}
                                        name="Corpus Value"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="invested"
                                        stroke="#cbd5e1"
                                        fill="transparent"
                                        strokeWidth={2}
                                        strokeDasharray="4 4"
                                        name="Invested Amount"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators toolId="apy" category="govt" />
        </div >
    );
};

export default ApyCalculator;
