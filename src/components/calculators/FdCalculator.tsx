'use client';

import { useState, useEffect } from 'react';
import { calculateFD, type FdInput, type FdResult, type CompoundingFrequency } from '@/core/logic/fd';
import { IndianRupee, TrendingUp, Calendar, Percent, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { RelatedCalculators } from "../ui/RelatedCalculators";

interface FdCalculatorProps {
    initialInvestmentAmount?: number;
    initialInterestRate?: number;
    initialDurationYears?: number;
}

export function FdCalculator({
    initialInvestmentAmount = 100000,
    initialInterestRate = 7,
    initialDurationYears = 5
}: FdCalculatorProps) {
    // --- INPUTS ---
    const [investmentAmount, setInvestmentAmount] = useState(initialInvestmentAmount);
    const [interestRate, setInterestRate] = useState(initialInterestRate);
    const [durationYears, setDurationYears] = useState(initialDurationYears);
    const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>('Quarterly');

    const input: FdInput = {
        investmentAmount,
        interestRate,
        durationYears,
        compoundingFrequency
    };
    const result = calculateFD(input);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;



    const chartData = [
        { name: 'Principal Amount', value: result.totalInvestment, color: '#3B82F6' },
        { name: 'Total Interest', value: result.totalInterest, color: '#10B981' },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* === LEFT: INPUTS (4 cols) === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-blue-600" /> Deposit Details
                        </h2>

                        <div className="space-y-6">
                            {/* Total Investment */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Total Investment</label>
                                    <span className="text-xs text-slate-500">Min ₹1,000</span>
                                </div>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={investmentAmount}
                                        onChange={e => setInvestmentAmount(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="1000"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(investmentAmount)}
                                </p>
                                <input
                                    type="range" min="1000" max="10000000" step="1000"
                                    value={investmentAmount}
                                    onChange={e => setInvestmentAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Interest Rate (p.a)</label>
                                    <span className="text-xs text-slate-500">1% - 15%</span>
                                </div>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={interestRate}
                                        onChange={e => setInterestRate(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="0.1"
                                        max="15"
                                    />
                                </div>
                                <input
                                    type="range" min="1" max="15" step="0.1"
                                    value={interestRate}
                                    onChange={e => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Time Period (Years)</label>
                                    <span className="text-xs text-slate-500">1 - 25 Years</span>
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={durationYears}
                                        onChange={e => setDurationYears(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        min="1"
                                        max="25"
                                        step="1"
                                    />
                                </div>
                                <input
                                    type="range" min="1" max="25" step="1"
                                    value={durationYears}
                                    onChange={e => setDurationYears(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Compounding Frequency */}
                            <div>
                                <label className="text-xs font-semibold text-slate-700 mb-2 block">Compounding Frequency</label>
                                <select
                                    value={compoundingFrequency}
                                    onChange={e => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                                    className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly (Standard)</option>
                                    <option value="Half-Yearly">Half-Yearly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT: RESULTS (8 cols) === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                        <div className="relative z-10">
                            <p className="text-blue-100 font-medium mb-1">Maturity Amount</p>
                            <h1 className="text-5xl font-bold mb-4">{formatCurrency(result.maturityAmount)}</h1>
                            <div className="flex flex-wrap gap-8 text-sm text-blue-50">
                                <div className="flex flex-col">
                                    <span className="text-blue-200 text-xs uppercase tracking-wider">Invested Amount</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInvestment)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-blue-200 text-xs uppercase tracking-wider">Total Interest</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInterest)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 w-full">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <PieIcon className="w-5 h-5 text-slate-500" /> Breakup
                            </h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => formatCurrencyFull(value)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Summary Text */}
                        <div className="flex-1 space-y-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-sm text-blue-800">
                                    You invested <span className="font-bold">{formatCurrency(result.totalInvestment)}</span>
                                </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-sm text-green-800">
                                    You earned <span className="font-bold">{formatCurrency(result.totalInterest)}</span> as interest
                                </p>
                            </div>
                            <p className="text-xs text-slate-500">
                                * Interest calculated with {compoundingFrequency} compounding.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <RelatedCalculators toolId="fd" category="investments" />
        </div>
    );
}

