"use client";

import React, { useState, useMemo } from 'react';
import {
    Shield,
    Zap,
    Lock,
    Rocket,
    AlertCircle,
    Info,
    ArrowRight
} from 'lucide-react';

// --- Helper Functions ---
const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

// --- Constants ---
const MULTIPLIERS = [
    { label: '2x (Small Cap)', value: 2 },
    { label: '5x (Crypto/Tech)', value: 5 },
    { label: '10x (Seed Investment)', value: 10 },
    { label: '0x (Bust)', value: 0 },
];

const BarbellStrategyPlanner = () => {
    // --- Inputs ---
    const [totalCorpus, setTotalCorpus] = useState<number>(1000000);
    const [safetyAllocation, setSafetyAllocation] = useState<number>(90); // Default 90%
    const [multiplier, setMultiplier] = useState<number>(5); // Default 5x

    // --- Logic Engine ---
    const { safeAmount, riskyAmount, worstCase, moonshotCase, principalProtection } = useMemo(() => {
        const safe = totalCorpus * (safetyAllocation / 100);
        const risky = totalCorpus * ((100 - safetyAllocation) / 100);

        // Scenario 1: Risk goes to 0 (Bust). Result is just the safe amount.
        const worst = safe;
        const protectionRatio = (worst / totalCorpus) * 100;

        // Scenario 2: Risk hits multiplier.
        // If multiplier is 0, it's same as worst case.
        const moonshot = safe + (risky * multiplier);

        return {
            safeAmount: safe,
            riskyAmount: risky,
            worstCase: worst,
            moonshotCase: moonshot,
            principalProtection: protectionRatio
        };
    }, [totalCorpus, safetyAllocation, multiplier]);

    // Calculate circle sizes for visuals
    // Safe Circle: 80% -> 120px, 95% -> 160px
    const safeSize = 120 + ((safetyAllocation - 80) / 15) * 40;

    // Risk Circle: 20% -> 100px, 5% -> 60px
    const riskSize = 60 + ((20 - (100 - safetyAllocation)) / 15) * 40;

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-10 shadow-sm relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

            {/* Header */}
            <div className="mb-10 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <div className="w-4 h-0.5 bg-slate-500"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    </div>
                    The Barbell Approach
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">Balance Extremes</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Avoid the "middle ground". Keep the majority of your wealth hyper-safe, and use a small portion for high-risk, high-reward bets.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

                {/* === LEFT COLUMN: CONFIG === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            Configuration
                        </h2>

                        <div className="space-y-8">
                            {/* Total Corpus */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wide">
                                    Total Investable Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        min={1000}
                                        step={50000}
                                        value={totalCorpus}
                                        onChange={(e) => setTotalCorpus(Number(e.target.value))}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-right font-medium">
                                    {formatCurrency(totalCorpus)}
                                </p>
                            </div>

                            {/* Safety Allocation Slider */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                        Safety Allocation
                                    </label>
                                    <span className="text-sm font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
                                        {safetyAllocation}% Safe
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="80" max="95" step="1"
                                    value={safetyAllocation}
                                    onChange={(e) => setSafetyAllocation(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">
                                    <span>80% (Aggressive)</span>
                                    <span>95% (Conservative)</span>
                                </div>
                            </div>

                            {/* Risky Asset Potential */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wide">
                                    Hypothetical Upside
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {MULTIPLIERS.map((m) => (
                                        <button
                                            key={m.label}
                                            onClick={() => setMultiplier(m.value)}
                                            className={`p-3 rounded-xl border text-center transition-all ${multiplier === m.value
                                                ? 'bg-orange-50 border-orange-500 text-orange-800 ring-1 ring-orange-500'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                                                }`}
                                        >
                                            <span className="block text-sm font-bold">{m.label.split(' ')[0]}</span>
                                            <span className="block text-[10px] opacity-70 truncate">{m.label.split(' ').slice(1).join(' ')}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Key Stat */}
                    <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Shield className="w-24 h-24" />
                        </div>
                        <h3 className="font-bold text-slate-400 mb-1 uppercase text-xs tracking-wider">Principal Protection</h3>
                        <p className="text-3xl font-bold mb-2 text-cyan-400">{principalProtection.toFixed(1)}%</p>
                        <p className="text-sm text-slate-400 leading-snug">
                            Even if your risky bets go to ZERO, you retain {principalProtection}% of your initial capital (stored in Safe assets).
                        </p>
                    </div>
                </div>

                {/* === RIGHT COLUMN: VISUALS === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Barbell Visual */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">

                        <div className="absolute top-4 left-4 flex gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded-md">
                                <Lock className="w-3 h-3" /> Safe Assets
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-50 px-2 py-1 rounded-md">
                                <Rocket className="w-3 h-3" /> Moonshots
                            </div>
                        </div>

                        <div className="relative w-full max-w-2xl px-8 flex items-center justify-between mt-8">
                            {/* The Connecting Bar */}
                            <div className="absolute top-1/2 left-10 right-10 h-3 bg-slate-200 -z-0 rounded-full"></div>

                            {/* Left Circle (Safe) */}
                            <div className="relative z-10 flex flex-col items-center group cursor-default">
                                <div
                                    className="rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-xl shadow-cyan-200/50 flex items-center justify-center text-white transition-all duration-300 transform group-hover:scale-105"
                                    style={{ width: `${safeSize}px`, height: `${safeSize}px` }}
                                >
                                    <Lock className="w-8 h-8 md:w-10 md:h-10 opacity-90" />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-xl font-bold text-slate-800">{formatCurrency(safeAmount)}</p>
                                    <p className="text-xs font-bold text-cyan-600 uppercase tracking-wide">Allocated ({safetyAllocation}%)</p>
                                </div>
                            </div>

                            {/* Right Circle (Risk) */}
                            <div className="relative z-10 flex flex-col items-center group cursor-default">
                                <div
                                    className="rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 shadow-xl shadow-orange-200/50 flex items-center justify-center text-white transition-all duration-300 transform group-hover:scale-105"
                                    style={{ width: `${riskSize}px`, height: `${riskSize}px` }}
                                >
                                    <Zap className="w-6 h-6 md:w-8 md:h-8 opacity-90" />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-xl font-bold text-slate-800">{formatCurrency(riskyAmount)}</p>
                                    <p className="text-xs font-bold text-orange-600 uppercase tracking-wide">Allocated ({100 - safetyAllocation}%)</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-12 text-sm text-slate-400 italic text-center max-w-md">
                            "I am not risk averse. I am ruin averse." <br /> — Nassim Taleb
                        </p>
                    </div>

                    {/* Scenario Simulation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Worst Case Card */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-red-200"></div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-400 z-10">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-700">Worst Case Scenario</h3>
                            </div>

                            <div className="space-y-1 mb-4">
                                <p className="text-sm text-slate-500">Risky Assets Value</p>
                                <p className="text-2xl font-bold text-slate-400 line-through decoration-red-400">₹0</p>
                            </div>

                            <div className="pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold text-slate-600">Remaining Wealth</p>
                                    <p className="text-lg font-bold text-slate-800">{formatCurrency(worstCase)}</p>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Your core capital ({safetyAllocation}%) remains intact.</p>
                            </div>
                        </div>

                        {/* Best Case Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110"></div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white border border-emerald-100 flex items-center justify-center shadow-sm text-emerald-500 z-10">
                                    <Rocket className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-emerald-800">Upside Scenario ({multiplier}x)</h3>
                            </div>

                            <div className="space-y-1 mb-4">
                                <p className="text-sm text-emerald-600/70">Risky Assets Grow To</p>
                                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(riskyAmount * multiplier)}</p>
                            </div>

                            <div className="pt-4 border-t border-emerald-200/50">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold text-emerald-800">Total Wealth</p>
                                    <p className="text-lg font-bold text-emerald-700">{formatCurrency(moonshotCase)}</p>
                                </div>
                                <p className="text-xs text-emerald-600 mt-1">
                                    {(moonshotCase / totalCorpus).toFixed(1)}x returns on total portfolio.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BarbellStrategyPlanner;
