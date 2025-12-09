import type { Metadata } from 'next';
import { SipLumpsumWrapper } from '@/components/calculators/SipLumpsumWrapper';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export const metadata: Metadata = {
    title: 'SIP & Lumpsum Calculator - Calculate Mutual Fund Returns',
    description: 'Calculate returns for both SIP (Systematic Investment Plan) and Lumpsum investments. Visualize wealth growth and plan your financial goals.',
    keywords: [
        'SIP Calculator',
        'Lumpsum Calculator',
        'Mutual Fund Returns',
        'SIP vs Lumpsum',
        'Investment Planner',
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
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Calculate your Systematic Investment Plan returns and plan your financial future with confidence
                    </p>
                </div>

                {/* Calculator Component */}
                <SipLumpsumWrapper />

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
                <SoftwareAppJsonLd
                    name="SIP calculator - Systematic Investment Plan"
                    description="Calculate your Systematic Investment Plan returns and plan your financial future with confidence."
                    calculatorPath="/calculators/sip"
                />
            </div>
        </main>
    );
}
