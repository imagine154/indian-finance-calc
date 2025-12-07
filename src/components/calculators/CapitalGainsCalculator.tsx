'use client';

import { useState, useEffect } from 'react';
import { calculateCapitalGains, type AssetType, type CapitalGainsInput, type CapitalGainsResult } from '@/core/logic/capital-gains';
import { IndianRupee, TrendingUp, Calendar, Percent, Coins, Building2, Landmark, Banknote } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function CapitalGainsCalculator() {
    // --- INPUTS ---
    const [assetType, setAssetType] = useState<AssetType>('Equity');
    const [purchasePrice, setPurchasePrice] = useState(100000);
    const [salePrice, setSalePrice] = useState(150000);
    const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(13);
    const [userIncomeSlab, setUserIncomeSlab] = useState(30);

    const input: CapitalGainsInput = {
        assetType,
        purchasePrice,
        salePrice,
        holdingPeriodMonths,
        userIncomeSlab
    };
    const result = calculateCapitalGains(input);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;



    const chartData = [
        { name: 'Total Profit', value: result.capitalGain, color: '#4F46E5' }, // Indigo-600
        { name: 'Tax', value: result.taxPayable, color: '#EF4444' }, // Red-500
        { name: 'Net Profit', value: result.postTaxProfit, color: '#10B981' }, // Emerald-500
    ];

    const assetOptions: { id: AssetType; label: string; icon: any }[] = [
        { id: 'Equity', label: 'Equity / Stocks', icon: TrendingUp },
        { id: 'DebtFund', label: 'Debt Funds', icon: Banknote },
        { id: 'RealEstate', label: 'Real Estate', icon: Building2 },
        { id: 'Gold', label: 'Gold', icon: Coins },
        { id: 'FD', label: 'Fixed Deposit', icon: Landmark },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* === LEFT: INPUTS (5 cols) === */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Asset Selection */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Coins className="w-5 h-5 text-indigo-600" /> Asset Class
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {assetOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setAssetType(option.id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${assetType === option.id
                                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <option.icon className={`w-6 h-6 mb-2 ${assetType === option.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                                    <span className="text-xs font-semibold">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Investment Details */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-indigo-600" /> Investment Details
                        </h2>

                        {/* Purchase Price */}
                        <div>
                            <div className="flex justify-between mb-2 items-center">
                                <label className="text-xs font-semibold text-slate-700">Purchase Price</label>
                            </div>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    value={purchasePrice}
                                    onChange={e => setPurchasePrice(Number(e.target.value))}
                                    className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Sale Price */}
                        <div>
                            <div className="flex justify-between mb-2 items-center">
                                <label className="text-xs font-semibold text-slate-700">Sale Price</label>
                            </div>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    value={salePrice}
                                    onChange={e => setSalePrice(Number(e.target.value))}
                                    className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Holding Period */}
                        <div>
                            <div className="flex justify-between mb-2 items-center">
                                <label className="text-xs font-semibold text-slate-700">Holding Period (Months)</label>
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                                    {holdingPeriodMonths} Months
                                </span>
                            </div>
                            <input
                                type="range" min="1" max="120" step="1"
                                value={holdingPeriodMonths}
                                onChange={e => setHoldingPeriodMonths(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>1 Month</span>
                                <span>10 Years</span>
                            </div>
                        </div>

                        {/* Tax Slab */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 mb-2 block">Your Income Tax Slab</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={userIncomeSlab}
                                    onChange={e => setUserIncomeSlab(Number(e.target.value))}
                                    className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                >
                                    <option value="0">0% (No Tax)</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="15">15%</option>
                                    <option value="20">20%</option>
                                    <option value="30">30%</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

                {/* === RIGHT: RESULTS (7 cols) === */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                        <div className="relative z-10">
                            <p className="text-indigo-100 font-medium mb-1">Tax Payable</p>
                            <h1 className="text-5xl font-bold mb-4">{formatCurrency(result.taxPayable)}</h1>

                            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                                <span className="font-semibold">{result.taxType} Gain</span>
                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                <span>{result.taxRateApplied}</span>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 mb-1">Total Profit</p>
                            <p className="text-lg font-bold text-green-600">+{formatCurrency(result.capitalGain)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 mb-1">Exemption Used</p>
                            <p className="text-lg font-bold text-slate-700">{formatCurrency(result.exemptionApplied)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 mb-1">Post-Tax Return</p>
                            <p className="text-lg font-bold text-indigo-600">{formatCurrency(result.postTaxProfit)}</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-slate-500" /> Profit Distribution
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                                        width={80}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#F1F5F9' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                                                        <p className="text-slate-500 text-xs mb-1">{data.name}</p>
                                                        <p className="text-slate-900 font-bold text-lg">{formatCurrencyFull(data.value)}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 text-sm text-indigo-800">
                        <p>
                            <strong>Note:</strong> Calculations are based on FY 2025-26 rules.
                            LTCG on Equity is 12.5% above ₹1.25 Lakhs.
                            Real Estate LTCG is 12.5% without indexation.
                        </p>
                    </div>

                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/capital-gains" category="income" />
        </div>
    );
}
