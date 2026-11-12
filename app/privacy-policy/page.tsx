import type { Metadata } from "next";
import { HomeChatHeader } from "@/components/HomeChatHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Vibefund",
  description: "Privacy policy for Vibefund.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <main className="flex-1 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[168px] py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-[40px] p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#EC4E02]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-[140px]" />

          <div className="relative max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 border border-white/10">
              Legal
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
              Vibefund helps creators fund and launch vibecoded applications by
              listing projects, collecting launch details, and enabling wallet
              based sign-in. This policy explains what we collect and how we
              use it.
            </p>

            <div className="mt-10 space-y-8">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">What we collect</h2>
                <ul className="text-sm text-white/60 space-y-2 list-disc pl-5">
                  <li>
                    Wallet identifiers (e.g. your public wallet address) when
                    you connect a wallet.
                  </li>
                  <li>
                    Project submission details you provide (app name, link,
                    description, logo, X handle, video URL, and launch
                    schedule).
                  </li>
                  <li>
                    Basic usage and technical data needed to operate the site
                    (request logs, device/browser info, and error reports).
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">Cookies</h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  We may store an authentication token in a secure, HTTP-only
                  cookie to keep you signed in to the Vibefund backend. Your
                  user id may also be stored in a readable cookie to support
                  authenticated submissions.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">
                  Third-party services
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Vibefund integrates wallet authentication providers (such as
                  Privy) and a backend API to process sign-in and project
                  submissions. These providers may collect data as described in
                  their own policies.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">Contact</h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  If you have privacy questions, contact the Vibefund team via
                  the official site.
                </p>
              </section>

              <div className="pt-6 border-t border-white/10 text-xs text-white/40">
                Last updated: {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
