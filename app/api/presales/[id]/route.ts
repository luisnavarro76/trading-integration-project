import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getBackendBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BACKEND_URL ||
    "http://localhost:3001"
  );
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing presale id" }, { status: 400 });
  }

  const backendBaseUrl = getBackendBaseUrl();
  const backendUrl = `${backendBaseUrl}/api/presales/id/${id}`;

  try {
    const backendRes = await fetch(backendUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    }).catch((err) => {
      console.error("presales/[id] backend fetch failed:", err);
      return null;
    });

    if (!backendRes) {
      return NextResponse.json(
        { error: "Failed to reach backend" },
        { status: 502 }
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
        { status: backendRes.status || 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("presales/[id] route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing presale id" }, { status: 400 });
  }

  const backendBaseUrl = getBackendBaseUrl();
  const backendUrl = `${backendBaseUrl}/api/presales/id/${id}/heart`;

  try {
    const body = await req.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const backendRes = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ walletAddress }),
      cache: "no-store",
    }).catch((err) => {
      console.error("presales/[id]/heart backend fetch failed:", err);
      return null;
    });

    if (!backendRes) {
      return NextResponse.json(
        { error: "Failed to reach backend" },
        { status: 502 }
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
        { status: backendRes.status || 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("presales/[id]/heart route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}