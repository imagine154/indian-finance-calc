'use client';

import { useState } from 'react';
import { calculateMSSC } from '@/core/logic/mssc';
import { Wallet, TrendingUp, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RelatedCalculators } from "../ui/RelatedCalculators";

export function MsscCalculator() {
    const [investmentAmount, setInvestmentAmount] = useState(200000);

    const result = calculateMSSC({
        investmentAmount,
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
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

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Inputs (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Investment Amount */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-fuchsia-100">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-fuchsia-500" />
                                Investment Amount
                            </label>
                            <span className="text-lg font-bold text-fuchsia-600">
                                {formatCompact(investmentAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="200000"
                            step="1000"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                            className="w-full h-2 bg-fuchsia-100 rounded-lg appearance-none cursor-pointer accent-fuchsia-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹1K</span>
                            <span>₹2.00 L (Max)</span>
                        </div>
                    </div>

                    {/* Scheme Info */}
                    <div className="bg-fuchsia-50 rounded-2xl p-6 border border-fuchsia-100">
                        <h3 className="text-sm font-bold text-fuchsia-800 mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Scheme Details
                        </h3>
                        <ul className="space-y-2 text-sm text-fuchsia-700">
                            <li className="flex justify-between">
                                <span>Interest Rate:</span>
                                <span className="font-bold">7.5% p.a.</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Tenure:</span>
                                <span className="font-bold">2 Years</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Compounding:</span>
                                <span className="font-bold">Quarterly</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Max Investment:</span>
                                <span className="font-bold">₹2 Lakhs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Panel: Results (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Hero Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                            <p className="text-sm text-fuchsia-100 mb-1">Maturity Value (After 2 Years)</p>
                            <p className="text-3xl font-bold mb-2">{formatCompact(result.maturityAmount)}</p>
                            <p className="text-xs text-fuchsia-100 opacity-80">
                                Total Interest: {formatCompact(result.totalInterest)}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <p className="text-sm text-slate-500 mb-1">Principal Amount</p>
                            <p className="text-3xl font-bold text-slate-900 mb-2">
                                {formatCompact(investmentAmount)}
                            </p>
                            <p className="text-xs text-slate-500">
                                One-time investment
                            </p>
                        </div>
                    </div>

                    {/* Timeline Visual */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-700 mb-4">Investment Timeline</h3>
                        <div className="relative pt-8 pb-2">
                            <div className="h-2 bg-slate-100 rounded-full flex overflow-hidden">
                                <div className="h-full bg-fuchsia-500 w-full"></div>
                            </div>

                            {/* Markers */}
                            <div className="absolute top-0 left-0 -translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs text-slate-400 mb-1">Start</span>
                                <div className="w-0.5 h-4 bg-slate-300"></div>
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs text-slate-400 mb-1">1 Year</span>
                                <div className="w-0.5 h-4 bg-slate-300"></div>
                                <span className="text-[10px] text-fuchsia-600 mt-3 bg-fuchsia-50 px-1 rounded">Partial Withdrawal Allowed</span>
                            </div>
                            <div className="absolute top-0 right-0 translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs text-slate-400 mb-1">Maturity (2Y)</span>
                                <div className="w-0.5 h-4 bg-slate-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-fuchsia-600" />
                            Growth Chart
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={result.quarterlyBreakdown}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#c026d3" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#c026d3" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(value) => `M${value}`}
                                    />
                                    <YAxis
                                        hide={true}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [formatCurrency(value), 'Balance']}
                                        labelFormatter={(label) => `Month ${label}`}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="closingBalance"
                                        stroke="#c026d3"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/mssc" category="govt" />
        </div>
    );
}
