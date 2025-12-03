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
        <main className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
                    HRA Exemption Calculator
                </h1>
                <p className="text-slate-600 mb-8 text-center max-w-2xl mx-auto">
                    Calculate the tax-exempt portion of your House Rent Allowance (HRA)
                    under Section 10(13A).
                </p>
                <HraCalculator />
            </div>
        </main>
    );
}
