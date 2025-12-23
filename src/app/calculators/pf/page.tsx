import { PfCalculator } from '@/components/calculators/PfCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'EPF Corpus Calculator | Indian Finance Calc',
    description: 'Calculate your Employee Provident Fund (EPF) corpus at retirement with annual salary hikes and compound interest.',
};

export default function PfCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="EPF Corpus Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <PfCalculator />

                    {/* About Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">About EPF (Employee Provident Fund)</h2>
                        <div className="prose text-slate-600 max-w-none">
                            <p className="mb-4">
                                Employee Provident Fund (EPF) is a popular savings scheme for salaried employees in India, managed by the EPFO. It acts as a retirement benefit scheme.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">How it Works</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li><strong>Contribution:</strong> Both employer and employee contribute 12% of Basic Salary + DA.</li>
                                <li><strong>Interest:</strong> The government declares an annual interest rate (currently around 8.25%).</li>
                                <li><strong>Compounding:</strong> Interest is compounded annually, helping build a significant corpus over time.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tax Benefits</h3>
                            <p>
                                Employee contributions are eligible for tax deduction under Section 80C. The interest earned and the final maturity amount are generally tax-free (subject to conditions).
                            </p>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="EPF Corpus Calculator"
                        description="Calculate your Employee Provident Fund (EPF) corpus at retirement with annual salary hikes and compound interest."
                        calculatorPath="/calculators/pf"
                    />
                </div>
            </div>
        </div>
    );
}
