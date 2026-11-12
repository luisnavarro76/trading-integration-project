"use client";
import Image from "next/image";
import AnimatedGradientBackground from "./Gredient";
import { useState, useEffect, useCallback } from "react";
import { WordWithLogoRotate } from "./ui/text-rotate";
import { MousePointer2, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectCard } from "./VibeDiscoveryCards";

interface BackendPresale {
    _id: string;
    appName: string;
    appLogo?: string | null;
    tickerName: string;
    description?: string;
    totalRaised?: string;
    softCap?: string; // Softcap in USDC (from contract)
    erc20Symbol?: string;
    erc20Name?: string;
    appXHandle?: string;
    isXConnected?: boolean;
    network?: string;
    contributorCount?: number;
    creator?: string;
    contractStartTime?: number;
    endTime?: number;
    isActive?: boolean;
    poolCreated?: boolean;
    finalized?: boolean;
    heartCount?: number;
    heartUsers?: string[];
    presaleStatus?: string;
    [key: string]: any;
  }

interface Project {
    id: string;
    title: string;
    ticker: string;
    description: string;
    category: string;
    platformLogo: string;
    appLogo: string | null;
    status: "Pumping" | "Genesis";
    xHandle?: string;
    isXConnected?: boolean;
    totalRaisedUSDC?: string;
    softcap?: string;
    dailyRaisedUSDC?: string;
    contributorCount?: number;
    creator?: string;
    erc20Name?: string;
    erc20Symbol?: string;
    startTime?: number;
    endTime?: number;
    isActive?: boolean;
    poolCreated?: boolean;
    finalized?: boolean;
    heartCount?: number;
    heartUsers?: string[];
    presaleStatus?: string;
}

