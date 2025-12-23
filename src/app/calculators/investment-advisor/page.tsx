import type { Metadata } from "next";
import InvestmentAdvisor from "@/components/calculators/InvestmentAdvisor";
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

// ✅ Updated SEO Metadata
export const metadata: Metadata = {
    title: "Investment Advisor – Investment Horizon Planner | RupeeTools",
    description:
        "Free investment advisor tool that recommends the right asset allocation based on your time horizon and risk profile. Optimized for Indian investors with charts, projections and actionable insights.",
    keywords: [
        "investment advisor",
        "asset allocation",
        "investment horizon tool",
        "risk profile calculator",
        "financial planning India",
        "RupeeTools"
    ]
};

export default function InvestmentAdvisorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="Investment Horizon Planner" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Intro */}
                    <div className="text-center mb-8">
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Not sure where to invest? Tell us how long you want to invest and your
                            risk style, and we'll suggest the perfect asset mix for you.
                        </p>
                    </div>

                    <InvestmentAdvisor />

                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    Time Horizon
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    Your investment duration dictates where you should park your money.
                                    Short term needs safety (Debt), while long term allows for growth
                                    (Equity).
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    Risk Appetite
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    Are you a conservative investor who prefers safety, or an
                                    aggressive one who chases higher returns? We tailor the plan to
                                    your comfort zone.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    Wealth Creation
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    The right mix of Equity and Debt ensures you beat inflation while
                                    keeping your capital safe. Our tool helps you find that sweet
                                    spot.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <SoftwareAppJsonLd
                        name="Investment Horizon Planner"
                        description="Not sure where to invest? Tell us how long you want to invest and your risk style, and we'll suggest the perfect asset mix for you."
                        calculatorPath="/calculators/investment-advisor"
                    />
                </div>
            </div>
        </main>
    );
}