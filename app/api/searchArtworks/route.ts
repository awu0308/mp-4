import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const HAM_API_KEY = process.env.HARVARD_API_KEY;

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "No search query provided" }, { status: 400 });
    }

    const params = new URLSearchParams({
        apikey: HAM_API_KEY || "",
        title: query,
        size: "12",
        fields: "id,title,primaryimageurl,dated,culture,medium,people",
    });

    let res: Response;
    try {
        res = await fetch(`https://api.harvardartmuseums.org/object?${params}`);
    } catch {
        return NextResponse.json({ error: "Could not reach the Harvard Art Museums API" }, { status: 503 });
    }

    if (res.status === 401) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (!res.ok) {
        return NextResponse.json(
            { error: "The Harvard Art Museums API is currently unavailable. Please try again later." },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
