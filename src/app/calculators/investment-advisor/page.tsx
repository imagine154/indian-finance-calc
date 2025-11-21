import type { Metadata } from "next";
import InvestmentAdvisor from "@/components/calculators/InvestmentAdvisor";

export const metadata: Metadata = {
    title: "Investment Horizon Planner - Where to Invest?",
    description:
        "Robo-advisory tool to suggest the best investment options based on your time horizon and risk appetite.",
    keywords: [
        "investment advisor",
        "asset allocation",
        "where to invest",
        "mutual fund advisor",
        "financial planning",
    ],
};

export default function InvestmentAdvisorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Investment Horizon Planner
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Not sure where to invest? Tell us how long you want to invest and your
                        risk style, and we'll suggest the perfect asset mix for you.
                    </p>
                </div>

                {/* Calculator Component */}
                <InvestmentAdvisor />

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-indigo-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Why Asset Allocation Matters?
                    </h2>
                    <p className="text-slate-600 mb-4">
                        Asset allocation is the strategy of dividing your investment portfolio
                        across various asset categories like stocks, bonds, and gold. It is
                        the single most important determinant of your investment returns.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-8">
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
        </main>
    );
}
