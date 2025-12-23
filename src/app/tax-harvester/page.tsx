import React from 'react';
import { Metadata } from 'next';
import { HarvestingPageClient } from './HarvestingClient';

export const metadata: Metadata = {
    title: "Tax Loss Harvesting Tool India (FY 2024-25) | RupeeTools",
    description: "Calculate how much tax you can save by harvesting stock losses. Free tool for Indian investors to offset STCG and LTCG before March 31st.",
    keywords: ["tax harvesting india", "set off capital gains", "stcg calculator", "ltcg exemption limit", "save tax on stocks", "tax loss harvesting"],
    openGraph: {
        title: "I just found a way to save taxes on my stocks!",
        description: "Check if you can harvest losses to reduce your tax bill.",
        type: 'website',
    },
};

export default function TaxHarvesterPage() {
    return <HarvestingPageClient />;
}
