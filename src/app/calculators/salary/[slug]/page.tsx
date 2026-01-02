
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SalaryCalculator } from '@/components/calculators/SalaryCalculator';
import { salaryScenarios } from '@/core/data/salaryScenarios';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

// Generate static params for all scenarios
export async function generateStaticParams() {
    return salaryScenarios.map((scenario) => ({
        slug: scenario.slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const scenario = salaryScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        return {
            title: 'Salary Calculator',
            description: 'Calculate your in-hand salary',
        };
    }

    return {
        title: scenario.metaTitle,
        description: scenario.metaDescription,
        alternates: {
            canonical: `https://www.rupeetools.in/calculators/salary/${slug}`,
        },
    };
}

export default async function SalaryScenarioPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const scenario = salaryScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
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
                <SalaryCalculator
                    initialCtc={scenario.ctc}
                    initialIsMetro={scenario.isMetro}
                />

                {/* Scenario Summary Card */}
                <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl p-6 border border-blue-100 shadow-sm text-center">
                    <p className="text-slate-600 mb-2">Calculating for</p>
                    <p className="text-3xl font-bold text-slate-900 mb-2">
                        {scenario.ctc >= 10000000
                            ? `₹${(scenario.ctc / 10000000).toFixed(2)} Cr`
                            : `₹${(scenario.ctc / 100000).toFixed(2)} Lakhs`} CTC
                    </p>
                    <p className="text-slate-600">
                        in <span className="font-semibold text-slate-900">{scenario.city}</span> ({scenario.isMetro ? 'Metro' : 'Non-Metro'} HRA).
                    </p>
                </div>

                {/* Schema */}
                <SoftwareAppJsonLd
                    name={scenario.metaTitle}
                    description={scenario.metaDescription}
                    calculatorPath={`/calculators/salary/${slug}`}
                />
            </div>
        </main>
    );
}
