import { Metadata } from "next";
import { MsscCalculator } from "@/components/calculators/MsscCalculator";
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Mahila Samman Savings Certificate Calculator (2025) | RupeeTools',
    description: 'Calculate interest for MSSC scheme. 7.5% interest compounded quarterly for 2 years. Max investment ₹2 Lakhs.',
    keywords: ['MSSC calculator', 'mahila samman savings', '7.5% interest scheme', 'post office women scheme', 'women savings scheme'],
    alternates: {
        canonical: 'https://www.rupeetools.in/calculators/mssc',
    },
};

export default function MsscPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Mahila Samman Savings Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <MsscCalculator />

                    {/* FAQ Section */}
                    <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">About Mahila Samman Savings Certificate (MSSC)</h2>
                        <div className="prose text-slate-600 max-w-none">
                            <p className="mb-4">
                                The Mahila Samman Savings Certificate is a one-time small savings scheme for women and girls,
                                announced in the 2023 Budget. It is available for a two-year period up to March 2025.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Key Features</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li><strong>Interest Rate:</strong> 7.5% per annum.</li>
                                <li><strong>Compounding:</strong> Quarterly.</li>
                                <li><strong>Tenure:</strong> 2 Years fixed.</li>
                                <li><strong>Investment Limit:</strong> Minimum ₹1,000 and Maximum ₹2 Lakhs.</li>
                                <li><strong>Partial Withdrawal:</strong> Up to 40% of the balance is allowed after 1 year.</li>
                                <li><strong>Taxation:</strong> Interest is taxable as per your income tax slab. TDS applies only if total interest exceeds ₹40,000 (or ₹50,000 for seniors).</li>
                            </ul>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="Mahila Samman Savings Calculator"
                        description="Calculate maturity amount for the government's 7.5% interest scheme for women. Fixed 2-year tenure with quarterly compounding."
                        calculatorPath="/calculators/mssc"
                    />
                </div>
            </div>
        </div>
    );
}
