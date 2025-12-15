import React from 'react';
import { Metadata } from 'next';
import MagicFormulaPlanner from '@/components/strategies/MagicFormulaPlanner';
import { Wand2, Zap, BookOpen } from 'lucide-react';
import { STRATEGIES } from '@/config/strategies';

const strategy = STRATEGIES.find(s => s.id === 'magic-formula');

export const metadata: Metadata = {
    title: strategy?.seo?.title,
    description: strategy?.seo?.description,
    keywords: strategy?.seo?.keywords,
};

export default function MagicFormulaPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to use the Magic Formula Strategy",
        "description": "Systematically buy good companies at cheap prices.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Filter Universe",
                "text": "Start with a list of top 500 companies by market cap to ensure liquidity."
            },
            {
                "@type": "HowToStep",
                "name": "Rank by Quality (ROCE)",
                "text": "Rank all companies by Return on Capital Employed (ROCE). Higher is better."
            },
            {
                "@type": "HowToStep",
                "name": "Rank by Price (Earnings Yield)",
                "text": "Rank all companies by Earnings Yield (EBIT / Enterprise Value). Higher is better."
            },
            {
                "@type": "HowToStep",
                "name": "Combine & Buy",
                "text": "Combine the rankings (ROCE Rank + Yield Rank). Buy the top 20-30 companies with the best combined score."
            }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap className="w-3 h-3" />
                            Risk: High
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            The Magic Formula
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            "Buying good companies at cheap prices makes sense." — Joel Greenblatt. <br />
                            A systematic, emotion-free approach to value investing that has historically beaten the market.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <MagicFormulaPlanner />

                {/* Educational Content */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-rose-500" />
                            The "Little Book" Summary
                        </h3>
                        <div className="prose prose-slate text-slate-600">
                            <p>
                                This strategy comes from the bestseller <em>The Little Book That Beats the Market</em>. Greenblatt argues that most investors fail because they let emotions rule.
                            </p>
                            <p>
                                By ranking companies strictly on two metrics (Quality and Price) and blindly buying the top list, you systematically exploit market inefficiencies.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-white">
                        <h3 className="text-2xl font-bold text-rose-400 mb-4">Why it's Hard</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            If it's so magic, why doesn't everyone do it?
                        </p>
                        <p className="text-slate-300 leading-relaxed font-semibold">
                            Because it often buys companies that are "hated" by the market (unpopular, facing temporary issues). holding them requires "stomach".
                        </p>
                        <p className="text-slate-300 leading-relaxed mt-4">
                            Also, it can underperform the index for years. Most people quit just before the strategy outperforms.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
