import React from 'react';
import { Metadata } from 'next';
import MutualFundExplorer from '@/components/explorers/MutualFundExplorer';
import { PageHeader } from '@/components/ui/PageHeader';

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
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Mutual Fund Explorer" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Analyze and compare over 1,500 Direct mutual funds in India. Filter by category, risk, rating, and returns to find the best funds for your portfolio.
                        </p>
                    </div>

                    <MutualFundExplorer />
                </div>
            </div>
        </div>
    );
}
