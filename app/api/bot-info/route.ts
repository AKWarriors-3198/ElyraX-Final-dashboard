import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;

export async function GET() {
  try {
    const headers = new Headers();
    if (API_KEY) {
      headers.set("Authorization", `Bearer ${API_KEY}`);
    }
    headers.set("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/bot/info`, {
      headers,
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || "Failed to fetch bot info" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Bot Info Proxy Error]", error);
    return NextResponse.json(
      { error: "Failed to connect to bot API" },
      { status: 502 }
    );
  }
}
