"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Rocket,
  Search,
  LayoutGrid,
  User,
  Twitter,
  Timer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Funding Countdown Timer Component
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
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
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
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Timer className="h-3 w-3 text-[#EC4E02]" />
        <span className="text-[8px] font-bold text-white/40 uppercase tracking-wider">
          Funding Starts
        </span>
      </div>
      <div className="flex items-center gap-1 h-6">
        <AnimatePresence mode="wait">
          {timeLeft.days > 0 && (
            <motion.span
              key={`days-${timeLeft.days}`}
              initial={{ y: 4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -4, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-black text-[#EC4E02] tabular-nums"
            >
              {timeLeft.days}d
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`hours-${timeLeft.hours}`}
            initial={{ y: 4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-black text-[#EC4E02] tabular-nums"
          >
            {String(timeLeft.hours).padStart(2, "0")}h
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`mins-${timeLeft.minutes}`}
            initial={{ y: 4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-black text-[#EC4E02] tabular-nums"
          >
            {String(timeLeft.minutes).padStart(2, "0")}m
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`secs-${timeLeft.seconds}`}
            initial={{ y: 4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-black text-[#EC4E02] tabular-nums"
          >
            {String(timeLeft.seconds).padStart(2, "0")}s
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface Project {
  id: string;
  title: string;
  ticker: string;
  description: string;
  category: string;
  generatedBy: string;
  platformLogo: string;
  appLogo?: string | null;
  launchDate?: string;
  launchTime?: string;
  launchDateTime?: string;
  launchDateTimeIso?: string;
  fundingStartDate?: string;
  fundingStartDateIso?: string;
  fundingEndDate?: string;
  fundingEndDateIso?: string;
  fundingGoal?: string;
  fundingGoalFormatted?: string;
  receivedFunding?: string;
  receivedFundingFormatted?: string;
  fundedUsersCount?: number;
  fundingStatus?: string;
  appLink?: string;
  xHandle?: string;
  isXConnected?: boolean;
  user?: {
    id: string;
    name: string;
  };
}

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

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#EC4E02]/30 transition-all duration-500 cursor-pointer shadow-2xl"
    >
      {/* Immersive Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        {project.appLogo ? (
          <Image
            src={project.appLogo}
            alt={project.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-black flex items-center justify-center">
            <Rocket className="h-20 w-20 text-white/5 rotate-12" />
          </div>
        )}

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Top Left - Platform Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {project.platformLogo && (
            <Image
              src={project.platformLogo}
              alt={project.category}
              width={12}
              height={12}
              className="object-contain"
            />
          )}
          <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>

      {/* Top Right - X Connected Badge */}
      {project.isXConnected && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <Twitter className="h-3 w-3 text-[#1DA1F2]" />
          </div>
        </div>
      )}

      {/* Bottom Info Section */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Funding Status Badge */}
        {project.fundingStatus && (
          <div className="mb-3">
            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full w-fit ${project.fundingStatus === "Active"
                  ? "bg-[#22C55E]/20 border border-[#22C55E]/30"
                  : "bg-white/10 border border-white/20"
                }`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${project.fundingStatus === "Active"
                    ? "bg-[#22C55E] animate-pulse"
                    : "bg-white/40"
                  }`}
              />
              <span
                className={`text-[9px] font-bold uppercase ${project.fundingStatus === "Active"
                    ? "text-[#22C55E]"
                    : "text-white/60"
                  }`}
              >
                {project.fundingStatus}
              </span>
            </div>
          </div>
        )}

        {/* Funding Progress Bar */}
        {project.fundingGoal && project.receivedFunding && (
          <div className="mb-3 space-y-1">
            <div className="flex items-center justify-between text-[9px] font-bold">
              <span className="text-white/60">
                Raised: ${project.receivedFundingFormatted || "0"}
              </span>
              <span className="text-[#EC4E02]">
                Goal: ${project.fundingGoalFormatted}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min((parseFloat(project.receivedFunding) / parseFloat(project.fundingGoal)) * 100, 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#EC4E02] to-[#FF8A3C]"
              />
            </div>
            {project.fundedUsersCount !== undefined && (
              <div className="text-[8px] font-bold text-white/40">
                {project.fundedUsersCount}{" "}
                {project.fundedUsersCount === 1 ? "backer" : "backers"}
              </div>
            )}
          </div>
        )}

        {/* Funding Countdown Timer */}
        {project.launchDateTimeIso && (
          <div className="mb-3">
            <FundingCountdown fundingDateIso={project.launchDateTimeIso} />
          </div>
        )}

        {/* Ticker & Title */}
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase font-mono">
              ${project.ticker}
            </h3>
            <ShieldCheck className="h-4 w-4 text-[#EC4E02] fill-[#EC4E02]/20" />
          </div>
          <p className="text-xs md:text-sm font-bold text-white/50 tracking-wide uppercase">
            {project.title}
          </p>
        </div>

        {/* Details Row */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/40">
          {/* Creator */}
          {project.user?.name && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="truncate max-w-[60px]">{project.user.name}</span>
            </div>
          )}

          {/* X Handle */}
          {project.xHandle && (
            <div className="flex items-center gap-1">
              <Twitter className="h-3 w-3" />
              <span className="truncate max-w-[60px]">@{project.xHandle}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Access Link Overlay */}
      <Link href={`/app/${project.id}`} className="absolute inset-0 z-20" />
    </motion.div>
  );
};

export default function Pumping() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadApps = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://backend.vibefund.ing/api/apps_list_pumping",
          {
            cache: "no-store",
            headers: { Accept: "application/json" },
          },
        );
        if (!res.ok) throw new Error(`Failed to load apps (${res.status})`);
        const json = await res.json();
        const items: ApiApp[] = Array.isArray(json?.data) ? json.data : [];
        const mapped: Project[] = items.map((app) => {
          const logo =
            app.app_logo?.["512px"] ??
            app.app_logo?.["256px"] ??
            app.app_logo?.original ??
            null;
          return {
            id: app.id ?? app.app_slug ?? crypto.randomUUID(),
            title: app.app_name ?? "Untitled App",
            ticker: app.ticker_name ?? "APP",
            description: app.description ?? "No description provided.",
            category: app.app_platform ?? "Utility",
            generatedBy: app.app_platform ?? "Vibe3",
            platformLogo: app.app_platform_logo ?? "",
            appLogo: logo,
            launchDate: app.launch_date,
            launchTime: app.launch_time,
            launchDateTime: app.launch_date_time,
            launchDateTimeIso: app.launch_date_time_iso,
            fundingStartDate: app.funding_start_date,
            fundingStartDateIso: app.funding_start_date_iso,
            fundingEndDate: app.funding_end_date,
            fundingEndDateIso: app.funding_end_date_iso,
            fundingGoal: app.funding_goal,
            fundingGoalFormatted: app.funding_goal_formatted,
            receivedFunding: app.received_funding,
            receivedFundingFormatted: app.received_funding_formatted,
            fundedUsersCount: app.funded_users_count,
            fundingStatus: app.funding_status,
            appLink: app.app_link,
            xHandle: app.app_x_handle,
            isXConnected: app.is_x_connected,
            user: app.user
              ? {
                id: app.user.id ?? "",
                name: app.user.name ?? "",
              }
              : undefined,
          };
        });
        if (isMounted) setProjects(mapped);
      } catch (err) {
        if (isMounted) setError("Unable to load apps right now.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadApps();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const normalize = (value: string) =>
      value.toLowerCase().replace(/\s+/g, "");
    const searchValue = normalize(search.trim());
    return projects.filter((p) => {
      return searchValue
        ? normalize(p.title).includes(searchValue) ||
        normalize(p.ticker).includes(searchValue)
        : true;
    });
  }, [search, projects]);

  return (
    <section
      id="projects-grid"
      className="relative w-full px-6 sm:px-12 lg:px-24 bg-[#050505]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header section - Based on the "All Agent Keys" Screenshot */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
          <div className="max-w-xl">
            <h2
              className="text-3xl sm:text-4xl font-semibold text-white mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <span className="font-pixelify">F</span>undraising{" "}
              <span className="text-[#EC4E02]">
                <span className="font-pixelify"></span>
              </span>
            </h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium">
              Explore live funding campaigns for innovative apps and utility
              tokens. Support emerging projects and watch them grow on the Base
              network.
            </p>
          </div>

          {/* Global Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[#EC4E02] transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Query protocol keys..."
                className="h-11 min-w-[240px] bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 text-xs text-white focus:outline-none focus:border-[#EC4E02]/50 transition-all font-mono"
              />
            </div>

            <button className="h-11 px-4 rounded-xl bg-[#0A0A0B] border border-white/10 flex items-center gap-3 text-xs font-bold text-white/60 hover:text-white transition-colors">
              <span className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Base
            </button>

            <button className="h-11 px-6 rounded-xl bg-[#EC4E02] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#FF5A0A] transition-all flex items-center gap-3">
              <LayoutGrid className="h-4 w-4" />
              All Agents
            </button>
          </div>
        </div>

        {/* Projects Grid Container */}
        <div className="relative min-h-[600px]">
          {error && (
            <div className="text-center py-24 text-red-500 font-mono text-xs">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </AnimatePresence>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="h-12 w-12 border-2 border-white/5 border-t-[#EC4E02] rounded-full animate-spin" />
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                Synchronizing Protocol Data...
              </span>
            </div>
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 text-center opacity-20">
              <Zap className="h-12 w-12 text-white mb-4" />
              <span className="text-sm font-black uppercase tracking-widest">
                No keys found in database
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
