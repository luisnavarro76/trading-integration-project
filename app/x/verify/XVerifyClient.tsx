"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function XVerifyClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const usernameParam = searchParams.get("username");
    const userId = searchParams.get("user_id");
    const sessionToken = searchParams.get("session_token");
    const pictureUrl = searchParams.get("picture_url");

    if (!usernameParam) {
      setStatus("error");
      return;
    }

    // Store the X handle in cookies so the parent window can detect it
    const handle = usernameParam.startsWith("@")
      ? usernameParam
      : `@${usernameParam}`;
    setUsername(handle);

    // Set cookies with 7 day expiry
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    const cookieOptions = `; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    document.cookie = `vibefund_x_handle=${encodeURIComponent(handle)}${cookieOptions}`;
    document.cookie = `x_handle=${encodeURIComponent(handle)}${cookieOptions}`;
    document.cookie = `vibefund_x_connected=1${cookieOptions}`;
    document.cookie = `x_connected=1${cookieOptions}`;

    if (pictureUrl) {
      document.cookie = `vibefund_x_picture=${encodeURIComponent(pictureUrl)}${cookieOptions}`;
    }

    if (sessionToken) {
      document.cookie = `vibefund_x_session_token=${encodeURIComponent(sessionToken)}${cookieOptions}`;
    }

    if (userId) {
      document.cookie = `vibefund_user_id=${encodeURIComponent(userId)}${cookieOptions}`;
    }

    setStatus("success");

    // Use localStorage to communicate with parent window
    // This works even when window.opener is null due to cross-origin navigation
    try {
      localStorage.setItem(
        "vibefund_x_connected_data",
        JSON.stringify({
          handle,
          pictureUrl: pictureUrl || "",
          userId: userId || "",
          timestamp: Date.now(),
        }),
      );
    } catch {
      // Ignore localStorage errors
    }

    // Also try postMessage as backup
    if (window.opener) {
      try {
        window.opener.postMessage(
          {
            type: "VIBEFUND_X_CONNECTED",
            payload: {
              handle,
              pictureUrl: pictureUrl || "",
              userId: userId || "",
            },
          },
          "*", // Use wildcard since origin might differ after OAuth redirect
        );
      } catch {
        // Ignore cross-origin errors
      }
    }

    // Close the popup after a short delay to ensure data is saved
    const timer = setTimeout(() => {
      window.close();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-white/70">Failed to connect X account</p>
          <p className="text-white/50 text-sm">Missing required parameters.</p>
          <button
            onClick={() => window.close()}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-white font-medium">Connected as {username}</p>
          <p className="text-white/50 text-sm">
            This window will close automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#EC4E02] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white/70">Connecting your X account...</p>
        <p className="text-white/50 text-sm">Please wait...</p>
      </div>
    </div>
  );
}
