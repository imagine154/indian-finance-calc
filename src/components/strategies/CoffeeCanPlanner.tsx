"use client";

import React, { useState, useMemo } from 'react';
import {
    Gem,
    TrendingUp,
    Trophy,
    Info,
    ArrowRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

const CoffeeCanPlanner = () => {
    const [lumpsum, setLumpsum] = useState<number>(500000);
    const [duration, setDuration] = useState<number>(10);
    const [benchmarkType, setBenchmarkType] = useState<'FD' | 'Nifty'>('Nifty');

    const benchmarkRate = benchmarkType === 'FD' ? 6 : 12;
    const coffeeCanRate = 20; // Assumed 20% for Coffee Can

    // --- Calculation Logic ---
    const { chartData, finalCoffeeCan, finalBenchmark, multiplier } = useMemo(() => {
        const data = [];
        for (let year = 0; year <= duration; year++) {
            const coffeeVal = lumpsum * Math.pow(1 + coffeeCanRate / 100, year);
            const benchVal = lumpsum * Math.pow(1 + benchmarkRate / 100, year);
            data.push({
                year: `Year ${year}`,
                CoffeeCan: Math.round(coffeeVal),
                Benchmark: Math.round(benchVal),
            });
        }
        const lastPoint = data[data.length - 1];
        return {
            chartData: data,
            finalCoffeeCan: lastPoint.CoffeeCan,
            finalBenchmark: lastPoint.Benchmark,
            multiplier: (lastPoint.CoffeeCan / lumpsum).toFixed(1)
        };
    }, [lumpsum, duration, benchmarkRate]);

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-10 shadow-sm">

            {/* Header Area */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    <Gem className="w-4 h-4" />
                    The Power of Quality Compounding
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">Build Your Legacy Portfolio</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Visualize how a "Buy & Forget" strategy outperforms standard benchmarks over long horizons.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* --- Left Column: Inputs & Funnel --- */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Controls */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Investment Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                <input
                                    type="number"
                                    value={lumpsum}
                                    onChange={(e) => setLumpsum(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Time Horizon
                                </label>
                                <span className="text-sm font-bold text-amber-600">{duration} Years</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="30"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                                <span>10Y</span>
                                <span>30Y</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                Compare Against
                            </label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setBenchmarkType('FD')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${benchmarkType === 'FD' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Fixed Deposit (6%)
                                </button>
                                <button
                                    onClick={() => setBenchmarkType('Nifty')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${benchmarkType === 'Nifty' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Nifty Index (12%)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Funnel Visual */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                            The Filtering Process
                        </h3>

                        <div className="flex flex-col items-center gap-1">
                            {/* Top Layer */}
                            <div className="w-full h-12 bg-slate-200 rounded-sm relative flex items-center justify-center border-b-2 border-white">
                                <span className="text-xs font-bold text-slate-500">All Listed Stocks (6000+)</span>
                            </div>

                            {/* Arrow */}
                            <div className="text-slate-300">↓</div>

                            {/* Middle Layer */}
                            <div
                                className="h-14 bg-slate-300 rounded-sm relative flex items-center justify-center border-b-2 border-white"
                                style={{ width: '75%' }}
                            >
                                <span className="text-xs font-bold text-slate-600">Market Cap {'>'} 100Cr</span>
                            </div>

                            {/* Arrow */}
                            <div className="text-slate-300">↓</div>

                            {/* Bottom Layer (Gold) */}
                            <div
                                className="h-20 bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-200 rounded-lg relative flex flex-col items-center justify-center text-white"
                                style={{ width: '50%' }}
                            >
                                <span className="text-xs font-bold opacity-90 mb-1">Coffee Can List</span>
                                <span className="text-lg font-extrabold leading-none">~20</span>
                                <span className="text-[10px] font-medium opacity-80">Stocks</span>
                            </div>
                        </div>
                        <p className="text-center text-[10px] text-slate-400 mt-4 px-4">
                            Only the companies with consistently high ROCE and Revenue Growth survive.
                        </p>
                    </div>

                </div>

                {/* --- Right Column: Visualization --- */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Wealth Created</div>
                            <div className="text-2xl font-bold text-amber-600">{formatCurrency(finalCoffeeCan)}</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Growth Multiplier</div>
                            <div className="text-2xl font-bold text-slate-800">{multiplier}x</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Quality Premium</div>
                            <div className="text-2xl font-bold text-emerald-600">
                                +{formatCurrency(finalCoffeeCan - finalBenchmark)}
                            </div>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 min-h-[400px]">
                        <div className="mb-6 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700">Wealth Projection</h3>
                            <div className="flex gap-4 text-xs font-medium">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span>Coffee Can (20%)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                                    <span>{benchmarkType} ({benchmarkRate}%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCoffee" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                        interval={Math.floor(duration / 5)}
                                    />
                                    <YAxis
                                        tickFormatter={(val) => `₹${val / 100000}L`}
                                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="CoffeeCan"
                                        stroke="#f59e0b"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorCoffee)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Benchmark"
                                        stroke="#94a3b8"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        fillOpacity={1}
                                        fill="url(#colorBench)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800 flex items-start gap-3">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <p>
                                The "Gap" between the Gold and Grey lines represents the extra wealth generated by holding high-quality companies vs standard index investing. This gap widens significantly after Year 10 due to compounding.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCanPlanner;
