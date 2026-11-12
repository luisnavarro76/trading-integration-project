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
  Wallet,
  Copy,
  CheckCircle2,
  XCircle,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UpcomingStage } from "@/components/app-stages/UpcomingStage";
import { PumpingStage } from "@/components/app-stages/PumpingStage";
import { MoonStage } from "@/components/app-stages/MoonStage";
import { SwapInterface } from "@/components/SwapInterface";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { formatWalletAddress } from "@/lib/wallet-privy";
import { toast } from "sonner";
import { ethers } from "ethers";

const formatRelativeTime = (timestamp: number | undefined): string => {
  if (!timestamp) return "N/A";
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;
  const absDiff = Math.abs(diff);

  if (absDiff < 60) return diff > 0 ? "in less than a minute" : "less than a minute ago";
  if (absDiff < 3600) {
    const minutes = Math.floor(absDiff / 60);
    return diff > 0 ? `in ${minutes} minute${minutes > 1 ? "s" : ""}` : `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (absDiff < 86400) {
    const hours = Math.floor(absDiff / 3600);
    return diff > 0 ? `in ${hours} hour${hours > 1 ? "s" : ""}` : `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(absDiff / 86400);
  return diff > 0 ? `in ${days} day${days > 1 ? "s" : ""}` : `${days} day${days > 1 ? "s" : ""} ago`;
};

const formatUnixToISO = (timestamp: number | undefined): string | null => {
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toISOString();
};

interface BackendPresale {
  _id: string;
  appName: string;
  appLogo?: string | null;
  tickerName: string;
  description?: string;
  totalRaised?: string; // BigInt as string
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
  crowdfundAddress?: string;
  launchDate?: string | null;
  launchTime?: string | null;
  appLink?: string;
  presaleStatus?: string;
  softCapReached?: boolean | null;
  pool?: string | null;
  poolLauncherToken?: string | null;
  tokenToPair?: string | null;
  finalized?: boolean;
  [key: string]: any;
}

type Props = { presaleId: string };

export default function PresaleDetailsClient({ presaleId }: Props) {
  const [data, setData] = useState<BackendPresale | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [poolInfo, setPoolInfo] = useState<{
    poolCreated: boolean;
    poolAddress: string | null;
  }>({
    poolCreated: false,
    poolAddress: null,
  });
  const [isLoadingPoolInfo, setIsLoadingPoolInfo] = useState(false);
  const [presaleTokenAddress, setPresaleTokenAddress] = useState<string | null>(null);
  const [isLoadingTokenAddress, setIsLoadingTokenAddress] = useState(false);

  const { authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const walletAddress = wallets[0]?.address || null;

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `/api/presales/${presaleId}`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load presale (${res.status})`);
        const json = await res.json();
        if (isMounted) setData(json?.data ?? null);
      } catch {
        if (isMounted) setError("Unable to load presale details.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [presaleId]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPoolInfo = async () => {
      if (!data?.crowdfundAddress) {
        if (isMounted) {
          setPoolInfo({ poolCreated: false, poolAddress: null });
        }
        return;
      }

      if (isMounted) {
        setIsLoadingPoolInfo(true);
      }
      
      try {
        const rpcUrls = [
          "https://base.llamarpc.com",
          "https://mainnet.base.org",
          "https://1rpc.io/base",
          "https://base-mainnet.g.alchemy.com/v2/demo",
        ];
        
        let provider: ethers.JsonRpcProvider | null = null;
        let lastError: Error | null = null;
        
        for (const url of rpcUrls) {
          try {
            const testProvider = new ethers.JsonRpcProvider(url);
            await testProvider.getBlockNumber();
            provider = testProvider;
            break;
          } catch (err) {
            lastError = err as Error;
            continue;
          }
        }
        
        if (!provider) {
          throw lastError || new Error("All RPC endpoints failed");
        }

        const CROWDFUND_CONTRACT_ABI = [
          "function poolCreated() view returns (bool)",
          "function liquidityPool() view returns (address)",
          "function projectToken() view returns (address)",
        ];

        const contract = new ethers.Contract(
          data.crowdfundAddress,
          CROWDFUND_CONTRACT_ABI,
          provider
        );

        const [poolCreated, poolAddress, tokenAddress] = await Promise.all([
          contract.poolCreated().catch(() => false),
          contract.liquidityPool().catch(() => "0x0000000000000000000000000000000000000000"),
          contract.projectToken().catch(() => "0x0000000000000000000000000000000000000000"),
        ]);

        const poolAddr = poolAddress && poolAddress !== "0x0000000000000000000000000000000000000000" ? poolAddress : null;
        const tokenAddr = tokenAddress && tokenAddress !== "0x0000000000000000000000000000000000000000" ? tokenAddress : null;

        if (isMounted) {
          setPoolInfo({
            poolCreated: poolCreated || false,
            poolAddress: poolAddr,
          });

          setPresaleTokenAddress(tokenAddr);
        }
      } catch (error) {
        console.error("Error fetching pool info:", error);
        if (isMounted) {
          setPoolInfo({ poolCreated: false, poolAddress: null });
        }
      } finally {
        if (isMounted) {
          setIsLoadingPoolInfo(false);
        }
      }
    };

    fetchPoolInfo();
    
    return () => {
      isMounted = false;
    };
  }, [data?.crowdfundAddress]);

  const logo = useMemo(() => {
    if (!data?.appLogo) return null;
    
    if (data.appLogo.startsWith("http")) {
      return data.appLogo;
    }
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
    const logoPath = data.appLogo.startsWith("/") ? data.appLogo : `/${data.appLogo}`;
    return `${backendUrl}${logoPath}`;
  }, [data?.appLogo]);

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

  const stage = useMemo(() => {
    if (!data) return null;
    const now = Math.floor(Date.now() / 1000);
    const startTime = data.contractStartTime || 0;
    const endTime = data.endTime || 0;

    if (startTime > now) {
      return "Upcoming";
    } else if (endTime > now && startTime <= now) {
      return "Pumping";
    } else {
      return "Moon";
    }
  }, [data]);

  const stageColor =
    stage === "Upcoming"
      ? "#EC4E02"
      : stage === "Pumping"
        ? "#EC4E02"
        : "#FBBF24";

  const totalRaisedUSDC = data ? formatUSDC(data.totalRaised) : "0";
  const softcap = "3000";

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };


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
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-12 space-y-10">
                <div className="flex gap-12">
                  <div className="h-40 w-40 rounded-[24px] bg-white/5 animate-pulse" />
                  <div className="flex-1 space-y-6 pt-4">
                    <div className="h-5 w-1/2 bg-white/5 rounded-full animate-pulse" />
                    <div className="h-14 w-3/4 bg-white/5 rounded-xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8 h-[500px]">
              <div className="flex justify-between mb-8">
                <div className="h-4 w-24 bg-white/5 rounded-full animate-pulse" />
              </div>
              <div className="space-y-6">
                <div className="h-24 w-full bg-white/5 rounded-2xl animate-pulse" />
                <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex-1 relative pb-16 min-h-screen bg-[#050505] text-white">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12 pt-28 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Presale Not Found</h1>
            <p className="text-white/60 mb-8">{error || "Unable to load presale details."}</p>
            <Link href="/" className="inline-flex items-center gap-2 text-[#EC4E02] hover:opacity-80">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 relative pb-16 min-h-screen bg-[#050505] text-white">
        {/* Background Gradients */}
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
              <span className="uppercase tracking-[0.4em]">Presales / {data.tickerName}</span>
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
                        alt={data.appName ?? "Presale"}
                        fill
                        unoptimized={true}
                        className="object-cover rounded-[24px]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white/5">
                        {data.tickerName?.[0] ?? "P"}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </motion.div>

                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col gap-2 items-start">
                      <div className="flex items-center gap-5">
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white leading-none">
                          {data.appName ?? "..."}
                        </h1>
                        <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">
                          {data.network || "BASE"}
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mt-2">
                        <div
                          className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse shadow-[0_0_15px_-5px_var(--stage-color)]"
                          style={{
                            borderColor: `${stageColor}44`,
                            backgroundColor: `${stageColor}15`,
                            color: stageColor,
                            "--stage-color": stageColor
                          }}
                        >
                          {stage === "Upcoming" && <Clock className="h-3.5 w-3.5" />}
                          {stage === "Pumping" && <Flame className="h-3.5 w-3.5" />}
                          {stage === "Moon" && <Moon className="h-3.5 w-3.5" />}
                          {stage ?? "Loading"}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-[#EC4E02] text-2xl">$</span>
                          <span className="font-black text-3xl tracking-tight text-white">{data.tickerName || data.erc20Symbol}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/5 w-full">
                      {data.creator && (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-0.5">
                            <Wallet className="h-4 w-4 text-white/40" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                              Creator
                            </span>
                            <button
                              onClick={() => handleCopyAddress(data.creator!)}
                              className="flex items-center gap-2 text-[11px] font-bold text-white/80 hover:text-[#EC4E02] transition-colors font-mono"
                            >
                              {formatWalletAddress(data.creator)}
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}

                      {data.isXConnected && data.appXHandle && (
                        <a
                          href={`https://x.com/${data.appXHandle}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2.5 text-[11px] font-bold text-[#1DA1F2] hover:opacity-80 transition-opacity uppercase tracking-widest"
                        >
                          <Twitter className="h-4 w-4" />
                          <span>@{data.appXHandle}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Presale Information Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[60px] p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Presale Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Token Info */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Token Details</h3>
                    {data.erc20Name && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Token Name</span>
                        <span className="text-sm font-black text-white">{data.erc20Name}</span>
                      </div>
                    )}
                    {data.erc20Symbol && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Token Symbol</span>
                        <span className="text-sm font-black text-white font-mono">{data.erc20Symbol}</span>
                      </div>
                    )}
                    {data.crowdfundAddress && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Contract Address</span>
                        <button
                          onClick={() => handleCopyAddress(data.crowdfundAddress!)}
                          className="flex items-center gap-2 text-sm font-black text-white font-mono hover:text-[#EC4E02] transition-colors"
                        >
                          {formatWalletAddress(data.crowdfundAddress)}
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Status Info */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Status</h3>
                    {data.presaleStatus && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Presale Status</span>
                        <div
                          className={`flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-bold text-white tracking-wider ${
                            data.presaleStatus === "UPCOMING"
                              ? "bg-yellow-500"
                              : data.presaleStatus === "FUNDING"
                              ? "bg-green-500"
                              : data.presaleStatus === "Not Finalized"
                              ? "bg-orange-500"
                              : data.presaleStatus === "Not Reached"
                              ? "bg-red-600"
                              : data.presaleStatus === "Failed"
                              ? "bg-red-500"
                              : data.presaleStatus === "Completed"
                              ? "bg-yellow-400"
                              : "bg-gray-500"
                          }`}
                        >
                          {data.presaleStatus}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Active</span>
                      <div className="flex items-center gap-2">
                        {data.isActive ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-black text-green-500">Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-black text-red-500">Inactive</span>
                          </>
                        )}
                      </div>
                    </div>
                    {data.contributorCount !== undefined && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Contributors</span>
                        <span className="text-sm font-black text-white">{data.contributorCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Timing Info */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Timing</h3>
                    {data.contractStartTime && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Start Time</span>
                        <span className="text-sm font-black text-white font-mono">{formatRelativeTime(data.contractStartTime)}</span>
                      </div>
                    )}
                    {data.endTime && (
                      <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">End Time</span>
                        <span className="text-sm font-black text-white font-mono">{formatRelativeTime(data.endTime)}</span>
                      </div>
                    )}
                    {data.launchDate && data.launchTime && (
                      <>
                        <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Launch Date</span>
                          <span className="text-sm font-black text-white font-mono">{data.launchDate}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Launch Time</span>
                          <span className="text-sm font-black text-white font-mono">{data.launchTime} UTC</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Financial Info */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Financials</h3>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Raised</span>
                      <span className="text-sm font-black text-[#EC4E02]">{totalRaisedUSDC} USDC</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Softcap</span>
                      <span className="text-sm font-black text-white">{softcap} USDC</span>
                    </div>
                  </div>

                  {/* Pool Info - Show when poolCreated is true */}
                  {poolInfo.poolCreated && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-white/10">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Pool Info</h3>
                      {isLoadingPoolInfo ? (
                        <div className="flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <span className="text-xs font-bold text-white/50 uppercase tracking-wider text-center">
                            Loading pool info...
                          </span>
                        </div>
                      ) : poolInfo.poolAddress ? (
                        <>
                          <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Pool Address</span>
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://basescan.org/address/${poolInfo.poolAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-black text-white font-mono hover:text-[#EC4E02] transition-colors"
                              >
                                {formatWalletAddress(poolInfo.poolAddress)}
                              </a>
                              <button
                                onClick={() => handleCopyAddress(poolInfo.poolAddress!)}
                                className="hover:opacity-70 transition-opacity"
                              >
                                <Copy className="h-3 w-3 text-white/60" />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <span className="text-xs font-bold text-white/50 uppercase tracking-wider text-center">
                            Pool address not available
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Swap - Show when poolCreated is true and status is NOT Completed */}
                  {poolInfo.poolCreated && presaleTokenAddress && data?.presaleStatus !== "Completed" && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-white/10">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Swap</h3>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
                        <SwapInterface
                          tokenAddress={presaleTokenAddress}
                          tokenSymbol={data?.erc20Symbol || data?.tickerName || "TOKEN"}
                          authenticated={authenticated}
                          poolCreated={poolInfo.poolCreated}
                          poolAddress={poolInfo.poolAddress}
                          crowdfundAddress={data?.crowdfundAddress || null}
                        />
                      </div>
                    </div>
                  )}

                  {/* Pool Details Link - Show when poolCreated is true and status is Completed */}
                  {poolInfo.poolCreated && poolInfo.poolAddress && data?.presaleStatus === "Completed" && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-white/10">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-4">Pool Info</h3>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
                        <Link
                          href={`/pool/${poolInfo.poolAddress}`}
                          className="inline-flex items-center justify-center w-full h-12 px-6 rounded-xl bg-[#EC4E02] text-white text-sm font-black uppercase tracking-widest hover:bg-[#FF5A0A] transition-all active:scale-95 shadow-lg shadow-[#EC4E02]/10"
                        >
                          Pool Details
                        </Link>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>

              {/* Description Accordion */}
              {data.description && (
                <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[60px] overflow-hidden transition-all duration-500 shadow-2xl group/desc hover:border-[#EC4E02]/30">
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="w-full flex items-center justify-between p-8 hover:bg-white/[0.02] transition-colors group/acc"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-[#EC4E02] shadow-[0_0_10px_#EC4E02]" />
                      <h2 className="text-2xl font-bold text-white tracking-tight">Description</h2>
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
                            dangerouslySetInnerHTML={{ __html: data.description }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
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
                    {stage === "Upcoming" && data.contractStartTime && (
                      <UpcomingStage
                        launchDateTimeIso={formatUnixToISO(data.contractStartTime) || ""}
                        launchDate={data.launchDate || undefined}
                        launchTime={data.launchTime || undefined}
                      />
                    )}
                    {stage === "Pumping" && (
                      <PumpingStage
                        fundingGoal={softcap}
                        fundingGoalFormatted={softcap}
                        receivedFunding={totalRaisedUSDC}
                        receivedFundingFormatted={totalRaisedUSDC}
                        fundingEndDateIso={formatUnixToISO(data.endTime) || null}
                        fundedUsersCount={data.contributorCount || 0}
                        fundingStatus={data.isActive ? "Active" : "Inactive"}
                        walletAddress={walletAddress}
                        authenticated={authenticated}
                        crowdfundAddress={data.crowdfundAddress || null}
                      />
                    )}
                    {stage === "Moon" && data.presaleStatus === "Unknown" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center py-12 px-6 text-center"
                      >
                        <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                          <Clock className="h-8 w-8 text-white/40" />
                        </div>
                        <h3 className="text-sm font-black text-white/60 uppercase tracking-wider mb-2">
                          Status Unknown
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                          Unable to determine presale status. Please check back later.
                        </p>
                      </motion.div>
                    )}
                    {stage === "Moon" && data.presaleStatus !== "Unknown" && (
                      <>
                        <MoonStage
                          fundingGoalFormatted={softcap}
                          receivedFundingFormatted={totalRaisedUSDC}
                          fundedUsersCount={data.contributorCount || 0}
                          fundingStatus={data.isActive ? "Active" : "Ended"}
                          presaleStatus={data.presaleStatus}
                          crowdfundAddress={data.crowdfundAddress || null}
                          softCapReached={data.softCapReached ?? null}
                          presaleId={data._id || null}
                          creator={data.creator || null}
                        />
                        {/* Finalize Button - Only visible to creator when presale has ended */}
                        {walletAddress &&
                          data.creator &&
                          walletAddress.toLowerCase() === data.creator.toLowerCase() && (
                            <FinalizeButton
                              crowdfundAddress={data.crowdfundAddress}
                              authenticated={authenticated}
                              finalized={data.finalized || false}
                              onPoolCreated={() => {
                                setTimeout(() => {
                                  window.location.reload();
                                }, 2000);
                              }}
                            />
                          )}
                      </>
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

function FinalizeButton({
  crowdfundAddress,
  authenticated,
  finalized = false,
  onPoolCreated,
}: {
  crowdfundAddress?: string | null;
  authenticated?: boolean;
  finalized?: boolean;
  onPoolCreated?: () => void;
}) {
  const [isFinalizing, setIsFinalizing] = useState(false);
  const { wallets } = useWallets();

  const PRESALE_CONTRACT_ABI = [
    "function finalize() external",
    "event PoolCreated(address indexed pool, address indexed poolLauncherToken, address indexed tokenToPair)",
  ];

  const handleFinalize = async () => {
    if (!authenticated) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!crowdfundAddress) {
      toast.error("Presale contract address not available");
      return;
    }

    setIsFinalizing(true);
    try {
      const wallet = wallets[0];
      if (!wallet) {
        throw new Error("No wallet connected");
      }

      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const presaleContract = new ethers.Contract(
        crowdfundAddress,
        PRESALE_CONTRACT_ABI,
        signer
      );

      toast.info("Confirm transaction in your wallet...");

      const tx = await presaleContract.finalize({
        gasLimit: 4000000,
      });

      toast.info("Transaction submitted, waiting for confirmation...");

      const receipt = await tx.wait();

      let poolAddress: string | null = null;
      let poolLauncherToken: string | null = null;
      let tokenToPair: string | null = null;

      try {
        const iface = new ethers.Interface(PRESALE_CONTRACT_ABI);
        const poolCreatedEvent = iface.getEvent("PoolCreated");
        if (!poolCreatedEvent) {
          throw new Error("PoolCreated event not found in ABI");
        }
        const eventTopic = poolCreatedEvent.topicHash;

        for (const log of receipt.logs) {
          if (log.topics[0] === eventTopic && log.address.toLowerCase() === crowdfundAddress.toLowerCase()) {
            const decoded = iface.decodeEventLog("PoolCreated", log.data, log.topics);
            poolAddress = decoded.pool;
            poolLauncherToken = decoded.poolLauncherToken;
            tokenToPair = decoded.tokenToPair;
            
            console.log("✅ PoolCreated event found:", {
              pool: poolAddress,
              poolLauncherToken,
              tokenToPair
            });
            break;
          }
        }

        if (poolAddress) {
          toast.success(`Presale finalized successfully! Pool created: ${poolAddress.slice(0, 6)}...${poolAddress.slice(-4)}`);
          
          console.log("Pool Address from event:", poolAddress);
          
          await navigator.clipboard.writeText(poolAddress);
          toast.info("Pool address copied to clipboard!");
        } else {
          toast.success("Presale finalized successfully!");
          console.warn("⚠️ PoolCreated event not found in transaction receipt");
        }
      } catch (parseError) {
        console.error("Error parsing PoolCreated event:", parseError);
        toast.success("Presale finalized successfully! (Could not parse pool address)");
      }

      if (onPoolCreated) {
        onPoolCreated();
      }
    } catch (error: any) {
      console.error("Finalize error:", error);
      if (error.code === 4001) {
        toast.error("Transaction rejected by user");
      } else if (error.message?.includes("revert")) {
        toast.error("Transaction failed: " + (error.reason || error.message));
      } else {
        toast.error("Finalize failed: " + (error.message || "Unknown error"));
      }
    } finally {
      setIsFinalizing(false);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <Button
        onClick={handleFinalize}
        disabled={isFinalizing || finalized}
        className="w-full h-16 rounded-2xl bg-[#FBBF24] hover:bg-[#FCD34D] text-black font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(251,191,36,0.4)] disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-3 border-none group"
      >
        <AnimatePresence mode="wait">
          {isFinalizing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Finalizing...
            </motion.div>
          ) : finalized ? (
            <motion.div
              key="finalized"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <CheckCheck className="h-5 w-5" />
              Already Finalized
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <CheckCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Finalize Presale
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}