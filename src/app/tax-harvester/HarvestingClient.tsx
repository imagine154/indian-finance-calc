"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { HarvestingInput } from '@/components/tools/tax-harvester/HarvestingInput';
import { HarvestingStrategy } from '@/components/tools/tax-harvester/HarvestingStrategy';
import { analyzeHarvestingOpportunities, Holding, HarvestingResult } from '@/lib/tax-harvesting';

export function HarvestingPageClient() {
    const [realizedSTCG, setRealizedSTCG] = useState<number>(0);
    const [realizedLTCG, setRealizedLTCG] = useState<number>(0);
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [result, setResult] = useState<HarvestingResult | null>(null);

    useEffect(() => {
        // Only analyze if there is at least some data to analyze (gains > 0 OR holdings with loss)
        // Actually, prompt says "accepts user's realized gains/losses".
        // We should run analysis whenever inputs change.
        const calculation = analyzeHarvestingOpportunities(realizedSTCG, realizedLTCG, holdings);
        setResult(calculation);
    }, [realizedSTCG, realizedLTCG, holdings]);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Simple Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                Tax Loss Harvester
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                                    FY 2024-25 Ready
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Intro */}
                <div className="mb-8 max-w-3xl">
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Offset your stock market gains and reduce your tax bill before March 31st. Automatically find which loss-making stocks to sell to minimize your STCG and LTCG liability.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Inputs */}
                    <div className="lg:col-span-2 space-y-6">
                        <HarvestingInput
                            realizedSTCG={realizedSTCG}
                            setRealizedSTCG={setRealizedSTCG}
                            realizedLTCG={realizedLTCG}
                            setRealizedLTCG={setRealizedLTCG}
                            holdings={holdings}
                            setHoldings={setHoldings}
                        />
                    </div>

                    {/* Right Column: Strategy (Sticky) */}
                    <div className="lg:col-span-1 sticky top-24">
                        {result && (
                            <HarvestingStrategy result={result} />
                        )}

                        {!result?.taxSaved && result?.sellList.length === 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ArrowUpRight className="w-6 h-6 text-slate-400" />
                                </div>
                                <h3 className="text-slate-900 font-semibold mb-1">No Strategy Yet</h3>
                                <p className="text-sm text-slate-500">
                                    Enter your gains and add loss-making holdings to see tax saving opportunities.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-12 bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-3xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">About Tax Harvesting</h2>
                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                        <p>
                            <strong className="text-slate-900">Tax Loss Harvesting</strong> is a strategy to reduce your tax liability by selling stocks that are currently at a loss to offset the gains you have realized from other profitable investments.
                        </p>

                        <h3 className="font-semibold text-slate-900 mt-4">FY 2024-25 Tax Rules (India)</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong className="text-slate-800">STCG (Short Term Capital Gains):</strong> Taxed at <span className="font-bold text-slate-800">20%</span>. Applies if held for less than 12 months.
                            </li>
                            <li>
                                <strong className="text-slate-800">LTCG (Long Term Capital Gains):</strong> Taxed at <span className="font-bold text-slate-800">12.5%</span>. Applies if held for more than 12 months. The first ₹1.25 Lakh of LTCG is exempt from tax every financial year.
                            </li>
                        </ul>

                        <h3 className="font-semibold text-slate-900 mt-4">Important Notes</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Set-off Rules:</strong> Short Term Capital Loss (STCL) can be set off against both STCG and LTCG. However, Long Term Capital Loss (LTCL) can <em>only</em> be set off against LTCG.
                            </li>
                            <li>
                                <strong>Carry Forward:</strong> Any unadjusted losses can be carried forward for 8 assessment years.
                            </li>
                            <li>
                                <strong>Wash Sale Rule:</strong> Unlike the US, India does not have a strict "Wash Sale" rule. However, buying back the same stock immediately after selling (especially on the same day) may be considered speculative or not genuine by tax authorities. It is generally advisable to wait at least 24 hours or ensure the transaction is a genuine delivery-based sale.
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
