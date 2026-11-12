"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Globe,
  Timer,
  Rocket,
  ExternalLink,
  Share2,
  Clock,
  Flame,
  Moon,
  Twitter,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UpcomingStage } from "@/components/app-stages/UpcomingStage";
import { PumpingStage } from "@/components/app-stages/PumpingStage";
import { MoonStage } from "@/components/app-stages/MoonStage";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

// Helper to get cookie value

interface ApiAppLogo {
  original?: string;
  "100px"?: string;
  "128px"?: string;
  "256px"?: string;
  "512px"?: string;
}

interface ApiAppDetails {
  id?: string;
  app_name?: string;
  app_slug?: string;
  app_link?: string;
  app_logo?: ApiAppLogo | null;
  ticker_name?: string;
  is_x_connected?: boolean;
  app_x_handle?: string;
  description?: string;
  app_platform?: string;
  app_platform_logo?: string;
  user?: { id?: string; name?: string };
  stage?: "Upcoming" | "Pumping" | "Moon";
  stage_no?: 1 | 2 | 3;
  launch_date?: string | null;
  launch_time?: string | null;
  launch_date_time?: string | null;
  launch_date_time_iso?: string | null;
  funding_goal?: string | null;
  funding_goal_formatted?: string | null;
  received_funding?: string | null;
  received_funding_formatted?: string | null;
  funding_start_date?: string | null;
  funding_start_date_iso?: string | null;
  funding_end_date?: string | null;
  funding_end_date_iso?: string | null;
  funded_users_count?: number | null;
  funding_status?: string | null;
}

type Props = { appId: string };

