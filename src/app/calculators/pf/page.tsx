import { PfCalculator } from '@/components/calculators/PfCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EPF Corpus Calculator | Indian Finance Calc',
    description: 'Calculate your Employee Provident Fund (EPF) corpus at retirement with annual salary hikes and compound interest.',
};

export default function PfCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-slate-900">EPF Corpus Calculator</h1>
                <p className="text-slate-600 mt-2">Project your retirement corpus with the power of compounding.</p>
            </div>
            <PfCalculator />
        </div>
    );
}
