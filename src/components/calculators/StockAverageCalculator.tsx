'use client';

import React, { useState } from 'react';
import {
    Plus,
    Trash2,
    RefreshCw,
    Calculator,
    TrendingDown,
    ArrowRight,
    Target
} from 'lucide-react';

interface Tranche {
    id: string;
    price: number;
    quantity: number;
}

interface TargetData {
    currentAvg: number;
    currentQty: number;
    marketPrice: number;
    targetPrice: number;
}

export function StockAverageCalculator() {
    const [mode, setMode] = useState<'average' | 'target'>('average');

    // --- Mode 1 State: Calculate Average ---
    const [tranches, setTranches] = useState<Tranche[]>([
        { id: '1', price: 0, quantity: 0 },
        { id: '2', price: 0, quantity: 0 },
    ]);

    // --- Mode 2 State: Target Averager ---
    const [targetData, setTargetData] = useState<TargetData>({
        currentAvg: 0,
        currentQty: 0,
        marketPrice: 0,
        targetPrice: 0,
    });

    // --- Helpers ---
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val);

    const formatNumber = (val: number) =>
        new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(val);

    // --- Mode 1 Logic ---
    const addTranche = () => {
        setTranches([...tranches, { id: crypto.randomUUID(), price: 0, quantity: 0 }]);
    };

    const removeTranche = (id: string) => {
        if (tranches.length > 1) {
            setTranches(tranches.filter(t => t.id !== id));
        }
    };

    const updateTranche = (id: string, field: 'price' | 'quantity', value: number) => {
        setTranches(tranches.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const clearTranches = () => {
        setTranches([
            { id: crypto.randomUUID(), price: 0, quantity: 0 },
            { id: crypto.randomUUID(), price: 0, quantity: 0 },
        ]);
    };

    // Derived State Mode 1
    const totalQty = tranches.reduce((sum, t) => sum + t.quantity, 0);
    const totalInvested = tranches.reduce((sum, t) => sum + (t.price * t.quantity), 0);
    const averagePrice = totalQty > 0 ? totalInvested / totalQty : 0;

    // --- Mode 2 Logic ---
    // Formula: NewQty = (CurQty * (Target - CurAvg)) / (CMP - Target)
    const { currentAvg, currentQty, marketPrice, targetPrice } = targetData;

    let qtyNeeded = 0;
    let impossible = false;
    let message = "";

    if (currentAvg > 0 && currentQty > 0 && marketPrice > 0 && targetPrice > 0) {
        if (targetPrice === marketPrice) {
            impossible = true;
            message = "Target cannot be same as Buy Price";
        } else {
            const numerator = currentQty * (targetPrice - currentAvg);
            const denominator = marketPrice - targetPrice;
            const result = numerator / denominator;

            if (result > 0) {
                qtyNeeded = Math.ceil(result);
            } else {
                // If result is negative, it usually means the target is not reachable by buying (might need to sell, or target is already achieved)
                // Specifically for "Averaging Down" (User wants lower price):
                // If Target < CurrentAvg (Averaging Down):
                // LHS (Numerator) is NEGATIVE.
                // RHS (Denominator) must be NEGATIVE for result to be POSITIVE.
                // So (CMP - Target) < 0  => CMP < Target.
                // IF CMP > Target, we can't average down to Target because we are buying higher than target!

                if (targetPrice < currentAvg && marketPrice >= targetPrice) {
                    impossible = true;
                    message = "New buy price is higher than target.";
                } else if (targetPrice > currentAvg && marketPrice <= targetPrice) {
                    impossible = true; // Trying to average UP but buying lower
                    message = "New buy price is lower than target.";
                } else {
                    impossible = true; // Already better than target?
                    message = "Target already achieved.";
                }
            }
        }
    }

    const newTotalQty = currentQty + qtyNeeded;
    const costOfNew = qtyNeeded * marketPrice;

    // UI Helpers
    const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 font-medium placeholder:text-slate-400";
    const labelClass = "block text-sm font-medium text-slate-600 mb-1.5 ml-1";

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">

            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl w-fit mx-auto border border-slate-200">
                <button
                    onClick={() => setMode('average')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'average'
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <Calculator className="w-4 h-4" />
                    Find Average
                </button>
                <button
                    onClick={() => setMode('target')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'target'
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <Target className="w-4 h-4" />
                    Find Qty Needed
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* LEFT COLUMN: INPUTS */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

                    {mode === 'average' ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <RefreshCw className="w-5 h-5 text-amber-500" />
                                    Purchase Tranches
                                </h3>
                                <button
                                    onClick={clearTranches}
                                    className="text-xs font-medium text-slate-500 hover:text-red-500 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                                {tranches.map((t, index) => (
                                    <div key={t.id} className="group relative grid grid-cols-12 gap-3 items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="col-span-1 flex items-center justify-center pb-3">
                                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="col-span-5">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Buy Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                                                <input
                                                    type="number"
                                                    value={t.price || ''}
                                                    onChange={(e) => updateTranche(t.id, 'price', parseFloat(e.target.value) || 0)}
                                                    className={`${inputClass} pl-7`}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Quantity</label>
                                            <input
                                                type="number"
                                                value={t.quantity || ''}
                                                onChange={(e) => updateTranche(t.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                className={inputClass}
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="col-span-2 pb-3">
                                            <button
                                                onClick={() => removeTranche(t.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                disabled={tranches.length === 1}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={addTranche}
                                className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-semibold hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Add Another Tranche
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-amber-500" />
                                Target Averaging
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Current Avg Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                        <input
                                            type="number"
                                            value={targetData.currentAvg || ''}
                                            onChange={(e) => setTargetData({ ...targetData, currentAvg: parseFloat(e.target.value) || 0 })}
                                            className={`${inputClass} pl-8`}
                                            placeholder="Ex: 500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Current Quantity</label>
                                    <input
                                        type="number"
                                        value={targetData.currentQty || ''}
                                        onChange={(e) => setTargetData({ ...targetData, currentQty: parseFloat(e.target.value) || 0 })}
                                        className={inputClass}
                                        placeholder="Ex: 100"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-orange-800 mb-1.5 ml-1">New Buy Price (CMP)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">₹</span>
                                        <input
                                            type="number"
                                            value={targetData.marketPrice || ''}
                                            onChange={(e) => setTargetData({ ...targetData, marketPrice: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 pl-8 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 font-bold placeholder:text-orange-300"
                                            placeholder="Current Market Price"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-orange-800 mb-1.5 ml-1">Target Average Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">₹</span>
                                        <input
                                            type="number"
                                            value={targetData.targetPrice || ''}
                                            onChange={(e) => setTargetData({ ...targetData, targetPrice: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 pl-8 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 font-bold placeholder:text-orange-300"
                                            placeholder="Desired Goal"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: RESULTS */}
                <div className="sticky top-6">
                    <div className="rounded-3xl p-1 bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl overflow-hidden">
                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[1.4rem] space-y-6 text-white min-h-[300px] flex flex-col justify-center relative">

                            {/* Texture/Pattern Overlay */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            {mode === 'average' ? (
                                <>
                                    <div className="space-y-2">
                                        <p className="text-orange-100 font-medium tracking-wide uppercase text-sm">Effective Average Price</p>
                                        <div className="flex items-baseline gap-2">
                                            <h2 className="text-5xl font-bold tracking-tight">
                                                {formatCurrency(averagePrice)}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                                        <div>
                                            <p className="text-orange-100 text-xs mb-1">Total Quantity</p>
                                            <p className="text-2xl font-semibold">{formatNumber(totalQty)}</p>
                                        </div>
                                        <div>
                                            <p className="text-orange-100 text-xs mb-1">Total Investment</p>
                                            <p className="text-2xl font-semibold">{formatCurrency(totalInvested)}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {impossible ? (
                                        <div className="text-center py-4">
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <TrendingDown className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Not Possible</h3>
                                            <p className="text-orange-100 text-sm leading-relaxed px-4">
                                                {message}
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <p className="text-orange-100 font-medium tracking-wide uppercase text-sm">Quantity To Buy</p>
                                                <div className="flex items-baseline gap-2">
                                                    <h2 className="text-5xl font-bold tracking-tight">
                                                        {formatNumber(qtyNeeded)}
                                                    </h2>
                                                    <span className="text-lg text-orange-100 font-medium">approx.</span>
                                                </div>
                                                {qtyNeeded > 0 && (
                                                    <p className="text-sm text-orange-50 bg-black/10 w-fit px-3 py-1 rounded-full border border-white/10 mt-2">
                                                        Total Cost: {formatCurrency(costOfNew)}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="pt-8 border-t border-white/20">
                                                <div className="flex items-center justify-between text-sm mb-2 text-orange-100">
                                                    <span>Previous Qty: {formatNumber(currentQty)}</span>
                                                    <ArrowRight className="w-4 h-4 opacity-50" />
                                                    <span className="font-bold text-white">New Qty: {formatNumber(newTotalQty)}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-orange-100">
                                                    <span>Previous Avg: {formatNumber(currentAvg)}</span>
                                                    <ArrowRight className="w-4 h-4 opacity-50" />
                                                    <span className="font-bold text-white">New Avg: {formatNumber(targetPrice)}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-4 items-start">
                        <div className="mt-1 bg-amber-100 p-2 rounded-lg text-amber-600">
                            <Target className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-amber-900 text-sm">Pro Tip</h4>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                                {mode === 'average'
                                    ? "Entering multiple entry points helps you visualize how 'averaging down' affects your break-even price."
                                    : "This calculator assumes you can buy fractional shares if the result is not a whole number. Round up or down based on your broker's rules."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
