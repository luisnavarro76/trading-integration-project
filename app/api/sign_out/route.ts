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

function getUserIdCookieName() {
  return process.env.AUTH_USER_ID_COOKIE_NAME ?? "vibefund_user_id";
}

export async function POST() {
  const cookieName = getTokenCookieName();
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;

  if (token) {
    const backendBaseUrl = getBackendBaseUrl();
    try {
      await fetch(`${backendBaseUrl}/sign_out`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ token }),
        cache: "no-store",
      });
    } catch {
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.cookies.set(getUserIdCookieName(), "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
