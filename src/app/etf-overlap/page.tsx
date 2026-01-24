import type { Metadata } from 'next';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';
import EtfOverlapClient from './EtfOverlapClient';

export const metadata: Metadata = {
    title: "ETF Portfolio Overlap Tool | Compare Index Holdings - RupeeTools",
    description: "Analyze the overlap between two ETFs or Indices. Check common stocks and weightage differences between Nifty 50, Nifty Next 50, and other sectors instantly.",
    keywords: [
        "etf overlap calculator",
        "portfolio intersection",
        "nifty 50 overlap",
        "mutual fund overlap tool",
        "etf comparison india",
        "stock holdings analyzer"
    ],
    alternates: {
        canonical: "https://www.rupeetools.in/etf-overlap",
    }
};

export default function EtfOverlapPage() {
    return (
        <>
            <SoftwareAppJsonLd
                name="RupeeTools ETF Overlap Analyzer"
                description="Analyze the overlap between two ETFs or Indices. Check common stocks and weightage differences."
                calculatorPath="/etf-overlap"
                applicationCategory="FinanceApplication"
            />
            <EtfOverlapClient />
        </>
    );
}
