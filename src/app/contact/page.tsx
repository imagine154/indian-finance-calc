import React from 'react';

export const metadata = {
    title: 'Contact Us - RupeeTools',
    description: 'Get in touch with the RupeeTools team.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                    Contact Us
                </h1>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center max-w-lg mx-auto mb-10">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Email Us</h2>
                    <p className="text-slate-600 mb-4">
                        Have questions, suggestions, or feedback? We'd love to hear from you.
                    </p>
                    <a
                        href="mailto:hello@rupeetools.in"
                        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        hello@rupeetools.in
                    </a>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800 font-medium">
                        Found a bug in a calculator? Let us know! Your feedback helps us improve accuracy for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
}
