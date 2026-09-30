import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;

async function proxyRequest(
  req: NextRequest,
  path: string,
  method: string
) {
  const url = `${BASE_URL}/${path}`;

  const headers = new Headers();
  if (API_KEY) {
    headers.set("Authorization", `Bearer ${API_KEY}`);
  }
  headers.set("Content-Type", "application/json");

  const cookies = req.headers.get("cookie");
  if (cookies) {
    headers.set("Cookie", cookies);
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && method !== "HEAD") {
    const body = await req.text();
    if (body) {
      options.body = body;
    }
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const fullUrl = searchParams ? `${url}?${searchParams}` : url;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      next: { revalidate: 0 },
    });

    const data = await response.json().catch(() => null);

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`[Proxy Error] ${method} ${fullUrl}:`, error);
    return NextResponse.json(
      { detail: "Failed to connect to backend API" },
      { status: 502 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error("[Proxy Auth Error]", err);
    return NextResponse.json({ detail: "Authentication error" }, { status: 401 });
  }
  return proxyRequest(req, params.path.join("/"), "GET");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error("[Proxy Auth Error]", err);
    return NextResponse.json({ detail: "Authentication error" }, { status: 401 });
  }
  return proxyRequest(req, params.path.join("/"), "POST");
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error("[Proxy Auth Error]", err);
    return NextResponse.json({ detail: "Authentication error" }, { status: 401 });
  }
  return proxyRequest(req, params.path.join("/"), "PUT");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error("[Proxy Auth Error]", err);
    return NextResponse.json({ detail: "Authentication error" }, { status: 401 });
  }
  return proxyRequest(req, params.path.join("/"), "PATCH");
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error("[Proxy Auth Error]", err);
    return NextResponse.json({ detail: "Authentication error" }, { status: 401 });
  }
  return proxyRequest(req, params.path.join("/"), "DELETE");
}
