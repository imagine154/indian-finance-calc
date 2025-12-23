import React from 'react';
import type { Metadata } from 'next';
import RentVsBuyCalculator from '@/components/calculators/RentVsBuyCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Rent vs Buy Calculator India - Financial Decision Tool | RupeeTools',
    description: 'Should you buy a home or live on rent? Calculate the financial impact of buying vs renting with opportunity cost and tax benefits.',
    keywords: 'rent vs buy calculator, buy or rent house india, rent vs buy decision, financial calculator india, home loan vs rent',
    openGraph: {
        title: 'Rent vs Buy Calculator India - Financial Decision Tool | RupeeTools',
        description: 'Should you buy a home or live on rent? Calculate the financial impact of buying vs renting with opportunity cost and tax benefits.',
        type: 'website',
    }
};

export default function RentVsBuyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Rent vs Buy Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <RentVsBuyCalculator />

                    {/* SEO Content / FAQ Section */}
                    <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">How does this calculator work?</h2>
                        <div className="prose text-slate-600 max-w-none">
                            <p className="mb-4">
                                This tool simulates your net wealth over a period of time (e.g., 20 years) for two scenarios:
                            </p>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li>
                                    <strong>Buying:</strong> We calculate the cost of the loan (EMI), down payment, and maintenance, while accounting for tax benefits under Section 24(b) and 80C. The final wealth is the property value minus any outstanding loan.
                                </li>
                                <li>
                                    <strong>Renting:</strong> We assume you pay rent (increasing with inflation) and invest the money you saved (Down Payment + difference between EMI and Rent) into an investment instrument like Mutual Funds. The final wealth is your investment corpus.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="Rent vs Buy Calculator India"
                        description="Should you buy a home or live on rent? Calculate the financial impact of buying vs renting with opportunity cost and tax benefits."
                        calculatorPath="/calculators/rent-vs-buy"
                    />
                </div>
            </div>
        </div>
    );
}
