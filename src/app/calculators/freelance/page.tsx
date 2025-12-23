import { FreelanceCalculator } from '@/components/calculators/FreelanceCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Freelancer Income Tax Calculator (44ADA) | Save 50% Tax',
    description: 'Calculate income tax for Indian Freelancers & Professionals under Section 44ADA. Save tax by declaring only 50% of your gross receipts.',
};

export default function FreelanceTaxPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Freelancer Tax Calculator (44ADA)" />
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        For Professionals (Developers, Designers, Consultants) with receipts up to ₹75 Lakhs.
                        Pay tax on only <span className="font-bold text-slate-800">50%</span> of your income.
                    </p>
                </div>

                <FreelanceCalculator />

                <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-200 prose prose-slate">
                    <h3 className="text-slate-900 mt-0">What is Section 44ADA?</h3>
                    <p className="text-slate-700">
                        Section 44ADA is a presumptive taxation scheme for professionals in India. It allows you to declare
                        <strong> 50% of your gross receipts</strong> as your taxable income, assuming the remaining 50% covers your professional expenses.
                    </p>
                    <ul className="text-slate-700 mb-0">
                        <li><strong>Eligibility:</strong> Gross receipts must be less than ₹75 Lakhs (FY 2025-26).</li>
                        <li><strong>Who can use it?</strong> Software Developers, Architects, Doctors, Lawyers, Interior Designers, etc.</li>
                        <li><strong>Benefit:</strong> You don't need to maintain detailed books of accounts or get an audit.</li>
                    </ul>
                </div>
                <SoftwareAppJsonLd
                    name="Freelancer Income Tax Calculator (44ADA)"
                    description="Calculate income tax for Indian Freelancers & Professionals under Section 44ADA. Save tax by declaring only 50% of your gross receipts."
                    calculatorPath="/calculators/freelance"
                />
            </div>
        </div>
    );
}
