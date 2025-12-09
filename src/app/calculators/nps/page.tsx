import { Metadata } from 'next';
import { NpsCalculator } from '@/components/calculators/NpsCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export const metadata: Metadata = {
    title: 'NPS Calculator - Pension & Lump Sum Estimator | Indian Finance Calc',
    description: 'Calculate your National Pension System (NPS) corpus, monthly pension, and lump sum withdrawal amount.',
};

export default function NpsPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-2">NPS Calculator</h1>
                    <p className="text-lg text-slate-600">Estimate your retirement corpus and monthly pension</p>
                </div>
                <NpsCalculator />

                {/* About Section */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">About National Pension System (NPS)</h2>
                    <p className="text-slate-600 mb-6">
                        NPS is a government-sponsored retirement planning scheme initiated by the Central Government.
                        It is a market-linked contribution scheme that aims to provide a retirement corpus for every Indian citizen.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-3">Key Benefits</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span><strong>Standard Tax Benefit:</strong> Deduction up to ₹1.5 Lakh under Section 80C.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span><strong>Extra Tax Saving:</strong> Additional deduction of ₹50,000 under Section 80CCD(1B).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span><strong>Low Cost:</strong> One of the lowest cost investment products in the world.</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-3">Withdrawal Rules (at 60)</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Lump Sum:</strong> You can withdraw up to 60% of the corpus completely tax-free.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Annuity (Pension):</strong> Remaining 40% must be used to purchase an annuity plan for monthly pension.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>                <SoftwareAppJsonLd
                    name="NPS Calculator - National Pension System"
                    description="Calculate your National Pension System (NPS) corpus, monthly pension, and lump sum withdrawal amount."
                    calculatorPath="/calculators/nps"
                />
            </div>
        </main>
    );
}
