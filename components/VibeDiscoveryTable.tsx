"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    ChevronDown,
    SlidersHorizontal,
    Copy,
    CheckCircle2,
    Clock,
    TrendingUp,
    Zap,
    Activity,
    Flame,
    Sprout,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Project {
    id: string;
    title: string;
    ticker: string;
    appLogo: string | null;
    platformLogo: string;
    status: "Pumping" | "Genesis";
    fdv: string;
    age: string;
    price: string;
    priceChange: string;
    liquidity: string;
    volume24h: string;
    holders: number;
    holdersChange: string;
    address: string;
    multiplier?: string;
    isVerified: boolean;
}

interface ApiApp {
    id?: string;
    app_name?: string;
    app_slug?: string;
    app_logo?: { original?: string; "256px"?: string; "512px"?: string } | null;
    ticker_name?: string;
    is_x_connected?: boolean;
    app_x_handle?: string;
    app_platform?: string;
    app_platform_logo?: string;
    funding_goal_formatted?: string;
    received_funding_formatted?: string;
    funded_users_count?: number;
    launch_date_time_iso?: string;
    funding_status?: string;
}

export default function VibeDiscoveryTable() {
    const [activeTab, setActiveTab] = useState<"All" | "Trending" | "Gainers" | "New">("Trending");
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [pumpingRes, genesisRes, moonRes] = await Promise.all([
                    fetch("https://backend.vibefund.ing/api/apps_list_pumping").then((r) => r.json()),
                    fetch("/api/apps_list").then((r) => r.json()),
                    fetch("https://backend.vibefund.ing/api/apps_list_moon").then((r) => r.json()),
                ]);

                const mapProject = (app: ApiApp, type: "Pumping" | "Genesis" | "Moon"): Project => {
                    const createdAt = app.launch_date_time_iso ? new Date(app.launch_date_time_iso) : new Date();
                    const ageDays = Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

                    const hashId = (app.id || app.app_slug || "0").slice(0, 8);
                    const mockPrice = (parseInt(hashId, 16) % 1000) / 10000;
                    const mockVol = (parseInt(hashId, 16) % 500) + 100;

                    return {
                        id: app.id || app.app_slug || Math.random().toString(),
                        title: app.app_name || "Unknown",
                        ticker: app.ticker_name || "APP",
                        appLogo: app.app_logo?.["256px"] || app.app_logo?.original || null,
                        platformLogo: app.app_platform_logo || "https://mint.base.org/icons/base.svg",
                        status: type === "Moon" ? "Pumping" : type,
                        fdv: app.funding_goal_formatted ? `$${app.funding_goal_formatted}` : "$43.3M",
                        age: `${ageDays > 0 ? ageDays : 1} days`,
                        price: `$${mockPrice.toFixed(6)}`,
                        priceChange: `${(mockPrice * 100).toFixed(2)}%`,
                        liquidity: app.received_funding_formatted ? `$${app.received_funding_formatted}` : "$1.19M",
                        volume24h: `$${mockVol.toFixed(1)}K`,
                        holders: app.funded_users_count || 0,
                        holdersChange: `+${Math.floor(mockPrice * 50)}`,
                        address: "0x" + hashId + "..." + hashId.slice(-4),
                        multiplier: "3x",
                        isVerified: true,
                    };
                };

                const pumping = (pumpingRes?.data || []).map((app: ApiApp) => mapProject(app, "Pumping"));
                const genesis = (genesisRes?.data || []).map((app: ApiApp) => mapProject(app, "Genesis"));
                const moon = (moonRes?.data || []).map((app: ApiApp) => mapProject(app, "Moon"));

                setProjects([...pumping, ...moon, ...genesis]);
            } catch (error) {
                console.error("Failed to fetch discovery data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchesTab =
                activeTab === "All" ||
                (activeTab === "Trending" && p.status === "Pumping") ||
                (activeTab === "New" && p.status === "Genesis") ||
                (activeTab === "Gainers" && p.status === "Pumping");
            return matchesTab;
        });
    }, [activeTab, projects]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Address copied!");
    };

    return (
        <section className="relative w-full px-6 sm:px-12 lg:px-24 py-0 -mt-8 bg-transparent min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                {/* Top Header/Filter Bar - Matching Screenshot */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center  border border-white/5 rounded-full overflow-hidden">
                        <button
                            onClick={() => setActiveTab("All")}
                            className={`px-6 py-2.5 text-xs font-medium transition-all ${activeTab === "All" ? "bg-[#EC4E02] text-white" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab("Trending")}
                            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 transition-all border-l border-white/5 ${activeTab === "Trending" ? "bg-[#EC4E02] text-white" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            <Flame className={`h-3.5 w-3.5 ${activeTab === "Trending" ? "fill-white text-white" : ""}`} />
                            Trending
                        </button>
                        <button
                            onClick={() => setActiveTab("Gainers")}
                            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 transition-all border-l border-white/5 ${activeTab === "Gainers" ? "bg-[#EC4E02] text-white" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            <TrendingUp className="h-3.5 w-3.5 stroke-[2.5]" />
                            Gainers
                        </button>
                        <button
                            onClick={() => setActiveTab("New")}
                            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 transition-all border-l border-white/5 ${activeTab === "New" ? "bg-[#EC4E02] text-white" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            <Sprout className={`h-3.5 w-3.5 ${activeTab === "New" ? "fill-[#EC4E02] text-[#EC4E02]" : ""}`} />
                            New
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2.5 h-10 px-4 border border-white/5 rounded-full text-[11px] font-bold text-white hover:bg-[#1C2128] transition-all">
                            <div className="h-5 w-5 shrink-0">
                                <Image
                                    src="https://cdn.prod.website-files.com/63610769a12ca8b167ecebcf/67a0302dd8137c14bff5a4d9_bXjbc8T6m2Q0ZngyMMR94cBsd7Id1n9_-j9XYnYKQIA.png"
                                    alt="Base"
                                    width={20}
                                    height={20}
                                    className="rounded-full shadow-[0_0_10px_rgba(0,82,255,0.4)]"
                                />
                            </div>
                            BASE
                            <ChevronDown className="h-4 w-4 text-white/20" />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center border border-white/5 rounded-full text-white/40 hover:text-white transition-all">
                            <SlidersHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Discovery Table */}
                <div className="w-full">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full border-separate border-spacing-y-0 min-w-[1100px]">
                            <thead>
                                <tr className="text-left">
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono">VibeCoded Agent</th>
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono text-center">FDV</th>
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono text-center">Age</th>
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono text-center">Price</th>
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono text-center">Liquidity</th>
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono flex items-center justify-center gap-1">
                                        24H VOL <ChevronDown className="h-3 w-3" />
                                    </th>
                                    <th className="pb-6 px-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] font-mono text-right">Holders</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                <AnimatePresence mode="popLayout">
                                    {isLoading ? (
                                        Array(8).fill(0).map((_, i) => (
                                            <tr key={`skeleton-${i}`} className="animate-pulse">
                                                <td colSpan={7} className="px-4 py-8"><div className="h-10 bg-white/5 rounded-xl w-full" /></td>
                                            </tr>
                                        ))
                                    ) : filteredProjects.map((project) => (
                                        <motion.tr
                                            key={project.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group relative hover:bg-white/[0.01] transition-colors"
                                        >
                                            <td className="py-6 px-4 relative z-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-11 w-11 shrink-0">
                                                        <div className="w-full h-full rounded-full overflow-hidden border border-white/10">
                                                            <Image
                                                                src={project.appLogo || "/user.svg"}
                                                                alt={project.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-0.5 h-4.5 w-4.5 rounded-full bg-[#050608] border border-white/10 flex items-center justify-center p-0.5 shadow-xl">
                                                            <Image src={project.platformLogo} alt="net" width={12} height={12} className="rounded-full" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-bold text-white group-hover:text-[#EC4E02] transition-colors font-mono uppercase">
                                                                {project.title}
                                                            </span>
                                                            <span className="text-[10px] font-bold text-white/30 font-mono tracking-widest">{project.ticker}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); copyToClipboard(project.address); }}
                                                                className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0D1117] border border-white/5 group/btn hover:border-white/10 transition-all shadow-sm"
                                                            >
                                                                <span className="text-[9px] font-mono font-bold text-white/40 group-hover/btn:text-white/60">{project.address}</span>
                                                                <Copy className="h-2.5 w-2.5 text-white/20 group-hover/btn:text-white/40" />
                                                            </button>
                                                            {project.isVerified && (
                                                                <div className="h-5 w-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                                                    <CheckCircle2 className="h-3 w-3 text-green-500 fill-green-500/10" />
                                                                </div>
                                                            )}
                                                            {project.multiplier && (
                                                                <div className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 flex items-center gap-1">
                                                                    <Zap className="h-2.5 w-2.5 text-[#EC4E02] fill-[#EC4E02]/20" />
                                                                    <span className="text-[9px] font-black text-white/40 font-mono">{project.multiplier}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link href={`/app/${project.id}`} className="absolute inset-0 cursor-pointer" />
                                            </td>
                                            <td className="py-6 px-4 text-center">
                                                <span className="text-sm font-bold text-white font-mono">{project.fdv}</span>
                                            </td>
                                            <td className="py-6 px-4 text-center">
                                                <span className="text-[11px] font-medium text-white/30 font-mono">{project.age}</span>
                                            </td>
                                            <td className="py-6 px-4 text-center">
                                                <div className="flex flex-col gap-0.5 font-mono">
                                                    <span className="text-sm font-bold text-white">{project.price}</span>
                                                    <span className="text-[10px] font-bold text-green-500">+{project.priceChange}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-4 text-center">
                                                <span className="text-sm font-bold text-white font-mono">{project.liquidity}</span>
                                            </td>
                                            <td className="py-6 px-4 text-center">
                                                <span className="text-sm font-bold text-white font-mono">{project.volume24h}</span>
                                            </td>
                                            <td className="py-6 px-4 text-right">
                                                <div className="flex flex-col gap-0.5 font-mono items-end">
                                                    <span className="text-sm font-bold text-white">
                                                        {project.holders.toLocaleString()}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-green-500">{project.holdersChange}</span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
