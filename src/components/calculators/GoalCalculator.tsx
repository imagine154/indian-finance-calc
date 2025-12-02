'use client';

import { useState } from 'react';
import { calculateGoalSIP } from '@/core/logic/goal';
import dynamic from 'next/dynamic';
import { Target, Calendar, TrendingUp, Wallet, ArrowRight, Info } from 'lucide-react';

const GoalResultChart = dynamic(() => import('@/components/charts/GoalResultChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse"></div>
});

export function GoalCalculator() {
    // State
    const [targetAmount, setTargetAmount] = useState(5000000);
    const [yearsToGoal, setYearsToGoal] = useState(10);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [inflationRate, setInflationRate] = useState(6);
    const [existingCorpus, setExistingCorpus] = useState(0);
    const [stepUpPercentage, setStepUpPercentage] = useState(10);

    const [adjustInflation, setAdjustInflation] = useState(true);

    // Calculate
    const result = calculateGoalSIP({
        targetAmount,
        yearsToGoal,
        expectedReturn,
        inflationRate: adjustInflation ? inflationRate : 0,
        existingCorpus,
        stepUpPercentage,
    });

    // Formatters
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
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Panel: Inputs (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">

                    {/* Goal Amount */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Target className="w-4 h-4 text-indigo-600" />
                                Goal Cost (Today)
                            </label>
                            <span className="text-lg font-bold text-indigo-600">
                                {formatCompact(targetAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="100000"
                            max="50000000"
                            step="100000"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹1L</span>
                            <span>₹5Cr</span>
                        </div>
                    </div>

                    {/* Time to Goal */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-indigo-600" />
                                Time to Goal
                            </label>
                            <span className="text-lg font-bold text-indigo-600">
                                {yearsToGoal} Years
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={yearsToGoal}
                            onChange={(e) => setYearsToGoal(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>1 Year</span>
                            <span>30 Years</span>
                        </div>
                    </div>

                    {/* Inflation Toggle & Slider */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                                <span className="font-semibold text-slate-800">Adjust for Inflation?</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={adjustInflation}
                                    onChange={(e) => setAdjustInflation(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        {adjustInflation && (
                            <div className="animate-in fade-in slide-in-from-top-2 pt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-slate-700">Inflation Rate</label>
                                    <span className="text-sm font-bold text-indigo-600">{inflationRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="15"
                                    step="0.5"
                                    value={inflationRate}
                                    onChange={(e) => setInflationRate(Number(e.target.value))}
                                    className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>0%</span>
                                    <span>15%</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Existing Corpus */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-indigo-600" />
                                Existing Savings
                            </label>
                            <span className="text-lg font-bold text-indigo-600">
                                {formatCompact(existingCorpus)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="50000"
                            value={existingCorpus}
                            onChange={(e) => setExistingCorpus(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹0</span>
                            <span>₹1Cr</span>
                        </div>
                    </div>

                    {/* Expected Return */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-indigo-600" />
                                Expected Return (ROI)
                            </label>
                            <span className="text-lg font-bold text-indigo-600">
                                {expectedReturn}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="20"
                            step="0.5"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>5%</span>
                            <span>20%</span>
                        </div>
                    </div>

                    {/* Step-Up Percentage */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-indigo-600" />
                                Annual Step-Up
                            </label>
                            <span className="text-lg font-bold text-indigo-600">
                                {stepUpPercentage}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={stepUpPercentage}
                            onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                            className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>0%</span>
                            <span>20%</span>
                        </div>
                    </div>

                </div>

                {/* Right Panel: Results (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">

                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium mb-2">You need to save</p>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                    {formatCurrency(result.monthlySIP)}
                                    <span className="text-lg font-normal text-indigo-200">/month</span>
                                </h2>
                                <p className="text-xs text-indigo-200 opacity-80">
                                    *Assuming {stepUpPercentage}% annual step-up in SIP
                                </p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                <p className="text-xs text-indigo-100 mb-1">Target Corpus</p>
                                <p className="text-lg font-bold">{formatCompact(result.futureCost)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Reality Check */}
                    {adjustInflation && (
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-4">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-600 mt-1">
                                <Info className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-900 mb-1 text-sm">Inflation Reality Check</h3>
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    To buy what costs <span className="font-bold">{formatCompact(targetAmount)}</span> today,
                                    you will need <span className="font-bold">{formatCompact(result.futureCost)}</span> after {yearsToGoal} years
                                    (at {inflationRate}% inflation).
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Wealth Projection</h3>

                        <GoalResultChart data={result.yearlyData} formatCurrency={formatCurrency} />
                        <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-slate-400 rounded-full opacity-50"></div>
                                <span>Existing Assets</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full opacity-50"></div>
                                <span>New SIP</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5 bg-red-500 border-t border-dashed border-red-500"></div>
                                <span>Target Goal</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
