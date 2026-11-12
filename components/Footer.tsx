"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] relative font-poppins pb-10">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[1px]"
        style={{
          background: "linear-gradient(270deg, rgba(59, 59, 59, 0) 0%, #3B3B3B 50%, rgba(59, 59, 59, 0) 100%)"
        }}
      />
      <div className="max-w-[1440px] mx-auto px-6 pt-[24px]">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[16px] leading-[24px] tracking-[0.32px] [font-variant-numeric:lining-nums_proportional-nums]">
          <div className="text-[#949494] font-normal">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Vibefund</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-[32px] text-[#9E9E9E] font-normal">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Private Policy
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="https://x.com/vibefund_ing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-all transform hover:scale-110 ml-2"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
