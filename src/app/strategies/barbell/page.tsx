import React from 'react';
import { Metadata } from 'next';
import BarbellStrategyPlanner from '@/components/strategies/BarbellStrategyPlanner';
import { ShieldAlert, Split } from 'lucide-react';
import { STRATEGIES } from '@/config/strategies';

const strategy = STRATEGIES.find(s => s.id === 'barbell');

export const metadata: Metadata = {
    title: strategy?.seo?.title,
    description: strategy?.seo?.description,
    keywords: strategy?.seo?.keywords,
};

export default function BarbellStrategyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to implement the Barbell Strategy",
        "description": "Protect 90% of your capital and bet 10% on high-risk moonshots.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Secure the Base (90%)",
                "text": "Allocate 90% of your capital to ultra-safe, low-volatility assets like Government Bonds, FDs, or Liquid Funds."
            },
            {
                "@type": "HowToStep",
                "name": "Take the Bets (10%)",
                "text": "Allocate the remaining 10% to high-risk, high-reward assets (Moonshots) like Crypto, VC Funds, or Deep Out-of-the-Money Options."
            },
            {
                "@type": "HowToStep",
                "name": "Avoid the Middle",
                "text": "Do not invest in 'Medium Risk' assets like Corporate Bonds or Bluechip stocks, which limit upside but still carry ruin risk."
            },
            {
                "@type": "HowToStep",
                "name": "Accept Volatility",
                "text": "Be mentally prepared for the 10% risk bucket to fluctuate wildly or even go to zero, knowing your 90% is safe."
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
                        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <ShieldAlert className="w-3 h-3" />
                            Risk: Extreme
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            The Barbell Strategy
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            Avoid the "middling" risks. Keep 90% of your money in ultra-safe assets (Bonds/FDs) and use the remaining 10% for high-risk, asymmetric bets (Crypto, Startups).
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <BarbellStrategyPlanner />

                {/* Educational Content */}
                <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Split className="w-6 h-6 text-slate-400" />
                        The Philosophy
                    </h3>
                    <div className="prose prose-slate max-w-none text-slate-600">
                        <p className="leading-relaxed mb-4">
                            Popularized by Nassim Nicholas Taleb, the Barbell Strategy acknowledges that "medium risk" assets often carry hidden tail risks (like the 2008 crash).
                        </p>
                        <p className="leading-relaxed mb-4">
                            Instead of trying to predict the market, you structure your portfolio so you cannot be ruined (Safe Side) but are exposed to unlimited upside (Risk Side).
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 mt-6">
                            <li className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
                                <strong className="block text-cyan-800 mb-1">Safe Side (Weight: 80-90%)</strong>
                                Treasury Bills, Fixed Deposits, Gold, Hard Cash. Things that hold value even if the world ends.
                            </li>
                            <li className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                <strong className="block text-orange-800 mb-1">Risk Side (Weight: 10-20%)</strong>
                                Options, Crypto, Angel Investing, Small Caps. Things that can go to zero or go 100x.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
