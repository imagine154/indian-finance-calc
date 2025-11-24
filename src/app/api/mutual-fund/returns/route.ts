import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        if (!code) {
            return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'src', 'data', 'mf_returns.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Data file not found' }, { status: 500 });
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const returnsMap = JSON.parse(fileContents);

        const data = returnsMap[code];

        if (!data) {
            return NextResponse.json({ error: 'Scheme not found or no data available' }, { status: 404 });
        }

        return NextResponse.json({
            code,
            results: data
        });
    } catch (error) {
        console.error('Error fetching returns:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
