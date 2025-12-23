import React from 'react';
import { Metadata } from 'next';
import UlipExplorer from '@/components/explorers/UlipExplorer';
import { PageHeader } from '@/components/ui/PageHeader';

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
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Explore ULIP Funds" badge="Data as of 30/11/2025" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Detailed performance analytics for Unit Linked Insurance Plans. Compare returns across equity, debt, and balanced funds from top insurers.
                        </p>
                    </div>

                    <UlipExplorer />
                </div>
            </div>
        </div>
    );
}
