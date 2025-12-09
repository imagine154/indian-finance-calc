import type { Metadata } from 'next';
import { PpfCalculator } from '@/components/calculators/PpfCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export const metadata: Metadata = {
    title: 'PPF Calculator - Public Provident Fund Interest & Maturity Calculator',
    description: 'Calculate your Public Provident Fund (PPF) returns with our free PPF Calculator. Plan your tax-saving investments and retirement corpus accurately.',
    keywords: [
        'PPF Calculator',
        'Public Provident Fund',
        'PPF Interest Calculator',
        'Tax Saving Calculator',
        'PPF Maturity Calculator',
        'Investment Planner India',
        'Post Office PPF',
    ],
};

export default function PpfCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        PPF Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Calculate returns on your Public Provident Fund (PPF) investment. Secure your future with tax-free returns.
                    </p>
                </div>

                {/* Calculator Component */}
                <PpfCalculator />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About Public Provident Fund (PPF)</h2>
                    <p className="text-slate-600 mb-4">
                        Public Provident Fund (PPF) is a long-term investment scheme backed by the Government of India.
                        It offers an attractive interest rate and returns that are fully exempt from tax.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Features</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Tax Benefits:</strong> EEE Status - Investment, Interest, and Maturity are all tax-free under Section 80C</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Interest Rate:</strong> Currently 7.1% p.a. (compounded annually)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Investment Limits:</strong> Min ₹500, Max ₹1.5 Lakh per financial year</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Lock-in Period:</strong> 15 years (can be extended in blocks of 5 years)</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Why Choose PPF?</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Safety:</strong> Sovereign guarantee by the Government of India</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Loan Facility:</strong> Loan available against PPF balance from 3rd to 6th year</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Partial Withdrawal:</strong> Allowed from 7th financial year onwards</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <SoftwareAppJsonLd
                    name="PPF Calculator - Public Provident Fund"
                    description="Calculate returns on your Public Provident Fund (PPF) investment. Secure your future with tax-free returns."
                    calculatorPath="/calculators/ppf"
                />
            </div>
        </main>
    );
}
