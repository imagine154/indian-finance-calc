import React from "react";
import { Metadata } from "next";
import FireCalculator from "@/components/calculators/FireCalculator";

export const metadata: Metadata = {
    title: "FIRE Calculator India - Lean, Fat & Coast FIRE | RupeeTools",
    description: "Calculate your Financial Independence number. Check Coast FIRE status and plan for life goals like Kids' Education and Marriage.",
    keywords: ["coast fire calculator india", "fire number formula", "lean vs fat fire", "early retirement calculator", "financial independence calculator india"],
};

export default function FireCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Ultimate FIRE Calculator</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Plan your Financial Independence and Early Retirement with precision.
                        Calculate your Lean, Standard, Fat, and Coast FIRE numbers, accounting for major life goals.
                    </p>
                </div>
                <FireCalculator />

                <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding FIRE</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        FIRE stands for <strong>Financial Independence, Retire Early</strong>. It's a movement dedicated to extreme saving and investment that allows you to retire far earlier than traditional budgets and retirement plans would permit.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                        <div>
                            <h3 className="text-xl font-semibold text-emerald-700 mb-2">The 4% Rule</h3>
                            <p className="text-slate-600">
                                The standard FIRE number is calculated based on the 4% rule, which suggests that you can withdraw 4% of your portfolio annually without running out of money for at least 30 years.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Coast FIRE</h3>
                            <p className="text-slate-600">
                                Coast FIRE is the point where you have enough invested that, without any further contributions, your portfolio will grow to support your retirement by the time you reach your target age.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-4">Types of FIRE</h3>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span><strong>Lean FIRE:</strong> For those who plan to live a minimalist lifestyle in retirement. Usually 15-20x annual expenses.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span><strong>Standard FIRE:</strong> The traditional benchmark. 25x annual expenses.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span><strong>Fat FIRE:</strong> For those who want a luxurious retirement with a higher buffer. 50x annual expenses.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
