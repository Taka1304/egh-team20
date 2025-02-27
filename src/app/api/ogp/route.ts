import { extractOGPData } from "@/app/utlis/extractOGPData";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");
    if (!targetUrl) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    // URL から HTML を取得
    const res = await fetch(targetUrl);
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${res.status}` }, { status: 500 });
    }

    const html = await res.text();

    // OGP を抽出
    const ogpData = extractOGPData(html);
    return NextResponse.json(ogpData);
  } catch (error) {
    console.error("Failed to get OGP data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
