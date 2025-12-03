import type { Metadata } from "next";
import GratuityCalculator from "@/components/calculators/GratuityCalculator";

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
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
                    Gratuity Calculator
                </h1>
                <p className="text-slate-600 mb-8 text-center max-w-2xl mx-auto">
                    Estimate your gratuity payout upon resignation or retirement.
                    Updated with the latest <strong>₹20 Lakh</strong> tax-exemption limit.
                </p>
                <GratuityCalculator />
            </div>
        </main>
    );
}
