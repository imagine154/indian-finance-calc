'use client';

import { useState, useEffect } from 'react';
import { calculateFreelanceTax, type FreelanceTaxResult } from '@/core/logic/freelance';
import { IndianRupee, TrendingDown, Award, AlertTriangle, Briefcase, PieChart, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function FreelanceCalculator() {
    // --- 1. INPUT STATES ---
    const [annualRevenue, setAnnualRevenue] = useState(2000000); // Default 20L
    const [otherIncome, setOtherIncome] = useState(0);

    // Deductions
    const [section80C, setSection80C] = useState(0);
    const [section80D, setSection80D] = useState(0);
    const [npsSelf, setNpsSelf] = useState(0); // 80CCD(1B)
    const [otherDeductions, setOtherDeductions] = useState(0);

    const [showDeductions, setShowDeductions] = useState(false);
    const [result, setResult] = useState<FreelanceTaxResult | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (mounted) {
            const res = calculateFreelanceTax({
                annualRevenue,
                otherIncome,
                deductions: {
                    section80C,
                    section80D,
                    section80CCD1B: npsSelf,
                    otherDeductions
                }
            });
            setResult(res);
        }
    }, [mounted, annualRevenue, otherIncome, section80C, section80D, npsSelf, otherDeductions]);

    const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;
    const formatCompact = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lac`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    if (!mounted || !result) return null;

    const isEligible = annualRevenue <= 7500000;
    const chartData = [
        { name: 'Total Receipt', amount: annualRevenue, color: '#94a3b8' }, // Slate 400
        { name: 'Taxable (50%)', amount: result.presumptiveIncome, color: '#0d9488' } // Teal 600
    ];

    return (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* === LEFT COLUMN: INPUTS (5 cols) === */}
            <div className="lg:col-span-5 space-y-6">

                {/* 1. Revenue Input */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-teal-600" /> Professional Receipts
                    </h2>

                    <div className="mb-6">
                        <label className="text-sm font-semibold text-slate-700 mb-1 block">Annual Gross Receipts</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="number"
                                value={annualRevenue}
                                onChange={e => setAnnualRevenue(Number(e.target.value))}
                                className={`w-full pl-10 pr-4 py-3 text-lg font-bold border rounded-xl focus:ring-2 ${!isEligible ? 'border-red-300 focus:ring-red-500 text-red-600' : 'border-slate-300 focus:ring-teal-500 text-slate-900'}`}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <p className="text-xs text-slate-500 font-medium pl-1">{formatCompact(annualRevenue)}</p>
                            <p className="text-xs text-slate-400">Max Limit: ₹75 Lakhs</p>
                        </div>

                        {!isEligible && (
                            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-red-800">Not Eligible for 44ADA</p>
                                    <p className="text-xs text-red-700 mt-1">
                                        Your receipts exceed ₹75 Lakhs. You must maintain books of accounts and get an audit.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-sm text-slate-600 mb-1 block">Other Income (Interest/Dividend)</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="number"
                                value={otherIncome}
                                onChange={e => setOtherIncome(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Deductions (Collapsible) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <button
                        onClick={() => setShowDeductions(!showDeductions)}
                        className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-teal-600" />
                            <span className="font-bold text-slate-900">Tax Saving Investments</span>
                        </div>
                        {showDeductions ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>

                    {showDeductions && (
                        <div className="p-6 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">80C (LIC/PPF)</label>
                                    <input type="number" value={section80C} onChange={e => setSection80C(Math.min(Number(e.target.value), 150000))} className="w-full px-3 py-2 border border-slate-300 rounded-lg" max={150000} />
                                    <p className="text-[10px] text-slate-400 mt-0.5">Max 1.5L</p>
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">80D (Health)</label>
                                    <input type="number" value={section80D} onChange={e => setSection80D(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">NPS (80CCD 1B)</label>
                                    <input type="number" value={npsSelf} onChange={e => setNpsSelf(Math.min(Number(e.target.value), 50000))} className="w-full px-3 py-2 border border-slate-300 rounded-lg" max={50000} />
                                    <p className="text-[10px] text-slate-400 mt-0.5">Max 50k</p>
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Other</label>
                                    <input type="number" value={otherDeductions} onChange={e => setOtherDeductions(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                                </div>
                            </div>
                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800">
                                Note: Most deductions (80C, 80D) are only available in the <strong>Old Regime</strong>.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* === RIGHT COLUMN: VISUALS & RESULTS (7 cols) === */}
            <div className="lg:col-span-7 space-y-6">

                {/* 1. Hero Card: The 50% Magic */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-teal-600" /> The 50% Benefit (Section 44ADA)
                        </h2>
                        <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                            Flat 50% Deduction
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Chart */}
                        <div className="h-48 w-full md:w-1/2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Stats */}
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-sm text-slate-600">Total Receipts</span>
                                <span className="font-bold text-slate-900">{formatCurrency(annualRevenue)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-100">
                                <span className="text-sm text-teal-800 font-medium">Taxable Income (50%)</span>
                                <span className="font-bold text-teal-900">{formatCurrency(result.presumptiveIncome)}</span>
                            </div>
                            <div className="text-xs text-slate-500 text-right">
                                + {formatCurrency(otherIncome)} Other Income
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Tax Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Old', 'New'].map((r) => {
                        const data = r === 'Old' ? result.taxComparison.oldRegime : result.taxComparison.newRegime;
                        const isWinner = result.taxComparison.recommendation.betterRegime === r;
                        const isBetterClass = isWinner
                            ? 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-300 ring-2 ring-teal-200'
                            : 'bg-white border-slate-200';

                        return (
                            <div key={r} className={`rounded-2xl p-6 border-2 transition-all ${isBetterClass}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900">{r} Regime</h3>
                                    {isWinner && <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">Winner</span>}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Taxable Income</span>
                                        <span className="font-medium">{formatCurrency(data.taxableSlabIncome)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Deductions</span>
                                        <span className="font-semibold text-purple-600">-{formatCurrency(data.deductions)}</span>
                                    </div>

                                    <div className="border-t border-slate-200 my-2"></div>

                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-600 text-sm mb-1">Tax Payable</span>
                                        <div className="text-right">
                                            <div className="font-bold text-2xl text-slate-900">
                                                {formatCurrency(data.totalTaxPayable)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Savings Highlight */}
                {result.taxSavedIfDeclaredFully > 0 && (
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <Award className="w-8 h-8 text-yellow-300" />
                            </div>
                            <div>
                                <p className="text-indigo-100 font-medium text-sm">Benefit of 44ADA Scheme</p>
                                <h3 className="text-2xl font-bold">
                                    You saved ~{formatCurrency(result.taxSavedIfDeclaredFully)} in Tax
                                </h3>
                                <p className="text-xs text-indigo-200 mt-1">
                                    Compared to declaring 100% of your receipts as income.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
