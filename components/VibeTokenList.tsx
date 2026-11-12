"use client";

import { Search, Activity, Zap, TrendingUp, Globe, Filter, ChevronDown, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";

type AppLogo = {
  "100px"?: string;
  "128px"?: string;
  "256px"?: string;
  "512px"?: string;
  original?: string;
};

type AppItem = {
  id: string;
  app_name: string;
  app_slug: string;
  app_link: string;
  app_logo?: AppLogo | null;
  ticker_name: string;
  description?: string | null;
  app_platform?: string | null;
};

type AppsListResponse = {
  data: AppItem[];
};

type PoolItem = {
  id: string;
  app_name: string;
  ticker_name: string;
  app_logo: string | null; // String URL for the logo
  poolAddress: string;
  liquidity: string | null; // Will be fetched from contract
  _id: string; // MongoDB ID
};

type BackendPresale = {
  _id: string;
  appName?: string;
  tickerName?: string;
  appLogo?: string | AppLogo | null; // Can be string URL or object
  pool?: string | null;
  liquidityPool?: string | null; // Alternative pool field
  poolCreated?: boolean;
  presaleStatus?: string;
  [key: string]: any;
};

type PresalesResponse = {
  data: BackendPresale[];
};

const CL_POOL_ABI = [
  "function liquidity() external view returns (uint128)",
];

export default function VibeTokenList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [apps, setApps] = useState<AppItem[]>([]);
  const [pools, setPools] = useState<PoolItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingLiquidity, setIsLoadingLiquidity] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    let isActive = true;
    const loadPools = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        const response = await fetch(`${backendUrl}/api/presales`, { 
          headers: { Accept: "application/json" },
          cache: "no-store"
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const payload = (await response.json()) as PresalesResponse;
        
        if (isActive) {
          const completedPools = (payload.data || [])
            .filter((presale: BackendPresale) => {
              const isCompleted = presale.presaleStatus === "Completed";
              const hasPoolCreated = presale.poolCreated === true;
              const poolAddress = presale.pool || (presale as any).liquidityPool;
              const hasPoolAddress = poolAddress && 
                poolAddress !== "0x0000000000000000000000000000000000000000" &&
                poolAddress !== null &&
                poolAddress !== "";
              
              return isCompleted && hasPoolCreated && hasPoolAddress;
            })
            .map((presale: BackendPresale) => {
              let logoUrl: string | null = null;
              if (presale.appLogo) {
                if (typeof presale.appLogo === 'string') {
                  if (presale.appLogo.startsWith("http")) {
                    logoUrl = presale.appLogo;
                  } else {
                    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
                    const logoPath = presale.appLogo.startsWith("/") ? presale.appLogo : `/${presale.appLogo}`;
                    logoUrl = `${backendUrl}${logoPath}`;
                  }
                } else {
                  const appLogoObj = presale.appLogo as AppLogo;
                  logoUrl = appLogoObj["128px"] || appLogoObj.original || null;
                  if (logoUrl && !logoUrl.startsWith("http")) {
                    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
                    const logoPath = logoUrl.startsWith("/") ? logoUrl : `/${logoUrl}`;
                    logoUrl = `${backendUrl}${logoPath}`;
                  }
                }
              }
              
              const poolAddress = presale.pool || (presale as any).liquidityPool;
              
              return {
                id: presale._id,
                app_name: presale.appName || "Unknown",
                ticker_name: presale.tickerName || "TOKEN",
                app_logo: logoUrl,
                poolAddress: poolAddress,
                liquidity: null as string | null,
                _id: presale._id,
              };
            });
          
          setPools(completedPools);
          setError(null);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Failed to load pools");
          console.error("Error loading pools:", err);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };
    loadPools();
    return () => { isActive = false; };
  }, []);

  useEffect(() => {
    const fetchLiquidity = async () => {
      if (pools.length === 0) return;

      const rpcUrls = [
        "https://base.llamarpc.com",
        "https://base-mainnet.g.alchemy.com/v2/demo",
        "https://mainnet.base.org",
        "https://1rpc.io/base",
      ];

      const poolsToFetch = pools.filter(p => p.liquidity === null);
      
      for (const pool of poolsToFetch) {
        setIsLoadingLiquidity(prev => ({ ...prev, [pool._id]: true }));

        try {
          let provider: ethers.Provider | null = null;
          let lastError: Error | null = null;

          for (const rpcUrl of rpcUrls) {
            try {
              provider = new ethers.JsonRpcProvider(rpcUrl);
              const contract = new ethers.Contract(pool.poolAddress, CL_POOL_ABI, provider);
              const liquidityValue = await contract.liquidity();
              
              const liquidityUSDC = Number(liquidityValue) / 1e6;
              const formattedLiquidity = `$${liquidityUSDC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              
              setPools(prev => prev.map(p => 
                p._id === pool._id ? { ...p, liquidity: formattedLiquidity } : p
              ));
              break;
            } catch (err) {
              lastError = err instanceof Error ? err : new Error(String(err));
              continue;
            }
          }

          if (!provider || lastError) {
            console.error(`Failed to fetch liquidity for pool ${pool.poolAddress}:`, lastError);
            setPools(prev => prev.map(p => 
              p._id === pool._id ? { ...p, liquidity: "--" } : p
            ));
          }
        } catch (error) {
          console.error(`Error fetching liquidity for pool ${pool.poolAddress}:`, error);
          setPools(prev => prev.map(p => 
            p._id === pool._id ? { ...p, liquidity: "--" } : p
          ));
        } finally {
          setIsLoadingLiquidity(prev => {
            const newState = { ...prev };
            delete newState[pool._id];
            return newState;
          });
        }
      }
    };

    const hasPoolsNeedingLiquidity = pools.some(p => p.liquidity === null);
    if (hasPoolsNeedingLiquidity) {
      fetchLiquidity();
    }
  }, [pools.length]);

  const filteredPools = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return pools;
    return pools.filter((pool) => {
      const name = pool.app_name?.toLowerCase() ?? "";
      const ticker = pool.ticker_name?.toLowerCase() ?? "";
      return name.includes(query) || ticker.includes(query);
    });
  }, [pools, searchTerm]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EC4E02]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="max-w-3xl flex flex-col items-center">
            <h2
              className="text-4xl xs:text-5xl md:text-6xl font-semibold text-white mb-8 tracking-tight leading-[1.1]"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <span className="font-pixelify">L</span>aunched <span className="text-white/90">              </span>
            </h2>

            <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-2xl mx-auto">
              Real-time directory of live utility tokens secured via VibeProtocol.
              <br className="hidden md:block" />
              Monitor liquidity streams and project valuations on the Base network.
            </p>
          </div>
        </div>

        <div className="bg-[#0F0F10] border border-white/10 rounded-[28px] sm:p-3 mb-10 shadow-2xl relative max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-[#EC4E02] transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find the app nodes..."
              className="w-full h-14 bg-black/50 border border-white/5 rounded-2xl pl-14 pr-6 text-sm text-white focus:outline-none focus:border-[#EC4E02]/50 transition-all font-mono text-center pr-14"
            />
          </div>
        </div> 

        <div
          className="w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0F0F10] shadow-2xl"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <div className="overflow-x-auto scrollbar-hide">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent h-16">
                  <TableHead className="w-[80px] pl-8">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">REF_ID</span>
                  </TableHead>
                  <TableHead className="w-[300px]">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">NODE_IDENTITY</span>
                  </TableHead>
                  <TableHead>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">VALUATION</span>
                  </TableHead>
                  <TableHead>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">24H_DELTA</span>
                  </TableHead>
                  <TableHead>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">SOURCE_PLATFORM</span>
                  </TableHead>
                  <TableHead className="pr-8 text-right">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">INITIALIZE</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow className="border-white/5">
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Activity className="h-6 w-6 text-[#EC4E02] animate-pulse" />
                        <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">Querying Distributed Ledger...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredPools.length === 0 ? (
                  <TableRow className="border-white/5">
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Zap className="h-6 w-6 text-white/10" />
                        <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">No Active Nodes Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPools.map((pool, index) => (
                    <TableRow
                      key={pool._id}
                      className="border-white/5 hover:bg-white/[0.02] transition-colors group h-20"
                    >
                      <TableCell className="pl-8">
                        <span className="text-xs font-mono font-bold text-white/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative h-11 w-11 rounded-xl bg-black border border-white/10 overflow-hidden p-0.5">
                            <Image
                              src={pool.app_logo || "/user.svg"}
                              alt={pool.app_name}
                              fill
                              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              unoptimized
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white group-hover:text-[#EC4E02] transition-colors">
                              {pool.app_name}
                            </span>
                            <span className="text-[10px] font-black text-[#EC4E02] uppercase tracking-widest leading-none mt-0.5">
                              ${pool.ticker_name}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold text-white/60">
                          {isLoadingLiquidity[pool._id] ? (
                            <span className="text-white/40">Loading...</span>
                          ) : pool.liquidity || "--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-3 w-3 text-white/20" />
                          <span className="text-sm font-bold text-white/60">--</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                          <Globe className="h-3 w-3 text-white/20" />
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                            aerodrum
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <Link
                          href={`/pool/${pool.poolAddress}`}
                          className="inline-flex items-center gap-2 h-10 px-6 rounded-xl bg-[#EC4E02] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#FF5A0A] transition-all active:scale-95 shadow-lg shadow-[#EC4E02]/10"
                        >
                          Pool Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between px-8 text-white/10">
          <div className="flex items-center gap-6">
          </div>
        </div>
      </div>
    </section>
  );
}
