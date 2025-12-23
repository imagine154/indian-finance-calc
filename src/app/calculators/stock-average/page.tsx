import { Metadata } from 'next';
import { StockAverageCalculator } from '@/components/calculators/StockAverageCalculator';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Stock Average Calculator | Average Down & Target Price Calculator',
    description: 'Calculate average price of your stock holdings or find out how many shares you need to buy to reach your target average price. Free tool for Indian stock market investors.',
    keywords: 'stock average calculator, average down calculator, target price calculator, stock market tools, indian stock market, rupee tools',
};

export default function StockAveragePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Stock Average Calculator" />
            <div className="py-8 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">

                    {/* Calculator Component */}
                    <div className="mb-16 mt-6">
                        <StockAverageCalculator />
                    </div>

                    {/* About Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-800">Why use this calculator?</h2>
                            <div className="prose prose-slate text-slate-600">
                                <p>
                                    In stock trading and investing, "Averaging Down" is a common strategy where you buy more shares of a stock as its price drops, thereby lowering your average cost per share.
                                </p>
                                <ul className="list-disc pl-5 title-list space-y-2 mt-4">
                                    <li>
                                        <strong>Find Effective Average:</strong> Enter multiple buy orders (price & quantity) to see your true break-even point.
                                    </li>
                                    <li>
                                        <strong>Target Averaging:</strong> If you are stuck at a high price (e.g., ₹1000) and want to bring your average down to ₹900, this tool tells you exactly how many shares to buy at the current market price (CMP).
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                            <h3 className="font-semibold text-lg text-slate-800 mb-4">Common Scenarios</h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                                    <p className="font-medium text-amber-900 text-sm mb-1">Scenario 1: Averaging Down</p>
                                    <p className="text-xs text-amber-800">
                                        You bought Tata Motors at ₹500. It falls to ₹400. You want to know what your new average will be if you buy 100 more shares.
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="font-medium text-blue-900 text-sm mb-1">Scenario 2: Target Planning</p>
                                    <p className="text-xs text-blue-800">
                                        You have an average of ₹2000. Current price of HDFC Bank is ₹1500. You want to bring your average down to ₹1700. How many shares do you need?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
