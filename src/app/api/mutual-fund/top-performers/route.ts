import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'Mutual Fund';

        const schemesPath = path.join(process.cwd(), 'src', 'data', 'mf_schemes.json');
        const returnsPath = path.join(process.cwd(), 'src', 'data', 'mf_returns.json');

        if (!fs.existsSync(schemesPath) || !fs.existsSync(returnsPath)) {
            return NextResponse.json({ error: 'Data files not found' }, { status: 500 });
        }

        const schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf8'));
        const returnsMap = JSON.parse(fs.readFileSync(returnsPath, 'utf8'));

        // Filter schemes by type
        let relevantSchemes = schemes.filter((s: any) => s.type === type);

        // For Mutual Funds, typically compare "Direct" "Growth" for fair comparison
        if (type === 'Mutual Fund') {
            relevantSchemes = relevantSchemes.filter((s: any) =>
                s.plan.toLowerCase() === 'direct' &&
                s.option.toLowerCase() === 'growth'
            );
        }

        // Categories to group by
        const categories = type === 'Mutual Fund'
            ? ["Debt Scheme", "Equity Scheme", "Gold & Silver Scheme", "Hybrid Scheme", "Index Funds", "Solution Oriented Scheme"]
            : ["Debt Scheme", "Equity Scheme", "Gold & Silver Scheme"];

        const periods = ["3Y", "5Y", "10Y"];
        const results: any = {};

        periods.forEach(period => {
            results[period] = {};

            categories.forEach(category => {
                // Get schemes in this category
                const categorySchemes = relevantSchemes.filter((s: any) => s.category === category);

                // Map to returns
                const withReturns = categorySchemes.map((s: any) => {
                    const retObj = returnsMap[s.code];
                    const retVal = retObj ? retObj[period] : null;
                    return {
                        scheme_name: s.name,
                        code: s.code,
                        return: retVal
                    };
                }).filter((item: any) => item.return !== null && item.return !== undefined);

                // Sort descending
                withReturns.sort((a: any, b: any) => b.return - a.return);

                // Take top 2
                results[period][category] = withReturns.slice(0, 2);
            });
        });

        return NextResponse.json(results);

    } catch (error) {
        console.error('Error fetching top performers:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
