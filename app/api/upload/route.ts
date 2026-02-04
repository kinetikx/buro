
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const path = join(process.cwd(), 'public/uploads', filename);

    try {
        await writeFile(path, buffer);
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
