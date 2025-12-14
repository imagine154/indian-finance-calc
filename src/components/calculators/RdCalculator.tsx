'use client';

import { useState } from 'react';
import { calculateRD, type RdInput } from '@/core/logic/rd';
import dynamic from 'next/dynamic';
import { IndianRupee, TrendingUp, Calendar, PiggyBank } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";
import ShareResult from '@/components/common/ShareResult';

const RdResultChart = dynamic(() => import('@/components/charts/RdResultChart'), {
    ssr: false,
    loading: () => <div className="w-full h-[300px] flex items-center justify-center bg-slate-50 rounded-lg animate-pulse"></div>
});

const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
};

const formatCurrencyFull = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

export function RdCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [interestRate, setInterestRate] = useState(7);
    const [timePeriodYears, setTimePeriodYears] = useState(5);

    const input: RdInput = {
        monthlyInvestment,
        interestRate,
        timePeriodYears
    };

    const result = calculateRD(input);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <PiggyBank className="w-5 h-5 text-teal-600" /> RD Details
                        </h2>

                        <div className="space-y-6">
                            {/* Monthly Investment */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Monthly Investment</label>
                                    <span className="text-xs text-slate-500">Min ₹500</span>
                                </div>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        step="500"
                                        min="500"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCurrency(monthlyInvestment)}
                                </p>
                                <input
                                    type="range"
                                    min="500"
                                    max="100000"
                                    step="500"
                                    value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-3"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                    <span>₹500</span>
                                    <span>₹1L</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Interest Rate (%)</label>
                                    <span className="text-xs text-slate-500">1% - 15%</span>
                                </div>
                                <div className="relative">
                                    <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        step="0.1"
                                        min="1"
                                        max="15"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="15"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-3"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                    <span>1%</span>
                                    <span>15%</span>
                                </div>
                            </div>

                            {/* Time Period */}
                            <div>
                                <div className="flex justify-between mb-2 items-center">
                                    <label className="text-xs font-semibold text-slate-700">Time Period (Years)</label>
                                    <span className="text-xs text-slate-500">1 - 10 Years</span>
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        value={timePeriodYears}
                                        onChange={(e) => setTimePeriodYears(Number(e.target.value))}
                                        className="w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        min="1"
                                        max="10"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={timePeriodYears}
                                    onChange={(e) => setTimePeriodYears(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-3"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                    <span>1Y</span>
                                    <span>10Y</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Results */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                        <div className="relative z-10">
                            <p className="text-teal-100 font-medium mb-1">Maturity Amount</p>
                            <h1 className="text-5xl font-bold mb-2">{formatCurrency(result.maturityAmount)}</h1>
                            <p className="text-sm text-teal-100 mb-6">
                                Maturity Date: <span className="font-semibold text-white">{result.maturityDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </p>

                            <div className="grid grid-cols-2 gap-8 text-sm text-teal-50">
                                <div className="flex flex-col p-3 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm">
                                    <span className="text-teal-200 text-xs uppercase tracking-wider mb-1">Total Limit Invested</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInvestment)}</span>
                                </div>
                                <div className="flex flex-col p-3 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm">
                                    <span className="text-teal-200 text-xs uppercase tracking-wider mb-1">Total Interest</span>
                                    <span className="font-bold text-xl">{formatCurrency(result.totalInterest)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-teal-600" /> Growth Chart
                        </h3>
                        <RdResultChart data={result.yearlyData} formatCurrency={formatCurrencyFull} />

                        <div className="mt-4 p-4 bg-teal-50 rounded-xl border border-teal-100 text-sm text-teal-800">
                            <p>
                                <strong>Note:</strong> Interest is compounded quarterly as per standard Indian Recurring Deposit rules.
                                Returns shown are indicative.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <ShareResult
                                title="RD Calculation"
                                text={`I can save ${formatCurrency(result.maturityAmount)} with a monthly RD of ${formatCurrency(monthlyInvestment)}! Calculate yours here:`}
                                url={typeof window !== 'undefined' ? window.location.href : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <RelatedCalculators toolId="rd" category="investments" />
        </div>
    );
}
