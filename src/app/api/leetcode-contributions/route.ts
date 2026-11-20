import { NextResponse } from "next/server";

export async function GET() {
  const username = "ekaagragupta";

  try {
    const res = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "EkaagraPortfolio/1.0" },
      }
    );

    if (!res.ok) {
      throw new Error(`LeetCode API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
