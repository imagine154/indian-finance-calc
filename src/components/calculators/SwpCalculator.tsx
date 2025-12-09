'use client';

import { useState, useEffect } from 'react';
import { calculateSWP, type SwpInput, type SwpResult } from '@/core/logic/swp';
import { IndianRupee, TrendingUp, Calendar, Wallet, Percent, AlertCircle, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RelatedCalculators } from "../ui/RelatedCalculators";
import Link from 'next/link';

interface SwpCalculatorProps {
    initialTotalInvestment?: number;
    initialWithdrawalAmount?: number;
}

export function SwpCalculator({
    initialTotalInvestment = 5000000,
    initialWithdrawalAmount = 25000
}: SwpCalculatorProps) {
    // --- INPUTS ---
    const [totalInvestment, setTotalInvestment] = useState(initialTotalInvestment);
    const [withdrawalAmount, setWithdrawalAmount] = useState(initialWithdrawalAmount);
    const [expectedReturn, setExpectedReturn] = useState(9);
    const [duration, setDuration] = useState(20);

    const input: SwpInput = {
        totalInvestment,
        withdrawalAmount,
        expectedReturn,
        duration
    };
    const result = calculateSWP(input);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

    const getInvestmentSuggestion = (rate: number) => {
        if (rate < 8) {
            return {
                type: 'Conservative',
                funds: 'Debt Funds / Liquid Funds',
                desc: 'Suitable for low risk and steady income.',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-200'
            };
        } else if (rate <= 12) {
            return {
                type: 'Moderate',
                funds: 'Hybrid / Balanced Advantage Funds',
                desc: 'Balances growth and stability.',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
                border: 'border-purple-200'
            };
        } else {
            return {
                type: 'Aggressive',
                funds: 'Equity / Flexi Cap Funds',
                desc: 'High growth potential but higher volatility.',
                color: 'text-orange-600',
                bg: 'bg-orange-50',
                border: 'border-orange-200'
            };
        }
    };



    const suggestion = getInvestmentSuggestion(expectedReturn);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* === LEFT: INPUTS (4 cols) === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-blue-600" /> Plan Details
                        </h2>

                        <div className="space-y-6">
                            {/* Total Investment */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Total Investment</label>
                                    <span className="text-xs text-slate-500">Min ₹1 Lakh</span>
                                </div>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={totalInvestment}
                                        onChange={e => setTotalInvestment(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="10000"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(totalInvestment)}
                                </p>
                                <input
                                    type="range" min="100000" max="50000000" step="10000"
                                    value={totalInvestment}
                                    onChange={e => setTotalInvestment(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Monthly Withdrawal */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Monthly Withdrawal</label>
                                    <span className="text-xs text-slate-500">Min ₹500</span>
                                </div>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={withdrawalAmount}
                                        onChange={e => setWithdrawalAmount(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="500"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(withdrawalAmount)}
                                </p>
                                <input
                                    type="range" min="500" max="500000" step="500"
                                    value={withdrawalAmount}
                                    onChange={e => setWithdrawalAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Expected Return */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Expected Return (p.a)</label>
                                    <span className="text-xs text-slate-500">1% - 30%</span>
                                </div>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={expectedReturn}
                                        onChange={e => setExpectedReturn(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="0.5"
                                        max="30"
                                    />
                                </div>
                                <input
                                    type="range" min="1" max="30" step="0.5"
                                    value={expectedReturn}
                                    onChange={e => setExpectedReturn(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Duration (Years)</label>
                                    <span className="text-xs text-slate-500">1 - 30 Years</span>
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={e => setDuration(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        min="1"
                                        max="30"
                                    />
                                </div>
                                <input
                                    type="range" min="1" max="30" step="1"
                                    value={duration}
                                    onChange={e => setDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Investment Suggestion Card */}
                    <div className={`rounded-2xl p-6 shadow-sm border ${suggestion.bg} ${suggestion.border}`}>
                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${suggestion.color}`}>
                            Suggestion: {suggestion.type}
                        </h3>
                        <p className="text-slate-900 font-semibold text-lg mb-1">{suggestion.funds}</p>
                        <p className="text-slate-600 text-sm mb-4">{suggestion.desc}</p>

                        <Link
                            href="/calculators/mutual-fund-analyzer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Analyze Funds <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* === RIGHT: RESULTS (8 cols) === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-slate-400 font-medium mb-1">Total Withdrawn</p>
                                <h1 className="text-4xl font-bold mb-2 text-yellow-400">{formatCurrency(result.totalWithdrawn)}</h1>
                                <p className="text-xs text-slate-500">over {duration} years</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-medium mb-1">Final Value</p>
                                <h1 className={`text-4xl font-bold mb-2 ${result.finalValue === 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    {formatCurrency(result.finalValue)}
                                </h1>
                                <p className="text-xs text-slate-500">remaining balance</p>
                            </div>
                        </div>
                        {result.isDepleted && (
                            <div className="mt-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <p className="text-sm text-red-100">
                                    <strong>Warning:</strong> Your investment gets depleted in <strong>Year {result.depletionYear}</strong>.
                                    Consider reducing withdrawal amount or increasing expected return.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-slate-500" /> Balance Projection
                        </h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={result.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                        tickFormatter={(val) => `${val / 100000}L`}
                                    />
                                    <Tooltip
                                        cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                                                        <p className="text-slate-900 font-bold mb-2 text-base">Year: {label}</p>
                                                        <div className="space-y-1">
                                                            {payload.map((entry: any, index: number) => (
                                                                <div key={index} className="flex items-center gap-3 text-sm">
                                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                                    <span className="text-slate-500">{entry.name}:</span>
                                                                    <span className="font-bold text-slate-900">{formatCurrencyFull(entry.value)}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                    <Area
                                        type="monotone"
                                        dataKey="balance"
                                        name="Balance Value"
                                        stroke="#3B82F6"
                                        fillOpacity={1}
                                        fill="url(#colorBalance)"
                                        strokeWidth={2}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="withdrawn"
                                        name="Total Withdrawn"
                                        stroke="#F59E0B"
                                        fill="none"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Breakdown Table */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-500" /> Yearly Breakdown
                        </h3>
                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                            <table className="w-full text-sm text-left relative">
                                <thead className="bg-slate-50 text-slate-600 font-semibold sticky top-0 z-10">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Year</th>
                                        <th className="px-4 py-3">Withdrawn</th>
                                        <th className="px-4 py-3">Interest Earned</th>
                                        <th className="px-4 py-3 rounded-r-lg">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {result.yearlyData.map((year) => (
                                        <tr key={year.year} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-900">{year.year}</td>
                                            <td className="px-4 py-3 text-slate-600">{formatCurrencyFull(year.withdrawn)}</td>
                                            <td className="px-4 py-3 text-green-600">+{formatCurrencyFull(year.interestEarned)}</td>
                                            <td className={`px-4 py-3 font-bold ${year.balance === 0 ? 'text-red-500' : 'text-slate-900'}`}>
                                                {formatCurrencyFull(year.balance)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <RelatedCalculators toolId="swp" category="investments" />
        </div>
    );
}
