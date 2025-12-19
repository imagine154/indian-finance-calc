import React from 'react';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import AmfiDashboard from '@/components/market/AmfiDashboard';
import { parseAmfiCsv, AmfiSchemeData } from '@/lib/amfi-parser';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AMFI Mutual Fund Flows (Nov 2025) - Inflow/Outflow Tracker | RupeeTools",
    description: "Analyze the latest AMFI monthly data. See net inflows in Small Cap, Mid Cap, and Liquid Funds. Track the mood of Indian mutual fund investors.",
    keywords: [
        "amfi monthly data",
        "mutual fund inflow outflow",
        "best performing mutual fund category",
        "nov 2025 amfi report",
        "mutual fund aum data"
    ],
    openGraph: {
        title: "Where is India Investing? AMFI Flow Tracker (Nov 2025)",
        description: "Visualizing the massive shift in Small Cap and Debt fund flows.",
        type: "article",
    }
};

export default function MutualFundFlowsPage() {
    // 1. Read the file
    const filePath = path.join(process.cwd(), 'src/data/MCR_MonthlyReport.xls');
    let data: AmfiSchemeData[] = [];

    try {
        // Read the file as binary
        const fileBuf = fs.readFileSync(filePath);

        // Parse using xlsx
        const workbook = XLSX.read(fileBuf, { type: 'buffer' });

        // Assume the data is in the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to CSV string to use our text parser
        const csvContent = XLSX.utils.sheet_to_csv(sheet);

        // Parse
        data = parseAmfiCsv(csvContent);
    } catch (error) {
        console.error("Error loading AMFI data:", error);
        // Fallback or empty state could be handled here
    }

    return (
        <>
            {/* Structured Data for Google (Dataset Schema) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Dataset",
                        "name": "AMFI Mutual Fund Flow Report - Nov 2025",
                        "description": "Monthly data of mutual fund inflows, outflows, and AUM in India.",
                        "url": "https://www.rupeetools.in/mutual-fund-flows",
                        "creator": { "@type": "Organization", "name": "Association of Mutual Funds in India (AMFI)" },
                        "variableMeasured": ["Inflow", "Outflow", "Net Assets"],
                        "temporalCoverage": "2025-11-01/2025-11-30"
                    })
                }}
            />
            <div className="min-h-screen bg-gray-50 py-10">
                <AmfiDashboard data={data} />
            </div>
        </>
    );
}
