import type { Metadata } from 'next';
import PivotPointCalculator from '../../../components/calculators/PivotPointCalculator';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Pivot Point Calculator | Intraday, Swing Trading Support & Resistance',
    description: 'Calculate Standard, Fibonacci, Camarilla, and Woodie pivot points. Free tool for Indian traders to find key intraday support and resistance levels.',
    keywords: 'pivot point calculator, intraday trading levels, camarilla pivot points, fibonacci retracement, nifty pivot points, banknifty support resistance'
};

export default function PivotPointPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader title="Pivot Point Calculator" />
            <div className="py-12 px-4 sm:px-6">
                <PivotPointCalculator />
            </div>
        </div>
    );
}
