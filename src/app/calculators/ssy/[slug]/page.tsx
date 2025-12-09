
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SsyCalculator } from '@/components/calculators/SsyCalculator';
import { ssyScenarios } from '@/core/data/ssyScenarios';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

// Generate static params for all scenarios
export async function generateStaticParams() {
    return ssyScenarios.map((scenario) => ({
        slug: scenario.slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const scenario = ssyScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        return {
            title: 'SSY Calculator',
            description: 'Sukanya Samriddhi Yojana Calculator',
        };
    }

    return {
        title: scenario.metaTitle,
        description: scenario.metaDescription,
        alternates: {
            canonical: `https://rupeetools.in/calculators/ssy/${slug}`,
        },
    };
}

export default async function SsyScenarioPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const scenario = ssyScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
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
                <SsyCalculator
                    initialInvestmentAmount={scenario.investmentAmount}
                    initialGirlAge={scenario.girlAge}
                    initialStartYear={scenario.startYear}
                />

                {/* Schema */}
                <SoftwareAppJsonLd
                    name={scenario.metaTitle}
                    description={scenario.metaDescription}
                    calculatorPath={`/calculators/ssy/${slug}`}
                />
            </div>
        </main>
    );
}
