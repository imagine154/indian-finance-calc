import type { Metadata } from 'next';
import { LoanCalculator } from '@/components/calculators/LoanCalculator';

export const metadata: Metadata = {
    title: 'Home Loan EMI Calculator with Pre-payment Analysis | Indian Finance Tools',
    description: 'Calculate your Home Loan EMI and see how much you can save with smart pre-payments. Visualize your amortization schedule and interest savings.',
    keywords: [
        'Home Loan EMI Calculator',
        'Prepayment Calculator',
        'Home Loan Interest Saver',
        'EMI Calculator India',
        'Housing Loan Calculator',
        'Loan Amortization Schedule',
    ],
};

export default function LoanCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Smart Home Loan Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Plan your dream home with confidence. Calculate EMI and discover the power of pre-payments to become debt-free faster.
                    </p>
                </div>

                {/* Calculator Component */}
                <LoanCalculator />

                {/* Info Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">How Pre-payment Works</h2>
                        <p className="text-slate-600 mb-4">
                            Making extra payments towards your home loan directly reduces your outstanding principal.
                            Since interest is calculated on the principal, a lower principal means lower interest in subsequent months.
                        </p>
                        <p className="text-slate-600">
                            Even small regular pre-payments (like ₹5,000/month) can shave off years from your loan tenure and save you lakhs in interest.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Smart Tips for Home Loans</h2>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span><strong>Increase EMI annually:</strong> As your income grows, increase your EMI by 5-10%.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span><strong>Use Bonuses:</strong> Use annual bonuses to make lump-sum pre-payments.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <span><strong>Shorten Tenure:</strong> Opt for a shorter tenure if you can afford higher EMIs to save on total interest.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
