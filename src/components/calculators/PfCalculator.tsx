'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateEPFCorpus, type EpfInput, type EpfResult } from '@/core/logic/pf';
import dynamic from 'next/dynamic';
import { IndianRupee, TrendingUp, Calendar, Wallet, PiggyBank, Percent } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";

const PfResultChart = dynamic(() => import('@/components/charts/PfResultChart'), {
    ssr: false,
    loading: () => <div className="h-[350px] w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse"></div>
});

export function PfCalculator() {
    // --- INPUTS ---
    const [currentAge, setCurrentAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(58);
    const [ctc, setCtc] = useState(1200000);
    const [basicPercentage, setBasicPercentage] = useState(50);
    const [vpfAmount, setVpfAmount] = useState(0);
    const [annualIncrease, setAnnualIncrease] = useState(10);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [interestRate, setInterestRate] = useState(8.25);

    // Calculate monthly basic from CTC
    const monthlyBasic = (ctc * (basicPercentage / 100)) / 12;

    const input: EpfInput = {
        currentAge,
        retirementAge,
        basicSalary: monthlyBasic,
        vpfAmount,
        annualIncrease,
        currentBalance,
        interestRate
    };

    // ✅ Derived State (Calculated on every render, SSR friendly)
    const result = calculateEPFCorpus(input);

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
                            <PiggyBank className="w-5 h-5 text-blue-600" /> EPF Details
                        </h2>

                        <div className="space-y-6">
                            {/* Age Group */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Current Age</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={currentAge}
                                            onChange={e => setCurrentAge(Number(e.target.value))}
                                            className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            step="1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Retirement Age</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={retirementAge}
                                            onChange={e => setRetirementAge(Number(e.target.value))}
                                            className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            step="1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTC Input */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Annual CTC</label>
                                    <Link href="/calculators/salary" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                        Check Salary ↗
                                    </Link>
                                </div>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={ctc}
                                        onChange={e => setCtc(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="1000"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(ctc)}
                                </p>
                            </div>

                            {/* Basic Salary % */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Basic Salary %</label>
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="number"
                                            min="10"
                                            max="60"
                                            value={basicPercentage}
                                            onChange={e => {
                                                const val = Number(e.target.value);
                                                if (val >= 0 && val <= 100) setBasicPercentage(val);
                                            }}
                                            className="w-12 px-1 py-1 text-xs font-bold text-blue-600 border border-slate-300 rounded text-right"
                                        />
                                        <span className="text-xs font-bold text-blue-600">%</span>
                                    </div>
                                </div>
                                <input
                                    type="range" min="10" max="60" step="1"
                                    value={basicPercentage}
                                    onChange={e => setBasicPercentage(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Monthly Basic: <span className="font-medium text-slate-700">{formatCurrencyFull((ctc * basicPercentage / 100) / 12)}</span>
                                </p>
                            </div>

                            {/* Current Balance */}
                            <div>
                                <label className="text-xs font-semibold text-slate-700 mb-2 block">Current EPF Balance</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={currentBalance}
                                        onChange={e => setCurrentBalance(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        step="1000"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(currentBalance)}
                                </p>
                            </div>

                            {/* Hike & VPF */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Annual Hike %</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                        <input
                                            type="number"
                                            value={annualIncrease}
                                            onChange={e => setAnnualIncrease(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            step="1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Monthly VPF</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                        <input
                                            type="number"
                                            value={vpfAmount}
                                            onChange={e => setVpfAmount(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            step="500"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                        {formatCurrency(vpfAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <label className="text-xs font-semibold text-slate-700 mb-2 block">Interest Rate %</label>
                                <input
                                    type="number"
                                    value={interestRate}
                                    onChange={e => setInterestRate(Number(e.target.value))}
                                    className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    step="0.05"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT: RESULTS (8 cols) === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                        <div className="relative z-10">
                            <p className="text-emerald-100 font-medium mb-1">Projected EPF Corpus at Age {retirementAge}</p>
                            <h1 className="text-5xl font-bold mb-4">{formatCurrency(result.totalCorpus)}</h1>
                            <div className="flex flex-wrap gap-8 text-sm text-emerald-50">
                                <div className="flex flex-col">
                                    <span className="text-emerald-200 text-xs uppercase tracking-wider">Total Invested</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInvested)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-emerald-200 text-xs uppercase tracking-wider">Interest Earned</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInterest)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-emerald-200 text-xs uppercase tracking-wider">Monthly Contribution</span>
                                    <span className="font-bold text-xl">{formatCurrencyFull((ctc * (basicPercentage / 100) / 12) * 0.12 + vpfAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-slate-500" /> Growth Projection
                        </h3>
                        <PfResultChart data={result.yearlyData} formatCurrencyFull={formatCurrencyFull} />
                    </div>

                    {/* Growth Table */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-500" /> Yearly Growth
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-600 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Age</th>
                                        <th className="px-4 py-3">Invested Amount</th>
                                        <th className="px-4 py-3">Interest Earned</th>
                                        <th className="px-4 py-3 rounded-r-lg">Total Corpus</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {result.yearlyData.map((year) => (
                                        <tr key={year.age} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-900">{year.age}</td>
                                            <td className="px-4 py-3 text-slate-600">{formatCurrencyFull(year.invested)}</td>
                                            <td className="px-4 py-3 text-green-600">+{formatCurrencyFull(year.interest)}</td>
                                            <td className="px-4 py-3 font-bold text-slate-900">{formatCurrencyFull(year.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <RelatedCalculators toolId="pf" category="income" />
        </div>
    );
}
