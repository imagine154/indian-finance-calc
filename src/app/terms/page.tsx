import React from 'react';

export const metadata = {
    title: 'Terms of Use - RupeeTools',
    description: 'Terms of Use for RupeeTools.in',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-slate text-slate-700">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                    Terms of Use
                </h1>

                <p className="lead">
                    By accessing and using RupeeTools.in, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h3 className="text-slate-900">Disclaimer of Warranties</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                    <p className="text-red-700 font-medium m-0">
                        <strong>Critical Disclaimer:</strong> The results provided by these calculators are estimates based on the inputs provided and general financial formulas. RupeeTools.in does not provide financial advice. Please consult a Chartered Accountant (CA) or SEBI Registered Investment Advisor before making any investment or tax-related decisions.
                    </p>
                </div>
                <p>
                    The content on this website is for informational and educational purposes only. While we strive for accuracy, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
                </p>

                <h3 className="text-slate-900">Limitation of Liability</h3>
                <p>
                    In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>

                <h3 className="text-slate-900">Accuracy of Information</h3>
                <p>
                    Tax laws and financial regulations in India change frequently. While we aim to keep our calculators updated (e.g., with the latest Budget announcements), we cannot guarantee that all information is always up-to-the-minute current. Always verify with official sources.
                </p>

                <h3 className="text-slate-900">Intellectual Property</h3>
                <p>
                    The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws. You may not reproduce, download, transmit, or distribute any part of this site without our prior written permission.
                </p>

                <h3 className="text-slate-900">Governing Law</h3>
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws of India.
                </p>
            </div>
        </div>
    );
}
