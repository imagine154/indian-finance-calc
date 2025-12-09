import type { Metadata } from 'next';
import { TaxCompare } from '@/components/calculators/TaxCompare';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export const metadata: Metadata = {
    title: 'Income Tax Calculator FY 2025-26 (Old vs New Regime)',
    description: 'Calculate Income Tax for FY 2025-26. Compare Old vs New Regime tax liability, check 87A rebate eligibility, and maximize your tax savings.',
    keywords: [
        'Income Tax Calculator',
        'FY 2025-26 Tax',
        'Old vs New Tax Regime',
        'Tax Calculator India',
        'Income Tax Slabs 2025-26',
        'Section 87A Rebate',
        'Tax Saving Calculator',
    ],
};

export default function IncomeTaxCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Income Tax Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Compare Old vs New Tax Regime for FY 2025-26. Enter your income and deductions to see which regime saves you more money.
                    </p>
                </div>

                {/* Calculator Component */}
                <TaxCompare />

                {/* Info Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-3">Old Tax Regime</h2>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Allows HRA, LTA exemptions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Deductions under 80C (₹1.5L), 80D, 80CCD(1B)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Standard deduction: ₹50,000</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Rebate under 87A if income ≤ ₹5L</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span>Best for those with heavy investments/deductions</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-3">New Tax Regime</h2>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span>Lower tax slabs (more 0%, 5%, 10% brackets)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span>No exemptions allowed (HRA, LTA)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span>Only standard deduction: ₹50,000</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span>Higher rebate limit: ₹7L (vs ₹5L in old)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span>Best for those without deductions/investments</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800">
                        <strong>Disclaimer:</strong> This calculator is for informational purposes only.
                        Actual tax liability may vary based on additional factors. Please consult a tax professional for personalized advice.
                    </p>
                </div>
                <SoftwareAppJsonLd
                    name="Income Tax Calculator FY 2025-26"
                    description="Compare Old vs New Tax Regime for FY 2025-26. Enter your income and deductions to see which regime saves you more money."
                    calculatorPath="/calculators/income-tax"
                />
            </div>
        </main>
    );
}
