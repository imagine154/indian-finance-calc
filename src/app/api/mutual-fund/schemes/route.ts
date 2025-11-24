import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q')?.toLowerCase().trim() || '';

        // Helper to parse comma-separated values into an array of lowercase strings
        const parseParam = (param: string | null) => {
            if (!param) return [];
            return param.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        };

        const amc = parseParam(searchParams.get('amc'));
        const category = parseParam(searchParams.get('category'));
        const subcategory = parseParam(searchParams.get('subcategory'));
        const plan = parseParam(searchParams.get('plan'));
        const option = parseParam(searchParams.get('option'));
        const type = searchParams.get('type')?.toLowerCase().trim() || '';

        const filePath = path.join(process.cwd(), 'src', 'data', 'mf_schemes.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Data file not found' }, { status: 500 });
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const schemes = JSON.parse(fileContents);

        let filtered = schemes;

        // Filter by Type (Mutual Fund vs ETF)
        if (type && type !== 'both') {
            filtered = filtered.filter((s: any) => s.type.toLowerCase() === type);
        }

        // Filter by AMC (Multi-select)
        if (amc.length > 0 && !amc.includes('all amcs')) {
            filtered = filtered.filter((s: any) => amc.includes(s.amc.toLowerCase()));
        }

        // Filter by Category (Multi-select)
        if (category.length > 0 && !category.includes('all categories')) {
            filtered = filtered.filter((s: any) => category.includes(s.category.toLowerCase()));
        }

        // Filter by SubCategory (Multi-select)
        if (subcategory.length > 0 && !subcategory.includes('all sub-categories')) {
            filtered = filtered.filter((s: any) => subcategory.includes(s.subcategory.toLowerCase()));
        }

        // Filter by Plan (Multi-select)
        if (plan.length > 0 && !plan.includes('all plans')) {
            filtered = filtered.filter((s: any) => plan.includes(s.plan.toLowerCase()));
        }

        // Filter by Option (Multi-select)
        if (option.length > 0 && !option.includes('all options')) {
            filtered = filtered.filter((s: any) => option.includes(s.option.toLowerCase()));
        }

        // Search (Name or Code)
        if (q) {
            filtered = filtered.filter((s: any) =>
                s.name.toLowerCase().includes(q) ||
                s.code.includes(q)
            );
        }

        // We do NOT limit results here because the frontend needs the full list 
        // to derive dependent filter options (AMCs, Categories, etc.)
        // The dataset is ~3000 items, which is manageable for a single JSON response (~500KB).

        return NextResponse.json(filtered);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
