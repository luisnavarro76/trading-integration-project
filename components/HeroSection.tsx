"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { WordWithLogoRotate } from "./ui/text-rotate";

// Dynamic imports for shaders to avoid SSR issues
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
  { ssr: false },
);

const Dithering = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
  { ssr: false },
);

export default function HeroSection() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const platforms = useMemo(
    () => [
      { name: "Lovable", logo: "/companylogos/loveable.svg" },
      { name: "v0", logo: "/companylogos/v0.svg" },
      { name: "Bolt", logo: "/companylogos/bolt.svg" },
      { name: "Replit", logo: "/companylogos/replit.svg" },
      { name: "Emergent", logo: "/companylogos/emargent.svg" },
    ],
    [],
  );

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-20 pt-8 pb-4">
      {/* --- HERO ISLAND CONTAINER --- */}
      <div className="relative min-h-[400px] h-[65vh] max-h-[600px] w-full max-w-[1480px] mx-auto rounded-[40px] border border-white/10 bg-[#0F0F10] overflow-hidden flex flex-col justify-center items-center shadow-[0_0_100px_rgba(236,78,2,0.05)]">
        {/* --- BG SHADER EFFECT (Exact from user snippet) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {isLoaded && (
            <>
              <GrainGradient
                className="absolute inset-0 animate-fd-fade-in duration-800"
                colors={["#9c2f05", "#9c2f05", "#7A2A0000"]}
                colorBack="#00000000"
                softness={1}
                intensity={0.9}
                noise={0.5}
                speed={1}
                shape="corners"
                minPixelRatio={1}
                maxPixelCount={1920 * 1080}
              />

              <Dithering
                width={720}
                height={720}
                colorBack="#00000000"
                colorFront="#DF3F00"
                shape="sphere"
                type="4x4"
                scale={0.5}
                size={3}
                speed={0}
                frame={5000 * 120}
                className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
                minPixelRatio={1}
              />
            </>
          )}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        {/* --- CONTENT AREA (Centered & Compact) --- */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 h-full">
          <div className="text-center relative z-20 w-full px-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <div className="relative w-full max-w-[1440px] mx-auto flex items-center justify-center">
                <p
                  className="font-pixelify text-[64px] xs:text-[80px] sm:text-[100px] md:text-[160px] lg:text-[200px] xl:text-[240px] 2xl:text-[280px] font-black tracking-wider leading-none select-none whitespace-nowrap drop-shadow-[0_0_30px_rgba(236,78,2,0.3)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 30%, #EC4E02 60%, #FF8A3C 85%, #EC4E02 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 80px rgba(236, 78, 2, 0.5)",
                  }}
                >
                  VibeFund
                </p>
              </div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 md:mt-8 lg:mt-10 text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-medium tracking-wide max-w-2xl mx-auto"
            >
              Launch your token-powered app on{" "}
              <span className="text-[#EC4E02] font-bold">Base</span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-1.81l-3.79-3.79s-1.1.08-1.81.79Z" />
      <path d="m10 10 3 3" />
      <path d="M7 11c.19-1.2.49-2.23.89-3.11a16 16 0 0 1 1.35-2.45c.75-.74 1.57-1.47 2.46-1.35 1.25.17 2.19 1.51 2.66 2.71a16 16 0 0 1 .6 2.1 16 16 0 0 1-.33 3.73c-.06.39-.5.55-.82.32l-1.13-.82a2 2 0 0 0-2.28-.12l-1.2.71c-.31.18-.3.65.02.82.44.24.48.89.09 1.2l-.77.59a2 2 0 0 1-2.44 0l-.49-.4a.5.5 0 0 0-.82.24c-.17.6-.14 1.38.34 1.97.74.84 2.17.96 3.13.52a16 16 0 0 0 2.25-1.4c.53-.45 1.2-.21 1.62.3l.7.85c.19.22.58.14.65-.15.4-1.59.45-3.22.34-4.66a16 16 0 0 0-1.24-4.8c-.76-1.56-2.48-3.04-4.59-1.39a16 16 0 0 0-2.62 2.63c-.7.88-1.36 2.02-1.7 3.39-.05.19-.34.19-.39 0Z" />
    </svg>
  );
}
