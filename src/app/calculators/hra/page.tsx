import type { Metadata } from "next";
import HraCalculator from "@/components/calculators/HraCalculator";

export const metadata: Metadata = {
    title: "HRA Exemption Calculator - Calculate Tax Free Rent Allowance | RupeeTools",
    description:
        "Calculate your HRA tax exemption accurately. Check if your city counts as Metro (50%) or Non-Metro (40%) under Income Tax rules.",
    keywords: [
        "hra calculator",
        "house rent allowance calculator",
        "hra exemption section 10(13a)",
        "calculate tax on rent",
        "metro vs non-metro hra",
    ],
};

export default function HraCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        HRA Exemption Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Calculate the tax-exempt portion of your House Rent Allowance (HRA)
                        under Section 10(13A).
                    </p>
                </div>
                <HraCalculator />

                {/* About Section */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">How is HRA Exemption Calculated?</h2>
                    <p className="text-slate-600 mb-6">
                        The deduction for House Rent Allowance (HRA) is covered under Section 10(13A) of the Income Tax Act.
                        The exempted amount is the <strong>lowest</strong> of the following three:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <div className="text-blue-600 font-bold text-lg mb-2">Condition 1</div>
                            <p className="text-slate-700">Actual HRA received from your employer.</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <div className="text-indigo-600 font-bold text-lg mb-2">Condition 2</div>
                            <p className="text-slate-700">Actual rent paid minus 10% of your Basic Salary.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                            <div className="text-purple-600 font-bold text-lg mb-2">Condition 3</div>
                            <p className="text-slate-700">
                                <strong>50%</strong> of Basic Salary for Metros (Delhi, Mumbai, Chennai, Kolkata).<br />
                                <strong>40%</strong> for Non-Metros.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                        <strong>Note:</strong> You cannot claim HRA exemption if you live in your own house or if you don't pay any rent.
                        Also, PAN of the landlord is mandatory if annual rent exceeds ₹1,00,000.
                    </div>
                </div>            </div>
        </main>
    );
}
