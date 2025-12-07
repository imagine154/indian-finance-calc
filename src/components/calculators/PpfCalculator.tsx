'use client';

import { useState, useEffect } from 'react';
import { calculatePPF, type PpfInput, type PpfResult } from '@/core/logic/ppf';
import { IndianRupee, TrendingUp, Calendar, PiggyBank, Clock } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function PpfCalculator() {
    // --- INPUTS ---
    const [yearlyInvestment, setYearlyInvestment] = useState(150000);
    const [duration, setDuration] = useState(15);
    const [interestRate, setInterestRate] = useState(7.1);

    const input: PpfInput = {
        yearlyInvestment,
        duration,
        interestRate
    };
    const result = calculatePPF(input);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;



    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* === LEFT: INPUTS (4 cols) === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <PiggyBank className="w-5 h-5 text-blue-600" /> PPF Details
                        </h2>

                        <div className="space-y-6">
                            {/* Yearly Investment */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Yearly Investment</label>
                                    <span className="text-xs text-slate-500">Max ₹1.5L</span>
                                </div>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={yearlyInvestment}
                                        onChange={e => {
                                            let val = Number(e.target.value);
                                            if (val > 150000) val = 150000;
                                            setYearlyInvestment(val);
                                        }}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="500"
                                        max="150000"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(yearlyInvestment)}
                                </p>
                                <input
                                    type="range" min="500" max="150000" step="500"
                                    value={yearlyInvestment}
                                    onChange={e => setYearlyInvestment(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Duration (Years)</label>
                                    <span className="text-xs text-slate-500">15 - 50 Years</span>
                                </div>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={e => {
                                            let val = Number(e.target.value);
                                            if (val > 50) val = 50;
                                            setDuration(val);
                                        }}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        min="15"
                                        max="50"
                                    />
                                </div>
                                <input
                                    type="range" min="15" max="50" step="1"
                                    value={duration}
                                    onChange={e => setDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Interest Rate %</label>
                                    <span className="text-xs text-slate-500">Current: 7.1%</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={interestRate}
                                        onChange={e => setInterestRate(Number(e.target.value))}
                                        className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="0.1"
                                    />
                                </div>
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
                            <p className="text-blue-100 font-medium mb-1">Maturity Amount after {duration} Years</p>
                            <h1 className="text-5xl font-bold mb-4">{formatCurrency(result.maturityAmount)}</h1>
                            <div className="flex flex-wrap gap-8 text-sm text-blue-50">
                                <div className="flex flex-col">
                                    <span className="text-blue-200 text-xs uppercase tracking-wider">Total Invested</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInvested)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-blue-200 text-xs uppercase tracking-wider">Total Interest</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInterest)}</span>
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
                                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
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
                                        dataKey="closingBalance"
                                        name="Total Value"
                                        stroke="#10B981"
                                        fillOpacity={1}
                                        fill="url(#colorInterest)"
                                        strokeWidth={2}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="openingBalance" // Using opening balance as proxy for invested accumulation for visualization simplicity, or we can calculate cumulative invested
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
                                        <th className="px-4 py-3">Opening Balance</th>
                                        <th className="px-4 py-3">Deposit</th>
                                        <th className="px-4 py-3">Interest</th>
                                        <th className="px-4 py-3 rounded-r-lg">Closing Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {result.yearlyData.map((year) => (
                                        <tr key={year.year} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-900">{year.year}</td>
                                            <td className="px-4 py-3 text-slate-600">{formatCurrencyFull(year.openingBalance)}</td>
                                            <td className="px-4 py-3 text-slate-600">{formatCurrencyFull(year.deposit)}</td>
                                            <td className="px-4 py-3 text-green-600">+{formatCurrencyFull(year.interest)}</td>
                                            <td className="px-4 py-3 font-bold text-slate-900">{formatCurrencyFull(year.closingBalance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/ppf" category="investments" />
        </div>
    );
}
