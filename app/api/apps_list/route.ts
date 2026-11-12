import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getBackendBaseUrl() {
  return (
    process.env.BACKEND_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ??
    "https://backend.vibefund.ing/api"
  );
}

function getTokenCookieName() {
  return process.env.AUTH_TOKEN_COOKIE_NAME ?? "vibefund_token";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");

  const backendBaseUrl = getBackendBaseUrl();
  const backendUrl = new URL(`${backendBaseUrl}/apps_list`);
  if (page) backendUrl.searchParams.set("page", page);

  const cookieStore = await cookies();
  const token = cookieStore.get(getTokenCookieName())?.value;

  const headers: Record<string, string> = {
    accept: "application/json",
  };
  if (token) headers.authorization = `Bearer ${token}`;

  const backendRes = await fetch(backendUrl.toString(), {
    method: "GET",
    headers,
    cache: "no-store",
  }).catch((err) => {
    console.error("apps_list backend fetch failed:", err);
    return null;
  });

  if (!backendRes) {
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 },
    );
  }

  const text = await backendRes.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {
  }

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: "Backend error", details: data },
      { status: backendRes.status || 500 },
    );
  }

  return NextResponse.json(data);
}
