"use client";
import * as React from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  company: string;
  logoText: string;
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
  highlighted?: boolean;
}

const testimonials: Testimonial[] = [
  {
    company: "Dynaboard",
    logoText: "D",
    quote:
      "I've tried a lot of AI tools, but nothing matches the speed and quality here. It literally saves me hours every week!",
    name: "Guillermo Berge",
    title: "CEO — Dynaboard",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&q=80&auto=format&fit=crop",
  },
  {
    company: "Jotform",
    logoText: "J",
    quote:
      "We ship more experiments every month because VibeCoding handles the heavy lifting. It feels like having a senior engineer on call.",
    name: "Amira Khan",
    title: "Head of Product — Jotform",
    avatarUrl:
      "https://i.pinimg.com/736x/f9/e6/b2/f9e6b21ce1399768f1524507ed401962.jpg",
    highlighted: true,
  },
  {
    company: "HelpScout",
    logoText: "H",
    quote:
      "Onboarding new ideas into production takes days instead of weeks. The quality of the generated code is genuinely impressive.",
    name: "Jordan Miles",
    title: "Engineering Lead — HelpScout",
    avatarUrl:
      "https://i.pinimg.com/1200x/6a/c0/90/6ac090c89185bb1bc5d3ae045942b30d.jpg",
  },
  {
    company: "Linear",
    logoText: "L",
    quote:
      "The ability to go from idea to working prototype in a single afternoon has completely changed how our team experiments.",
    name: "Noah Smith",
    title: "Product Engineer — Linear",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&q=80&auto=format&fit=crop",
  },
  {
    company: "Figma",
    logoText: "F",
    quote:
      "As a designer-first team, we love how VibeCoding lets us stay in flow. The generated code is clean enough to ship.",
    name: "Sara Lee",
    title: "Design Engineer — Figma",
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=96&q=80&auto=format&fit=crop",
  },
  {
    company: "Notion",
    logoText: "N",
    quote:
      "We prototype entire internal tools in hours. The community examples and shared snippets make it even easier to level up.",
    name: "Daniel Park",
    title: "Engineering Manager — Notion",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&q=80&auto=format&fit=crop",
  },
];

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = React.useState(0);
  const visibleCount = 3;
  const total = testimonials.length;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const visibleTestimonials = Array.from({ length: visibleCount }).map(
    (_, idx) => testimonials[(startIndex + idx) % total],
  );

  return (
    <section className="w-full px-6 sm:px-10 lg:px-20 xl:px-[240px] py-[105px] bg-[#050505]">
      <div className="w-full flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 text-center sm:text-left w-full sm:w-auto">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#ea580c]">
              Testimonials
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white md:text-[40px] md:leading-[1.1]">
              <span className="font-pixelify">L</span>oved by <span className="font-pixelify">C</span>reators
            </h2>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#ea580c] text-slate-950 shadow-[0_0_24px_rgba(234,88,12,0.6)] hover:bg-[#ea580c]/90 transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3 md:gap-8 min-h-[350px] sm:min-h-[400px]">
          {visibleTestimonials.map((item, index) => {
            const isHighlighted = item.highlighted;
            // On mobile, show only the first visible item (index 0). On md+, show all 3.
            const displayClass = index > 0 ? "hidden md:flex" : "flex";

            return (
              <div
                key={`${item.company}-${index}`}
                className={`relative flex flex-col justify-between rounded-[32px] border border-white/20 overflow-hidden mx-auto w-full max-w-[460px] h-[498px] transition-all duration-300 ${displayClass} ${isHighlighted
                    ? "bg-[radial-gradient(circle_at_top,_#421a0a,_#1a0b05_40%,_#050505_100%)]"
                    : "bg-[#0A0A0A]"
                  }`}
              >
                {/* Content Container */}
                <div className="relative z-10 flex h-full flex-col p-10">
                  {/* Header: Logo */}
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl font-bold ${isHighlighted ? "bg-white text-black" : "bg-white/10 text-white"
                      }`}>
                      {item.logoText}
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                      {item.company}
                    </span>
                  </div>

                  {/* Body: Quote */}
                  <div className="mt-12 flex-1 flex flex-col gap-4">
                    <Quote className={`h-8 w-8 ${isHighlighted ? "text-white/80" : "text-white/40"}`} />
                    <p className="text-[22px] leading-[1.6] font-medium text-slate-100">
                      {item.quote}
                    </p>
                  </div>

                  {/* Footer: User Profile */}
                  <div className="mt-auto pt-8  flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-white/20">
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white leading-none mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm font-medium text-white/50">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