export default function AppDetailsClient({ appId }: Props) {
  const [data, setData] = useState<ApiAppDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { authenticated, ready, login } = usePrivy();
  const { wallets } = useWallets();
  const walletAddress = wallets[0]?.address || null;

  // Require connected wallet (Privy)
  useEffect(() => {
    if (!ready || authenticated) return;
    login();
  }, [ready, authenticated, login]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `/api/app_details?app_id=${appId}`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load app (${res.status})`);
        const json = await res.json();
        if (isMounted) setData(json?.data ?? null);
      } catch {
        if (isMounted) setError("Unable to load app details.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [appId]);

  const logo = useMemo(() => {
    return (
      data?.app_logo?.["512px"] ??
      data?.app_logo?.["256px"] ??
      data?.app_logo?.original ??
      null
    );
  }, [data]);

  const stageColor =
    data?.stage === "Upcoming"
      ? "#EC4E02"
      : data?.stage === "Pumping"
        ? "#EC4E02"
        : "#FBBF24";

  if (isLoading && !data) {
    return (
      <main className="flex-1 relative overflow-hidden pb-16 min-h-screen bg-[#050505]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[800px] w-[800px] bg-[#EC4E02]/5 blur-[160px] rounded-full opacity-20" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[800px] w-[800px] bg-[#EC4E02]/5 blur-[160px] rounded-full opacity-10" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12 pt-28 pb-12">
          <div className="h-4 w-32 bg-white/5 rounded-full mb-8 animate-pulse" />

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div className="space-y-12 lg:max-w-[900px] w-full">
              {/* Profile Skeleton */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-12 space-y-10">
                <div className="flex gap-12">
                  <div className="h-40 w-40 rounded-[24px] bg-white/5 animate-pulse" />
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="h-5 w-1/2 bg-white/5 rounded-full animate-pulse" />
                    <div className="h-14 w-3/4 bg-white/5 rounded-xl animate-pulse" />
                    <div className="flex gap-4">
                      <div className="h-10 w-24 bg-white/5 rounded-full animate-pulse" />
                      <div className="h-10 w-36 bg-white/5 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Skeleton */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8">
                <div className="h-4 w-40 bg-white/5 rounded-full mb-8 animate-pulse" />
                <div className="w-full aspect-[16/9] rounded-xl bg-white/5 animate-pulse" />
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8 h-[500px]">
              <div className="flex justify-between mb-8">
                <div className="h-4 w-24 bg-white/5 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-white/5 rounded-xl animate-pulse" />
              </div>
              <div className="space-y-6">
                <div className="h-24 w-full bg-white/5 rounded-2xl animate-pulse" />
                <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
                <div className="h-16 w-full bg-white/5 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 relative pb-16 min-h-screen bg-[#050505] text-white">
        {/* Background Gradients (Homepage Style) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] h-[800px] w-[800px] bg-[#EC4E02]/10 blur-[160px] rounded-full opacity-30" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[800px] w-[800px] bg-[#EC4E02]/10 blur-[160px] rounded-full opacity-20" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-full bg-gradient-to-b from-white/[0.02] via-transparent to-transparent opacity-50" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12 pt-12 pb-12">
          {/* Breadcrumb Area */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-[10px] font-black text-white/40 hover:text-[#EC4E02] transition-all group"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-xl border border-white/5 bg-white/5 group-hover:bg-[#EC4E02]/10 group-hover:border-[#EC4E02]/20 transition-all">
                <ArrowLeft className="h-3.5 w-3.5" />
              </div>
              <span className="uppercase tracking-[0.4em]">Directory / {data?.ticker_name}</span>
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Left Side: Details */}
            <div className="space-y-12 lg:max-w-[900px] w-full">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[60px] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-[#EC4E02]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#EC4E02]/3 blur-[80px] translate-x-1/4 translate-y-1/4" />

                <div className="relative flex flex-col md:flex-row gap-12 items-center md:items-start text-left">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative h-40 w-40 shrink-0 rounded-[28px] overflow-hidden border border-white/10 bg-black shadow-2xl p-1"
                  >
                    {logo ? (
                      <Image
                        src={logo}
                        alt={data?.app_name ?? "App"}
                        fill
                        className="object-cover rounded-[24px]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white/5">
                        {data?.ticker_name?.[0] ?? "V"}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </motion.div>

                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col gap-2 items-start">
                      <div className="flex items-center gap-5">
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white leading-none">
                          {data?.app_name ?? "..."}
                        </h1>
                        <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">
                          {data?.app_platform}
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mt-2">
                        <div
                          className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse shadow-[0_0_15px_-5px_var(--stage-color)]"
                          style={{
                            borderColor: `${stageColor}44`,
                            backgroundColor: `${stageColor}15`,
                            color: stageColor,
                            // @ts-ignore
                            "--stage-color": stageColor
                          }}
                        >
                          {data?.stage === "Upcoming" && <Clock className="h-3.5 w-3.5" />}
                          {data?.stage === "Pumping" && <Flame className="h-3.5 w-3.5" />}
                          {data?.stage === "Moon" && <Moon className="h-3.5 w-3.5" />}
                          {data?.stage ?? "Loading"}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-[#EC4E02] text-2xl">$</span>
                          <span className="font-black text-3xl tracking-tight text-white">{data?.ticker_name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/5 w-full">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-0.5">
                          <Image src="/user.svg" alt="" width={24} height={24} className="rounded-full" />
                        </div>
                        <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                          Operator: <span className="text-white/80">{data?.user?.name || "Anonymous"}</span>
                        </span>
                      </div>

                      {data?.is_x_connected && (
                        <a
                          href={`https://x.com/${data.app_x_handle}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2.5 text-[11px] font-bold text-[#1DA1F2] hover:opacity-80 transition-opacity uppercase tracking-widest"
                        >
                          <Twitter className="h-4 w-4" />
                          <span>@{data.app_x_handle}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Website Preview Section */}
              {data?.app_link && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                      Live Simulation Environment
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <div className="relative group/iframe rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[60px] overflow-hidden shadow-2xl">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <iframe
                        src={data.app_link}
                        className="w-full h-full scrollbar-hide"
                        title={`${data.app_name} Preview`}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-8 z-20">
                        <Button
                          asChild
                          className="px-12 py-8 bg-[#EC4E02] text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_50px_-10px_rgba(236,78,2,0.6)] hover:bg-[#FF5A0A] hover:scale-105 transition-all border-none"
                        >
                          <a href={data.app_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5 mr-1" />
                            Access Application
                          </a>
                        </Button>
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.6em]">Secure Terminal Protocol</p>
                          <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#EC4E02]"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between px-6 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#EC4E02] animate-pulse shadow-[0_0_10px_#EC4E02]" />
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Environment Link Active</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/15 truncate w-1/2 text-right">{data.app_link}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Redesigned Description Accordion */}
              <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[60px] overflow-hidden transition-all duration-500 shadow-2xl group/desc hover:border-[#EC4E02]/30">
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="w-full flex items-center justify-between p-8 hover:bg-white/[0.02] transition-colors group/acc"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-[#EC4E02] shadow-[0_0_10px_#EC4E02]" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Introduction</h2>
                  </div>
                  <div className={`p-2 rounded-xl bg-white/5 border border-white/10 group-hover/acc:border-[#EC4E02]/30 transition-all ${isDescriptionExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-5 w-5 text-white/40 group-hover/acc:text-[#EC4E02] transition-colors" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isDescriptionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-10 pb-10 pt-2 border-t border-white/5 bg-black/20">
                        <div
                          className="prose prose-invert prose-sm max-w-none text-white/70 leading-[1.8] font-medium selection:bg-[#EC4E02]/30 prose-p:mb-4"
                          dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Sidebar */}
            <div className="relative z-20 h-full">
              <div className="sticky top-[112px]">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[60px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EC4E02]/3 to-transparent pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full -mr-32 -mt-32 opacity-20"
                    style={{ backgroundColor: `${stageColor}` }}
                  />
                  <AnimatePresence mode="wait">
                    {data?.stage === "Upcoming" && data?.launch_date_time_iso && (
                      <UpcomingStage
                        launchDateTimeIso={data.launch_date_time_iso}
                        launchDate={data.launch_date ?? undefined}
                        launchTime={data.launch_time ?? undefined}
                      />
                    )}
                    {data?.stage === "Pumping" && (
                      <PumpingStage
                        fundingGoal={data.funding_goal}
                        fundingGoalFormatted={data.funding_goal_formatted}
                        receivedFunding={data.received_funding}
                        receivedFundingFormatted={data.received_funding_formatted}
                        fundingEndDateIso={data.funding_end_date_iso}
                        fundedUsersCount={data.funded_users_count}
                        fundingStatus={data.funding_status}
                        walletAddress={walletAddress}
                        authenticated={authenticated}
                      />
                    )}
                    {data?.stage === "Moon" && (
                      <MoonStage
                        fundingGoalFormatted={data.funding_goal_formatted}
                        receivedFundingFormatted={data.received_funding_formatted}
                        fundedUsersCount={data.funded_users_count}
                        fundingStatus={data.funding_status}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}