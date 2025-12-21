
import { Metadata } from "next";
import { CasAnalyzer } from "@/components/portfolio/CasAnalyzer"; // Check path
import { ScanSearch, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Mutual Fund Portfolio Analyzer - Check Hidden Commissions | RupeeTools",
    description: "Upload your CAMS/KFintech CAS PDF and discover hidden commissions. Switch from Regular to Direct plans and save 1% annually. Privacy-first, client-side analysis.",
    keywords: [
        "mutual fund portfolio analyzer",
        "upload cas file online",
        "cams cas analyzer",
        "direct vs regular plan calculator",
        "hidden commission calculator",
        "portfolio health check india"
    ],
    openGraph: {
        title: "I checked my Portfolio Health on RupeeTools",
        description: "Found hidden commissions in my mutual funds. Check yours for free (Privacy Secured).",
        type: "website",
    }
};

export default function PortfolioXrayPage() {
    return (
        <>
            {/* Structured Data: SoftwareApplication Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "RupeeTools Portfolio X-Ray",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "INR"
                        },
                        "featureList": [
                            "CAS PDF Parser",
                            "Regular vs Direct Plan Detection",
                            "Commission Calculator",
                            "Client-side Privacy"
                        ]
                    })
                }}
            />

            {/* Main Page Content */}
            <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-2">
                            <ScanSearch className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Portfolio <span className="text-indigo-600">X-Ray</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Are you losing money to hidden commissions? Upload your <strong>Summary CAS PDF</strong> (Detailed CAS not supported) to find out.
                            <span className="block mt-2 text-sm font-semibold text-emerald-600 flex items-center justify-center gap-1">
                                <ShieldCheck className="w-4 h-4" /> 100% Private. File never leaves your device.
                            </span>
                        </p>
                    </div>

                    {/* The Tool */}
                    <CasAnalyzer />

                    {/* FAQ / Trust Section */}
                    <div className="grid md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Is it safe?
                            </h3>
                            <p className="text-sm text-slate-500">Yes. The analysis runs entirely in your browser using JavaScript. We do not have a server database.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" /> What is a Regular Plan?
                            </h3>
                            <p className="text-sm text-slate-500">A plan where a distributor earns ~1% commission from your investment every year, forever.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <ScanSearch className="w-4 h-4 text-blue-500" /> How to get CAS?
                            </h3>
                            <p className="text-sm text-slate-500">Download your &quot;Consolidated Account Statement&quot; from CAMS Online or KFintech website.</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
