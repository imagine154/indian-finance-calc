import React from 'react';

interface SoftwareAppJsonLdProps {
    name: string;
    description: string;
    calculatorPath: string; // e.g., "/calculators/ssy"
    imageUrl?: string;
    operatingSystem?: string;
    applicationCategory?: string;
}

export const SoftwareAppJsonLd = ({
    name,
    description,
    calculatorPath,
    imageUrl = "https://www.rupeetools.in/web-app-manifest-512x512.png", // Default logo
    operatingSystem = "Web",
    applicationCategory = "FinanceApplication",
}: SoftwareAppJsonLdProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": name,
        "description": description,
        "operatingSystem": operatingSystem,
        "applicationCategory": applicationCategory,
        "url": `https://www.rupeetools.in${calculatorPath}`,
        "image": imageUrl,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
