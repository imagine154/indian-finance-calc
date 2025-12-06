import { Metadata } from 'next';
import { GstCalculator } from '@/components/calculators/GstCalculator';

export const metadata: Metadata = {
    title: 'GST Calculator India - Inclusive & Exclusive GST | RupeeTools',
    description: 'Calculate GST online. Add GST to base price or remove GST from total amount. Reverse GST calculator for 5%, 12%, 18%, and 28% rates.',
    keywords: ['GST calculator', 'reverse GST calculator', 'calculate GST on amount', 'inclusive vs exclusive GST', 'goods and service tax calculator'],
    alternates: {
        canonical: 'https://rupeetools.in/calculators/gst',
    },
};

export default function GstCalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                        GST Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Calculate Goods & Services Tax (GST) effortlessly. Add GST to your base price or remove GST from the total amount (Reverse Calculation).
                    </p>
                </div>

                <GstCalculator />

                <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-200 prose prose-slate">
                    <h2 className="text-slate-900 mt-0">How to use this GST Calculator?</h2>
                    <p className="text-slate-700">
                        This calculator supports two modes:
                    </p>
                    <ul className="text-slate-700">
                        <li><strong>Add GST (Exclusive):</strong> Use this when you have a base price (e.g., ₹1000) and need to add tax (e.g., 18%) to find the total bill amount.</li>
                        <li><strong>Remove GST (Inclusive):</strong> Use this when you have the final bill amount (e.g., ₹1180) and want to find out the actual base price and the tax component. This is also known as a Reverse GST Calculator.</li>
                    </ul>

                    <h3 className="text-slate-900">GST 2.0 Rates (Effective Sep 22, 2025)</h3>
                    <ul className="text-slate-700 mb-0">
                        <li><strong>5%:</strong> Essentials, agricultural goods, healthcare equipment.</li>
                        <li><strong>18%:</strong> Electronics (small cars, appliances), services.</li>
                        <li><strong>40%:</strong> Sin goods (pan masala, aerated drinks), luxury vehicles.</li>
                        <li><strong>0% (Nil):</strong> Dairy, lifesaving drugs, educational materials.</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
