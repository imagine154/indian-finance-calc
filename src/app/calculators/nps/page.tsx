import { Metadata } from 'next';
import { NpsCalculator } from '@/components/calculators/NpsCalculator';

export const metadata: Metadata = {
    title: 'NPS Calculator - Pension & Lump Sum Estimator | Indian Finance Calc',
    description: 'Calculate your National Pension System (NPS) corpus, monthly pension, and lump sum withdrawal amount.',
};

export default function NpsPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-2">NPS Calculator</h1>
                    <p className="text-lg text-slate-600">Estimate your retirement corpus and monthly pension</p>
                </div>
                <NpsCalculator />
            </div>
        </main>
    );
}
