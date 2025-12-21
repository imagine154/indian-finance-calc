"use client";

import React, { useState, useMemo } from 'react';
import {
    TrendingUp,
    ShieldCheck,
    Percent,
    Activity,
    BarChart3,
    ArrowRight,
    Search
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

// --- Types & Constants ---

type MarketView = 'Bullish' | 'Bearish' | 'Uncertain' | 'Recovery';

interface FactorWeights {
    momentum: number;
    quality: number;
    value: number;
    lowVol: number;
}

interface StrategyData {
    weights: FactorWeights;
    description: string;
    topFactor: string;
}

const STRATEGIES: Record<MarketView, StrategyData> = {
    'Bullish': {
        weights: { momentum: 90, quality: 30, value: 20, lowVol: 10 },
        description: "Aggressive growth focus. Chasing winners in an uptrending market.",
        topFactor: "Momentum"
    },
    'Bearish': {
        weights: { momentum: 10, quality: 70, value: 20, lowVol: 90 },
        description: "Capital protection focus. Minimizing drawdowns during market stress.",
        topFactor: "Low Volatility"
    },
    'Uncertain': {
        weights: { momentum: 20, quality: 60, value: 40, lowVol: 60 },
        description: "Defensive balance. Prioritizing strong balance sheets and stability.",
        topFactor: "Quality"
    },
    'Recovery': {
        weights: { momentum: 40, quality: 30, value: 80, lowVol: 20 },
        description: "Contrarian value play. Buying beaten-down stocks poised for a rebound.",
        topFactor: "Value"
    }
};

const FACTOR_INFO = {
    Momentum: {
        icon: TrendingUp,
        color: "text-blue-600",
        bg: "bg-blue-50",
        borderColor: "border-blue-200",
        fill: "#2563EB",
        desc: "Stocks that have performed well recently.",
        funds: "Nifty 200 Momentum 30 Index Funds"
    },
    Quality: {
        icon: ShieldCheck,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        borderColor: "border-emerald-200",
        fill: "#10B981",
        desc: "High ROE, low debt, consistent earnings.",
        funds: "Nifty 200 Quality 30 / Flexicap Funds"
    },
    Value: {
        icon: Percent,
        color: "text-amber-600",
        bg: "bg-amber-50",
        borderColor: "border-amber-200",
        fill: "#D97706",
        desc: "Undervalued stocks relative to fundamentals.",
        funds: "Nifty 500 Value 50 / Dividend Yield Funds"
    },
    "Low Volatility": {
        icon: Activity,
        color: "text-violet-600",
        bg: "bg-violet-50",
        borderColor: "border-violet-200",
        fill: "#7C3AED",
        desc: "Stocks with lower price fluctuations.",
        funds: "Nifty Low Volatility 30 Index Funds"
    }
};

// --- Component ---

const FactorStrategyPlanner = () => {
    const [marketView, setMarketView] = useState<MarketView>('Bullish');
    const [amount, setAmount] = useState<number>(500000);

    const { strategy, chartData } = useMemo(() => {
        const s = STRATEGIES[marketView];

        // Transform for Recharts Radar
        const data = [
            { subject: 'Momentum', A: s.weights.momentum, fullMark: 100 },
            { subject: 'Quality', A: s.weights.quality, fullMark: 100 },
            { subject: 'Low Volatility', A: s.weights.lowVol, fullMark: 100 },
            { subject: 'Value', A: s.weights.value, fullMark: 100 },
        ];

        return { strategy: s, chartData: data };
    }, [marketView]);

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-10 shadow-sm relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="mb-10 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    <Activity className="w-4 h-4" />
                    Smart Beta / Factor Investing
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">Optimize for the Market Cycle</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Don&apos;t just buy &quot;The Market&quot;. Allocate dynamically to factors like Momentum, Value, and Quality based on current economic conditions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

                {/* === LEFT COLUMN: CONFIGURATION === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            Strategy Configuration
                        </h2>

                        <div className="space-y-8">
                            {/* Market View */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wide">
                                    Current Market View
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {(Object.keys(STRATEGIES) as MarketView[]).map((view) => (
                                        <button
                                            key={view}
                                            onClick={() => setMarketView(view)}
                                            className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all relative group ${marketView === view
                                                ? 'bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-200'
                                                : 'bg-white border-slate-200 hover:border-violet-300 text-slate-700'
                                                }`}
                                        >
                                            <span className="font-bold text-sm">{view}</span>
                                            {marketView === view && <ArrowRight className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wide">
                                    Portfolio Size
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        min={1000}
                                        step={5000}
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-left font-medium">
                                    {formatCurrency(amount)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Insight */}
                    <div className="bg-violet-900 text-white p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity className="w-24 h-24" />
                        </div>
                        <h3 className="font-bold text-violet-300 mb-2 uppercase text-xs tracking-wider">Strategy Logic</h3>
                        <p className="text-lg font-bold mb-2">&quot;{marketView}&quot; Approach</p>
                        <p className="text-sm text-violet-100/80 mb-4 leading-relaxed">{strategy.description}</p>
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                            <Search className="w-3 h-3 text-emerald-300" />
                            <span className="text-xs font-medium">Focus: {strategy.topFactor}</span>
                        </div>
                    </div>
                </div>

                {/* === RIGHT COLUMN: VISUALS === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Radar Chart Area */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-[400px] flex flex-col items-center justify-center relative">
                        <h3 className="absolute top-6 left-6 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> Factor Tilt Analysis
                        </h3>

                        <div className="w-full h-[350px] mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Factor Intensity"
                                        dataKey="A"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fill="#8b5cf6"
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Strategy Implementation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(Object.keys(strategy.weights) as Array<keyof FactorWeights>).map((key) => {
                            const weight = strategy.weights[key];
                            // Map key to Display Name
                            const factorName = key === 'lowVol' ? 'Low Volatility' : key.charAt(0).toUpperCase() + key.slice(1);
                            const info = FACTOR_INFO[factorName as keyof typeof FACTOR_INFO];

                            // Skip low allocations to declutter? No, show all for completeness but maybe dim small ones.
                            // Actually, let's just show everything.

                            if (weight < 1) return null;

                            return (
                                <div key={key} className={`rounded-xl p-5 border transition-all hover:shadow-md bg-white ${info.borderColor} group`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl shadow-sm ${info.bg} ${info.color}`}>
                                                <info.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{factorName}</h4>
                                                <div className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 w-fit ${info.bg} ${info.color}`}>
                                                    {weight}% Allocation
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-bold text-slate-800">{formatCurrency(amount * weight / 100)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex gap-2 items-start">
                                            <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                            <p className="text-xs text-slate-500 leading-snug">{info.desc}</p>
                                        </div>
                                        <div className="flex gap-2 items-start">
                                            <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                            <p className="text-xs font-semibold text-slate-700">{info.funds}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FactorStrategyPlanner;
