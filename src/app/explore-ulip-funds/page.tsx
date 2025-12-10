import React from 'react';
import { Metadata } from 'next';
import UlipExplorer from '@/components/explorers/UlipExplorer';

export const metadata: Metadata = {
    title: 'Explore ULIP Funds - Best Performing ULIPs in India | RupeeTools',
    description: 'Compare past performance of Unit Linked Insurance Plans (ULIPs) from top insurers. Analyze 1Y, 3Y, 5Y and Inception returns.',
    keywords: ['ULIP funds', 'ULIP performance', 'best ULIP funds', 'compare ULIPs', 'SBI Life ULIP', 'ICICI Pru ULIP', 'HDFC Life ULIP'],
    alternates: {
        canonical: 'https://rupeetools.in/explore-ulip-funds',
    },
};

export default function ExploreUlipPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                Explore ULIP Funds
                            </h1>
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
