import { NextResponse } from "next/server";

const HAM_API_KEY = process.env.HARVARD_API_KEY;

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const { id } = await params;

    let res: Response;
    try {
        res = await fetch(
            `https://api.harvardartmuseums.org/object/${id}?apikey=${HAM_API_KEY}`,
            { cache: "no-store" }
        );
    } catch {
        return NextResponse.json({ error: "Could not reach the Harvard Art Museums API" }, { status: 503 });
    }

    if (res.status === 404) {
        return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
    }

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch artwork details. The API may be unavailable." },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
