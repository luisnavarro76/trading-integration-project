"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional single label (fallback). Prefer using `items`. */
  text?: string
  /** The different labels that should repeat in the marquee. */
  items?: string[]
  repeat?: number
  duration?: number
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

const fontSizeClasses: Record<NonNullable<MarqueeProps["fontSize"]>, string> = {
  sm: "text-sm sm:text-base md:text-lg",
  md: "text-base sm:text-lg md:text-xl",
  // Approximate Figma: 56px font size, 72px line height
  lg: "text-lg sm:text-2xl md:text-[56px] md:leading-[72px]",
  xl: "text-xl sm:text-3xl md:text-4xl",
  "2xl": "text-2xl sm:text-4xl md:text-5xl",
  "3xl": "text-3xl sm:text-5xl md:text-6xl",
}

const DEFAULT_ITEMS = [
  "Token Generation",
  "Marketplace Trading",
  "Launch your Token",
]

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      text,
      items,
      repeat = 4,
      duration = 24,
      fontSize = "lg",
      ...props
    },
    ref
  ) => {
    const labels =
      items && items.length > 0
        ? items
        : text
          ? [text]
          : DEFAULT_ITEMS

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full items-center overflow-hidden bg-gradient-to-r from-[#ea580c]/20 via-[#ea580c]/80 py-2 sm:py-3 md:py-0 md:h-[140px] lg:h-[168px] px-10",
          className
        )}
        {...props}
      >
        {/* Edge gradients to softly fade text in/out at the sides */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[15%] sm:w-[20%] bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[15%] sm:w-[20%] bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration,
          }}
        >
          {[...Array(repeat)].map((_, index) => (
            <div key={index} className="flex items-center text-white">
              {labels.map((label, i) => (
                <div
                  key={`${index}-${i}`}
                  className="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 md:px-10"
                >
                  <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                  <span
                    className={cn(
                      fontSizeClasses[fontSize],
                      "font-semibold whitespace-nowrap"
                    )}
                  >
                    <span className="font-pixelify">{label[0]}</span>{label.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Marquee.displayName = "Marquee"
