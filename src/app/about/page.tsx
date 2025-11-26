import React from 'react';

export const metadata = {
    title: 'About RupeeTools - Our Mission',
    description: 'Learn about RupeeTools, our mission to provide free, accurate financial calculators for Indian investors.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    About RupeeTools - Our Mission
                </h1>

                <div className="prose prose-slate max-w-none mb-12">
                    <p className="text-lg text-slate-600 leading-relaxed">
                        At RupeeTools, we believe that financial planning should be accessible, accurate, and free for everyone.
                        Our mission is to empower Indian investors with the tools they need to make informed decisions about their wealth,
                        savings, and taxes. We provide a suite of calculators tailored specifically for the Indian financial ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Privacy Focused */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Privacy Focused</h3>
                        <p className="text-slate-600">
                            We respect your data. All calculations happen locally on your device. We never store or transmit your personal financial information.
                        </p>
                    </div>

                    {/* Card 2: Updated Logic */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Updated Logic</h3>
                        <p className="text-slate-600">
                            Our calculators are always up-to-date with the latest government rules and tax regimes, including FY 2025-26 regulations.
                        </p>
                    </div>

                    {/* Card 3: Free Forever */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Free Forever</h3>
                        <p className="text-slate-600">
                            Access all our premium tools and calculators completely free of charge. No hidden fees, no paywalls.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
