import React from 'react';
import type { Metadata } from 'next';
import BalanceTransferCalculator from '@/components/calculators/BalanceTransferCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Home Loan Balance Transfer Calculator - Switch & Save | RupeeTools',
    description: 'Should you switch your home loan? Calculate total interest savings after processing fees. Check if balance transfer is profitable.',
    keywords: ['home loan balance transfer', 'switch home loan calculator', 'SBI home loan transfer', 'reduce EMI calculator'],
    openGraph: {
        title: 'Home Loan Balance Transfer Calculator - Switch & Save | RupeeTools',
        description: 'Should you switch your home loan? Calculate total interest savings after processing fees. Check if balance transfer is profitable.',
        type: 'website',
    }
};

export default function BalanceTransferPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Home Loan Balance Transfer Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <BalanceTransferCalculator />

                    {/* Guide Section */}
                    <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">When should you switch your Home Loan?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                <h3 className="font-bold text-lg text-green-900 mb-4 flex items-center gap-2">
                                    <span className="bg-green-200 text-green-800 p-1 rounded">✅</span> Consider Switching If:
                                </h3>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>The interest rate difference is at least <strong>0.5% to 0.75%</strong>.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>You are in the early stages of your loan tenure (first 5-7 years).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>The total savings are significantly higher than the processing fees.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                                <h3 className="font-bold text-lg text-red-900 mb-4 flex items-center gap-2">
                                    <span className="bg-red-200 text-red-800 p-1 rounded">❌</span> Avoid Switching If:
                                </h3>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>You have less than 5 years remaining on your loan.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>The processing fee eats up most of your interest savings.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>You plan to prepay or close the loan very soon.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
                            <strong>Note:</strong> While this calculator gives you a financial picture, also consider the "hassle cost" of paperwork and time involved in switching banks.
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="Home Loan Balance Transfer Calculator"
                        description="Should you switch your home loan? Calculate total interest savings after processing fees. Check if balance transfer is profitable."
                        calculatorPath="/calculators/balance-transfer"
                    />
                </div>
            </div>
        </div>
    );
}
