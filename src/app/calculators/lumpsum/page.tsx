import type { Metadata } from 'next';
import { LumpsumCalculator } from '@/components/calculators/LumpsumCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Lumpsum Calculator - Mutual Fund Returns Calculator',
    description: 'Calculate the future value of your one-time mutual fund investment. Check returns for 1, 3, 5, 10 years with our free Lumpsum Calculator.',
    keywords: [
        'Lumpsum Calculator',
        'Mutual Fund Calculator',
        'MF Lumpsum Returns',
        'Investment Calculator',
        'CAGR Calculator',
        'Wealth Calculator',
        'One time investment',
    ],
};

export default function LumpsumCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="Lumpsum Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Calculator Component */}
                    <LumpsumCalculator />

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Lumpsum Investment?</h2>
                        <p className="text-slate-600 mb-4">
                            A lumpsum investment is a "one-time" investment of a significant amount in a mutual fund scheme.
                            Unlike SIP where you invest small amounts regularly, in lumpsum you invest the entire amount at once.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">When to choose Lumpsum?</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Windfall Gains:</strong> When you receive a bonus, inheritance, or maturity proceeds from other investments.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Market Correction:</strong> When markets are low, a lumpsum investment can buy you more units at a lower NAV.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Long Term Goals:</strong> Ideal for goals that are 10+ years away, allowing the power of compounding to work its magic.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">Lumpsum vs SIP</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Timing Risk:</strong> Lumpsum is riskier if markets fall immediately after investment. SIP averages out this risk.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Capital Requirement:</strong> Lumpsum requires a large capital upfront. SIP can start with as little as ₹500.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span><strong>Returns:</strong> In a rising market, Lumpsum generally outperforms SIP as the entire money stays invested for longer.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="Lumpsum Calculator - Mutual Fund Returns"
                        description="Calculate the wealth you can create by investing a lump sum amount in Mutual Funds today."
                        calculatorPath="/calculators/lumpsum"
                    />
                </div>
            </div>
        </main>
    );
}
