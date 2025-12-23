import type { Metadata } from 'next';
import { SsyCalculator } from '@/components/calculators/SsyCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'SSY Calculator - Sukanya Samriddhi Yojana | Indian Finance Tools',
    description: 'Calculate Sukanya Samriddhi Yojana (SSY) maturity value and plan for your daughter\'s education. Features partial withdrawal planning and yearly breakdown.',
    keywords: [
        'SSY calculator',
        'Sukanya Samriddhi Yojana',
        'girl child scheme',
        'SSY interest rate',
        'education planning',
        'SSY withdrawal rules',
        'investment calculator',
    ],
};

export default function SsyCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="Sukanya Samriddhi Yojana (SSY)" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Calculator Component */}
                    <SsyCalculator />

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-rose-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">About Sukanya Samriddhi Yojana</h2>
                        <p className="text-slate-600 mb-4">
                            Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme designed for the parents of girl children.
                            It encourages parents to build a fund for the future education and marriage expenses of their female child.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Features</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>High Interest Rate:</strong> Currently 8.2% p.a. (compounded annually)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>Tax Benefits:</strong> EEE Status - Investment, Interest, and Maturity are all tax-free under Section 80C</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>Affordable:</strong> Min deposit ₹250, Max ₹1.5 Lakh per financial year</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>Long Term:</strong> Account matures after 21 years from opening</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">Withdrawal Rules</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>Education:</strong> Partial withdrawal allowed after girl turns 18 or passes 10th standard</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>Limit:</strong> Up to 50% of the balance at the end of the preceding financial year</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-600 font-bold">✓</span>
                                        <span><strong>Marriage:</strong> Premature closure allowed for marriage after age 18</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="SSY Calculator - Sukanya Samriddhi Yojana"
                        description="Calculate Sukanya Samriddhi Yojana (SSY) maturity value and plan for your daughter's education. Features partial withdrawal planning and yearly breakdown."
                        calculatorPath="/calculators/ssy"
                    />
                </div>
            </div>
        </main>
    );
}
