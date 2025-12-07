'use client';

import { useState } from 'react';
import { calculateNPS, type NpsInput, type NpsResult } from '@/core/logic/nps';
import dynamic from 'next/dynamic';
import { IndianRupee, TrendingUp, PieChart as PieIcon, Wallet, PiggyBank, Percent, Calendar, Settings } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";

const NpsPieChart = dynamic(() => import('@/components/charts/NpsResultChart').then(mod => mod.NpsPieChart), { ssr: false, loading: () => <div className="h-[250px] w-full bg-slate-50 rounded-lg animate-pulse"></div> });
const NpsAreaChart = dynamic(() => import('@/components/charts/NpsResultChart').then(mod => mod.NpsAreaChart), { ssr: false, loading: () => <div className="h-[250px] w-full bg-slate-50 rounded-lg animate-pulse"></div> });

export function NpsCalculator() {
    // --- INPUTS ---
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [currentAge, setCurrentAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(60);
    const [expectedReturn, setExpectedReturn] = useState(10);
    const [annuityPercentage, setAnnuityPercentage] = useState(40);
    const [annuityRate, setAnnuityRate] = useState(6);

    // ✅ Derived State (Calculated on every render, SSR friendly)
    const input: NpsInput = {
        currentAge,
        retirementAge,
        monthlyContribution,
        expectedReturn,
        annuityPercentage,
        annuityRate
    };
    const result = calculateNPS(input);

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

    const pieData = [
        { name: 'Lump Sum (Cash)', value: result.lumpSumValue, color: '#10B981' }, // Green
        { name: 'Annuity (Pension)', value: result.annuityValue, color: '#3B82F6' }, // Blue
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* === LEFT: INPUTS (4 cols) === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-blue-600" /> Investment Details
                        </h2>

                        <div className="space-y-6">
                            {/* Monthly Investment */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Monthly Investment</label>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {formatCurrencyFull(monthlyContribution)}
                                    </span>
                                </div>
                                <input
                                    type="range" min="500" max="150000" step="500"
                                    value={monthlyContribution}
                                    onChange={e => setMonthlyContribution(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-3"
                                />
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={monthlyContribution}
                                        onChange={e => setMonthlyContribution(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="500"
                                    />
                                </div>
                            </div>

                            {/* Age Group */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Current Age</label>
                                    <input
                                        type="number"
                                        value={currentAge}
                                        onChange={e => setCurrentAge(Number(e.target.value))}
                                        className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Retirement Age</label>
                                    <input
                                        type="number"
                                        min={currentAge + 1}
                                        value={retirementAge}
                                        onChange={e => setRetirementAge(Number(e.target.value))}
                                        className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Expected Return */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Expected Return (ROI)</label>
                                    <span className="text-xs font-bold text-blue-600">{expectedReturn}%</span>
                                </div>
                                <input
                                    type="range" min="5" max="20" step="0.5"
                                    value={expectedReturn}
                                    onChange={e => setExpectedReturn(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setExpectedReturn(10)}>Conservative (10%)</span>
                                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setExpectedReturn(12)}>Moderate (12%)</span>
                                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setExpectedReturn(14)}>Aggressive (14%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Withdrawal Settings */}
                    <div className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-slate-500" /> Withdrawal Settings
                        </h2>
                        <div className="space-y-6">
                            {/* Annuity Percentage */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Annuity Reinvestment %</label>
                                    <span className="text-xs font-bold text-blue-600">{annuityPercentage}%</span>
                                </div>
                                <input
                                    type="range" min="40" max="100" step="5"
                                    value={annuityPercentage}
                                    onChange={e => setAnnuityPercentage(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <p className="text-xs text-slate-500 mt-1">Min 40% is mandatory for annuity.</p>
                            </div>

                            {/* Annuity Rate */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Expected Annuity Rate %</label>
                                    <span className="text-xs font-bold text-blue-600">{annuityRate}%</span>
                                </div>
                                <input
                                    type="range" min="5" max="10" step="0.5"
                                    value={annuityRate}
                                    onChange={e => setAnnuityRate(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT: RESULTS (8 cols) === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pension Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 text-blue-100">
                                    <PiggyBank className="w-5 h-5" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Monthly Pension</span>
                                </div>
                                <div className="text-4xl font-bold mb-2">{formatCurrencyFull(result.monthlyPension)}</div>
                                <p className="text-blue-200 text-sm">Estimated monthly income post-retirement</p>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                                <Wallet className="w-32 h-32" />
                            </div>
                        </div>

                        {/* Corpus Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-2 text-slate-500">
                                <TrendingUp className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wider">Total Corpus</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-2">{formatCurrency(result.totalCorpus)}</div>
                            <div className="flex gap-4 text-sm mt-4">
                                <div>
                                    <span className="block text-xs text-slate-500">Invested</span>
                                    <span className="font-bold text-slate-700">{formatCurrency(result.totalInvested)}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500">Gain</span>
                                    <span className="font-bold text-green-600">+{formatCurrency(result.totalInterest)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pie Chart: Lump Sum vs Annuity */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <PieIcon className="w-5 h-5 text-slate-500" /> Withdrawal Split
                            </h3>
                            <NpsPieChart data={pieData} formatCurrencyFull={formatCurrencyFull} formatCurrency={formatCurrency} totalCorpus={result.totalCorpus} />
                        </div>

                        {/* Area Chart: Growth */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-slate-500" /> Wealth Growth
                            </h3>
                            <NpsAreaChart data={result.yearlyData} formatCurrencyFull={formatCurrencyFull} />
                        </div>
                    </div>

                    {/* Summary Table */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-500" /> Retirement Summary
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-600 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Component</th>
                                        <th className="px-4 py-3 text-right rounded-r-lg">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-4 py-3 text-slate-600">Total Invested Amount</td>
                                        <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrencyFull(result.totalInvested)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-slate-600">Total Interest Earned</td>
                                        <td className="px-4 py-3 text-right font-medium text-green-600">+{formatCurrencyFull(result.totalInterest)}</td>
                                    </tr>
                                    <tr className="bg-blue-50/50">
                                        <td className="px-4 py-3 font-bold text-slate-900">Total Corpus Generated</td>
                                        <td className="px-4 py-3 text-right font-bold text-blue-700">{formatCurrencyFull(result.totalCorpus)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-slate-600">Lump Sum Withdrawal ({100 - annuityPercentage}%)</td>
                                        <td className="px-4 py-3 text-right font-medium text-emerald-600">{formatCurrencyFull(result.lumpSumValue)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-slate-600">Annuity Reinvestment ({annuityPercentage}%)</td>
                                        <td className="px-4 py-3 text-right font-medium text-blue-600">{formatCurrencyFull(result.annuityValue)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/nps" category="govt" />
        </div>
    );
}
