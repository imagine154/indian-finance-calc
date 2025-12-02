'use client';

import { useState } from 'react';
import { calculateSSY } from '@/core/logic/ssy';
import dynamic from 'next/dynamic';
import { Wallet, Calendar, GraduationCap, TrendingUp, Info, Baby } from 'lucide-react';

const SsyResultChart = dynamic(() => import('@/components/charts/SsyResultChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse"></div>
});

export function SsyCalculator() {
    // State
    const [girlAge, setGirlAge] = useState(5);
    const [investmentAmount, setInvestmentAmount] = useState(150000);
    const [startYear, setStartYear] = useState(new Date().getFullYear());

    // Education Plan State
    const [planEducation, setPlanEducation] = useState(false);
    const [withdrawalAge, setWithdrawalAge] = useState(18);
    const [withdrawalPercentage, setWithdrawalPercentage] = useState(50);

    // Calculate
    const result = calculateSSY({
        girlAge,
        startYear,
        investmentFrequency: 'Yearly', // Defaulting to Yearly for simplicity in UI as per request context implying annual limits
        investmentAmount,
        interestRate: 8.2,
        withdrawalAge: planEducation ? withdrawalAge : null,
        withdrawalPercentage: planEducation ? withdrawalPercentage : 0,
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Inputs (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Girl's Age */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Baby className="w-4 h-4 text-rose-500" />
                                Girl's Age
                            </label>
                            <span className="text-lg font-bold text-rose-600">
                                {girlAge} Years
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={girlAge}
                            onChange={(e) => setGirlAge(Number(e.target.value))}
                            className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>0 Years</span>
                            <span>10 Years (Max)</span>
                        </div>
                    </div>

                    {/* Investment Amount */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-rose-500" />
                                Yearly Investment
                            </label>
                            <span className="text-lg font-bold text-rose-600">
                                {formatCompact(investmentAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="150000"
                            step="1000"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                            className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹1K</span>
                            <span>₹1.5L (Max)</span>
                        </div>
                    </div>

                    {/* Start Year */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-rose-500" />
                                Start Year
                            </label>
                            <span className="text-lg font-bold text-rose-600">
                                {startYear}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={new Date().getFullYear()}
                            max={new Date().getFullYear() + 5}
                            step="1"
                            value={startYear}
                            onChange={(e) => setStartYear(Number(e.target.value))}
                            className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                        />
                    </div>

                    {/* Education Plan Toggle */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-rose-600" />
                                <span className="font-semibold text-slate-800">Plan for Education?</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={planEducation}
                                    onChange={(e) => setPlanEducation(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                            </label>
                        </div>

                        {planEducation && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 pt-2">
                                {/* Withdrawal Age */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-slate-700">Withdrawal Age</label>
                                        <span className="text-sm font-bold text-rose-600">{withdrawalAge} Years</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={Math.max(18, girlAge + 1)}
                                        max="21"
                                        step="1"
                                        value={withdrawalAge}
                                        onChange={(e) => setWithdrawalAge(Number(e.target.value))}
                                        className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>18</span>
                                        <span>21</span>
                                    </div>
                                </div>

                                {/* Withdrawal Percentage */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-slate-700">Withdrawal %</label>
                                        <span className="text-sm font-bold text-rose-600">{withdrawalPercentage}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="50"
                                        step="5"
                                        value={withdrawalPercentage}
                                        onChange={(e) => setWithdrawalPercentage(Number(e.target.value))}
                                        className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>10%</span>
                                        <span>50% (Max)</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">
                                        * Max 50% of balance allowed for higher education.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Results (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Hero Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                            <p className="text-sm text-rose-100 mb-1">Maturity Value (Age 21)</p>
                            <p className="text-3xl font-bold mb-2">{formatCompact(result.maturityCorpus)}</p>
                            <p className="text-xs text-rose-100 opacity-80">
                                Total Interest: {formatCompact(result.totalInterest)}
                            </p>
                        </div>

                        {planEducation ? (
                            <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-sm">
                                <p className="text-sm text-slate-500 mb-1">Education Fund (Age {withdrawalAge})</p>
                                <p className="text-3xl font-bold text-rose-600 mb-2">
                                    {formatCompact(result.educationFund)}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Available for withdrawal
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <p className="text-sm text-slate-500 mb-1">Total Invested</p>
                                <p className="text-3xl font-bold text-slate-900 mb-2">
                                    {formatCompact(result.totalInvested)}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Over 15 years
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Timeline Visual */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-700 mb-4">Investment Timeline</h3>
                        <div className="relative pt-14 pb-2">
                            <div className="h-2 bg-slate-100 rounded-full flex overflow-hidden">
                                {/* Deposit Phase (15 Years) */}
                                <div className="h-full bg-rose-500 w-[71.4%]" title="Deposit Period (15 Years)"></div>
                                {/* Growth Phase (6 Years) */}
                                <div className="h-full bg-rose-300 w-[28.6%]" title="Growth Period (6 Years)"></div>
                            </div>

                            {/* Labels */}
                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                                <div className="text-center w-[71.4%]">
                                    Deposit Period (15Y)
                                </div>
                                <div className="text-center w-[28.6%]">
                                    Wait (6Y)
                                </div>
                            </div>

                            {/* Markers */}
                            <div className="absolute top-4 left-0 -translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs text-slate-400 mb-1">Age {girlAge}</span>
                                <div className="w-0.5 h-4 bg-slate-300"></div>
                            </div>
                            <div className="absolute top-4 left-[71.4%] -translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs text-slate-400 mb-1">Age {girlAge + 15}</span>
                                <div className="w-0.5 h-4 bg-slate-300"></div>
                            </div>
                            <div className="absolute top-4 right-0 translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs text-slate-400 mb-1">Age {girlAge + 21}</span>
                                <div className="w-0.5 h-4 bg-slate-300"></div>
                            </div>

                            {/* Withdrawal Marker */}
                            {planEducation && withdrawalAge && (
                                <div
                                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                                    style={{ left: `${((withdrawalAge - girlAge) / 21) * 100}%` }}
                                >
                                    <div className="bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full mb-1 shadow-sm">
                                        Withdrawal
                                    </div>
                                    <div className="w-0.5 h-8 bg-rose-600 dashed border-l border-rose-600"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Growth Chart</h3>

                        <SsyResultChart data={result.yearlyBreakdown} formatCurrency={formatCurrency} />
                    </div>

                </div>
            </div>
        </div>
    );
}
