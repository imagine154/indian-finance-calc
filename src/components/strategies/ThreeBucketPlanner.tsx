"use client";

import React, { useState, useMemo } from 'react';
import {
    Waves,
    Shield,
    Sprout,
    AlertTriangle,
    CheckCircle2,
    CalendarClock
} from 'lucide-react';

const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

const ThreeBucketPlanner = () => {
    // --- Inputs ---
    const [totalCorpus, setTotalCorpus] = useState<number>(10000000); // 1 Cr
    const [monthlyExpense, setMonthlyExpense] = useState<number>(50000); // 50k

    // --- Logic Engine ---
    const { bucket1, bucket2, bucket3, isUnderfunded, annualExpense } = useMemo(() => {
        const annual = monthlyExpense * 12;

        // Bucket 1: 3 Years (Immediate Liquid)
        const b1 = 3 * annual;

        // Bucket 2: 7 Years (Income / Debt)
        const b2 = 7 * annual;

        // Bucket 3: Remainder (Growth)
        const b3 = totalCorpus - (b1 + b2);

        return {
            bucket1: b1,
            bucket2: b2,
            bucket3: b3, // Allow negative for logic check
            isUnderfunded: b3 < 0,
            annualExpense: annual
        };
    }, [totalCorpus, monthlyExpense]);

    return (
        <div className="space-y-8">

            {/* Top Section: Inputs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">
                            Total Retirement Corpus
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                            <input
                                type="number"
                                min={100000}
                                step={100000}
                                value={totalCorpus}
                                onChange={(e) => setTotalCorpus(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xl text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-left font-medium">
                            {formatCurrency(totalCorpus)}
                        </p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">
                            Monthly Expense Need
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                            <input
                                type="number"
                                min={1000}
                                step={1000}
                                value={monthlyExpense}
                                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xl text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-left font-medium">
                            {formatCurrency(monthlyExpense)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Middle Section: The Three Buckets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">

                {/* Bucket 1: Safety */}
                <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex flex-col relative overflow-hidden group hover:border-sky-300 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Waves className="w-24 h-24 text-sky-600" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 text-sky-600 shadow-sm z-10">
                        <Waves className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-sky-900 z-10">Safety Bucket</h3>
                    <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-6 z-10">Years 1-3 (Immediate)</p>

                    <div className="mt-auto z-10">
                        <p className="text-3xl font-extrabold text-sky-900">{formatCurrency(bucket1)}</p>
                        <p className="text-xs text-sky-700 mt-2 font-medium">
                            Park in Savings / Liquid Funds.
                        </p>
                    </div>
                </div>

                {/* Bucket 2: Stability */}
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 flex flex-col relative overflow-hidden group hover:border-indigo-300 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield className="w-24 h-24 text-indigo-600" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 text-indigo-600 shadow-sm z-10">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-900 z-10">Stability Bucket</h3>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-6 z-10">Years 4-10 (Income)</p>

                    <div className="mt-auto z-10">
                        <p className="text-3xl font-extrabold text-indigo-900">{formatCurrency(bucket2)}</p>
                        <p className="text-xs text-indigo-700 mt-2 font-medium">
                            Park in Debt Funds / Bonds.
                        </p>
                    </div>
                </div>

                {/* Bucket 3: Wealth */}
                <div className={`rounded-2xl p-6 border flex flex-col relative overflow-hidden group transition-all
                    ${isUnderfunded
                        ? 'bg-rose-50 border-rose-200'
                        : 'bg-emerald-50 border-emerald-100 hover:border-emerald-300'
                    }`}>
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${isUnderfunded ? 'rose' : 'emerald'}-600`}>
                        <Sprout className="w-24 h-24" />
                    </div>
                    <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm z-10 text-${isUnderfunded ? 'rose' : 'emerald'}-600`}>
                        {isUnderfunded ? <AlertTriangle className="w-6 h-6" /> : <Sprout className="w-6 h-6" />}
                    </div>
                    <h3 className={`text-lg font-bold z-10 text-${isUnderfunded ? 'rose' : 'emerald'}-900`}>Wealth Bucket</h3>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-6 z-10 text-${isUnderfunded ? 'rose' : 'emerald'}-600`}>Years 10+ (Growth)</p>

                    <div className="mt-auto z-10">
                        <p className={`text-3xl font-extrabold text-${isUnderfunded ? 'rose' : 'emerald'}-900`}>
                            {bucket3 < 0 ? '-' : formatCurrency(bucket3)}
                        </p>

                        {isUnderfunded ? (
                            <p className="text-xs text-rose-700 mt-2 font-bold">
                                Corpus Depleted! Reduce expenses.
                            </p>
                        ) : (
                            <p className="text-xs text-emerald-700 mt-2 font-medium">
                                Park in Index / Flexicap Funds.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Reality Check */}
            <div className={`rounded-xl p-4 md:p-6 border flex items-start gap-4 ${isUnderfunded
                ? 'bg-rose-100 border-rose-200 text-rose-900'
                : 'bg-emerald-100 border-emerald-200 text-emerald-900'
                }`}>
                <div className={`p-2 rounded-full ${isUnderfunded ? 'bg-rose-200' : 'bg-emerald-200'}`}>
                    {isUnderfunded ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-1">
                        {isUnderfunded ? "⚠️ Corpus Risk Warning" : "✅ You are Safe"}
                    </h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                        {isUnderfunded
                            ? `Your corpus of ${formatCurrency(totalCorpus)} is too small for a monthly expense of ${formatCurrency(monthlyExpense)}. You need at least ${formatCurrency(bucket1 + bucket2)} just to cover the first 10 years comfortably.`
                            : `Excellent. You have 10 years of expenses (${formatCurrency(bucket1 + bucket2)}) fully secured in safe assets. You can let your Wealth Bucket grow without worrying about market crashes.`
                        }
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ThreeBucketPlanner;
