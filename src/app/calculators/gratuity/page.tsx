import type { Metadata } from "next";
import GratuityCalculator from "@/components/calculators/GratuityCalculator";
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: "Gratuity Calculator India (2025) - Check Tax Free Limit | RupeeTools",
    description:
        "Calculate your Gratuity amount based on Basic Salary and Years of Service. Updated for the new ₹20 Lakh tax-free limit.",
    keywords: [
        "gratuity calculator",
        "gratuity formula India",
        "tax free gratuity limit",
        "payment of gratuity act",
        "resignation benefit calculator",
    ],
};

export default function GratuityCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="Gratuity Calculator" badge="Updated: ₹20L Limit" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <GratuityCalculator />

                    {/* About Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">About Gratuity</h2>
                        <div className="prose text-slate-600 max-w-none">
                            <p className="mb-4">
                                Gratuity is a monetary benefit given by an employer to an employee for services rendered to the organization. It is paid at the time of retirement, resignation, or death.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Eligibility Formula</h3>
                            <p className="mb-4">
                                For employees covered under the Payment of Gratuity Act, the formula is:
                                <br />
                                <code className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-medium">Gratuity = (15 × Last Drawn Salary × Tenure) / 26</code>
                            </p>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li><strong>Last Drawn Salary:</strong> Basic Salary + Dearness Allowance (DA).</li>
                                <li><strong>Tenure:</strong> Number of completed years of service (rounded off).</li>
                                <li><strong>26:</strong> Represents the number of working days in a month.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tax Exemption</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li>For government employees: Fully tax-exempt.</li>
                                <li>For private employees: Tax-exempt up to <strong>₹20 Lakhs</strong> (Least of: Formula based gratuity, ₹20 Lakhs, or Actual gratuity received).</li>
                            </ul>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="Gratuity Calculator India"
                        description="Calculate your Gratuity amount based on Basic Salary and Years of Service. Updated for the new ₹20 Lakh tax-free limit."
                        calculatorPath="/calculators/gratuity"
                    />
                </div>
            </div>
        </main>
    );
}
