"use client";

import React, { useState } from 'react';
import { Copy, Check, Crosshair, ArrowUp, ArrowDown, Calculator } from 'lucide-react';
import { PivotInput, calculatePivotPoints, PivotMethod } from '../../core/logic/pivot-points';
import { RelatedCalculators } from "../ui/RelatedCalculators";

const PivotPointCalculator = () => {
    const [inputs, setInputs] = useState<PivotInput>({
        high: 24500,
        low: 24300,
        close: 24450,
        method: 'Standard'
    });

    const [copied, setCopied] = useState(false);

    const result = calculatePivotPoints(inputs);

    const handleInputChange = (key: keyof PivotInput, value: any) => {
        setInputs(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const copyToClipboard = () => {
        let text = `Pivot Points (${inputs.method})\n\n`;
        if (result.r4) text += `R4: ${formatPrice(result.r4)}\n`;
        text += `R3: ${formatPrice(result.r3)}\n`;
        text += `R2: ${formatPrice(result.r2)}\n`;
        text += `R1: ${formatPrice(result.r1)}\n`;
        text += `Pivot: ${formatPrice(result.pivot)}\n`;
        text += `S1: ${formatPrice(result.s1)}\n`;
        text += `S2: ${formatPrice(result.s2)}\n`;
        text += `S3: ${formatPrice(result.s3)}\n`;
        if (result.s4) text += `S4: ${formatPrice(result.s4)}\n`;

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-7xl mx-auto font-sans">

            {/* Header / Intro */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-xl">
                    <Crosshair className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Pivot Point Calculation</h2>
                    <p className="text-slate-600 mt-1 max-w-2xl">
                        Enter yesterday's High, Low, and Close prices to generate support & resistance levels for intraday trading.
                        Identify key reversal zones using {inputs.method} pivots.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-slate-600" />
                            <h3 className="font-bold text-slate-800">Parameters</h3>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Method Selector */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Calculation Method</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Standard', 'Fibonacci', 'Camarilla', 'Woodie'].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => handleInputChange('method', m as PivotMethod)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${inputs.method === m
                                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Price Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Previous High</label>
                                    <div className="relative">
                                        <ArrowUp className="absolute left-3 top-3 w-4 h-4 text-green-500" />
                                        <input
                                            type="number"
                                            value={inputs.high}
                                            onChange={(e) => handleInputChange('high', Number(e.target.value))}
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono font-medium text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Previous Low</label>
                                    <div className="relative">
                                        <ArrowDown className="absolute left-3 top-3 w-4 h-4 text-red-500" />
                                        <input
                                            type="number"
                                            value={inputs.low}
                                            onChange={(e) => handleInputChange('low', Number(e.target.value))}
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono font-medium text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Previous Close</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 w-4 h-[2px] bg-slate-400 mt-2"></div>
                                        <input
                                            type="number"
                                            value={inputs.close}
                                            onChange={(e) => handleInputChange('close', Number(e.target.value))}
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono font-medium text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Price Ladder */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    Support & Resistance Levels
                                    <span className="text-xs font-normal text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                                        {inputs.method}
                                    </span>
                                </h3>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="text-xs font-medium flex items-center gap-1.5 text-slate-600 hover:text-amber-600 transition-colors bg-white border border-slate-200 hover:border-amber-200 px-3 py-1.5 rounded-lg"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Levels"}
                            </button>
                        </div>

                        <div className="p-8 flex-1 flex flex-col justify-center items-center bg-slate-50/50">
                            <div className="w-full max-w-lg space-y-3 relative">

                                {/* Vertical Center Line */}
                                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -z-10 translate-x-[-0.5px]"></div>

                                {/* Resistance Levels (Top) */}
                                {result.r4 && (
                                    <div className="flex items-center group">
                                        <div className="w-24 text-right pr-4 text-xs font-bold text-slate-400 uppercase">R4 (Breakout)</div>
                                        <div className="flex-1 bg-red-100/80 border border-red-200 text-red-700 py-3 rounded-xl text-center font-mono font-bold shadow-sm relative group-hover:scale-[1.02] transition-transform">
                                            {formatPrice(result.r4)}
                                        </div>
                                    </div>
                                )}

                                {[result.r3, result.r2, result.r1].map((val, idx) => {
                                    const labels = ['R3', 'R2', 'R1'];
                                    const colors = [
                                        'bg-red-50 text-red-600 border-red-100', // R3 (Lightest) -> Wait, usually R3 is stronger resistance so maybe darker? 
                                        // Let's stick to the user req: "Red/Rose backgrounds (Light to Dark)"
                                        // Typically highest resistance is darkest red.
                                        'bg-rose-200 text-rose-900 border-rose-300', // R3
                                        'bg-rose-100 text-rose-800 border-rose-200', // R2
                                        'bg-rose-50 text-rose-700 border-rose-100'   // R1
                                    ];
                                    // Actually mapping correctly:
                                    // idx 0 = R3, idx 1 = R2, idx 2 = R1

                                    return (
                                        <div key={idx} className="flex items-center group">
                                            <div className="w-24 text-right pr-4 text-xs font-bold text-slate-400 uppercase">{labels[idx]}</div>
                                            <div className={`flex-1 py-3 rounded-xl text-center font-mono font-bold shadow-sm border relative group-hover:scale-[1.02] transition-transform ${colors[idx]}`}>
                                                {formatPrice(val)}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Pivot Point (Neutral) */}
                                <div className="flex items-center py-2 group">
                                    <div className="w-24 text-right pr-4 text-xs font-bold text-amber-500 uppercase">Pivot Point</div>
                                    <div className="flex-1 bg-amber-100 border border-amber-300 text-amber-900 py-4 rounded-xl text-center font-mono text-xl font-black shadow-md relative z-10 scale-105 group-hover:scale-[1.07] transition-transform">
                                        {formatPrice(result.pivot)}
                                    </div>
                                </div>

                                {/* Support Levels (Bottom) */}
                                {[result.s1, result.s2, result.s3].map((val, idx) => {
                                    const labels = ['S1', 'S2', 'S3'];
                                    const colors = [
                                        'bg-emerald-50 text-emerald-700 border-emerald-100', // S1
                                        'bg-emerald-100 text-emerald-800 border-emerald-200', // S2
                                        'bg-emerald-200 text-emerald-900 border-emerald-300'   // S3
                                    ];

                                    return (
                                        <div key={idx} className="flex items-center group">
                                            <div className="w-24 text-right pr-4 text-xs font-bold text-slate-400 uppercase">{labels[idx]}</div>
                                            <div className={`flex-1 py-3 rounded-xl text-center font-mono font-bold shadow-sm border relative group-hover:scale-[1.02] transition-transform ${colors[idx]}`}>
                                                {formatPrice(val)}
                                            </div>
                                        </div>
                                    );
                                })}

                                {result.s4 && (
                                    <div className="flex items-center group">
                                        <div className="w-24 text-right pr-4 text-xs font-bold text-slate-400 uppercase">S4 (Breakout)</div>
                                        <div className="flex-1 bg-emerald-100/80 border border-emerald-200 text-emerald-700 py-3 rounded-xl text-center font-mono font-bold shadow-sm relative group-hover:scale-[1.02] transition-transform">
                                            {formatPrice(result.s4)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators toolId="pivot-point" category="investments" />
        </div>
    );
};

export default PivotPointCalculator;
