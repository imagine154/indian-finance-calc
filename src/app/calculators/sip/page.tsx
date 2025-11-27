import type { Metadata } from 'next';
import { SipCalculator } from '@/components/calculators/SipCalculator';

export const metadata: Metadata = {
    title: 'SIP Calculator - Calculate SIP Returns & Mutual Fund Growth',
    description: 'Free SIP Calculator for India. Calculate SIP Returns, visualize wealth growth, and plan your mutual fund investments with accuracy.',
    keywords: [
        'SIP Calculator',
        'SIP Returns',
        'Mutual Fund Calculator',
        'Systematic Investment Plan',
        'Investment Planner India',
        'Wealth Calculator',
    ],
};

export default function SipCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        SIP Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-1xl mx-auto">
                        Calculate your Systematic Investment Plan returns and plan your financial future with confidence
                    </p>
                </div>

                {/* Calculator Component */}
                <SipCalculator />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is SIP?</h2>
                    <p className="text-slate-600 mb-4">
                        A Systematic Investment Plan (SIP) is a disciplined approach to investing in mutual funds.
                        Instead of investing a lump sum, you invest a fixed amount regularly (monthly, quarterly, etc.).
                        This helps in rupee cost averaging and reduces the impact of market volatility.
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Benefits of SIP:</h3>
                    <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Disciplined Investing:</strong> Regular investments build a habit of saving and investing</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Rupee Cost Averaging:</strong> Buy more units when prices are low, fewer when high</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Power of Compounding:</strong> Your returns generate further returns over time</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Flexibility:</strong> Start with as little as ₹500 per month</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>Step-Up SIP:</strong> Increase your investment annually to match your salary growth and build a significantly larger corpus.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
