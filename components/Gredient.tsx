"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
   startingGap?: number;
   Breathing?: boolean;
   gradientColors?: string[];
   gradientStops?: number[];
   animationSpeed?: number;
   breathingRange?: number;
   containerStyle?: React.CSSProperties;
   containerClassName?: string;
   topOffset?: number;
   gradientWidth?: number;
   gradientHeight?: number;
   positionX?: number;
   positionY?: number;
   gradientShape?: 'circle' | 'ellipse';
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
   startingGap = 125,
   Breathing = false,
   gradientColors = [
      "#0A0A0A",
      "#F5640Cf",
      "#0c0c0c00",
      "#0c0c0c00",
      "#0c0c0c00",
      "#0c0c0c00",
      "#0c0c0c00"
   ],
   gradientStops = [35, 50, 60, 70, 80, 90, 100],
   animationSpeed = 0.02,
   breathingRange = 5,
   containerStyle = {},
   topOffset = 0,
   containerClassName = "",
   gradientWidth,
   gradientHeight,
   positionX = 50,
   positionY = 20,
   gradientShape = 'ellipse',
}: AnimatedGradientBackgroundProps) => {
   if (gradientColors.length !== gradientStops.length) {
      throw new Error(
         `GradientColors and GradientStops must have the same length.
     Received gradientColors length: ${gradientColors.length},
     gradientStops length: ${gradientStops.length}`
      );
   }

   const containerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      let animationFrame: number;
      let width = startingGap;
      let directionWidth = 1;

      const animateGradient = () => {
         if (width >= startingGap + breathingRange) directionWidth = -1;
         if (width <= startingGap - breathingRange) directionWidth = 1;

         if (!Breathing) directionWidth = 0;
         width += directionWidth * animationSpeed;

         const gradientStopsString = gradientStops
            .map((stop, index) => `${gradientColors[index]} ${stop}%`)
            .join(", ");

         const finalWidth = gradientWidth !== undefined ? gradientWidth : width;
         const finalHeight = gradientHeight !== undefined ? gradientHeight : (width + topOffset);

         const shapeSize = gradientShape === 'circle'
            ? `${finalWidth}%`
            : `${finalWidth}% ${finalHeight}%`;

         const gradient = `radial-gradient(${gradientShape} ${shapeSize} at ${positionX}% ${positionY}%, ${gradientStopsString})`;

         if (containerRef.current) {
            containerRef.current.style.background = gradient;
         }

         animationFrame = requestAnimationFrame(animateGradient);
      };

      animationFrame = requestAnimationFrame(animateGradient);

      return () => cancelAnimationFrame(animationFrame);
   }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset, gradientWidth, gradientHeight, positionX, positionY, gradientShape]);

   return (
      <motion.div
         key="animated-gradient-background"
         initial={{
            opacity: 0,
            scale: 1.5,
         }}
         animate={{
            opacity: 1,
            scale: 1,
            transition: {
               duration: 2,
               ease: [0.25, 0.1, 0.25, 1],
             },
         }}
         className={`absolute inset-0 overflow-hidden ${containerClassName}`}
      >
         <div
            ref={containerRef}
            style={containerStyle}
            className="absolute inset-0 transition-transform"
         />
      </motion.div>
   );
};

export default AnimatedGradientBackground;