import React from 'react';
import type { Metadata } from 'next';
import BalanceTransferCalculator from '@/components/calculators/BalanceTransferCalculator';

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
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Home Loan Balance Transfer Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Is switching your home loan to a lower interest rate really worth it? Calculate your real savings after accounting for processing fees and other charges.
                    </p>
                </div>

                <BalanceTransferCalculator />

                {/* Guide Section */}
                <div className="max-w-4xl mx-auto mt-16 space-y-8 text-slate-600 leading-relaxed">
                    <h2 className="text-2xl font-bold text-slate-800">When should you switch your Home Loan?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-800 mb-3">✅ Consider Switching If:</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">•</span>
                                    <span>The interest rate difference is at least <strong>0.5% to 0.75%</strong>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">•</span>
                                    <span>You are in the early stages of your loan tenure (first 5-7 years).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">•</span>
                                    <span>The total savings are significantly higher than the processing fees.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-800 mb-3">❌ Avoid Switching If:</h3>
                            <ul className="space-y-2 text-sm">
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

                    <p className="text-sm bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-yellow-800">
                        <strong>Note:</strong> While this calculator gives you a financial picture, also consider the "hassle cost" of paperwork and time involved in switching banks.
                    </p>
                </div>
            </div>
        </div>
    );
}
