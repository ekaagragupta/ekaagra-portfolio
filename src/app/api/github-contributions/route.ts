import { NextResponse } from "next/server";

export async function GET() {
  const username = "ekaagragupta";

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "EkaagraPortfolio/1.0" },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
