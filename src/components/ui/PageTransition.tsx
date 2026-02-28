"use client";
// src/components/ui/PageTransition.tsx
// Wraps page content with a smooth fade+slide-up entrance on mount

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Page-level entrance animation variant
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
