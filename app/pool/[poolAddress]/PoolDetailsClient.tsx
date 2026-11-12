"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCircle2,
  Globe,
  DollarSign,
  Users,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatWalletAddress } from "@/lib/wallet-privy";
import { toast } from "sonner";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";

const CL_POOL_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
];

const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function decimals() view returns (uint8)",
];

interface PoolData {
  token0: string | null;
  token1: string | null;
  token0Symbol: string | null;
  token1Symbol: string | null;
  isLoadingTokens: boolean;
  tokenError: string | null;
}

interface PresaleData {
  _id: string;
  appName: string;
  appLogo?: string | null;
  tickerName: string;
  description?: string;
  erc20Symbol?: string;
  erc20Name?: string;
  appXHandle?: string;
  appLink?: string;
  creator?: string;
  totalRaised?: string;
  contributorCount?: number;
  crowdfundAddress?: string;
  projectToken?: string | null;
}

type Props = { poolAddress: string };

export default function PoolDetailsClient({ poolAddress }: Props) {
  const [poolData, setPoolData] = useState<PoolData>({
    token0: null,
    token1: null,
    token0Symbol: null,
    token1Symbol: null,
    isLoadingTokens: true,
    tokenError: null,
  });
  const [presaleData, setPresaleData] = useState<PresaleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const { authenticated } = usePrivy();

  const rpcUrls = [
    "https://base.llamarpc.com",
    "https://mainnet.base.org",
    "https://1rpc.io/base",
  ];

  const getProvider = async (): Promise<ethers.JsonRpcProvider> => {
    let lastError: Error | null = null;
    for (const url of rpcUrls) {
      try {
        const provider = new ethers.JsonRpcProvider(url);
        await provider.getBlockNumber();
        return provider;
      } catch (err) {
        lastError = err as Error;
        continue;
      }
    }
    throw lastError || new Error("All RPC endpoints failed");
  };

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!ethers.isAddress(poolAddress)) {
          throw new Error("Invalid pool address format");
        }

        setPoolData((prev) => ({ ...prev, isLoadingTokens: true, tokenError: null }));
        try {
          const provider = await getProvider();
          const poolContract = new ethers.Contract(poolAddress, CL_POOL_ABI, provider);
          
          const [token0, token1] = await Promise.all([
            poolContract.token0().catch((err) => {
              console.error("Failed to fetch token0():", err);
              return null;
            }),
            poolContract.token1().catch((err) => {
              console.error("Failed to fetch token1():", err);
              return null;
            }),
          ]);

          if (isActive) {
            setPoolData({
              token0: token0 || null,
              token1: token1 || null,
              token0Symbol: null,
              token1Symbol: null,
              isLoadingTokens: false,
              tokenError: (!token0 || !token1) ? "Failed to fetch token addresses" : null,
            });

            if (token0 && token1) {
              const token0Contract = new ethers.Contract(token0, ERC20_ABI, provider);
              const token1Contract = new ethers.Contract(token1, ERC20_ABI, provider);
              
              const [token0Symbol, token1Symbol] = await Promise.all([
                token0Contract.symbol().catch(() => null),
                token1Contract.symbol().catch(() => null),
              ]);

              if (isActive) {
                setPoolData((prev) => ({
                  ...prev,
                  token0Symbol,
                  token1Symbol,
                }));
              }
            }
          }
        } catch (poolErr) {
          console.error("Could not fetch pool contract data:", poolErr);
          if (isActive) {
            setPoolData({
              token0: null,
              token1: null,
              token0Symbol: null,
              token1Symbol: null,
              isLoadingTokens: false,
              tokenError: "Failed to fetch token addresses from pool contract",
            });
          }
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        const response = await fetch(`${backendUrl}/api/presales`, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (response.ok && isActive) {
          const payload = await response.json();
          const presale = (payload.data || []).find(
            (p: any) => p.pool === poolAddress || p.liquidityPool === poolAddress
          );

          if (presale) {
            let logoUrl: string | null = null;
            if (presale.appLogo) {
              if (typeof presale.appLogo === "string") {
                if (presale.appLogo.startsWith("http")) {
                  logoUrl = presale.appLogo;
                } else {
                  const logoPath = presale.appLogo.startsWith("/") ? presale.appLogo : `/${presale.appLogo}`;
                  logoUrl = `${backendUrl}${logoPath}`;
                }
              }
            }

            setPresaleData({
              _id: presale._id,
              appName: presale.appName || "Unknown",
              appLogo: logoUrl,
              tickerName: presale.tickerName || "TOKEN",
              description: presale.description || "",
              erc20Symbol: presale.erc20Symbol,
              erc20Name: presale.erc20Name,
              appXHandle: presale.appXHandle,
              appLink: presale.appLink,
              creator: presale.creator,
              totalRaised: presale.totalRaised,
              contributorCount: presale.contributorCount || 0,
              crowdfundAddress: presale.crowdfundAddress,
              projectToken: presale.projectToken,
            });
          }
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Failed to load pool data");
          console.error("Error fetching data:", err);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [poolAddress]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(label);
    toast.success("Address copied to clipboard");
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const formatUSDC = (value: string | undefined): string => {
    if (!value) return "$0.00";
    try {
      const num = BigInt(value);
      const usdc = Number(num) / 1e6;
      return `$${usdc.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } catch {
      return "$0.00";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC4E02] mx-auto mb-4"></div>
          <p className="text-white/60">Loading pool data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0F0F10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pool Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0F0F10] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {presaleData?.appLogo && (
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <Image
                      src={presaleData.appLogo}
                      alt={presaleData.appName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-white mb-2 truncate">
                    {presaleData?.appName || "Pool"} ({presaleData?.tickerName || "TOKEN"})
                  </h1>
                  {presaleData?.description && (
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {presaleData.description.replace(/^<p>|<\/p>$/g, '').trim()}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {presaleData?.appLink && (
                      <a
                        href={presaleData.appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {presaleData?.appXHandle && (
                      <a
                        href={`https://x.com/${presaleData.appXHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors"
                      >
                        <span>@{presaleData.appXHandle}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pool Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0F0F10] border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Pool Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/60">Pool Address</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm">{formatWalletAddress(poolAddress)}</span>
                    <button
                      onClick={() => copyToClipboard(poolAddress, "pool")}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {copiedAddress === "pool" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <a
                      href={`https://basescan.org/address/${poolAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Presale Info (if available) */}
            {presaleData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0F0F10] border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">Presale Information</h2>
                <div className="space-y-4">
                  {presaleData.totalRaised && (
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-white/60 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Total Raised
                      </span>
                      <span className="text-white font-bold">{formatUSDC(presaleData.totalRaised)}</span>
                    </div>
                  )}
                  {presaleData.contributorCount !== undefined && (
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-white/60 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Contributors
                      </span>
                      <span className="text-white font-bold">{presaleData.contributorCount}</span>
                    </div>
                  )}
                  {presaleData.creator && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white/60">Creator</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-sm">{formatWalletAddress(presaleData.creator)}</span>
                        <a
                          href={`https://basescan.org/address/${presaleData.creator}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#EC4E02] hover:text-[#EC4E02]/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Error message (if any, but don't block the page) */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
              >
                <p className="text-red-500 text-sm">{error}</p>
                <p className="text-white/60 text-xs mt-2">
                  Some data may not be available, but you can still view the pool information above.
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Swap Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0F0F10] border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Swap</h2>
              <a
                href={
                  poolData.token0 && poolData.token1
                    ? `https://aerodrome.finance/swap?inputCurrency=${poolData.token0}&outputCurrency=${poolData.token1}`
                    : "https://aerodrome.finance/swap"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full bg-[#EC4E02] hover:bg-[#EC4E02]/80 text-white font-bold py-6 text-lg"
                >
                  Swap on Aerodrome
                  <ExternalLink className="h-5 w-5 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0F0F10] border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Status</span>
                  <span className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-xs font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Network</span>
                  <span className="text-white text-sm font-bold">Base</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
