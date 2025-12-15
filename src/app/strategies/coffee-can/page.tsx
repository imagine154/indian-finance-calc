import React from 'react';
import { Metadata } from 'next';
import CoffeeCanPlanner from '@/components/strategies/CoffeeCanPlanner';
import { ShieldCheck, TrendingUp, Lock } from 'lucide-react';
import { STRATEGIES } from '@/config/strategies';

const strategy = STRATEGIES.find(s => s.id === 'coffee-can');

export const metadata: Metadata = {
    title: strategy?.seo?.title,
    description: strategy?.seo?.description,
    keywords: strategy?.seo?.keywords,
};

export default function CoffeeCanPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to implement Coffee Can Investing",
        "description": "Construct a portfolio of high-quality companies and hold them for a decade.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Market Cap Filter",
                "text": "Filter for companies with a market cap greater than ₹500 Crores to ensure basic liquidity and stability."
            },
            {
                "@type": "HowToStep",
                "name": "Revenue Growth Filter",
                "text": "Select companies that have grown revenue by at least 10% every year for the last 10 years."
            },
            {
                "@type": "HowToStep",
                "name": "ROCE Filter",
                "text": "Ensure Return on Capital Employed (ROCE) has been above 15% every year for the last 10 years."
            },
            {
                "@type": "HowToStep",
                "name": "Hold for 10 Years",
                "text": "Invest an equal amount in these companies and do not sell for at least 10 years, regardless of market movements."
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
                        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <ShieldCheck className="w-3 h-3" />
                            Risk: Low-Medium
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Coffee Can Investing
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            The "Buy and Forget" strategy. Build a portfolio of high-quality companies with clean accounts and consistent growth, then don't touch them for 10 years.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <CoffeeCanPlanner />

                {/* Strategy Guide */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Rules Card */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Selection Criteria</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Revenue Growth {'>'} 10%</h4>
                                    <p className="text-slate-500 text-sm mt-1">
                                        The company must have grown its revenue by at least 10% every single year for the last 10 years. This shows demand for its products.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-slate-100" />
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                                    <Lock className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">ROCE {'>'} 15%</h4>
                                    <p className="text-slate-500 text-sm mt-1">
                                        Return on Capital Employed (ROCE) must be above 15% every year. This ensures the company generates cash efficiently and has a "moat".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Philosophy Card */}
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-sm text-white">
                        <h3 className="text-2xl font-bold text-white mb-4">Why "Coffee Can"?</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            The term comes from the American Old West, where people would put their valuables in a coffee can and hide it under their mattress, leaving it untouched for decades.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            In investing, it refers to the practice of building a high-quality portfolio and then completely ignoring it for a decade. This prevents "activity bias"—the tendency to trade too often, which kills returns through transaction costs and taxes.
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
