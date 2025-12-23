"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { HarvestingResult } from '@/lib/tax-harvesting';

interface HarvestingStrategyProps {
    result: HarvestingResult;
}

export function HarvestingStrategy({ result }: HarvestingStrategyProps) {
    // Always open by default in the static card view
    const [isOpen, setIsOpen] = useState(true);

    if (result.taxSaved <= 0 && result.sellList.length === 0) {
        return null;
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="h-full">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header - Success State */}
                <div className="bg-emerald-50 border-b border-emerald-100 p-6 flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full text-emerald-600 shadow-sm shrink-0 border border-emerald-100">
                        <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-emerald-800 font-medium text-sm uppercase tracking-wide mb-1">Savings Potential</p>
                        <h3 className="text-3xl font-bold text-emerald-700">
                            {formatCurrency(result.taxSaved)}
                        </h3>
                        <p className="text-emerald-600 text-sm mt-2">
                            {result.summary}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase font-medium mb-1">Original Tax Bill</p>
                            <p className="text-lg font-bold text-slate-900">{formatCurrency(result.originalTaxLiability)}</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                            <p className="text-xs text-emerald-600 uppercase font-medium mb-1">New Tax Bill</p>
                            <p className="text-lg font-bold text-emerald-700">{formatCurrency(result.newTaxLiability)}</p>
                        </div>
                    </div>

                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        Action Plan
                    </h4>

                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-4">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-4 py-3">Stock</th>
                                    <th className="px-4 py-3">Sell Qty</th>
                                    <th className="px-4 py-3 text-right">Book Loss</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {result.sellList.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-900">
                                            {item.stock}
                                            <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded-[4px] text-[10px] font-medium ${item.type === 'STCG' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 font-medium">{item.unitsToSell}</td>
                                        <td className="px-4 py-3 text-red-600 font-bold text-right">{formatCurrency(item.lossBooked)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-auto">
                        <p className="text-[10px] text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                            Disclaimer: Tax laws are subject to change. This tool provides an estimate based on FY 24-25 rules. Consult a tax professional before making trade decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
