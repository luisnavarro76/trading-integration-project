"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    ChevronDown,
    SlidersHorizontal,
    Flame,
    Sprout,
    TrendingUp,
    Zap,
    ShieldCheck,
    Rocket,
    User,
    Twitter,
    Timer,
    Heart,
    XCircle,
    Copy,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatWalletAddress } from "@/lib/wallet-privy";
import { useWallets } from "@privy-io/react-auth";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// --- Utility Functions ---

// Format relative time from Unix timestamp
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

interface ApiAppLogo {
    original?: string;
    "100px"?: string;
    "128px"?: string;
    "256px"?: string;
    "512px"?: string;
}

interface ApiApp {
    id?: string;
    app_name?: string;
    app_slug?: string;
    app_link?: string;
    app_logo?: ApiAppLogo | null;
    ticker_name?: string;
    is_x_connected?: boolean;
    app_x_handle?: string;
    description?: string;
    launch_date?: string;
    launch_time?: string;
    launch_date_time?: string;
    launch_date_time_iso?: string;
    app_platform?: string;
    app_platform_logo?: string;
    user?: {
        id?: string;
        name?: string;
    };
    funding_start_date?: string;
    funding_start_date_iso?: string;
    funding_end_date?: string;
    funding_end_date_iso?: string;
    funding_goal?: string;
    funding_goal_formatted?: string;
    received_funding?: string;
    received_funding_formatted?: string;
    funded_users_count?: number;
    funding_status?: string;
}

interface BackendPresale {
    _id: string;
    appName: string;
    appLogo?: string | null;
    tickerName: string;
    description?: string;
    totalRaised?: string; // BigInt as string
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
    duration?: number; // Duration in seconds from contract
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
    launchDateTimeIso?: string;
    fundingStartDateIso?: string;
    fundingGoal?: string;
    fundingGoalFormatted?: string;
    receivedFunding?: string;
    receivedFundingFormatted?: string;
    fundedUsersCount?: number;
    fundingStatus?: string;
    status: "Pumping" | "Genesis" | "Moon";
    xHandle?: string;
    isXConnected?: boolean;
    user?: {
        id: string;
        name: string;
    };
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
    duration?: number;
    crowdfundAddress?: string;
}

