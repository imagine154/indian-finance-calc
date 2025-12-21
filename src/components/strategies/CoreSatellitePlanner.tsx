"use client";

import React, { useState, useMemo } from 'react';
import {
    Shield,
    Rocket,
    TrendingUp,
    Info,
    Target
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

interface StrategyConfig {
    coreRatio: number;
    satelliteRatio: number;
    coreReturn: number;
    satelliteReturn: number;
    description: string;
}

const STRATEGIES: Record<RiskProfile, StrategyConfig> = {
    Conservative: {
        coreRatio: 80,
        satelliteRatio: 20,
        coreReturn: 12,
        satelliteReturn: 16,
        description: "Focus on capital preservation with a small growth kicker."
    },
    Moderate: {
        coreRatio: 60,
        satelliteRatio: 40,
        coreReturn: 12,
        satelliteReturn: 16,
        description: "Balanced approach for long-term wealth creation."
    },
    Aggressive: {
        coreRatio: 40,
        satelliteRatio: 60,
        coreReturn: 12,
        satelliteReturn: 18, // Higher risk = Higher potential return
        description: "High growth focus with higher volatility tolerance."
    }
};

const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

const CoreSatellitePlanner = () => {
    const [investmentAmount, setInvestmentAmount] = useState<number>(1000000);
    const [riskProfile, setRiskProfile] = useState<RiskProfile>('Moderate');
    const [horizon, setHorizon] = useState<number>(10);

    const { allocation, weightedReturn, corpus, data } = useMemo(() => {
        const strat = STRATEGIES[riskProfile];
        const coreAmt = (investmentAmount * strat.coreRatio) / 100;
        const satAmt = (investmentAmount * strat.satelliteRatio) / 100;

        const wReturn = (strat.coreRatio * strat.coreReturn + strat.satelliteRatio * strat.satelliteReturn) / 100;

        const futureValue = investmentAmount * Math.pow((1 + wReturn / 100), horizon);

        const chartData = [
            { name: 'Core (Safety)', value: strat.coreRatio, fill: '#4f46e5' }, // Indigo-600
            { name: 'Satellite (Growth)', value: strat.satelliteRatio, fill: '#10b981' }, // Emerald-500
        ];

        return {
            allocation: { core: coreAmt, satellite: satAmt },
            weightedReturn: wReturn,
            corpus: futureValue,
            data: chartData
        };
    }, [investmentAmount, riskProfile, horizon]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT COLUMN: Inputs & Visualization */}
            <div className="space-y-8">
                {/* Inputs Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-600" />
                        Configuration
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                Investment Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                                <input
                                    type="number"
                                    min={1000}
                                    step={5000}
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-left font-medium">
                                {formatCurrency(investmentAmount)}
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                Risk Profile
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['Conservative', 'Moderate', 'Aggressive'] as RiskProfile[]).map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setRiskProfile(mode)}
                                        className={`py-2 px-1 rounded-lg text-sm font-bold transition-all ${riskProfile === mode
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50'
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-center italic">
                                "&quot;{STRATEGIES[riskProfile].description}&quot;"
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                Time Horizon: <span className="text-indigo-600 font-bold">{horizon} Years</span>
                            </label>
                            <input
                                type="range"
                                min="3"
                                max="30"
                                value={horizon}
                                onChange={(e) => setHorizon(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Donut Chart visual */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 flex flex-col items-center justify-center relative min-h-[300px]">
                    <h3 className="absolute top-6 left-6 font-bold text-slate-800">Allocation Split</h3>
                    <div className="w-[240px] h-[240px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Centered Label */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Return</span>
                            <span className="block text-2xl font-extrabold text-slate-800">{weightedReturn.toFixed(1)}%</span>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-4">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                                <span className="text-sm font-semibold text-slate-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Action Plan */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Action Plan</span>
                </div>

                {/* Core Component */}
                <div className="group bg-indigo-50 rounded-2xl p-6 border border-indigo-100 transition-all hover:shadow-md hover:border-indigo-200">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-white p-3 rounded-xl text-indigo-600 shadow-sm">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                            <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">Allocation</span>
                            <span className="text-2xl font-bold text-indigo-900">{STRATEGIES[riskProfile].coreRatio}%</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">The Core</h3>
                    <p className="text-indigo-800/70 text-sm mb-4">
                        Your safety bucket. Provides stability and consistent market returns.
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-indigo-100/50">
                        <div className="text-xs font-bold text-indigo-400 uppercase mb-1">Invest</div>
                        <div className="text-2xl font-bold text-indigo-700">{formatCurrency(allocation.core)}</div>
                        <div className="text-xs text-slate-500 mt-2">
                            <strong>Where:</strong> Nifty 50 Index Funds, Large Cap Funds.
                        </div>
                    </div>
                </div>

                {/* Satellite Component */}
                <div className="group bg-emerald-50 rounded-2xl p-6 border border-emerald-100 transition-all hover:shadow-md hover:border-emerald-200">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-sm">
                            <Rocket className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                            <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">Allocation</span>
                            <span className="text-2xl font-bold text-emerald-900">{STRATEGIES[riskProfile].satelliteRatio}%</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">The Satellite</h3>
                    <p className="text-emerald-800/70 text-sm mb-4">
                        Your growth bucket. Chasing Alpha and higher returns.
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-emerald-100/50">
                        <div className="text-xs font-bold text-emerald-400 uppercase mb-1">Invest</div>
                        <div className="text-2xl font-bold text-emerald-700">{formatCurrency(allocation.satellite)}</div>
                        <div className="text-xs text-slate-500 mt-2">
                            <strong>Where:</strong> Mid-Cap, Small-Cap, Sectoral, or Momentum Funds.
                        </div>
                    </div>
                </div>

                {/* Projected Wealth Highlight */}
                <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
                    <h4 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Projected Corpus ({horizon} Years)</h4>
                    <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        {formatCurrency(corpus)}
                    </div>
                    <div className="inline-block bg-slate-800 rounded-full px-4 py-1 text-xs font-semibold text-slate-300">
                        @ {weightedReturn.toFixed(1)}% Avg. Return
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoreSatellitePlanner;
