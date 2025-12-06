import React from 'react';
import { Metadata } from 'next';
import MutualFundAnalyzer from '@/components/calculators/MutualFundAnalyzer';

export const metadata: Metadata = {
    title: 'Mutual Fund Historical Returns - 1M to 10Y Analysis | RupeeTools',
    description: 'Analyze past performance of 3000+ Indian Mutual Funds and ETFs. Compare returns across different time periods.',
    keywords: [
        'Mutual Fund Returns',
        'ETF Returns',
        'Historical Performance',
        'SIP Calculator',
        'Mutual Fund Analysis',
        'Best Mutual Funds',
        'Index Funds',
    ],
};

export default function MutualFundPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Mutual Fund & ETF Analyzer
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Analyze historical returns of over 3000+ Indian Mutual Funds and ETFs.
                        Compare performance across multiple timeframes to make informed investment decisions.
                    </p>
                </div>

                {/* Calculator Component */}
                <MutualFundAnalyzer />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Tool</h2>
                    <p className="text-slate-600 mb-4">
                        This tool provides a comprehensive analysis of historical performance for Indian Mutual Funds and ETFs.
                        Unlike simple return calculators, it uses pre-computed data to show you exactly how a fund has performed over specific periods (1 Month to 10 Years).
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Features</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Extensive Database:</strong> Covers 3000+ schemes including Direct, Regular, Growth, and Dividend options.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Multi-Period Analysis:</strong> View returns for 1M, 3M, 6M, 1Y, 3Y, 5Y, 7Y, and 10Y periods side-by-side.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Smart Filtering:</strong> Filter by AMC, Category (Equity, Debt, Hybrid), Sub-Category, and Plan type.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Consistency Scoring:</strong> Identify "Consistent Performers" and "Emerging Stars" based on our proprietary scoring logic.</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">How to Use</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">1.</span>
                                    <span><strong>Select Investment Type:</strong> Choose between Mutual Funds or ETFs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">2.</span>
                                    <span><strong>Search or Filter:</strong> Type a scheme name or use the dropdowns to narrow down your choices.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">3.</span>
                                    <span><strong>Calculate:</strong> Click "Calculate Returns" to see the detailed performance table and comparison chart.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">4.</span>
                                    <span><strong>Analyze:</strong> Look for consistency badges and compare returns against category peers.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                        <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully.
                        Past performance is not an indicator of future returns. The data provided here is for informational purposes only and should not be construed as investment advice.
                    </div>
                </div>
            </div>
        </main>
    );
}
