import type { Metadata } from 'next';
import { CapitalGainsCalculator } from '@/components/calculators/CapitalGainsCalculator';

export const metadata: Metadata = {
    title: 'Capital Gains Tax Calculator FY 2025-26 (Equity, Debt, Property) | RupeeTools',
    description: 'Calculate tax on Stock Market, Mutual Fund, and Property gains. Updated with latest Budget 2024-25 rules (12.5% LTCG).',
    keywords: [
        'capital gains tax calculator',
        'LTCG calculator India',
        'STCG tax rate',
        'property tax calculator',
        'share market tax',
        'mutual fund tax calculator',
    ],
};

export default function CapitalGainsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Capital Gains Tax Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Calculate your tax liability on Equity, Debt Funds, Real Estate, and Gold.
                        Updated for FY 2025-26 (New Budget Rules).
                    </p>
                </div>

                {/* Calculator Component */}
                <CapitalGainsCalculator />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-indigo-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Capital Gains Tax Rules (FY 2025-26)</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Equity & Equity Mutual Funds</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li><strong>Short Term (STCG):</strong> 20% if held for less than 12 months.</li>
                                <li><strong>Long Term (LTCG):</strong> 12.5% if held for more than 12 months.</li>
                                <li><strong>Exemption:</strong> First ₹1.25 Lakhs of LTCG is tax-free every year.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Real Estate & Gold</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li><strong>Short Term (STCG):</strong> Taxed at your Income Tax Slab rate (if held &lt; 24 months).</li>
                                <li><strong>Long Term (LTCG):</strong> 12.5% without indexation benefit (if held &gt; 24 months).</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Debt Funds & FDs</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li><strong>Taxation:</strong> Always taxed at your Income Tax Slab rate, irrespective of holding period.</li>
                                <li><strong>Note:</strong> Indexation benefit has been removed for Debt Funds.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
