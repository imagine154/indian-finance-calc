import type { Metadata } from 'next';
import { SwpCalculator } from '@/components/calculators/SwpCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'SWP Calculator - Systematic Withdrawal Plan Calculator',
    description: 'Calculate your monthly income from mutual funds with our free SWP Calculator. Plan your retirement withdrawals and visualize capital depletion.',
    keywords: [
        'SWP Calculator',
        'Systematic Withdrawal Plan',
        'Mutual Fund SWP',
        'Monthly Pension Calculator',
        'Retirement Income Calculator',
        'Capital Depletion Calculator',
    ],
};

export default function SwpCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="SWP Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Intro */}
                    <div className="text-center mb-8">
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Plan your regular monthly income from your mutual fund investments.
                            Ideal for retirement planning and generating passive income.
                        </p>
                    </div>

                    {/* Calculator Component */}
                    <SwpCalculator />

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is SWP?</h2>
                        <p className="text-slate-600 mb-4">
                            A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount from your mutual fund investments at regular intervals (usually monthly).
                            It is the opposite of SIP. While SIP helps you create wealth, SWP helps you consume wealth systematically.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">Why choose SWP?</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Regular Income:</strong> Get a fixed monthly inflow to meet your expenses, just like a salary or pension.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Tax Efficiency:</strong> You only pay tax on the capital gains part of the withdrawal, making it more efficient than FDs.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Capital Growth:</strong> If your withdrawal rate is lower than the fund's return, your capital continues to grow.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">SWP vs Dividend</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Certainty:</strong> SWP guarantees a fixed cash flow. Dividends are uncertain and depend on the fund house.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Control:</strong> You decide how much to withdraw in SWP. In Dividend options, you have no control.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Taxation:</strong> Dividends are taxed at your slab rate. SWP gains are taxed as Capital Gains (often lower).</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="SWP Calculator - Systematic Withdrawal Plan"
                        description="Calculate your monthly income from mutual funds with our free SWP Calculator. Plan your retirement withdrawals and visualize capital depletion."
                        calculatorPath="/calculators/swp"
                    />
                </div>
            </div>
        </main>
    );
}
