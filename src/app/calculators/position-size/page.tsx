import { Metadata } from 'next';
import { PositionSizeCalculator } from '@/components/calculators/PositionSizeCalculator';

export const metadata: Metadata = {
    title: 'Position Size Calculator - Stock Trading Risk Management | RupeeTools',
    description: 'Calculate the perfect position size for stock trading. Manage risk by defining entry price, stop loss, and risk percentage per trade.',
    keywords: ['position size calculator', 'stock market risk management', 'trading calculator', 'stop loss calculator', 'risk per trade'],
};

export default function PositionSizeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Position Size Calculator
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4">
                        Determine exactly how many shares to buy to stay within your risk limits.
                    </p>
                </div>

                <PositionSizeCalculator />

                {/* How it works section */}
                <div className="mt-16 max-w-4xl mx-auto prose prose-slate">
                    <h2 className="text-2xl font-bold text-slate-800">Why is Position Sizing Important?</h2>
                    <p className="text-slate-600">
                        Position sizing is the most critical aspect of risk management in trading. It ensures that a single losing trade does not wipe out a significant portion of your trading capital. By calculating the correct position size, you can survive a string of losses and stay in the game long enough to be profitable.
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mt-6">How to use this calculator:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li><strong>Account Capital:</strong> Enter your total trading capital available.</li>
                        <li><strong>Risk Percentage:</strong> Decide how much of your capital you are willing to lose on a single trade (usually 1% to 2%).</li>
                        <li><strong>Entry Price:</strong> The price at which you plan to buy the stock.</li>
                        <li><strong>Stop Loss:</strong> The price at which you will exit if the trade goes against you.</li>
                    </ul>

                    <p className="text-slate-600 mt-4">
                        The calculator will tell you exactly how many shares to buy so that if your stop loss is hit, you only lose the pre-defined risk amount.
                    </p>
                </div>
            </div>
        </div>
    );
}
