import React from 'react';
import { Metadata } from 'next';
import UlipExplorer from '@/components/explorers/UlipExplorer';

export const metadata: Metadata = {
    title: 'Best ULIP Funds (2025) - Compare Past Returns & Performance | RupeeTools',
    description: 'Track and compare historical returns of top Unit Linked Insurance Plans (ULIPs) in India. Analyze 1Y, 3Y, 5Y, and 10Y performance of funds from SBI Life, HDFC Life, ICICI Pru, Tata AIA, and more.',
    keywords: [
        'ULIP funds', 'ULIP performance', 'best ULIP funds 2025', 'compare ULIPs India',
        'SBI Life ULIP returns', 'ICICI Pru ULIP fund performance', 'HDFC Life Click 2 Wealth',
        'ULIP vs Mutual Funds', 'Tax saving investments 80C', 'Unit Linked Insurance Plan'
    ],
    alternates: {
        canonical: 'https://rupeetools.in/explore-ulip-funds',
    },
    openGraph: {
        title: 'Best ULIP Funds Explorer (2025) | RupeeTools',
        description: 'Compare 1Y, 3Y, 5Y & 10Y returns of top ULIP funds from SBI, HDFC, ICICI, and more. Free tool for smart investors.',
        url: 'https://rupeetools.in/explore-ulip-funds',
        siteName: 'RupeeTools',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best ULIP Funds Explorer (2025) | RupeeTools',
        description: 'Compare historical returns of top ULIP funds. Check 1Y to 10Y performance.',
    }
};

export default function ExploreUlipPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-0">
                                    Explore ULIP Funds
                                </h1>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Data as of 30/11/2025
                                </span>
                            </div>
                            <p className="text-lg text-slate-600 max-w-3xl">
                                Detailed performance analytics for Unit Linked Insurance Plans. Compare returns across equity, debt, and balanced funds from top insurers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <UlipExplorer />
            </div>
        </div>
    );
}
