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
}

export const AnimatedGradientBackground: React.FC<
  AnimatedGradientBackgroundProps & { children?: React.ReactNode }
> = ({
  startingGap = 110,
  Breathing = true,
  gradientColors = ["#0D0D0D", "#1A0A0A", "#3B0A0A", "#6B1A1A", "#9B2020", "#C0392B", "#1A0A0A"],
  gradientStops = [35, 50, 60, 70, 80, 90, 100],
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  containerClassName = "",
  topOffset = 0,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const currentGapRef = useRef(startingGap);
  const directionRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGradient = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + topOffset;
      const radius = Math.max(canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        radius * (currentGapRef.current / 100)
      );

      gradientColors.forEach((color, index) => {
        gradient.addColorStop(gradientStops[index] / 100, color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      if (Breathing) {
        currentGapRef.current += animationSpeed * directionRef.current;
        if (
          currentGapRef.current >= startingGap + breathingRange ||
          currentGapRef.current <= startingGap - breathingRange
        ) {
          directionRef.current *= -1;
        }
      }

      drawGradient();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [Breathing, animationSpeed, breathingRange, gradientColors, gradientStops, startingGap, topOffset]);

  return (
    <div className={`relative ${containerClassName}`} style={containerStyle}>
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
