import React from 'react';
import type { Metadata } from 'next';
import CoreSatellitePlanner from '@/components/strategies/CoreSatellitePlanner';
import { STRATEGIES } from '@/config/strategies';
import { StrategyTools } from '@/components/strategies/StrategyTools';

const strategy = STRATEGIES.find(s => s.id === 'core-satellite');

export const metadata: Metadata = {
    title: strategy?.seo?.title,
    description: strategy?.seo?.description,
    keywords: strategy?.seo?.keywords,
};

const CoreSatellitePage = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to build a Core & Satellite Portfolio",
        "description": "A step-by-step guide to allocating capital between safe Index funds and high-growth Satellite funds.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Determine Risk Profile",
                "text": "Assess your risk tolerance (Conservative, Moderate, Aggressive) to decide the allocation split."
            },
            {
                "@type": "HowToStep",
                "name": "Calculate Core Allocation",
                "text": "Allocate the majority (60-80%) of your capital to low-cost Index Funds or ETFs."
            },
            {
                "@type": "HowToStep",
                "name": "Select Satellite Funds",
                "text": "Allocate the remaining capital (20-40%) to high-growth potential assets like Small Caps or Sector funds."
            },
            {
                "@type": "HowToStep",
                "name": "Rebalance Periodically",
                "text": "Review and rebalance your portfolio annually to maintain the desired allocation."
            }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
                        Risk: Medium
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Core & Satellite Strategy
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        The professional approach to portfolio construction. Secure your future with a stable 'Core' while chasing higher returns with a 'Satellite' orbit.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <CoreSatellitePlanner />

                {/* Educational Section */}
                <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        Strategy Guide
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-indigo-900 mb-3">1. The Core (60-80%)</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                This is the bedrock of your portfolio. The goal here is <strong>Beta</strong> (Market Returns). It should track the broad market index. It won't make you rich overnight, but it prevents you from being poor.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-emerald-900 mb-3">2. The Satellite (20-40%)</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                This is for generating <strong>Alpha</strong> (Excess Returns). Here you take calculated risks with Small Caps, Sectoral bets, or Factor strategies to boost overall performance.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">3. The Result</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A portfolio that is smoother than a pure Small-Cap portfolio but performs better than a pure Index portfolio. It minimizes regret and maximizes peace of mind.
                            </p>
                        </div>
                    </div>
                </div>

                <StrategyTools />

                {/* Removed Tool specific JSON-LD in favor of HowTo */}
            </div>
        </main>
    );
};

export default CoreSatellitePage;
