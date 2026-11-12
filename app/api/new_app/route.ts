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

type NewAppPayload = {
  app_name?: string;
  app_link: string;
  ticker_name: string;
  description: string;
  is_x_connected: boolean;
  app_x_handle: string;
  app_video_url?: string;
  launch_date: string; // YYYY-MM-DD
  launch_time: string; // HH:mm
  user_id?: string;
};

function requireFormString(form: FormData, key: string): string | null {
  const raw = form.get(key);
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed ? trimmed : null;
}

function normalizeBoolean01(value: string | null): "0" | "1" {
  if (!value) return "0";
  const v = value.trim().toLowerCase();
  if (v === "1" || v === "true" || v === "yes" || v === "on") return "1";
  return "0";
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getTokenCookieName())?.value;
  const userId = cookieStore.get(getUserIdCookieName())?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  let form: FormData | null = null;
  if (contentType.includes("application/json")) {
    const payload = (await req
      .json()
      .catch(() => null)) as Partial<NewAppPayload> | null;
    if (
      !payload?.app_link ||
      !payload?.ticker_name ||
      !payload?.launch_date ||
      !payload?.launch_time
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    form = new FormData();
    if (payload.app_name) form.set("app_name", payload.app_name);
    form.set("app_link", payload.app_link);
    form.set("ticker_name", payload.ticker_name);
    form.set("description", payload.description);
    form.set("is_x_connected", payload.is_x_connected ? "1" : "0");
    form.set("app_x_handle", payload.app_x_handle);
    if (payload.app_video_url) form.set("app_video_url", payload.app_video_url);
    form.set("launch_date", payload.launch_date);
    form.set("launch_time", payload.launch_time);
    if (payload.user_id) form.set("user_id", payload.user_id);
  } else {
    form = await req.formData().catch(() => null);
  }

  if (!form) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const requiredKeys = [
    "app_name",
    "app_link",
    "ticker_name",
    "launch_date",
    "launch_time",
  ] as const;

  if (!requireFormString(form, "app_name")) {
    const fallbackName = requireFormString(form, "ticker_name");
    if (fallbackName) form.set("app_name", fallbackName);
  }

  if (!requireFormString(form, "user_id") && userId) {
    form.set("user_id", userId);
  }

  const rawHandle = requireFormString(form, "app_x_handle") ?? "";
  const normalizedHandle = rawHandle.startsWith("@")
    ? rawHandle.slice(1)
    : rawHandle;
  if (normalizedHandle) {
    form.set("app_x_handle", normalizedHandle);
  }
  form.set(
    "is_x_connected",
    normalizedHandle
      ? "1"
      : normalizeBoolean01(requireFormString(form, "is_x_connected")),
  );

  const missing = requiredKeys
    .filter((k) => !requireFormString(form, k))
    .filter((k) => k !== "app_name"); // app_name gets defaulted above when possible
  if (missing.length) {
    return NextResponse.json(
      { error: "Missing required fields", missing },
      { status: 400 },
    );
  }

  const logo = form.get("app_logo");
  if (!(logo instanceof Blob)) {
    return NextResponse.json({ error: "Missing app_logo" }, { status: 400 });
  }

  if (!requireFormString(form, "user_id")) {
    return NextResponse.json(
      { error: "Missing required fields", missing: ["user_id"] },
      { status: 400 },
    );
  }

  const backendBaseUrl = getBackendBaseUrl();
  const backendRes = await fetch(`${backendBaseUrl}/new_app`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "x-requested-with": "XMLHttpRequest",
    },
    body: form,
    cache: "no-store",
  }).catch((err) => {
    console.error("new_app backend fetch failed:", err);
    return null;
  });

  if (!backendRes) {
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 },
    );
  }

  const backendContentType = backendRes.headers.get("content-type") ?? "";
  if (backendContentType.includes("text/html")) {
    return NextResponse.json(
      { error: "Unauthorized", details: "Backend returned HTML response" },
      { status: 401 },
    );
  }

  const text = await backendRes.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {
  }

  if (!backendRes.ok) {
    const debugPayload = (() => {
      const entries: Record<string, string> = {};
      form.forEach((value, key) => {
        if (typeof value === "string") {
          entries[key] = value;
          return;
        }
        if (value instanceof Blob) {
          entries[key] = `[file:${value.type || "unknown"}:${value.size}]`;
          return;
        }
        entries[key] = "[unknown]";
      });
      return entries;
    })();
    return NextResponse.json(
      {
        error: "Backend error",
        status: backendRes.status || 500,
        details: data,
        sent: debugPayload,
      },
      { status: backendRes.status || 500 },
    );
  }

  return NextResponse.json(data);
}
