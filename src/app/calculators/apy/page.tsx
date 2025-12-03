import React from "react";
import type { Metadata } from "next";
import ApyCalculator from "@/components/calculators/ApyCalculator";

export const metadata: Metadata = {
    title: "Atal Pension Yojana (APY) Calculator - Monthly Premium Chart 2025 | RupeeTools",
    description: "Calculate your monthly contribution for Atal Pension Yojana (APY). Check premium table for ₹1000 to ₹5000 pension amounts.",
    keywords: [
        "APY calculator",
        "atal pension yojana calculator",
        "APY chart 2025",
        "pension scheme for unorganized sector",
        "APY contribution table",
    ],
};

const ApyCalculatorPage = () => {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Atal Pension Yojana (APY) Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Plan your retirement with the government-backed APY scheme.
                        Calculate your monthly contribution to get a guaranteed pension of up to ₹5,000/month.
                    </p>
                </div>

                <ApyCalculator />

                <div className="mt-12 max-w-4xl mx-auto prose prose-slate">
                    <h2 className="text-slate-900">About Atal Pension Yojana (APY)</h2>
                    <p className="text-slate-700">
                        The Atal Pension Yojana (APY) is a pension scheme for citizens of India, primarily focused on the unorganized sector workers.
                        Under the APY, guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month will be given at the age of 60 years depending on the contributions by the subscribers.
                    </p>

                    <h3 className="text-slate-900">Key Features</h3>
                    <ul className="text-slate-700">
                        <li><strong>Guaranteed Pension:</strong> Fixed pension amount based on your contribution.</li>
                        <li><strong>Entry Age:</strong> 18 to 40 years.</li>
                        <li><strong>Contribution Period:</strong> You need to contribute until you turn 60.</li>
                        <li><strong>Tax Benefits:</strong> Contributions are eligible for tax deduction under Section 80CCD(1).</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default ApyCalculatorPage;
