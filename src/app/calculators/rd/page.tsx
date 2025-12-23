import { RdCalculator } from "@/components/calculators/RdCalculator";
import { Metadata } from "next";
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: "RD Calculator - Recurring Deposit Maturity Amount | RupeeTools",
    description: "Calculate your Recurring Deposit (RD) maturity amount with quarterly compounding interest. Plan your monthly savings and check returns instantly.",
    keywords: ["RD calculator", "recurring deposit calculator", "rd interest calculator", "post office rd calculator", "sbi rd calculator", "hdfc rd calculator", "quarterly compounding"]
};

export default function RdCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="RD Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <RdCalculator />

                    {/* FAQ Section */}
                    <div className="max-w-4xl mx-auto mt-16 space-y-8 text-slate-600">
                        <div className="prose prose-slate max-w-none">
                            <h2 className="text-2xl font-bold text-slate-800">About Recurring Deposits (RD)</h2>
                            <p>
                                A Recurring Deposit (RD) is a special kind of Term Deposit offered by banks which helps people with
                                regular incomes to deposit a fixed amount every month into their Recurring Deposit account and earn
                                interest at the rate applicable to Fixed Deposits.
                            </p>

                            <h3 className="text-lg font-bold text-slate-800">How is RD Interest Calculated?</h3>
                            <p>
                                In India, RD interest is usually compounded quarterly. The formula used for calculation is:
                            </p>
                            <pre className="bg-slate-100 p-4 rounded-lg text-sm block overflow-x-auto">
                                A = P * (1 + R/400)^(N)
                            </pre>
                            <p className="text-sm">
                                Where:<br />
                                A = Maturity Amount<br />
                                P = Monthly Installment<br />
                                R = Annual Interest Rate<br />
                                N = Number of Quarters (calculated individually for each installment)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