const FundingCountdown = ({ fundingDateIso }: { fundingDateIso: string }) => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const calculateTime = () => {
            const target = new Date(fundingDateIso).getTime();
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                setIsLive(true);
                setTimeLeft(null);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [fundingDateIso]);

    if (isLive) {
        return (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/30 w-fit">
                <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[9px] font-bold text-[#22C55E] uppercase">
                    Live
                </span>
            </div>
        );
    }

    if (!timeLeft) return null;

    return (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EC4E02]/20 border border-[#EC4E02]/30 w-fit">
                <Timer className="h-3 w-3 text-[#EC4E02]" />
            <span className="text-[9px] font-bold text-[#EC4E02] uppercase tabular-nums">
                {String(timeLeft.days).padStart(2, "0")}d {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
        </div>
    );
};

export const ProjectCard = ({ project, index, activeTab }: { project: Project; index: number; activeTab: "All" | "Funding" | "Upcoming" | "Ended" }) => {
    const { wallets } = useWallets();
    const connectedWalletAddress = wallets[0]?.address || null;
    const [localHeartCount, setLocalHeartCount] = useState(project.heartCount || 0);
    const [hasGivenHeart, setHasGivenHeart] = useState(() => {
        if (!connectedWalletAddress || !project.heartUsers) return false;
        return project.heartUsers.some(
            (addr) => addr.toLowerCase() === connectedWalletAddress.toLowerCase()
        );
    });
    const [isHeartLoading, setIsHeartLoading] = useState(false);
    const randomChartPoints = useMemo(() => {
        const points: Array<{ x: number; y: number }> = [];
        
        // Get contributorCount (default to 0 if not available)
        const contributorCount = project.contributorCount || 0;
        
        // Get totalRaisedUSDC - this is the maximum value (100% = top of chart)
        const totalRaisedUSDC = parseFloat(project.totalRaisedUSDC || "0");
        
        // If totalRaisedUSDC is 0, show only bottom horizontal line
        if (totalRaisedUSDC === 0) {
            points.push({ x: 0, y: 40 }); // Start at bottom-left
            points.push({ x: 100, y: 40 }); // Horizontal line to right (bottom line only)
            return points;
        }
        
        // Cap the number of steps at a reasonable maximum (e.g., 30 steps)
        const MAX_STEPS = 30;
        const numSteps = Math.min(contributorCount, MAX_STEPS);
        
        // If contributorCount = 0, show horizontal then vertical line (no diagonal)
        if (numSteps === 0) {
            points.push({ x: 0, y: 40 }); // Start at bottom-left
            points.push({ x: 100, y: 40 }); // Horizontal line to right
            points.push({ x: 100, y: 0 }); // Vertical line to top
            return points;
        }
        
        // Generate step positions randomly distributed across x-axis
        const stepPositions: number[] = [0]; // Start at x=0
        for (let i = 0; i < numSteps; i++) {
            // Random x position between 0 and 100
            const randomX = Math.random() * 100;
            stepPositions.push(randomX);
        }
        stepPositions.push(100); // End at x=100
        stepPositions.sort((a, b) => a - b); // Sort in ascending order
        
        // Generate random step heights (y values)
        // Each step represents progress toward totalRaisedUSDC (the maximum value)
        // Steps must be lower (smaller y) than the previous, ending at y=0 (100% of totalRaisedUSDC)
        let currentY = 40;
        const stepHeights: number[] = [40]; // Start at y=40 (0% of totalRaisedUSDC)
        
        // Distribute the total decrease (40) across all steps
        const remainingSteps = numSteps;
        
        for (let i = 0; i < remainingSteps; i++) {
            // Calculate how much y we still need to decrease
            const remainingY = currentY;
            const remainingStepsCount = remainingSteps - i;
            
            // Random decrease for this step (ensuring we can reach 0 at the end)
            const maxDecrease = remainingY / remainingStepsCount;
            const randomDecrease = Math.random() * maxDecrease * 0.8; // 0.8 to ensure we don't go too fast
            currentY = Math.max(0, currentY - randomDecrease);
            stepHeights.push(currentY);
        }
        
        stepHeights.push(0); // End at y=0 (100% of totalRaisedUSDC - maximum value)
        
        // Generate points for each step (horizontal and vertical lines only - no diagonal)
        // Pattern: horizontal line → vertical drop → horizontal line → vertical drop, etc.
        // Last step: horizontal → vertical (to top y=0) → horizontal (at top, final)
        // Ensure one continuous step line without duplicate points
        
        // Start with the first point at (0, 40)
        points.push({ x: stepPositions[0], y: stepHeights[0] });
        
        // Don't show the last step - stop before the last step
        for (let i = 0; i < stepPositions.length - 2; i++) {
            const endX = stepPositions[i + 1];
            const currentY = stepHeights[i];
            const nextY = stepHeights[i + 1];
            
            // Intermediate steps: horizontal line → vertical drop
            // Add end point of horizontal line (same y, creating horizontal segment)
            points.push({ x: endX, y: currentY });
            
            // Add vertical drop point (same x, different y, creating vertical segment)
            points.push({ x: endX, y: nextY });
        }
        
        // Add horizontal line from the last point to the right edge (x=100)
        if (points.length > 0) {
            const lastPoint = points[points.length - 1];
            // Add horizontal line from last point to x=100 at the same y level
            points.push({ x: 100, y: lastPoint.y });
        }
        
        return points;
    }, [index, project.contributorCount, project.totalRaisedUSDC]); // Include totalRaisedUSDC in dependencies

    // Update local state when project changes
    useEffect(() => {
        setLocalHeartCount(project.heartCount || 0);
        if (connectedWalletAddress && project.heartUsers) {
            setHasGivenHeart(
                project.heartUsers.some(
                    (addr) => addr.toLowerCase() === connectedWalletAddress.toLowerCase()
                )
            );
        } else {
            setHasGivenHeart(false);
        }
    }, [project.heartCount, project.heartUsers, connectedWalletAddress]);

    // Calculate progress toward softcap
    const progressPercent = useMemo(() => {
        if (!project.totalRaisedUSDC || !project.softcap) return 0;
        const raised = parseFloat(project.totalRaisedUSDC);
        const cap = parseFloat(project.softcap);
        if (cap <= 0) return 0;
        return Math.min((raised / cap) * 100, 100);
    }, [project.totalRaisedUSDC, project.softcap]);

    // Calculate time elapsed progress (0% = just started, 100% = ended)
    // Use duration from backend (from contract), fallback to 360 seconds if not available
    const DEFAULT_DURATION = 360; // Fallback duration in seconds
    const duration = project.duration || DEFAULT_DURATION;
    
    // Use endTime from backend if available, otherwise calculate from startTime + duration
    const calculatedEndTime = project.endTime || (project.startTime ? project.startTime + duration : null);
    
    const timeProgressPercent = useMemo(() => {
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        const startTime = project.startTime; // contractStartTime (mapped from backend)
        
        // If startTime is null/undefined, show 0%
        if (!startTime) return 0;
        
        // If endTime is null/undefined, show 100% (presale has ended but endTime not available)
        if (!calculatedEndTime) return 100;
        
        // If currentTime < startTime (presale hasn't started), show 0%
        if (now < startTime) return 0;
        
        // If currentTime >= endTime, show 100%
        if (now >= calculatedEndTime) return 100;
        
        // Calculate progress: (currentTime - startTime) / (endTime - startTime) * 100
        const elapsed = now - startTime;
        const totalDuration = calculatedEndTime - startTime;
        const progress = (elapsed / totalDuration) * 100;
        
        // Clamp between 0% and 100%
        return Math.min(Math.max(progress, 0), 100);
    }, [project.startTime, calculatedEndTime]);

    // Handler for $[erc20Symbol] button - opens modal (placeholder for now)
    const handleSymbolButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Open modal (content to be skipped for now)
        // For now, just prevent default behavior
    };

    // Handler for heart button click
    const handleHeartClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!connectedWalletAddress) {
            toast.error("Please connect your wallet to give a heart");
            return;
        }

        if (hasGivenHeart || isHeartLoading) {
            return;
        }

        // Optimistic update
        const previousCount = localHeartCount;
        const previousHasGivenHeart = hasGivenHeart;
        setLocalHeartCount(previousCount + 1);
        setHasGivenHeart(true);
        setIsHeartLoading(true);

        try {
            const res = await fetch(`/api/presales/${project.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: connectedWalletAddress,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to add heart");
            }

            // Success - update project data
            const data = await res.json();
            if (data.data) {
                setLocalHeartCount(data.data.heartCount || previousCount + 1);
            }
        } catch (error: any) {
            // Revert optimistic update
            setLocalHeartCount(previousCount);
            setHasGivenHeart(previousHasGivenHeart);
            toast.error(error.message || "Failed to add heart");
        } finally {
            setIsHeartLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative w-full h-[450px] xs:h-[480px] sm:h-[500px] md:h-[520px] lg:h-[540px] rounded-[12px] overflow-hidden"
        >
            {/* Card Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/card.png"
                    alt="Card background"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="relative p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col h-full z-10">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        {/* Profile Picture - App Logo */}
                        <div className="relative h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14 flex-none overflow-hidden rounded-full border-2 border-white/10">
                {project.appLogo ? (
                    <Image
                        src={project.appLogo}
                                    alt={project.erc20Name || project.title}
                        fill
                                    unoptimized={true}
                                    className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-black flex items-center justify-center">
                                    <Rocket className="h-6 w-6 text-white/20" />
                    </div>
                )}
            </div>
                        <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5">
                            {/* Project Name - erc20Name */}
                            <span className="text-base xs:text-lg sm:text-xl font-bold text-white tracking-tight">
                                {project.erc20Name || project.title}
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
                                {/* Badge - erc20Symbol */}
                                {project.erc20Symbol && (
                                    <span className="text-[10px] xs:text-xs sm:text-sm font-black text-[#FF8A3C] bg-[#FF8A3C]/10 px-1.5 sm:px-2 py-0.5 rounded-[4px] border border-[#FF8A3C]/20">
                                        {project.erc20Symbol}
                                    </span>
                                )}
                                <span className="text-gray-400 text-xs sm:text-sm">|</span>
                                {/* Heart count */}
                                <span className="flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 font-medium gap-0.5 sm:gap-1">
                                    <span className="text-pink-400">♥</span> {localHeartCount}
                                </span>
                                {/* Person count - contributorCount */}
                                <span className="flex items-center text-[10px] xs:text-xs sm:text-sm text-gray-300 font-medium gap-0.5 sm:gap-1">
                                    <span className="text-gray-400">👤</span>{" "}
                                    {project.contributorCount || 0}
                    </span>
                </div>
            </div>
                    </div>
                    {/* Presale Status Badge */}
                    {project.presaleStatus && (
                        <div
                            className={`flex items-center justify-center px-2 xs:px-3 sm:px-4 py-1 sm:py-1.5 rounded-md text-[10px] xs:text-xs sm:text-sm font-bold text-white tracking-wider ${
                                project.presaleStatus === "UPCOMING"
                                    ? "bg-yellow-500"
                                    : project.presaleStatus === "FUNDING"
                                    ? "bg-green-500"
                                    : project.presaleStatus === "Not Finalized"
                                    ? "bg-orange-500"
                                    : project.presaleStatus === "Not Reached"
                                    ? "bg-red-600"
                                    : project.presaleStatus === "Failed"
                                    ? "bg-red-500"
                                    : project.presaleStatus === "Completed"
                                    ? "bg-yellow-400"
                                    : "bg-gray-500"
                            }`}
                        >
                            {project.presaleStatus}
                        </div>
                    )}
                </div>

                {/* Description */}
                {project.description && (
                    <p className="text-[11px] xs:text-xs sm:text-sm leading-relaxed text-gray-300 font-medium line-clamp-2 mb-2 sm:mb-3">
                        {project.description.replace(/^<p>|<\/p>$/g, '').trim()}
                    </p>
                )}

                {/* Creator (replacing "Generated by") */}
                {project.creator && (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] xs:text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 md:mb-4">
                        <span>Creator</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(project.creator!);
                                toast.success("Address copied!");
                            }}
                            className="flex items-center gap-1.5 sm:gap-2 text-white hover:text-[#ea580c] transition-colors cursor-pointer group"
                        >
                            <span className="font-bold font-mono">
                                {formatWalletAddress(project.creator)}
                            </span>
                            <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                </div>
            )}

                {/* Price (totalRaisedUSDC) and Cap (softcap) Row */}
                <div className="flex items-end justify-between mb-2 sm:mb-3">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white text-[10px] xs:text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            Total Raised USDC
                        </span>
                        <span className="font-bold text-white text-lg xs:text-xl sm:text-2xl tracking-tight">
                            ${project.totalRaisedUSDC || "0"}
                        </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                        <span className="text-[10px] xs:text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
                            Cap
                        </span>
                        <span className="text-sm xs:text-base sm:text-lg font-semibold text-[#22c55e]">
                            ${project.softcap || "3000"}
                            </span>
                        </div>
                    </div>

                {/* Volume Progress Bar - progress toward softcap */}
                <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-black/20 mb-2 sm:mb-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#ea580c] to-[#fb923c] shadow-[0_0_12px_rgba(234,88,12,0.6)]"
                    />
                </div>

                {/* Time Progress Bar - time elapsed (under volume section) */}
                <div className="mb-2 sm:mb-3">
                    {/* Time Labels - startTime and endTime */}
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex flex-col gap-0.5">
                            {project.startTime && (
                                <span className="text-white text-[10px] xs:text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                    {new Date(project.startTime * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                            {calculatedEndTime && (
                                <span className="text-white text-[10px] xs:text-xs sm:text-sm font-semibold uppercase tracking-wider text-right">
                                    {new Date(calculatedEndTime * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            )}
                        </div>
                        </div>
                    {/* Progress Bar */}
                    <div className="h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-black/20 mb-2 sm:mb-3">
                            <motion.div
                                initial={{ width: 0 }}
                            animate={{ width: `${timeProgressPercent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#ea580c] to-[#fb923c] shadow-[0_0_12px_rgba(234,88,12,0.6)]"
                            />
                        </div>
                    </div>

                {/* Bottom Section: Buttons & Chart */}
                <div className="flex items-end justify-between mt-auto gap-2">
                    {/* Left Side: Buttons */}
                    <div className="flex flex-col gap-2 sm:gap-3">
                        {/* $[erc20Symbol] button */}
                        {project.erc20Symbol && (
                            <button
                                onClick={handleSymbolButtonClick}
                                className="rounded-full border-2 border-[#ea580c] bg-transparent px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs xs:text-sm sm:text-base font-bold text-[#ea580c] transition-all hover:bg-[#ea580c]/10"
                            >
                                ${project.erc20Symbol}
                            </button>
                        )}
                        {/* View token link */}
                        <Link
                            href={`/presale/${project.id}`}
                            className="text-xs xs:text-sm sm:text-base font-bold text-[#ea580c] hover:text-[#ea580c] transition-colors tracking-wide"
                            onClick={(e) => e.stopPropagation()}
                        >
                            View token
                        </Link>
                </div>

                    {/* Right Side: Chart/Graph and Heart Icon */}
                    <div className="flex flex-col items-end gap-2">
                        {/* Chart/Graph */}
                        <div className="relative w-[120px] h-[60px] xs:w-[140px] xs:h-[70px] sm:w-[160px] sm:h-[75px] md:w-[180px] md:h-[80px]">
                            {/* Random SVG Line Chart */}
                            <svg width="100%" height="100%" viewBox="0 0 100 50" className="overflow-visible">
                                <defs>
                                    <linearGradient id={`chartGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Gradient fill area */}
                                <path
                                    d={`M ${randomChartPoints.map((p) => `${p.x},${p.y}`).join(" L ")} L 100,50 L 0,50 Z`}
                                    fill={`url(#chartGradient-${index})`}
                                />
                                {/* Line - always increasing (monotonically decreasing y as x increases) */}
                                <polyline
                                    points={randomChartPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        {/* Heart Icon Button - Bottom Right */}
                        <button
                            onClick={handleHeartClick}
                            disabled={hasGivenHeart || isHeartLoading || !connectedWalletAddress}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all ${
                                hasGivenHeart
                                    ? "bg-pink-500/20 border border-pink-500/30 cursor-not-allowed"
                                    : connectedWalletAddress
                                    ? "bg-white/5 border border-white/10 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer"
                                    : "bg-white/5 border border-white/10 cursor-not-allowed opacity-50"
                            }`}
                        >
                            <Heart
                                className={`h-4 w-4 ${
                                    hasGivenHeart ? "fill-pink-400 text-pink-400" : "text-gray-400"
                                } ${isHeartLoading ? "animate-pulse" : ""}`}
                            />
                            <span className="text-[10px] xs:text-xs font-medium text-white">
                                {localHeartCount}
                            </span>
                        </button>
                        </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function VibeDiscoveryCards() {
    const [activeTab, setActiveTab] = useState<"All" | "Funding" | "Upcoming" | "Ended">("Funding");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [allPresales, setAllPresales] = useState<Project[]>([]);
    const [allPresalesCount, setAllPresalesCount] = useState(0);
    const [fundingPresalesCount, setFundingPresalesCount] = useState(0);
    const [upcomingPresalesCount, setUpcomingPresalesCount] = useState(0);
    const [endedPresalesCount, setEndedPresalesCount] = useState(0);
    const [showMyPresales, setShowMyPresales] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;
    
    // Ref for tabs section to scroll to
    const tabsRef = useRef<HTMLDivElement>(null);
    
    // Get connected wallet address
    const { wallets } = useWallets();
    const connectedWalletAddress = wallets[0]?.address || null;

    // Fetch ALL presales from backend
    const fetchAllPresales = useCallback(async () => {
            setIsLoading(true);
            try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
            const res = await fetch(`${backendUrl}/api/presales`, { cache: "no-store" });
            if (!res.ok) throw new Error(`Failed to fetch presales: ${res.status}`);
            const data = await res.json();
            const presales: BackendPresale[] = data?.data || [];

            // Convert totalRaised from wei to USDC (divide by 1e6 since USDC has 6 decimals)
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

            const mapped: Project[] = presales.map((presale) => {
                // Build logo URL - if it's a path, prepend backend URL
                let logo: string | null = null;
                if (presale.appLogo) {
                    if (presale.appLogo.startsWith("http")) {
                        logo = presale.appLogo;
                    } else {
                        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
                        // Ensure path starts with / if it doesn't already
                        const logoPath = presale.appLogo.startsWith("/") ? presale.appLogo : `/${presale.appLogo}`;
                        logo = `${backendUrl}${logoPath}`;
                    }
                }
                
                // Debug logging (can be removed later)
                if (logo) {
                    console.log(`Logo URL for ${presale.appName}: ${logo}`);
                }

                const totalRaisedUSDC = formatUSDC(presale.totalRaised);
                const softcap = presale.softCap || "3000"; // Get from contract, fallback to "3000"
                const dailyRaisedUSDC = "1000"; // Placeholder

                    return {
                    id: presale._id,
                    title: presale.appName || "Unknown",
                    ticker: presale.tickerName || presale.erc20Symbol || "APP",
                    description: presale.description || "",
                    category: presale.network || "Utility",
                    platformLogo: "", // No platform logo for backend presales
                        appLogo: logo,
                    status: "Pumping" as const, // Default status
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
                    duration: presale.duration, // Duration from contract
                    isActive: presale.isActive,
                    poolCreated: presale.poolCreated,
                    finalized: presale.finalized,
                    heartCount: presale.heartCount || 0,
                    heartUsers: presale.heartUsers || [],
                    presaleStatus: presale.presaleStatus || "Unknown",
                    crowdfundAddress: presale.crowdfundAddress,
                };
            });

            setAllPresales(mapped);
            setAllPresalesCount(mapped.length);
            
            // Calculate funding presales count (startTime < now < endTime)
            const now = Math.floor(Date.now() / 1000);
            const funding = mapped.filter((p) => {
                if (!p.startTime || !p.endTime) return false;
                return p.startTime < now && p.endTime > now;
            });
            setFundingPresalesCount(funding.length);
            
            // Calculate upcoming presales count (startTime > now)
            const upcoming = mapped.filter((p) => {
                if (!p.startTime) return false;
                return p.startTime > now;
            });
            setUpcomingPresalesCount(upcoming.length);
            
            // Calculate ended presales count (endTime < now && startTime <= now, exclude if endTime is null/undefined)
            const ended = mapped.filter((p) => {
                if (!p.endTime) return false; // Exclude if endTime is null/undefined
                if (p.startTime && p.startTime > now) return false; // Exclude if hasn't started
                return p.endTime < now;
            });
            setEndedPresalesCount(ended.length);
            } catch (error) {
            console.error("Failed to fetch presales:", error);
            } finally {
                setIsLoading(false);
            }
    }, []);

    useEffect(() => {
        fetchAllPresales();
    }, [fetchAllPresales]);

    // Filter projects based on active tab and search query
    const filteredProjects = useMemo(() => {
        return allPresales.filter((p) => {
            // My Presales filter
            if (showMyPresales && connectedWalletAddress) {
                if (!p.creator || p.creator.toLowerCase() !== connectedWalletAddress.toLowerCase()) {
                    return false;
                }
            }

            // Search filter
            const matchesSearch = !searchQuery || 
                (p.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.ticker?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.erc20Name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.erc20Symbol?.toLowerCase().includes(searchQuery.toLowerCase()));

            if (!matchesSearch) return false;

            const now = Math.floor(Date.now() / 1000);

            if (activeTab === "All") return true;
            if (activeTab === "Funding") {
                // Filter by startTime < now < endTime (exclude if null/undefined)
                if (!p.startTime || !p.endTime) return false;
                return p.startTime < now && p.endTime > now;
            }
            if (activeTab === "Upcoming") {
                // Filter by startTime > now (not started yet, exclude if null/undefined)
                if (!p.startTime) return false;
                return p.startTime > now;
            }
            if (activeTab === "Ended") {
                // Filter by endTime < now (presale has ended)
                // Exclude if endTime is null/undefined
                if (!p.endTime) return false;
                // Exclude presales that haven't started (startTime > now)
                if (p.startTime && p.startTime > now) return false;
                return p.endTime < now;
            }
            return true;
        });
    }, [activeTab, searchQuery, allPresales, showMyPresales, connectedWalletAddress]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery, showMyPresales]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    // Pagination handlers
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to tabs section
            if (tabsRef.current) {
                tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5; // Show max 5 page numbers at a time
        
        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page
            pages.push(1);
            
            if (currentPage <= 3) {
                // Show first few pages
                for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show last few pages
                pages.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show middle pages
                pages.push("ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <section className="relative w-full px-6 sm:px-12 lg:px-24 py-12 bg-[#050505] min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                {/* Integrated Header */}
                <div ref={tabsRef} className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                    <div className="flex items-center border border-white/5 rounded-full overflow-hidden bg-[#0A0A0B]/50 backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab("All")}
                            className={`px-6 py-2.5 text-xs font-bold transition-all uppercase tracking-widest ${activeTab === "All" ? "bg-[#EC4E02] text-white" : "text-white/30 hover:text-white/60"
                                }`}
                        >
                                All {allPresalesCount > 0 && `(${allPresalesCount})`}
                        </button>
                        <button
                            onClick={() => setActiveTab("Funding")}
                            className={`px-6 py-2.5 text-xs font-bold flex items-center gap-2 transition-all border-l border-white/5 uppercase tracking-widest ${activeTab === "Funding" ? "bg-[#EC4E02] text-white" : "text-white/30 hover:text-white/60"
                                }`}
                        >
                            <Flame className={`h-3.5 w-3.5 ${activeTab === "Funding" ? "fill-white" : ""}`} />
                                Funding ({fundingPresalesCount})
                        </button>
                        <button
                            onClick={() => setActiveTab("Upcoming")}
                            className={`px-6 py-2.5 text-xs font-bold flex items-center gap-2 transition-all border-l border-white/5 uppercase tracking-widest ${activeTab === "Upcoming" ? "bg-[#EC4E02] text-white" : "text-white/30 hover:text-white/60"
                                }`}
                        >
                            <Timer className={`h-3.5 w-3.5 ${activeTab === "Upcoming" ? "text-white" : "text-[#EC4E02]"}`} />
                                Upcoming ({upcomingPresalesCount})
                            </button>
                            <button
                                onClick={() => setActiveTab("Ended")}
                                className={`px-6 py-2.5 text-xs font-bold flex items-center gap-2 transition-all border-l border-white/5 uppercase tracking-widest ${activeTab === "Ended" ? "bg-[#EC4E02] text-white" : "text-white/30 hover:text-white/60"
                                    }`}
                            >
                                <XCircle className={`h-3.5 w-3.5 ${activeTab === "Ended" ? "text-white" : "text-white/40"}`} />
                                Ended ({endedPresalesCount})
                        </button>
                    </div>

                        {/* My Presales Checkbox */}
                        <div className="flex items-center gap-2 px-6 py-2.5 border border-white/5 rounded-full bg-[#0A0A0B]/50 backdrop-blur-md">
                            <Checkbox
                                id="my-presales"
                                checked={showMyPresales}
                                onCheckedChange={(checked) => setShowMyPresales(checked === true)}
                                disabled={!connectedWalletAddress}
                                className="data-[state=checked]:bg-[#EC4E02] data-[state=checked]:border-[#EC4E02] disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <label
                                htmlFor="my-presales"
                                className={`text-xs font-bold uppercase tracking-widest cursor-pointer ${!connectedWalletAddress ? "text-white/30" : showMyPresales ? "text-white" : "text-white/60 hover:text-white/80"
                                    } ${!connectedWalletAddress ? "cursor-not-allowed" : ""}`}
                            >
                                My Presales
                            </label>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-auto min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                            type="text"
                            placeholder="Search presales..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-11 pr-4 bg-[#0A0A0B]/50 border border-white/5 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC4E02]/50 transition-all backdrop-blur-md"
                        />
                    </div>
                </div>

                {/* Pagination - Top */}
                {!isLoading && filteredProjects.length > 0 && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 py-4 mb-6">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, idx) => {
                                if (page === "ellipsis") {
                                    return (
                                        <span key={`ellipsis-${idx}`} className="px-2 text-white/40">
                                            ...
                            </span>
                                    );
                                }
                                const pageNum = page as number;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === pageNum
                                                ? "bg-[#EC4E02] text-white"
                                                : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                        </div>
                    )}

                {/* Projects Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-[500px] bg-white/5 rounded-[12px] animate-pulse" />
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg">No presales found</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedProjects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} activeTab={activeTab} />
                            ))}
                        </div>
                        
                        {/* Pagination - Bottom */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 py-4 mt-6">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>
                                
                                <div className="flex items-center gap-1">
                                    {getPageNumbers().map((page, idx) => {
                                        if (page === "ellipsis") {
                                            return (
                                                <span key={`ellipsis-${idx}`} className="px-2 text-white/40">
                                                    ...
                            </span>
                                            );
                                        }
                                        const pageNum = page as number;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                    currentPage === pageNum
                                                        ? "bg-[#EC4E02] text-white"
                                                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                        </div>
                    )}
                    </>
                )}
            </div>
        </section>
    );
}
