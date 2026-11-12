"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
}

interface WordWithLogoRotateProps {
  items: Array<{ name: string; logo: string }>
  duration?: number
  motionProps?: MotionProps
  className?: string
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn("text-[#FF5A0A] font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[80px]", className)}
          {...motionProps}
        >
          <span className="font-pixelify">{words[index][0]}</span>{words[index].slice(1)}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}

export function WordWithLogoRotate({
  items,
  duration = 2500,
  motionProps,
  className,
}: WordWithLogoRotateProps) {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  const currentItem = items[index]
  const typingSpeed = 100 // ms per character
  const pauseAfterTyping = 1500 // pause after typing complete
  const deletingSpeed = 50 // ms per character when deleting

  useEffect(() => {
    const targetText = currentItem.name

    if (isTyping) {
      if (displayText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, pause then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseAfterTyping)
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next item
        setIndex((prevIndex) => (prevIndex + 1) % items.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentItem.name, items.length])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden">
      <div className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}>
        <h1 className="text-[#EC4E02] font-semibold text-inherit leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
          {displayText.length > 0 && (
            <>
              <span className="font-pixelify">{displayText[0]}</span>
              {displayText.slice(1)}
            </>
          )}
          <span className={`inline-block w-[2px] h-[0.8em] bg-[#EC4E02] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ verticalAlign: 'middle' }} />
        </h1>
        <div className="relative h-[1em] w-[1em] shrink-0">
          <Image
            src={currentItem.logo}
            alt={currentItem.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
