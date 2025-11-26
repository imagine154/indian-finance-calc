import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://indian-finance-calc-zo9cf43zg-ganamurthys-projects.vercel.app";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/salary`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/income-tax`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/sip`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/loan`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/pf`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/nps`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/ssy`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/goal`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/calculators/investment-advisor`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}
