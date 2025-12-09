/**
 * Interactive SIP Calculator Component
 * Uses core logic from @/core/logic/sip.ts
 * Features: Sliders, Donut Chart, Summary Cards
 */

'use client';

import { useState } from 'react';
import { calculateSIP } from '@/core/logic/sip';
import dynamic from 'next/dynamic';
import { Target, TrendingUp, Wallet } from 'lucide-react';

import { RelatedCalculators } from "../ui/RelatedCalculators";

const SipResultChart = dynamic(() => import('@/components/charts/SipResultChart'), {
    ssr: false,
    loading: () => <div className="w-full h-[250px] flex items-center justify-center bg-slate-50 rounded-lg animate-pulse"></div>
});

interface SipCalculatorProps {
    initialInvestment?: number;
    initialRate?: number;
    initialDuration?: number;
}

export function SipCalculator({
    initialInvestment = 5000,
    initialRate = 12,
    initialDuration = 10
}: SipCalculatorProps) {
    // State for inputs
    const [monthlyInvestment, setMonthlyInvestment] = useState(initialInvestment);
    const [expectedReturn, setExpectedReturn] = useState(initialRate);
    const [timePeriod, setTimePeriod] = useState(initialDuration);
    const [lumpsum, setLumpsum] = useState(0);
    const [stepUp, setStepUp] = useState(0);

    // Calculate results
    const result = calculateSIP(monthlyInvestment, expectedReturn, timePeriod, stepUp, lumpsum);

    // Calculate comparison (without Step-Up)
    const resultNoStepUp = calculateSIP(monthlyInvestment, expectedReturn, timePeriod, 0, lumpsum);
    const extraWealth = result.estimatedReturns - resultNoStepUp.estimatedReturns;

    // Chart data
    const chartData = [
        { name: 'Invested Amount', value: result.totalInvestment, color: '#3B82F6' },
        { name: 'Est. Returns', value: result.estimatedReturns, color: '#10B981' },
    ];

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Format number with suffix
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
                {/* Left Panel: Inputs */}
                <div className="lg:col-span-4 space-y-4">
                    {/* Monthly Investment Slider */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-blue-600" />
                                Monthly Investment
                            </label>
                            <span className="text-lg font-bold text-blue-600">
                                {formatCurrency(monthlyInvestment)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="100000"
                            step="500"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹500</span>
                            <span>₹1,00,000</span>
                        </div>
                    </div>

                    {/* Expected Return Slider */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                Expected Return Rate
                            </label>
                            <span className="text-lg font-bold text-green-600">
                                {expectedReturn}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="0.5"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>1%</span>
                            <span>30%</span>
                        </div>
                    </div>

                    {/* Time Period Slider */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-600" />
                                Time Period
                            </label>
                            <span className="text-lg font-bold text-purple-600">
                                {timePeriod} {timePeriod === 1 ? 'Year' : 'Years'}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            step="1"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(Number(e.target.value))}
                            className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>1 Year</span>
                            <span>40 Years</span>
                        </div>
                    </div>

                    {/* Lumpsum & Step-Up Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Lumpsum Input */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-orange-600" />
                                    Initial Investment (Lumpsum)
                                </label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                <input
                                    type="number"
                                    step="1000"
                                    value={lumpsum === 0 ? '' : lumpsum}
                                    onChange={(e) => setLumpsum(Number(e.target.value))}
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                {formatCompact(lumpsum)}
                            </p>
                        </div>

                        {/* Step-Up Slider */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                                    Annual Step-Up %
                                </label>
                                <span className="text-lg font-bold text-indigo-600">
                                    {stepUp}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="1"
                                value={stepUp}
                                onChange={(e) => setStepUp(Number(e.target.value))}
                                className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <p className="text-[10px] text-slate-500 mt-2 text-center">
                                Increase SIP amount every year
                            </p>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
                            <p className="text-xs font-medium text-blue-700 mb-1">Invested Amount</p>
                            <p className="text-2xl font-bold text-blue-900">
                                {formatCompact(result.totalInvestment)}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
                            <p className="text-xs font-medium text-green-700 mb-1">Est. Returns</p>
                            <p className="text-2xl font-bold text-green-900">
                                {formatCompact(result.estimatedReturns)}
                            </p>
                        </div>
                    </div>

                    {/* Total Value Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                        <p className="text-sm font-medium text-slate-300 mb-2">Total Future Value</p>
                        <p className="text-4xl font-bold mb-1">{formatCompact(result.totalValue)}</p>
                        <p className="text-sm text-slate-400">
                            after {timePeriod} {timePeriod === 1 ? 'year' : 'years'}
                        </p>
                    </div>
                </div>

                {/* Right Panel: Chart */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Investment Breakdown</h3>

                    {/* Donut Chart */}
                    <div className="flex-1 flex items-center justify-center">
                        <SipResultChart data={chartData} formatCurrency={formatCurrency} />
                    </div>

                    {/* Legend */}
                    <div className="space-y-3 mt-6">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                                <span className="text-sm font-medium text-slate-700">Invested Amount</span>
                            </div>
                            <span className="text-sm font-bold text-blue-900">
                                {formatCurrency(result.totalInvestment)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-green-600"></div>
                                <span className="text-sm font-medium text-slate-700">Estimated Returns</span>
                            </div>
                            <span className="text-sm font-bold text-green-900">
                                {formatCurrency(result.estimatedReturns)}
                            </span>
                        </div>
                    </div>

                    {/* Wealth Gained Info */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-900">Wealth Gained</span>
                        </div>
                        <p className="text-2xl font-bold text-emerald-700">
                            {formatCompact(result.estimatedReturns)}
                        </p>
                        <p className="text-xs text-emerald-600 mt-1">
                            {((result.estimatedReturns / result.totalInvestment) * 100).toFixed(1)}% growth on your investment
                        </p>
                    </div>

                    {/* Step-Up Impact Card (Conditional) */}
                    {stepUp > 0 && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                                <span className="text-sm font-semibold text-indigo-900">Power of Step-Up</span>
                            </div>
                            <p className="text-sm text-indigo-800">
                                By increasing your SIP by <span className="font-bold">{stepUp}%</span> annually, you earned an extra{' '}
                                <span className="font-bold text-indigo-700">{formatCompact(extraWealth)}</span>!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                    <strong>Disclaimer:</strong> This calculator provides estimates based on the inputs provided.
                    Actual returns may vary depending on market conditions. Past performance is not indicative of future results.
                </p>
            </div>

            <RelatedCalculators toolId="sip" category="investments" />
        </div>
    );
}

