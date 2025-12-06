
"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Target, TrendingUp, AlertTriangle, CheckCircle2, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { analyzePortfolio, UserSip, CATEGORY_TYPE } from '@/core/logic/sip-analyzer';
import { CATEGORY_RETURNS } from '@/core/data/category-returns';
import { getInvestmentAdvice } from '@/core/logic/investment-advisor';

const COLORS = {
    Equity: '#10B981', // Emerald 500
    Debt: '#3B82F6',   // Blue 500
    Hybrid: '#F59E0B', // Amber 500
    Gold: '#EAB308'    // Yellow 500
};

export default function SipAnalyzer() {
    const [goalAmount, setGoalAmount] = useState<number>(2500000); // 25 Lakhs default
    const [goalYears, setGoalYears] = useState<number>(10);

    const [sips, setSips] = useState<UserSip[]>([
        {
            id: '1',
            category: 'Large Cap',
            amount: 5000,
            frequency: 'Monthly',
            existingBalance: 0
        }
    ]);

    const addSip = () => {
        const newSip: UserSip = {
            id: Math.random().toString(36).substr(2, 9),
            category: 'Large Cap',
            amount: 5000,
            frequency: 'Monthly',
            existingBalance: 0
        };
        setSips([...sips, newSip]);
    };

    const removeSip = (id: string) => {
        setSips(sips.filter(s => s.id !== id));
    };

    const updateSip = (id: string, field: keyof UserSip, value: any) => {
        setSips(sips.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const results = useMemo(() => {
        return analyzePortfolio(goalAmount, goalYears, sips);
    }, [goalAmount, goalYears, sips]);

    const allocationData = [
        { name: 'Equity', value: results.allocation.Equity },
        { name: 'Debt', value: results.allocation.Debt },
        { name: 'Hybrid', value: results.allocation.Hybrid },
        { name: 'Gold', value: results.allocation.Gold },
    ].filter(d => d.value > 0);

    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8">

            {/* Header */}
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold text-slate-900">SIP Portfolio Analyzer</h1>
                <p className="text-slate-600">Check if your current investments are aligned with your financial goals.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Left Column: Inputs */}
                <div className="space-y-6">

                    {/* Section 1: The Goal */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Target size={20} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900">Your Goal</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount (₹)</label>
                                <input
                                    type="number"
                                    value={goalAmount}
                                    onChange={(e) => setGoalAmount(Number(e.target.value))}
                                    step="50000"
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900"
                                />
                                <p className="text-xs text-slate-500 mt-1">{formatCurrency(goalAmount)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Time Horizon (Years)</label>
                                <input
                                    type="range"
                                    min="3"
                                    max="40"
                                    value={goalYears}
                                    onChange={(e) => setGoalYears(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-sm text-slate-600 mt-1">
                                    <span>3 Years</span>
                                    <span className="font-semibold text-indigo-600">{goalYears} Years</span>
                                    <span>40 Years</span>
                                </div>
                            </div>

                            {goalYears < 3 && (
                                <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg flex items-center gap-2">
                                    <AlertTriangle size={14} />
                                    <span>Short-term goals ( &lt; 3 years) are better suited for Debt/Liquid funds. Equity returns may be volatile.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 2: Your SIPs */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                <TrendingUp size={20} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900">Your Investments</h2>
                        </div>
                        <button
                            onClick={addSip}
                            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Plus size={16} /> Add SIP
                        </button>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {sips.map((sip, index) => (
                            <div key={sip.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group animate-in slide-in-from-bottom-2 duration-300">
                                <button
                                    onClick={() => removeSip(sip.id)}
                                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    title="Remove SIP"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                                        <select
                                            value={sip.category}
                                            onChange={(e) => updateSip(sip.id, 'category', e.target.value)}
                                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-900"
                                        >
                                            {Object.keys(CATEGORY_RETURNS).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Amount (₹)</label>
                                        <input
                                            type="number"
                                            value={sip.amount}
                                            step="100"
                                            onChange={(e) => updateSip(sip.id, 'amount', Number(e.target.value))}
                                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Frequency</label>
                                        <select
                                            value={sip.frequency}
                                            onChange={(e) => updateSip(sip.id, 'frequency', e.target.value)}
                                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-900"
                                        >
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Fortnightly">Fortnightly</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Existing (Optional)</label>
                                        <input
                                            type="number"
                                            placeholder="Current Value"
                                            value={sip.existingBalance || ''}
                                            step="1000"
                                            onChange={(e) => updateSip(sip.id, 'existingBalance', Number(e.target.value))}
                                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-900"
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-slate-400 capitalize">
                                    Type: {CATEGORY_TYPE[sip.category] || 'Unknown'}
                                </div>
                            </div>
                        ))}

                        {sips.length === 0 && (
                            <div className="text-center p-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                No investments added yet. Click "+ Add SIP" to start.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Analysis */}
            <div className="space-y-6">

                {/* Goal Projections */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <PieIcon size={20} />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">Analysis</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-slate-50 rounded-xl text-center">
                            <p className="text-sm text-slate-500 mb-1">Total Yearly Inv.</p>
                            <p className="text-xl font-bold text-slate-900">{formatCurrency(results.currentMonthlyInvestment * 12)}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl text-center">
                            <p className="text-sm text-slate-500 mb-1">Target Goal</p>
                            <p className="text-xl font-bold text-slate-900">{formatCurrency(goalAmount)}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl text-center">
                            <p className="text-sm text-slate-500 mb-1">Projected Corpus</p>
                            <p className={`text-xl font-bold ${results.isGoalMet ? 'text-emerald-600' : 'text-slate-900'}`}>
                                {formatCurrency(results.projectedCorpus)}
                            </p>
                        </div>
                    </div>

                    {/* Goal Meter */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-700">Goal Progress</span>
                            <span className={`font-bold ${results.isGoalMet ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {Math.min(100, (results.projectedCorpus / goalAmount) * 100).toFixed(0)}%
                            </span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${results.isGoalMet ? 'bg-emerald-500' : 'bg-amber-400'}`}
                                style={{ width: `${Math.min(100, (results.projectedCorpus / goalAmount) * 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Gap Analysis */}
                    {!results.isGoalMet ? (
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-6 flex gap-3">
                            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <p className="font-semibold text-amber-900">Shortfall of {formatCurrency(results.gap)}</p>
                                <p className="text-sm text-amber-700 mt-1">
                                    You need to increase your monthly investment by approximately
                                    <span className="font-bold"> {formatCurrency(results.gap / (goalYears * 12))}</span> to reach your goal.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mb-6 flex gap-3">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                            <div>
                                <p className="font-semibold text-emerald-900">You are on track!</p>
                                <p className="text-sm text-emerald-700 mt-1">
                                    Your current investments are projected to meet or exceed your goal. Great job!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Allocation Chart */}
                    <div className="h-64 relative">
                        <h3 className="text-sm font-medium text-slate-500 mb-2 text-center">Asset Allocation</h3>
                        {allocationData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={allocationData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {allocationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        formatter={(value: number) => `${value.toFixed(1)}%`}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                Add SIPs to see allocation
                            </div>
                        )}
                    </div>

                    {/* Category Breakdown Table */}
                    {results.categoryBreakdown && Object.keys(results.categoryBreakdown).length > 0 && (
                        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                            <table className="w-full text-xs sm:text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                    <tr>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Alloc. %</th>
                                        <th className="p-3 hidden sm:table-cell">Mo. Inv.</th>
                                        <th className="p-3 hidden sm:table-cell">Return</th>
                                        <th className="p-3 text-right">Total Inv.</th>
                                        <th className="p-3 text-right">Proj. Return</th>
                                        <th className="p-3 text-right">Proj. Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {Object.entries(results.categoryBreakdown).map(([category, stats]) => {
                                        const projReturn = stats.projectedValue - stats.totalInvestedAmount;
                                        return (
                                            <tr key={category} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-3 font-medium text-slate-700">{category}</td>
                                                <td className="p-3 text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[CATEGORY_TYPE[category] || 'Equity'] }}></div>
                                                        {stats.allocationPercent.toFixed(1)}%
                                                    </div>
                                                </td>
                                                <td className="p-3 text-slate-600 hidden sm:table-cell">{formatCurrency(stats.totalMonthlyInvestment)}</td>
                                                <td className="p-3 text-slate-600 hidden sm:table-cell">{stats.expectedReturnRate}%</td>
                                                <td className="p-3 text-right text-slate-600">{formatCurrency(stats.totalInvestedAmount)}</td>
                                                <td className="p-3 text-right text-emerald-600">
                                                    +{formatCurrency(projReturn)}
                                                </td>
                                                <td className="p-3 text-right font-medium text-indigo-600">{formatCurrency(stats.projectedValue)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Smart Suggestion based on Allocation */}
                    {results.allocation.Debt > 50 && goalYears > 10 && (
                        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex gap-2 items-start">
                            <div className="font-bold text-lg">💡</div>
                            <div>
                                Your portfolio is heavily skewed towards Debt ({results.allocation.Debt.toFixed(0)}%).
                                Since your goal is {goalYears} years away, consider increasing Equity exposure for potentially higher returns.
                            </div>
                        </div>
                    )}
                </div>
                {/* Rebalance Strategy Section */}
                <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-indigo-900">Rebalance Strategy</h3>
                    </div>

                    <p className="text-sm text-slate-600 mb-4">
                        Analysis based on historical returns. For a {goalYears}-year goal, a proper asset mix (Aggressive Strategy) is recommended:
                    </p>

                    <div className="space-y-3">
                        {getInvestmentAdvice({ amount: results.currentMonthlyInvestment, horizonYears: goalYears, riskProfile: 'Aggressive' }).allocation.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm p-3 bg-white rounded-lg border border-indigo-50">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.type === 'Equity' ? 'bg-emerald-500' : item.type === 'Debt' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                                    <span className="font-medium text-slate-700">{item.name}</span>
                                </div>
                                <span className="font-bold text-slate-900">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-xs text-indigo-600 flex gap-2">
                        <AlertTriangle size={14} className="shrink-0" />
                        <span>This is a model portfolio. Consult an advisor before rebalancing.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
