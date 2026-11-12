import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SignInResponse = {
  user_id: string;
  token: string;
};

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

async function backendSignIn(
  backendBaseUrl: string,
  walletId: string,
): Promise<Response> {
  const jsonRes = await fetch(`${backendBaseUrl}/sign_in`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ wallet_id: walletId }),
    cache: "no-store",
  });

  if (jsonRes.ok) return jsonRes;

  const form = new FormData();
  form.set("wallet_id", walletId);
  return fetch(`${backendBaseUrl}/sign_in`, {
    method: "POST",
    body: form,
    cache: "no-store",
  });
}

async function readWalletId(req: Request): Promise<string | null> {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as {
      wallet_id?: unknown;
      walletAddress?: unknown;
    } | null;
    const walletId =
      typeof body?.wallet_id === "string"
        ? body.wallet_id
        : typeof body?.walletAddress === "string"
          ? body.walletAddress
          : null;
    return walletId?.trim() ? walletId.trim() : null;
  }

  // form-data or x-www-form-urlencoded
  const form = await req.formData().catch(() => null);
  if (!form) return null;
  const raw = (form.get("wallet_id") ??
    form.get("walletAddress") ??
    form.get("address")) as string | null;
  if (typeof raw !== "string") return null;
  const walletId = raw.trim();
  return walletId ? walletId : null;
}

export async function POST(req: Request) {
  try {
    const walletId = await readWalletId(req);
    if (!walletId) {
      return NextResponse.json({ error: "Missing wallet_id" }, { status: 400 });
    }

    const backendBaseUrl = getBackendBaseUrl();

    let backendRes: Response;
    try {
      backendRes = await backendSignIn(backendBaseUrl, walletId);
    } catch (err) {
      console.error("Failed to reach auth backend:", err);
      return NextResponse.json(
        { error: "Failed to reach auth backend" },
        { status: 502 },
      );
    }

    const text = await backendRes.text();
    let data: SignInResponse | null = null;
    try {
      data = JSON.parse(text) as SignInResponse;
    } catch {
    }

    if (!backendRes.ok || !data?.token) {
      return NextResponse.json(
        { error: "Sign-in failed", details: data ?? text },
        { status: backendRes.status || 500 },
      );
    }

    const cookieName = getTokenCookieName();
    const userIdCookieName = getUserIdCookieName();
    const res = NextResponse.json({ user_id: data.user_id });
    res.cookies.set(cookieName, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookies.set(userIdCookieName, data.user_id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (err) {
    console.error("sign_in route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
