import { Metadata } from 'next';
import { SalaryCalculator } from '@/components/calculators/SalaryCalculator';

export const metadata: Metadata = {
    title: 'In-hand Salary Calculator India (FY 2025-26) | Take Home Pay',
    description: 'Calculate your monthly In-hand Salary from CTC. Accurate breakdown of Basic, HRA, PF, and Income Tax for FY 2025-26 (Old vs New Regime).',
};

export default function SalaryCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Take Home Salary Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Find out exactly how much hits your bank account. We break down your CTC into earnings, deductions, and taxes.
                    </p>
                </div>

                <SalaryCalculator />

                <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-200 prose prose-slate">
                    <h3 className="text-slate-900 mt-0">How is In-Hand Salary Calculated?</h3>
                    <p className="text-slate-700">
                        Your "In-Hand" or "Net Salary" is what remains after all deductions are subtracted from your Gross Salary.
                        The formula is:
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm my-4 text-slate-800">
                        Net Salary = Gross Salary - (PF + Professional Tax + Income Tax)
                    </div>
                    <ul className="text-slate-700 mb-0">
                        <li><strong className="text-slate-900">Gross Salary:</strong> Sum of Basic, HRA, and Special Allowances.</li>
                        <li><strong className="text-slate-900">PF (Provident Fund):</strong> 12% of your Basic Salary.</li>
                        <li><strong className="text-slate-900">Professional Tax:</strong> A state-level tax, usually ₹200/month in states like Karnataka and Maharashtra.</li>
                        <li><strong className="text-slate-900">Income Tax (TDS):</strong> Tax Deducted at Source based on your chosen tax regime (Old vs New).</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
