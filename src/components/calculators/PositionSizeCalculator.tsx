'use client';

import { useState, useEffect } from 'react';
import { calculatePositionSize } from '@/core/logic/position-size';
import { AlertTriangle, DollarSign, Target, TrendingDown, Wallet } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";

export function PositionSizeCalculator() {
    // State for inputs
    const [accountCapital, setAccountCapital] = useState(100000);
    const [riskPercentage, setRiskPercentage] = useState(1);
    const [entryPrice, setEntryPrice] = useState(100);
    const [stopLossPrice, setStopLossPrice] = useState(95);


    // Calculate results
    const result = calculatePositionSize({
        accountCapital,
        riskPercentage,
        entryPrice,
        stopLossPrice,
    });

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Calculate risk progress percentage (capped at 100 for visual)
    const riskProgress = Math.min((result.totalRiskAmount / accountCapital) * 100, 100);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel: Inputs */}
                <div className="space-y-4">
                    {/* Account Capital */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-blue-600" />
                                Account Capital
                            </label>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                            <input
                                type="number"
                                step="1000"
                                value={accountCapital === 0 ? '' : accountCapital}
                                onChange={(e) => setAccountCapital(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                                placeholder="Enter your total capital"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                            {formatCurrency(accountCapital)}
                        </p>
                    </div>

                    {/* Risk Percentage */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                Risk per Trade (%)
                            </label>
                            <span className="text-lg font-bold text-amber-600">
                                {riskPercentage}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="10"
                            step="0.1"
                            value={riskPercentage}
                            onChange={(e) => setRiskPercentage(Number(e.target.value))}
                            className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>Conservative (0.5%)</span>
                            <span>Aggressive (5%+)</span>
                        </div>
                    </div>

                    {/* Trade Details Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Entry Price */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-slate-600" />
                                    Entry Price
                                </label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                <input
                                    type="number"
                                    value={entryPrice === 0 ? '' : entryPrice}
                                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900"
                                />
                            </div>
                        </div>

                        {/* Stop Loss */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                    Stop Loss
                                </label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                <input
                                    type="number"
                                    value={stopLossPrice === 0 ? '' : stopLossPrice}
                                    onChange={(e) => setStopLossPrice(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Visuals */}
                <div className="space-y-6">
                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white text-center shadow-lg">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">
                            Recommended Position Size
                        </p>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-6xl font-bold text-white">
                                {result.quantity}
                            </span>
                            <span className="text-xl text-slate-400 font-medium">Qty</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-4">
                            Shares / Lots to Buy
                        </p>
                    </div>

                    {/* Risk Visual */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Risk Analysis
                        </h3>

                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-slate-600">Capital at Risk</span>
                            <span className="font-bold text-red-600">{formatCurrency(result.totalRiskAmount)}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-4 mb-6 overflow-hidden">
                            <div
                                className="bg-amber-500 h-4 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${riskProgress}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-medium text-blue-700 mb-1">Capital Required</p>
                                <p className="text-xl font-bold text-blue-900">
                                    {formatCurrency(result.capitalRequired)}
                                </p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                <p className="text-xs font-medium text-red-700 mb-1">Risk Per Share</p>
                                <p className="text-xl font-bold text-red-900">
                                    {formatCurrency(result.riskPerShare)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-800">
                            <strong>Note:</strong> Always verify the position size with your broker before placing the trade.
                            This calculator assumes a fixed risk percentage of your total capital.
                        </p>
                    </div>
                </div>
            </div>
            <RelatedCalculators toolId="position-size" category="investments" />
        </div>
    );
}
