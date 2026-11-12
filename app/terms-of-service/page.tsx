import type { Metadata } from "next";
import { HomeChatHeader } from "@/components/HomeChatHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Vibefund",
  description: "Terms of service for Vibefund.",
};

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
              Vibefund is a platform to list, discover, and fund vibecoded
              applications. By using the site, you agree to these terms.
            </p>

            <div className="mt-10 space-y-8">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">Your account</h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  You may connect a wallet to authenticate. You are responsible
                  for maintaining control of your wallet and any actions taken
                  while authenticated.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">
                  Project submissions
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  When you submit a project (app link, token ticker, media,
                  description, and launch schedule), you represent that you have
                  the rights to share that content and to tokenize or fundraise
                  for the project, as applicable.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">
                  No financial advice
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Vibefund provides discovery and tooling. Nothing on the site
                  is investment, legal, or tax advice. You are solely
                  responsible for your decisions and compliance with laws that
                  apply to you.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">Acceptable use</h2>
                <ul className="text-sm text-white/60 space-y-2 list-disc pl-5">
                  <li>No unlawful, harmful, or abusive content.</li>
                  <li>No attempts to disrupt or exploit the platform.</li>
                  <li>No impersonation or misrepresentation of ownership.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white">Contact</h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Questions about these terms can be directed to the Vibefund
                  team via the official site.
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
