
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SipCalculator } from '@/components/calculators/SipCalculator';
import { sipScenarios } from '@/core/data/sipScenarios';
import { calculateRequiredSIP } from '@/core/logic/sip';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

// Generate static params for all scenarios
export async function generateStaticParams() {
    return sipScenarios.map((scenario) => ({
        slug: scenario.slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const scenario = sipScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        return {
            title: 'SIP Calculator',
            description: 'Calculate your SIP returns',
        };
    }

    return {
        title: scenario.metaTitle,
        description: scenario.metaDescription,
        alternates: {
            canonical: `https://rupeetools.in/calculators/sip/${slug}`,
        },
    };
}

export default async function SipScenarioPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const scenario = sipScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        notFound();
    }

    // Calculate the required monthly investment to meet the target
    const requiredMonthlyInvestment = calculateRequiredSIP(
        scenario.targetAmount,
        scenario.rate,
        scenario.duration
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        {scenario.content.title}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {scenario.content.description}
                    </p>
                </div>

                {/* Calculator Component with Pre-filled Values */}
                <SipCalculator
                    initialInvestment={requiredMonthlyInvestment}
                    initialRate={scenario.rate}
                    initialDuration={scenario.duration}
                />

                {/* Goal Summary Card */}
                <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl p-6 border border-blue-100 shadow-sm text-center">
                    <p className="text-slate-600 mb-2">To reach your goal of</p>
                    <p className="text-3xl font-bold text-slate-900 mb-2">
                        ₹{(scenario.targetAmount / 10000000).toFixed(2)} Crores
                    </p>
                    <p className="text-slate-600">
                        in <span className="font-semibold text-slate-900">{scenario.duration} Years</span>, start an SIP of <span className="font-bold text-blue-600">₹{requiredMonthlyInvestment.toLocaleString('en-IN')}</span> today.
                    </p>
                </div>

                {/* Schema */}
                <SoftwareAppJsonLd
                    name={scenario.metaTitle}
                    description={scenario.metaDescription}
                    calculatorPath={`/calculators/sip/${slug}`}
                />
            </div>
        </main>
    );
}
