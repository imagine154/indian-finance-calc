import { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
    title: "Free Wealth Tracker India - No Login Required | RupeeTools",
    description: "The privacy-first financial dashboard. Track your Net Worth, SIP Goals, and Assets without sharing data. Secure, Browser-based, and Free.",
    keywords: [
        "wealth tracker india",
        "no login portfolio tracker",
        "privacy finance app",
        "net worth calculator india",
        "personal finance dashboard",
    ],
    openGraph: {
        title: "I'm tracking my wealth on RupeeTools (Privately)",
        description: "Zero signup. Zero data sharing. Just pure financial clarity.",
        images: ["/opengraph-dashboard.png"],
    },
};

export default function DashboardPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "RupeeTools Wealth Dashboard",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "featureList": [
            "Net Worth Tracking",
            "Goal Planning",
            "Local Storage Privacy",
            "Asset Allocation"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <DashboardClient />
        </>
    );
}
