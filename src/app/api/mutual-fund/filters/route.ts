import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'mf_filters.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Data file not found' }, { status: 500 });
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const filters = JSON.parse(fileContents);

        return NextResponse.json(filters);
    } catch (error) {
        console.error('Error fetching filters:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
