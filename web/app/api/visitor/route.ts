import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'visitor-count.json');

// Initialize if not exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ count: 1000 })); // Start from 1000 for realistic feel
}

export async function GET() {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        let { count } = JSON.parse(data);

        count += 1;

        fs.writeFileSync(DB_PATH, JSON.stringify({ count }));

        return NextResponse.json({ count });
    } catch (error) {
        return NextResponse.json({ count: 1000 }); // Fallback
    }
}
