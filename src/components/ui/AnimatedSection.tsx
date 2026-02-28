"use client";
// src/components/ui/AnimatedSection.tsx
// Reusable wrapper for scroll-triggered entrance animations using Framer Motion

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  // Direction of the entrance animation
  direction?: "up" | "down" | "left" | "right";
  // Delay before the animation starts
  delay?: number;
  // Duration of the animation
  duration?: number;
}

// Build a Variants object based on direction prop
function buildVariants(direction: "up" | "down" | "left" | "right"): Variants {
  const hidden: Record<string, number> = { opacity: 0 };
  if (direction === "up") hidden.y = 40;
  if (direction === "down") hidden.y = -40;
  if (direction === "left") hidden.x = 60;
  if (direction === "right") hidden.x = -60;

  return {
    hidden,
    visible: { opacity: 1, y: 0, x: 0 },
  };
}

export function AnimatedSection({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.65,
}: AnimatedSectionProps) {
  const variants = buildVariants(direction);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
