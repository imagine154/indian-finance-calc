"use client";

import React, { useState, useMemo } from 'react';
import {
    Wand2,
    Sparkles,
    AlertTriangle,
    RefreshCw,
    Search,
    TrendingUp,
    ListChecks
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

// --- Helper Functions ---
const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

const MagicFormulaPlanner = () => {
    // --- Inputs ---
    const [corpus, setCorpus] = useState<number>(1000000); // 10 Lakhs
    const [alpha, setAlpha] = useState<number>(5); // Extra return over Nifty

    // --- Logic Engine ---
    const { chartData, magicFinal, niftyFinal, diff } = useMemo(() => {
        const data = [];
        let magic = corpus;
        let nifty = corpus;
        const niftyRate = 12;
        const magicRate = niftyRate + alpha;

        // Simulate 15 years
        for (let year = 0; year <= 15; year++) {
            data.push({
                year: `Year ${year}`,
                magic: Math.round(magic),
                nifty: Math.round(nifty)
            });

            // Growth logic
            if (year < 15) {
                magic = magic * (1 + magicRate / 100);
                nifty = nifty * (1 + niftyRate / 100);
            }
        }

        return {
            chartData: data,
            magicFinal: magic,
            niftyFinal: nifty,
            diff: magic - nifty
        };
    }, [corpus, alpha]);

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-10 shadow-sm relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            {/* Header */}
            <div className="mb-10 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    <Wand2 className="w-4 h-4" />
                    Quantitative Value Strategy
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">The Magic Formula</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Based on Joel Greenblatt's proven algorithm. Systematically buy <strong>Good Companies</strong> (High Quality) at <strong>Cheap Prices</strong> (High Yield).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

                {/* === LEFT COLUMN: CONFIG & ALGO === */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Simulation Parameters */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            Parameter Config
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wide">
                                    Investment Capital
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        min={1000}
                                        step={10000}
                                        value={corpus}
                                        onChange={(e) => setCorpus(Number(e.target.value))}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-left font-medium">
                                    {formatCurrency(corpus)}
                                </p>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wide">
                                    Expected Alpha (vs Nifty)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="0" max="15" step="1"
                                        value={alpha}
                                        onChange={(e) => setAlpha(Number(e.target.value))}
                                        className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                    <span className="text-sm font-bold text-rose-600 w-12 text-right">+{alpha}%</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    Historically, this strategy generated +10% to +15% alpha over indices, but past performance is arguably harder to replicate now.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Algorithm Checklist */}
                    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ListChecks className="w-24 h-24" />
                        </div>
                        <h3 className="font-bold text-rose-400 mb-4 flex items-center gap-2 relative z-10">
                            <RefreshCw className="w-5 h-5" /> The Algorithm
                        </h3>
                        <ol className="space-y-4 text-sm text-slate-300 relative z-10">
                            <li className="flex gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-rose-400 font-bold text-xs shrink-0 border border-slate-700">1</span>
                                <div>
                                    <span className="text-white font-bold">Rank by Quality (ROCE)</span>
                                    <p className="text-xs text-slate-500 mt-0.5">High Return on Capital = Good Business.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-rose-400 font-bold text-xs shrink-0 border border-slate-700">2</span>
                                <div>
                                    <span className="text-white font-bold">Rank by Price (Yield)</span>
                                    <p className="text-xs text-slate-500 mt-0.5">High Earnings Yield = Cheap Price.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-rose-400 font-bold text-xs shrink-0 border border-slate-700">3</span>
                                <div>
                                    <span className="text-white font-bold">Combine & Select Top 30</span>
                                    <p className="text-xs text-slate-500 mt-0.5">Add ranks together. Buy the best combined scores.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-900/50 text-rose-400 font-bold text-xs shrink-0 border border-rose-800">4</span>
                                <div>
                                    <span className="text-rose-300 font-bold">Repeat Yearly</span>
                                    <p className="text-xs text-slate-500 mt-0.5">Rebalance strictly every year. Ignore noise.</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                </div>

                {/* === RIGHT COLUMN: VISUALS === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Quadrant Visual */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-rose-500" />
                                The Strategy Visualized
                            </h3>
                        </div>

                        {/* Custom CSS Grid for Matrix */}
                        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border-l-2 border-b-2 border-slate-300 bg-slate-50 grid grid-cols-2 grid-rows-2 rounded-tr-xl">
                            {/* Axis Labels */}
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                Quality (ROCE)
                            </div>
                            <div className="absolute left-1/2 bottom-[-24px] -translate-x-1/2 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                Cheapness (Earnings Yield)
                            </div>

                            {/* Quadrants */}
                            {/* Top Left: Expensive Quality */}
                            <div className="p-4 border-r border-b border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                                <span className="text-xs font-bold text-slate-400 uppercase mb-1">Great Company</span>
                                <span className="text-[10px] text-slate-400 line-through">Expensive Price</span>
                            </div>

                            {/* Top Right: MAGIC ZONE */}
                            <div className="relative p-4 border-b border-dashed border-slate-300 flex flex-col items-center justify-center text-center bg-rose-50 group transition-all hover:bg-rose-100">
                                <div className="absolute inset-0 border-2 border-rose-400 opacity-20 m-2 rounded-lg"></div>
                                <span className="text-sm md:text-base font-extrabold text-rose-600 uppercase flex items-center gap-2 mb-1">
                                    <Wand2 className="w-4 h-4" /> The Magic Zone
                                </span>
                                <span className="text-xs font-bold text-rose-700/70">Great Company + Cheap Price</span>
                                <div className="mt-2 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm shadow-rose-200">
                                    WE BUY HERE
                                </div>
                            </div>

                            {/* Bottom Left: JUNK ZONE */}
                            <div className="p-4 border-r border-dashed border-slate-300 flex flex-col items-center justify-center text-center bg-slate-100/50">
                                <span className="text-xs font-bold text-slate-400 uppercase mb-1">Junk Company</span>
                                <span className="text-[10px] text-slate-400 line-through">Expensive Price</span>
                            </div>

                            {/* Bottom Right: Value Trap */}
                            <div className="p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-xs font-bold text-slate-400 uppercase mb-1">Junk Company</span>
                                <span className="text-[10px] text-slate-500">Cheap Price (Value Trap)</span>
                            </div>
                        </div>
                    </div>

                    {/* Simulation Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="font-bold text-slate-800">15-Year Wealth Projection</h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Projecting {12 + alpha}% CAGR (Magic) vs 12% CAGR (Nifty).
                                </p>
                            </div>
                            <div className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-2 rounded-lg text-xs flex items-start gap-2 max-w-xs">
                                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                                <p className="leading-snug">
                                    <strong>Reality Check:</strong> The strategy can underperform for 2-3 years in a row. Following it blindly needs discipline.
                                </p>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#64748b' }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis
                                        tickFormatter={(val) => `₹${val / 100000}L`}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#64748b' }}
                                    />
                                    <Tooltip
                                        formatter={(val: number) => formatCurrency(val)}
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="magic"
                                        name={`Magic Formula (${12 + alpha}%)`}
                                        stroke="#e11d48"
                                        strokeWidth={3}
                                        dot={{ fill: '#e11d48', strokeWidth: 0, r: 0 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="nifty"
                                        name="Nifty 50 (12%)"
                                        stroke="#94a3b8"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MagicFormulaPlanner;
