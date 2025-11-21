import type { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for SEO
 * Controls how search engines crawl and index the website
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourfinancecalc.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/static/',
                ],
            },
            // Special rule for Google bot - allow everything except private areas
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
