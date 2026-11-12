import { Suspense } from "react";
import XVerifyClient from "./XVerifyClient";

export default function XVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#EC4E02] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/70">Loading...</p>
          </div>
        </div>
      }
    >
      <XVerifyClient />
    </Suspense>
  );
}
