
import React from 'react';
import type { Metadata } from 'next';
import SipAnalyzer from '@/components/calculators/SipAnalyzer';

export const metadata: Metadata = {
    title: "SIP Portfolio Analyzer - Are you on track for your goal? | RupeeTools",
    description: "Analyze your mutual fund portfolio. Check if your current SIPs are enough to reach your financial goals based on category-wise expected returns.",
    keywords: ["SIP analyzer", "portfolio review tool", "mutual fund goal tracker", "asset allocation calculator"],
};

export default function SipAnalyzerPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-20 pb-12">
            <SipAnalyzer />

            {/* About Section */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">About SIP Portfolio Analyzer</h2>
                        <p className="text-slate-600 leading-relaxed">
                            The SIP Portfolio Analyzer is a powerful tool designed to help you verify if your current or planned mutual fund investments are aligned with your financial goals.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Unlike basic calculators that assume a flat return rate for all investments, this analyzer uses <strong>historical category-wise returns</strong> based on your investment time horizon.
                            For example, Equity Mid-Cap funds might deliver higher returns over 10 years compared to 3 years, while Debt funds provide more stability for shorter durations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">🎯 Goal Gap Analysis</h3>
                            <p className="text-sm text-slate-500">
                                Instantly see if your current SIPs will meet your target corpus.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">📊 Dynamic Returns</h3>
                            <p className="text-sm text-slate-500">
                                Returns are automatically adjusted based on whether you are investing for 3, 5, or 10+ years.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">⚖️ Rebalance Strategy</h3>
                            <p className="text-sm text-slate-500">
                                Get a model portfolio recommendation ("Aggressive") tailored to your time horizon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
