"use client";

import { useEffect, useState } from "react";
import { Timer, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  launchDateTimeIso: string;
  launchDate?: string;
  launchTime?: string;
}

export function UpcomingStage({ launchDateTimeIso, launchDate, launchTime }: Props) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const checkTime = () => {
      const target = new Date(launchDateTimeIso).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
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

    checkTime();
    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, [launchDateTimeIso]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
          Launch Countdown
        </h3>
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-[#EC4E02]/10 border border-[#EC4E02]/20">
          <Timer className="h-5 w-5 text-[#EC4E02]" />
        </div>
      </div>

      {/* Countdown Timer */}
      {timeLeft && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} className="group relative flex flex-col items-center">
              <div className="relative flex flex-col items-center w-full aspect-[4/5] justify-center rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all hover:bg-white/[0.05] hover:border-white/10 group-hover:-translate-y-1">
                <motion.span
                  key={item.value}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter"
                >
                  {String(item.value).padStart(2, "0")}
                </motion.span>
                <span className="text-[7px] font-black text-[#EC4E02] tracking-[0.3em] mt-1.5 opacity-80">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-3 pt-8 border-t border-white/10">
        <div className="flex justify-between items-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
            Launch Date
          </span>
          <span className="text-sm font-black text-white font-mono">
            {launchDate ?? "---"}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
            Launch Time
          </span>
          <span className="text-sm font-black text-white font-mono">
            {launchTime ?? "---"} UTC
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#EC4E02]/5 border border-[#EC4E02]/10 justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-[#EC4E02] animate-ping" />
          <span className="text-[10px] font-black text-[#FF8A3C] uppercase tracking-[0.2em]">
            Awaiting Launch
          </span>
        </div>
      </div>
    </motion.div>
  );
}
