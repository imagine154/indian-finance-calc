'use client';

import { useState, useEffect } from 'react';
import { calculateLumpsum, type LumpsumInput, type LumpsumResult } from '@/core/logic/lumpsum';
import { IndianRupee, TrendingUp, Calendar, Coins, Percent, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function LumpsumCalculator() {
    // --- INPUTS ---
    const [investmentAmount, setInvestmentAmount] = useState(100000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [duration, setDuration] = useState(10);

    const [result, setResult] = useState<LumpsumResult | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (mounted) {
            const input: LumpsumInput = {
                investmentAmount,
                expectedReturn,
                duration
            };
            setResult(calculateLumpsum(input));
        }
    }, [mounted, investmentAmount, expectedReturn, duration]);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

    if (!mounted || !result) return <div className="p-8 text-center text-slate-400">Loading calculator...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* === LEFT: INPUTS (4 cols) === */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Coins className="w-5 h-5 text-blue-600" /> Investment Details
                    </h2>

                    <div className="space-y-6">
                        {/* Investment Amount */}
                        <div>
                            <div className="flex justify-between mb-2 items-center">
                                <label className="text-xs font-semibold text-slate-700">Total Investment</label>
                                <span className="text-xs text-slate-500">Min ₹500</span>
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
                                type="range" min="500" max="10000000" step="500"
                                value={investmentAmount}
                                onChange={e => setInvestmentAmount(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>₹500</span>
                                <span>₹1 Cr</span>
                            </div>
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
                                <label className="text-xs font-semibold text-slate-700">Time Period (Years)</label>
                                <span className="text-xs text-slate-500">1 - 30 Years</span>
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
            </div>

            {/* === RIGHT: RESULTS (8 cols) === */}
            <div className="lg:col-span-8 space-y-6">

                {/* Hero Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                    <div className="relative z-10">
                        <p className="text-blue-100 font-medium mb-1">Total Value after {duration} Years</p>
                        <h1 className="text-5xl font-bold mb-4">{formatCurrency(result.maturityValue)}</h1>
                        <div className="flex flex-wrap gap-8 text-sm text-blue-50">
                            <div className="flex flex-col">
                                <span className="text-blue-200 text-xs uppercase tracking-wider">Invested Amount</span>
                                <span className="font-bold text-xl">{formatCurrency(result.totalInvested)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-blue-200 text-xs uppercase tracking-wider">Est. Returns</span>
                                <span className="font-bold text-xl">{formatCurrency(result.wealthGained)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-slate-500" /> Growth Projection
                    </h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={result.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGained" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
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
                                    dataKey="totalValue"
                                    name="Total Value"
                                    stroke="#10B981"
                                    fillOpacity={1}
                                    fill="url(#colorGained)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="investedAmount"
                                    name="Invested Amount"
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#colorInvested)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Growth Table */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-500" /> Yearly Breakdown
                    </h3>
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="w-full text-sm text-left relative">
                            <thead className="bg-slate-50 text-slate-600 font-semibold sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Year</th>
                                    <th className="px-4 py-3">Invested Amount</th>
                                    <th className="px-4 py-3">Wealth Gained</th>
                                    <th className="px-4 py-3 rounded-r-lg">Total Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {result.yearlyData.map((year) => (
                                    <tr key={year.year} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-slate-900">{year.year}</td>
                                        <td className="px-4 py-3 text-slate-600">{formatCurrencyFull(year.investedAmount)}</td>
                                        <td className="px-4 py-3 text-green-600">+{formatCurrencyFull(year.wealthGained)}</td>
                                        <td className="px-4 py-3 font-bold text-slate-900">{formatCurrencyFull(year.totalValue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
