import type { Metadata } from 'next';
import { FdCalculator } from '@/components/calculators/FdCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export const metadata: Metadata = {
    title: 'FD Calculator - Fixed Deposit Interest Calculator India',
    description: 'Calculate maturity amount and interest earned on your Fixed Deposits (FD). Supports monthly, quarterly, and yearly compounding frequencies.',
    keywords: [
        'FD Calculator',
        'Fixed Deposit Calculator',
        'FD Interest Calculator',
        'Bank FD Calculator',
        'Post Office FD Calculator',
        'Term Deposit Calculator',
    ],
};

export default function FdCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Fixed Deposit (FD) Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Calculate the returns on your Fixed Deposits with accuracy.
                        Plan your investments with our easy-to-use FD Calculator.
                    </p>
                </div>

                {/* Calculator Component */}
                <FdCalculator />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About Fixed Deposits (FD)</h2>
                    <p className="text-slate-600 mb-4">
                        A Fixed Deposit (FD) is a financial instrument provided by banks and NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Features</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Guaranteed Returns:</strong> FDs offer fixed and guaranteed returns, making them one of the safest investment options.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Flexible Tenure:</strong> You can choose a tenure ranging from 7 days to 10 years based on your goals.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Compounding:</strong> Interest is usually compounded quarterly, helping your money grow faster.</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Taxation (TDS)</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>TDS Deduction:</strong> Banks deduct 10% TDS if interest income exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Form 15G/15H:</strong> You can submit these forms to avoid TDS if your total income is below the taxable limit.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span><strong>Tax Saver FD:</strong> 5-year Tax Saver FDs qualify for deduction under Section 80C (up to ₹1.5 Lakh).</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <SoftwareAppJsonLd
                    name="FD Calculator - Fixed Deposit Interest"
                    description="Calculate maturity amount and interest earned on your Fixed Deposits (FD). Supports monthly, quarterly, and yearly compounding frequencies."
                    calculatorPath="/calculators/fd"
                />
            </div>
        </main>
    );
}
