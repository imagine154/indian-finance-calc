import React from 'react';
import { Metadata } from 'next';
import MutualFundExplorer from '@/components/explorers/MutualFundExplorer';

export const metadata: Metadata = {
    title: 'Mutual Fund Explorer India - Compare & Screen 1500+ Funds | RupeeTools',
    description: 'Find the best mutual funds in India. Filter by Returns, Rating, and Fund Manager. Updated data for Equity, Debt, and Hybrid funds.',
    keywords: ['mutual fund screener', 'best mutual funds 2025', 'fund manager performance', 'compare mutual funds India', 'mutual fund ratings'],
    alternates: {
        canonical: 'https://rupeetools.in/mutual-funds',
    },
};

export default function MutualFundsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Mutual Fund Explorer
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        Analyze and compare over 1,500 Direct mutual funds in India. Filter by category, risk, rating, and returns to find the best funds for your portfolio.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <MutualFundExplorer />
            </div>
        </div>
    );
}
