
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LoanCalculator } from '@/components/calculators/LoanCalculator';
import { homeLoanScenarios } from '@/core/data/homeLoanScenarios';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

// Generate static params for all scenarios
export async function generateStaticParams() {
    return homeLoanScenarios.map((scenario) => ({
        slug: scenario.slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const scenario = homeLoanScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        return {
            title: 'Home Loan EMI Calculator',
            description: 'Calculate your Home Loan EMI',
        };
    }

    return {
        title: scenario.metaTitle,
        description: scenario.metaDescription,
        alternates: {
            canonical: `https://www.rupeetools.in/calculators/home-loan/${slug}`,
        },
    };
}

export default async function HomeLoanScenarioPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const scenario = homeLoanScenarios.find((s) => s.slug === slug);

    if (!scenario) {
        notFound();
    }

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
                <LoanCalculator
                    initialLoanAmount={scenario.loanAmount}
                    initialTenure={scenario.tenure}
                    initialInterestRate={scenario.interestRate}
                />

                {/* Scenario Summary Card */}
                <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl p-6 border border-blue-100 shadow-sm text-center">
                    <p className="text-slate-600 mb-2">Calculating EMI for</p>
                    <p className="text-3xl font-bold text-slate-900 mb-2">
                        {scenario.loanAmount >= 10000000
                            ? `₹${(scenario.loanAmount / 10000000).toFixed(2)} Cr`
                            : `₹${(scenario.loanAmount / 100000).toFixed(2)} Lakhs`}
                    </p>
                    <p className="text-slate-600">
                        for <span className="font-semibold text-slate-900">{scenario.tenure} Years</span> tenure.
                    </p>
                </div>

                {/* Schema */}
                <SoftwareAppJsonLd
                    name={scenario.metaTitle}
                    description={scenario.metaDescription}
                    calculatorPath={`/calculators/home-loan/${slug}`}
                />
            </div>
        </main>
    );
}
