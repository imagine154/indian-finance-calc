'use client';

import { useState, useEffect } from 'react';
import { calculateGST, type GstInput, type GstResult, type GstType } from '@/core/logic/gst';
import { IndianRupee, Calculator, ArrowRightLeft, Percent } from 'lucide-react';

export function GstCalculator() {
    const [amount, setAmount] = useState(1000);
    const [rate, setRate] = useState(18);
    const [type, setType] = useState<GstType>('Exclusive');
    const [result, setResult] = useState<GstResult | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            const input: GstInput = { amount, rate, type };
            setResult(calculateGST(input));
        }
    }, [amount, rate, type, mounted]);

    const formatCurrency = (val: number) => {
        return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    };

    const formatInputCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    if (!mounted || !result) return <div className="p-8 text-center text-slate-400">Loading calculator...</div>;

    const isInclusive = type === 'Inclusive';
    const themeColor = isInclusive ? 'orange' : 'teal';

    // Dynamic classes based on theme
    const bgGradient = isInclusive ? 'from-orange-500 to-red-600' : 'from-teal-500 to-cyan-600';
    const textTheme = isInclusive ? 'text-orange-600' : 'text-teal-600';
    const ringTheme = isInclusive ? 'focus:ring-orange-500' : 'focus:ring-teal-500';
    const borderTheme = isInclusive ? 'focus:border-orange-500' : 'focus:border-teal-500';
    const accentTheme = isInclusive ? 'accent-orange-600' : 'accent-teal-600';
    const bgLight = isInclusive ? 'bg-orange-50' : 'bg-teal-50';
    const borderLight = isInclusive ? 'border-orange-100' : 'border-teal-100';

    const rates = [5, 18, 40];

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* === LEFT: INPUTS === */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Calculator className={`w-5 h-5 ${textTheme}`} /> Calculator Details
                    </h2>

                    <div className="space-y-6">

                        {/* Calculation Type Toggle */}
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setType('Exclusive')}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${!isInclusive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Add GST (Exclusive)
                            </button>
                            <button
                                onClick={() => setType('Inclusive')}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${isInclusive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Remove GST (Inclusive)
                            </button>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 mb-2 block">
                                {isInclusive ? 'Total Amount (Inc. GST)' : 'Net Amount (Excl. GST)'}
                            </label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className={`w-full pl-10 pr-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 ${ringTheme} ${borderTheme}`}
                                    placeholder="Enter Amount"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                {formatInputCurrency(amount)}
                            </p>
                        </div>

                        {/* Tax Rate Selection */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 mb-2 block">GST Rate (%)</label>
                            <div className="grid grid-cols-4 gap-2 mb-3">
                                {rates.map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRate(r)}
                                        className={`py-2 rounded-lg text-sm font-bold border transition-all ${rate === r ? `${bgLight} ${textTheme} ${borderLight} border-2` : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {r}%
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className={`w-full pl-9 pr-4 py-2 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 ${ringTheme} ${borderTheme}`}
                                    placeholder="Custom Rate"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* === RIGHT: RESULTS === */}
            <div className="lg:col-span-7 space-y-6">

                {/* Hero Card */}
                <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 text-white shadow-lg relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                    <div className="relative z-10">
                        <p className="text-white/80 font-medium mb-1">Total Tax Amount (GST)</p>
                        <h1 className="text-5xl font-bold mb-6">{formatCurrency(result.gstAmount)}</h1>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-6">
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Net Amount</p>
                                <p className="text-2xl font-bold">{formatCurrency(result.netPrice)}</p>
                            </div>
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Total Payable</p>
                                <p className="text-2xl font-bold">{formatCurrency(result.totalAmount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breakdown Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4 text-slate-500" /> Tax Breakdown
                        </h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/50">
                                    <td className="py-3 px-4 text-slate-600">Net Amount (Base Price)</td>
                                    <td className="py-3 px-4 text-right font-medium text-slate-900">{formatCurrency(result.netPrice)}</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="py-3 px-4 text-slate-600">CGST ({rate / 2}%)</td>
                                    <td className="py-3 px-4 text-right font-medium text-slate-900">{formatCurrency(result.cgst)}</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="py-3 px-4 text-slate-600">SGST ({rate / 2}%)</td>
                                    <td className="py-3 px-4 text-right font-medium text-slate-900">{formatCurrency(result.sgst)}</td>
                                </tr>
                                <tr className={`${bgLight} font-bold`}>
                                    <td className={`py-3 px-4 ${textTheme}`}>Total Amount</td>
                                    <td className={`py-3 px-4 text-right ${textTheme}`}>{formatCurrency(result.totalAmount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
