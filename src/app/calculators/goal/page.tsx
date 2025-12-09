import type { Metadata } from 'next';
import { GoalCalculator } from '@/components/calculators/GoalCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export const metadata: Metadata = {
    title: 'Financial Goal Planner - Inflation Adjusted Calculator | Indian Finance Tools',
    description: 'Plan for your financial goals like child education, marriage, or retirement. Calculate required monthly SIP with inflation adjustment and step-up planning.',
    keywords: [
        'goal planner',
        'financial goal calculator',
        'SIP planner',
        'inflation calculator',
        'retirement planning',
        'child education planning',
        'wealth calculator',
    ],
};

export default function GoalCalculatorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Financial Goal Planner
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Don't just guess. Calculate exactly how much you need to save to reach your dreams, adjusted for inflation.
                    </p>
                </div>

                {/* Calculator Component */}
                <GoalCalculator />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-indigo-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Plan for Goals?</h2>
                    <p className="text-slate-600 mb-4">
                        Most people underestimate the impact of inflation on their long-term goals.
                        A higher education course that costs ₹20 Lakhs today could cost over ₹60 Lakhs in 15 years due to inflation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Inflation Impact</h3>
                            <p className="text-slate-600 text-sm">
                                Inflation erodes the purchasing power of money. Our calculator adjusts your target amount annually to give you a realistic target.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Power of Step-Up</h3>
                            <p className="text-slate-600 text-sm">
                                Can't afford the required SIP today? Start small and increase your investment by 10% every year (Step-Up SIP) to reach the same goal.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Existing Assets</h3>
                            <p className="text-slate-600 text-sm">
                                Already have some savings? We calculate how much they will grow by the time you reach your goal, reducing your fresh investment burden.
                            </p>
                        </div>
                    </div>
                </div>
                <SoftwareAppJsonLd
                    name="Financial Goal Planner"
                    description="Plan for your financial goals like child education, marriage, or retirement. Calculate required monthly SIP with inflation adjustment and step-up planning."
                    calculatorPath="/calculators/goal"
                />
            </div>
        </main>
    );
}
