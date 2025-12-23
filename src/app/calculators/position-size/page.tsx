import { Metadata } from 'next';
import { PositionSizeCalculator } from '@/components/calculators/PositionSizeCalculator';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Position Size Calculator - Stock Trading Risk Management | RupeeTools',
    description: 'Calculate the perfect position size for stock trading. Manage risk by defining entry price, stop loss, and risk percentage per trade.',
    keywords: ['position size calculator', 'stock market risk management', 'trading calculator', 'stop loss calculator', 'risk per trade'],
};

export default function PositionSizeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Position Size Calculator" />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Calculator Component */}
                        <div className="lg:col-span-12">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                                <PositionSizeCalculator />
                            </div>
                        </div>
                    </div>

                    {/* SEO Content */}
                    <div className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Why Position Sizing is Important?
                        </h2>
                        <div className="prose text-slate-600 max-w-none">
                            <p className="mb-4">
                                Position sizing is one of the most critical aspects of risk management in trading. It determines how many shares or contracts you should trade to ensure you don't lose more than a specific percentage of your capital on a single trade.
                            </p>
                            <p className="mb-4">
                                <strong>Key Benefits:</strong>
                            </p>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li>Protects your trading capital from significant drawdowns</li>
                                <li>Helps you stay in the game long enough to be profitable</li>
                                <li>Removes emotional decision-making from trade sizing</li>
                                <li>Allows you to survive a string of losing trades</li>
                            </ul>
                            <p>
                                By sticking to a consistent risk percentage (e.g., 1% or 2% per trade), you ensure that no single loss can severely damage your portfolio.
                            </p>
                        </div>
                    </div>
                    <SoftwareAppJsonLd
                        name="Position Size Calculator - Stock Trading Risk Management"
                        description="Calculate the perfect position size for stock trading. Manage risk by defining entry price, stop loss, and risk percentage per trade."
                        calculatorPath="/calculators/position-size"
                    />
                </div>
            </div>
        </div>
    );
}
