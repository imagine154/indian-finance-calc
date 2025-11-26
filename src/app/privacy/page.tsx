import React from 'react';

export const metadata = {
    title: 'Privacy Policy - RupeeTools',
    description: 'Privacy Policy for RupeeTools.in',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-slate text-slate-700">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                    Privacy Policy
                </h1>

                <p className="lead">
                    Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <h3 className="text-slate-900">Your Privacy Matters</h3>
                <p>
                    <strong>RupeeTools.in prioritizes your privacy.</strong> All financial calculations (Salary, SIP, Tax, Loan, etc.) are performed locally on your device (in your browser). We do not store, record, or transmit your personal financial data to any server or database.
                </p>

                <h3 className="text-slate-900">Data Collection</h3>
                <p>
                    Since our calculators run client-side, the inputs you provide (such as salary figures, investment amounts, age) stay on your device. When you close the tab or refresh the page, this data is cleared unless your browser's local storage is used for temporary convenience (which you can clear at any time).
                </p>

                <h3 className="text-slate-900">Third-Party Vendors and Ads</h3>
                <p>
                    We use third-party vendors, including Google, to serve ads when you visit our website.
                </p>
                <ul>
                    <li>
                        Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
                    </li>
                    <li>
                        Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                    </li>
                    <li>
                        Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
                    </li>
                </ul>

                <h3 className="text-slate-900">Analytics</h3>
                <p>
                    We may use anonymous analytics tools (like Google Analytics) to understand how users interact with our site (e.g., which pages are visited most). This data is aggregated and does not contain personally identifiable financial information.
                </p>

                <h3 className="text-slate-900">Changes to This Policy</h3>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>

                <h3 className="text-slate-900">Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@rupeetools.in">hello@rupeetools.in</a>.
                </p>
            </div>
        </div>
    );
}
