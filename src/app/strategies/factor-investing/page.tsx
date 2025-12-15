import React from 'react';
import { Metadata } from 'next';
import FactorStrategyPlanner from '@/components/strategies/FactorStrategyPlanner';
import { Activity, Zap, BarChart } from 'lucide-react';
import { STRATEGIES } from '@/config/strategies';
import { StrategyTools } from '@/components/strategies/StrategyTools';

const strategy = STRATEGIES.find(s => s.id === 'smart-beta');

export const metadata: Metadata = {
    title: strategy?.seo?.title,
    description: strategy?.seo?.description,
    keywords: strategy?.seo?.keywords,
};

export default function FactorInvestingPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to implement Factor Investing (Smart Beta)",
        "description": "Construct a portfolio based on Momentum, Value, Quality, or Low Volatility factors.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Identify the Factor",
                "text": "Choose a factor based on your goal (e.g., Momentum for high growth, Low Volatility for safety)."
            },
            {
                "@type": "HowToStep",
                "name": "Select the Instrument",
                "text": "Invest in a specialized Index Fund or ETF tracking that factor (e.g., Nifty 200 Momentum 30)."
            },
            {
                "@type": "HowToStep",
                "name": "Monitor Market Cycle",
                "text": "Understand that factors are cyclical. Momentum performs in bull markets, while Low Volatility performs in bear markets."
            },
            {
                "@type": "HowToStep",
                "name": "Diversify",
                "text": "Ideally, combine uncorrelated factors (like Value and Momentum) to smooth out portfolio volatility."
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
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap className="w-3 h-3" />
                            Risk: High
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Factor Investing (Smart Beta)
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            Don't just buy "The Market". Buy the <em>drivers</em> of the market (Momentum, Value, Quality) based on the current economic cycle to potentially generate higher alpha.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <FactorStrategyPlanner />

                {/* Educational Content */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">What are Factors?</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Factors are specific characteristics of stocks that explain their returns over time. The most proven ones are Value, Momentum, Quality, Size, and Low Volatility.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                            <BarChart className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Why Smart Beta?</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Market Cap weighting (like Nifty 50) is "blind". Smart Beta uses alternative weighting schemes to capture "Factor Premia" - excess returns for taking specific risks.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Cyclicality</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            No factor works all the time. Momentum works in trends, Low Volatility in crashes, and Value in recoveries. Rotating between them can smooth returns.
                        </p>
                    </div>
                </div>

                <StrategyTools />
            </div>
        </main>
    );
};
