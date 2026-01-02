
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PpfCalculator } from '@/components/calculators/PpfCalculator';
import { ppfScenarios } from '@/core/data/ppfScenarios';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

// Generate static params for all scenarios
export async function generateStaticParams() {
    return ppfScenarios.map((scenario) => ({
        slug: scenario.slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const scenario = ppfScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        return {
            title: 'PPF Calculator',
            description: 'Public Provident Fund Calculator',
        };
    }

    return {
        title: scenario.metaTitle,
        description: scenario.metaDescription,
        alternates: {
            canonical: `https://www.rupeetools.in/calculators/ppf/${slug}`,
        },
    };
}

export default async function PpfScenarioPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const scenario = ppfScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
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
                <PpfCalculator
                    initialYearlyInvestment={scenario.yearlyInvestment}
                    initialDuration={scenario.duration}
                />

                {/* Schema */}
                <SoftwareAppJsonLd
                    name={scenario.metaTitle}
                    description={scenario.metaDescription}
                    calculatorPath={`/calculators/ppf/${slug}`}
                />
            </div>
        </main>
    );
}
