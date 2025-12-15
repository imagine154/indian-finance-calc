import React from 'react';
import type { Metadata } from 'next';
import ThreeBucketPlanner from '@/components/strategies/ThreeBucketPlanner';
import { STRATEGIES } from '@/config/strategies';
import { StrategyTools } from '@/components/strategies/StrategyTools';

const strategy = STRATEGIES.find(s => s.id === 'three-bucket');

export const metadata: Metadata = {
    title: strategy?.seo?.title,
    description: strategy?.seo?.description,
    keywords: strategy?.seo?.keywords,
};

const ThreeBucketPage = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to implement the 3-Bucket Retirement Strategy",
        "description": "Plan your retirement income by allocating corpus into Immediate, Medium-term, and Long-term buckets.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Bucket 1: Immediate Income",
                "text": "Allocate 3-5 years of expenses in safe, liquid assets like Liquid Funds or FDs."
            },
            {
                "@type": "HowToStep",
                "name": "Bucket 2: Stability & Growth",
                "text": "Allocate 5-7 years of expenses in Hybrid Funds or Debt Funds for moderate growth."
            },
            {
                "@type": "HowToStep",
                "name": "Bucket 3: Long-term Wealth",
                "text": "Allocate the remaining corpus in Equity Mutual Funds to beat inflation over the next 10+ years."
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
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                        Best for Retirees
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        The 3-Bucket Strategy
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        How to generate a safe monthly income for 30+ years without fearing market crashes. Divide your wealth into Time Buckets.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <ThreeBucketPlanner />

                {/* Educational Section */}
                <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Strategy Guide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-teal-800 mb-3">The Core Concept</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                Typical retirement mistakes usually involve being too conservative (100% FD) or too aggressive (100% Stocks).
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                The <strong>Bucket Strategy</strong> solves this by matching assets to time horizons. You don't need *all* your money today. You only need this month's expenses. So why keep 30 years of money in a low-return Savings Account?
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-teal-800 mb-3">How it Protects You</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex gap-2">
                                    <span className="font-bold text-teal-600">✓</span>
                                    <span><strong>Recession Proof:</strong> If the market crashes by 50%, you don't panic. You have 10 years of income safe in Buckets 1 & 2.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold text-teal-600">✓</span>
                                    <span><strong>Inflation Proof:</strong> Bucket 3 stays invested in Equity. Over 10 years, it grows to beat inflation and refill the other buckets.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <StrategyTools />

                {/* Removed SoftwareAppJsonLd */}
            </div>
        </main>
    );
};

export default ThreeBucketPage;
