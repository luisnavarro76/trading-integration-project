"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Animation variants for each grid item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

/**
 * Props for the BentoGridShowcase component.
 * Each prop represents a "slot" in the grid and maps
 * to one of the four cards in the "How It Works" layout.
 */
interface BentoGridShowcaseProps {
  /** Top-left card – "Describe your idea" */
  describe: React.ReactNode;
  /** Top-right large card – "Create apps and assets" */
  create: React.ReactNode;
  /** Bottom-left card – "Remix & Launch" */
  remix: React.ReactNode;
  /** Bottom-right card – "Deploy Instantly" */
  deploy: React.ReactNode;
  /** Optional class names for the grid container */
  className?: string;
}

/**
 * A responsive, animated bento grid layout component.
 * It arranges six content slots in the specific layout
 * seen in the "Product Features" UI.
 */
export const BentoGridShowcase = ({
  describe,
  create,
  remix,
  deploy,
  className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        // Stacked on mobile, two columns on desktop
        // Using flex proportions for tablet/desktop to avoid fixed overflow
        "flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-6",
        className
      )}
    >
      {/* Left column: Step 1 above Step 3 */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 xl:w-[480px] shrink-0">
        <motion.div variants={itemVariants}>{describe}</motion.div>
        <motion.div variants={itemVariants}>{remix}</motion.div>
      </div>

      {/* Right column: Step 2 above Step 4 */}
      <div className="flex flex-col gap-4 w-full md:w-2/3 xl:flex-1">
        <motion.div variants={itemVariants}>{create}</motion.div>
        <motion.div variants={itemVariants}>{deploy}</motion.div>
      </div>
    </motion.section>
  );
};