export default function HeroSection1() {
  const [url, setUrl] = useState("");
  const [topPresale, setTopPresale] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const platforms = [
    { name: "Replit", logo: "/companylogos/replit.svg" },
    { name: "Lovable", logo: "/companylogos/loveable.svg" },
    { name: "v0", logo: "/companylogos/v0.svg" },
    { name: "Bolt", logo: "/companylogos/bolt.svg" },
    { name: "Emergent", logo: "/companylogos/emargent.svg" },
  ];

  // Format USDC amount (divide by 1e6 since USDC has 6 decimals)
  const formatUSDC = (weiString: string | undefined): string => {
    if (!weiString) return "0";
    try {
      const wei = BigInt(weiString);
      const usdc = Number(wei) / 1e6;
      return usdc.toFixed(2);
    } catch {
      return "0";
    }
  };

  const fetchTopPresale = useCallback(async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const res = await fetch(`${backendUrl}/api/presales`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch presales: ${res.status}`);
      const data = await res.json();
      const presales: BackendPresale[] = data?.data || [];

      const mapped: Project[] = presales.map((presale) => {
        let logo: string | null = null;
        if (presale.appLogo) {
          if (presale.appLogo.startsWith("http")) {
            logo = presale.appLogo;
          } else {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
            const logoPath = presale.appLogo.startsWith("/") ? presale.appLogo : `/${presale.appLogo}`;
            logo = `${backendUrl}${logoPath}`;
          }
        }

        const totalRaisedUSDC = formatUSDC(presale.totalRaised);
        const softcap = presale.softCap || "3000"; // Get from contract, fallback to "3000"
        const dailyRaisedUSDC = "1000";

        return {
          id: presale._id,
          title: presale.appName || "Unknown",
          ticker: presale.tickerName || presale.erc20Symbol || "APP",
          description: presale.description || "",
          category: presale.network || "Utility",
          platformLogo: "",
          appLogo: logo,
          status: "Pumping" as const,
          xHandle: presale.appXHandle,
          isXConnected: presale.isXConnected || false,
          totalRaisedUSDC,
          softcap,
          dailyRaisedUSDC,
          contributorCount: presale.contributorCount || 0,
          creator: presale.creator,
          erc20Name: presale.erc20Name,
          erc20Symbol: presale.erc20Symbol,
          startTime: presale.contractStartTime,
          endTime: presale.endTime,
          isActive: presale.isActive,
          poolCreated: presale.poolCreated,
          finalized: presale.finalized,
          heartCount: presale.heartCount || 0,
          heartUsers: presale.heartUsers || [],
          presaleStatus: presale.presaleStatus || "Unknown",
        };
      });

      const now = Math.floor(Date.now() / 1000);
      const fundingPresales = mapped.filter((p) => {
        if (!p.startTime || !p.endTime) return false;
        return p.startTime < now && p.endTime > now;
      });

      const sortedByRaised = (presales: Project[]) => {
        return [...presales].sort((a, b) => {
          const aRaised = parseFloat(a.totalRaisedUSDC || "0");
          const bRaised = parseFloat(b.totalRaisedUSDC || "0");
          return bRaised - aRaised;
        });
      };

      const top = fundingPresales.length > 0
        ? sortedByRaised(fundingPresales)[0]
        : sortedByRaised(mapped)[0];

      setTopPresale(top || null);
    } catch (error) {
      console.error("Error fetching top presale:", error);
      setTopPresale(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopPresale();
    const interval = setInterval(fetchTopPresale, 60000);
    return () => clearInterval(interval);
  }, [fetchTopPresale]);

  return (
    <section className="relative w-full overflow-hidden pt-[50px] sm:pt-[60px] pb-[60px] sm:pb-[80px] lg:pb-[105px]">
      {/* Background gradient */}
      <AnimatedGradientBackground
        Breathing={false}
        startingGap={130}
        gradientShape="ellipse"
        gradientColors={[
          "#050505",
          "#050505",
          "#f5650c45",
          "#05050500",
          "#05050500",
        ]}
        gradientStops={[0, 40, 55, 75, 100]}
        positionX={50}
        positionY={120}
        containerClassName="-z-20"
      />

      {/* Globe behind cards */}
      <div className="pointer-events-none absolute inset-x-0 top-[20%] sm:top-[22%] lg:top-[31%] z-0 flex justify-center">
        <div className="relative aspect-square w-[200px] sm:w-[250px] lg:w-[400px] xl:w-[450px] mix-blend-screen">
          <Image
            src="/globew.svg"
            alt="Glowing globe"
            fill
            sizes="500px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Floating side platform logos (desktop) */}
      <div className="pointer-events-none absolute inset-0 -z-0 hidden xl:block">
        {/* Lovable - Top Left */}
        <div className="absolute left-[5%] top-[15%] animate-physics-float-1">
          <div className="flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-xl px-3 py-2 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(255,255,255,0.2)] hover:scale-110">
            <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden bg-white">
              {" "}
              <Image
                src="/companylogos/loveable.svg"
                alt="Lovable"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-sm font-medium text-white/90">Lovable</span>
          </div>
        </div>

        {/* Cursor for Lovable - Red/Pink/Purple gradient */}
        <div className="absolute left-[5.8%] top-[12.5%] animate-cursor-wiggle-1">
          <MousePointer2 className="h-5 w-5 text-[#FF1744] fill-[#FF1744] drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]" />
        </div>

        {/* Emergent - Mid Left */}
        <div className="absolute left-[9%] top-[33%] animate-physics-float-2">
          <div className="flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-xl px-3 py-2 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(255,255,255,0.2)] hover:scale-110">
            <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden bg-white">
              <Image
                src="/companylogos/emargent.svg"
                alt="Emergent"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-sm font-medium text-white/90">Emergent</span>
          </div>
        </div>

        {/* Cursor for Emergent - Whitish gray */}
        <div className="absolute left-[12%] top-[36%] animate-cursor-wiggle-2">
          <MousePointer2 className="h-5 w-5 text-gray-300 fill-gray-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
        </div>

        {/* Replit - Top Right */}
        <div className="absolute right-[5%] top-[12%] animate-physics-float-3">
          <div className="flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-xl px-3 py-2 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(255,255,255,0.2)] hover:scale-110">
            <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden bg-white">
              <Image
                src="/companylogos/replit.svg"
                alt="Replit"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-sm font-medium text-white/90">Replit</span>
          </div>
        </div>

        {/* Cursor for Replit - Orange */}
        <div className="absolute right-[4.4%] top-[15.9%] animate-cursor-wiggle-1-delay">
          <MousePointer2 className="h-5 w-5 text-orange-500 fill-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
        </div>

        {/* v0 - Mid Right */}
        <div className="absolute right-[16%] top-[20%] animate-physics-float-4">
          <div className="flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-xl px-3 py-2 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(255,255,255,0.2)] hover:scale-110">
            <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden bg-white">
              <Image
                src="/companylogos/v0.svg"
                alt="v0"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-sm font-medium text-white/90">v0</span>
          </div>
        </div>

        {/* Cursor for v0 - Whitish gray */}
        <div className="absolute right-[16%] top-[23.5%] animate-cursor-wiggle-3">
          <MousePointer2 className="h-5 w-5 text-gray-300 fill-gray-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
        </div>

        {/* Bolt - Bottom Right */}
        <div className="absolute right-[13.5%] top-[32%] animate-physics-float-5">
          <div className="flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-xl px-3 py-2 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(255,255,255,0.2)] hover:scale-110">
            <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden bg-white">
              <Image
                src="/companylogos/bolt.svg"
                alt="Bolt"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-sm font-medium text-white/90">Bolt</span>
          </div>
        </div>

        {/* Cursor for Bolt - Whitish gray */}
        <div className="absolute right-[13%] top-[36%] animate-cursor-wiggle-2-delay">
          <MousePointer2 className="h-5 w-5 text-gray-300 fill-gray-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Top banner */}
        <div className="mb-1 sm:mb-1 flex items-center max-w-[95vw] sm:max-w-[90vw] mx-auto rounded-full border border-white/10 bg-[#111]/80 px-2.5 py-1 sm:px-4 sm:py-1.5 text-[8px] xs:text-[9px] sm:text-[11px] font-medium text-white/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="shrink-0 mr-1.5 sm:mr-2 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF2D55] shadow-[0_0_8px_rgba(255,45,85,1)]" />
          <span className="tracking-wide text-center truncate sm:whitespace-normal">
            Turn your AI vibecoded projects into investable tokens and raise
            capital instantly.
          </span>
        </div>

        {/* Heading */}
        <div className="text-center relative z-20 w-full px-2 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h1 className="text-center text-white">
            <span
              className="block drop-shadow-2xl text-[28px] leading-[36px] xs:text-[32px] xs:leading-[40px] sm:text-[40px] sm:leading-[50px] md:text-[48px] md:leading-[60px] lg:text-[56px] lg:leading-[68px] tracking-normal font-semibold"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <span className="font-pixelify">L</span>aunch.{" "}
              <span className="font-pixelify">T</span>okenize.{" "}
              <span className="font-pixelify">F</span>und{" "}
              <span className="font-pixelify">Y</span>our
            </span>
            <span
              className="block text-white/90 text-[28px] leading-[36px] xs:text-[32px] xs:leading-[40px] sm:text-[40px] sm:leading-[50px] md:text-[48px] md:leading-[60px] lg:text-[56px] lg:leading-[68px] tracking-[0.8px] font-semibold"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <span className="font-pixelify">V</span>ibecoded{" "}
              <span className="font-pixelify">A</span>pp{" "}
              <span className="font-pixelify">B</span>uilt{" "}
              <span className="font-pixelify">O</span>n
            </span>
            <span
              className="flex items-center justify-center text-[28px] leading-[36px] xs:text-[32px] xs:leading-[40px] sm:text-[40px] sm:leading-[50px] md:text-[48px] md:leading-[60px] lg:text-[56px] lg:leading-[68px]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <WordWithLogoRotate items={platforms} />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-5 md:mt-6 max-w-2xl mx-auto text-center text-[11px] xs:text-xs sm:text-sm lg:text-base text-white/80 font-light leading-[1.6] px-2 sm:px-4">
            Import your app from Lovable, Cursor, Replit, Bolt, or any
            vibecoding platform.
            <br className="hidden sm:block" />
            Mint a token. Share it. Grow your community. Fund your roadmap.
          </p>
        </div>

        {/* Cards row - The "Glass Window" Container */}
        <div className="mt-6 sm:mt-10 md:mt-12 lg:mt-16 w-full mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          {/* Flex container for the two main blocks */}
          <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* LEFT BLOCK: Semi-transparent glass container holding 'Top of Hill' and 'Fund App' */}
            {/* The user called this the "Glass effect" in the screenshot */}
            <div className="w-full xl:flex-1 rounded-[12px] lg:rounded-[12px] border border-white/10 bg-white/[0.03] backdrop-blur-[40px] p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-full relative z-10">
                {/* 1. Top of the hill Card */}
                <div className="w-full lg:w-auto lg:shrink-0">
                  <div className="h-full flex flex-col relative overflow-hidden group transition-all duration-500">
                    <div className="relative flex items-center justify-between z-10 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#f0f0f0]">
                        <Crown className="text-[#FFB347] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:text-3xl" />
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                          Top of the hill this week
                        </span>
                      </div>
                    </div>

                    {/* Top Presale Card */}
                    {isLoading ? (
                      <div className="relative w-full max-w-[480px] h-[450px] xs:h-[480px] sm:h-[500px] md:h-[520px] lg:h-[540px] flex items-center justify-center">
                        <div className="text-white/40 text-sm">Loading top presale...</div>
                      </div>
                    ) : topPresale ? (
                      <div className="relative w-full max-w-[480px]">
                        <ProjectCard project={topPresale} index={0} activeTab="Funding" />
                      </div>
                    ) : (
                      <div className="relative w-full max-w-[480px] h-[450px] xs:h-[480px] sm:h-[500px] md:h-[520px] lg:h-[540px] flex items-center justify-center">
                        <div className="text-white/40 text-sm">No presales available</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CARD 2: Fund your app - Flexible width with orange border */}
                <div className="w-full xl:flex-1 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] border-[6px] sm:border-[8px] md:border-[10px] border-[#EC4E02] bg-[#0A0A0A] backdrop-blur-[120px] shadow-[0_0_40px_rgba(236,78,2,0.3)] relative overflow-hidden">
                  <div className="relative h-full flex flex-col px-3 py-3 xs:px-4 xs:py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-4 items-center text-center">
                    {/* Top Glow Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A0A] to-transparent shadow-[0_0_20px_rgba(255,90,10,1)] opacity-70"></div>

                    <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white mb-3 sm:mb-4 md:mb-6 lg:mb-10 tracking-tight">
                      Fund your vibecoded app in seconds
                    </h2>

                    {/* Input Field Mockup */}
                    <div className="w-full relative group mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF5A0A] to-[#fb923c] rounded-xl opacity-25 blur-lg group-hover:opacity-40 transition duration-500"></div>
                      <div className="relative flex items-center w-full h-10 xs:h-11 sm:h-12 md:h-13 lg:h-14 rounded-lg sm:rounded-xl border border-[#FF5A0A]/50 bg-[#0A0A0A] px-1 transition-all focus-within:border-[#FF5A0A] focus-within:shadow-[0_0_30px_rgba(255,90,10,0.15)] overflow-hidden">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="Https://www.Replit.Myproject..."
                          className="w-full h-full bg-transparent px-2 xs:px-3 sm:px-4 md:px-5 text-[#ccc] placeholder:text-[#555] font-mono text-[10px] xs:text-[11px] sm:text-xs md:text-sm focus:outline-none tracking-tight"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = url.trim();
                        router.push(
                          trimmed
                            ? `/launch-app?appUrl=${encodeURIComponent(trimmed)}`
                            : "/launch-app",
                        );
                      }}
                      className="h-9 xs:h-10 sm:h-11 md:h-12 px-4 xs:px-5 sm:px-6 md:px-8 rounded-[10px] sm:rounded-[12px] bg-gradient-to-b from-[#EC4E02] to-[#862C01]/80 text-[11px] xs:text-xs sm:text-sm font-bold text-white transition-all border-t border-white/20 uppercase tracking-wide mb-4"
                    >
                      Create A Token
                    </button>

                    <div className="flex flex-wrap items-center py-1.5 sm:py-2 justify-center">
                      {[
                        "/companylogos/loveable.svg",
                        "/companylogos/v0.svg",
                        "/companylogos/bolt.svg",
                        "/companylogos/replit.svg",
                        "/companylogos/emargent.svg",
                      ].map((src, i) => (
                        <div
                          key={src}
                          className="relative flex h-8 w-9 xs:h-9 xs:w-10 sm:h-9 sm:w-10 items-center justify-center rounded-full shadow-lg group/icon"
                          style={{ zIndex: 5 - i }}
                        >
                          <Image
                            src={src}
                            alt="Tool logo"
                            fill
                            className="rounded-full object-contain transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-[18px] leading-relaxed text-[#929191]">
                      Import Your Creations Or Prompts From Your Favorite Tools
                      Like{" "}
                      <span className="text-white/90 font-semibold">
                        Lovable, Bolt, Replit, Emergent Etc.
                      </span>{" "}
                      Tokenise And Start Earning.
                    </p>

                    <div className="mt-auto w-full flex flex-col xs:flex-row items-center justify-center text-[16px] xs:text-[16px] text-[#9C9A9A] font-medium tracking-wide gap-1 xs:gap-0">
                      <span>
                        Updated in{" "}
                        <span className="text-white font-semibold">
                          real-time
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT BLOCK: App Preview Card - Separate */}
            <div className="w-full xl:w-[28%] h-[280px] xs:h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-auto">
              <div className="h-full flex flex-col rounded-[12px] lg:rounded-[12px] border border-white/10 bg-white/[0.02] backdrop-blur-[40px] transition-colors">
                <div className="h-full w-full rounded-[12px] lg:rounded-[12px] border border-white/10 bg-white/[0.02] backdrop-blur-[40px] p-2.5 xs:p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col">
                  <h3 className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-white mb-2 xs:mb-3 sm:mb-4 lg:mb-5 pl-1">
                    <span className="font-pixelify">A</span>pp preview
                  </h3>

                  <div className="flex-1 w-full rounded-[10px] sm:rounded-[12px] border border-[#FF5A0A] bg-[#050505] relative overflow-hidden flex items-center justify-center group cursor-pointer transition-all">
                    {url ? (
                      <div className="relative w-full h-full">
                        {/* Close Button or indicator could go here, but for now simple preview */}
                        <iframe
                          src={url}
                          className="w-full h-full border-none"
                          title="App Preview"
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Inner Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF5A0A]/5 to-transparent opacity-60"></div>
                        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:shadow-[inset_0_0_50px_rgba(255,90,10,0.2)]"></div>

                        <span className="relative z-10 text-[10px] xs:text-[11px] sm:text-[13px] text-white/30 font-medium tracking-wide group-hover:text-white/60 transition-colors animate-pulse text-center px-3 xs:px-4">
                          Paste Your App Link To Preview ...
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}