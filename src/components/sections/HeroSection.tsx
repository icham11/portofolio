"use client";
// src/components/sections/HeroSection.tsx - Hero utama halaman beranda
// Dengan floating particles, typewriter effect, staggered chip animations, dan premium Framer Motion

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  FolderOpen,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

// Framer Motion container dan item variants dengan stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// Chip stagger variant setiap chip muncul satu per satu
const chipContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } },
};
const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
};

// Data partikel latar belakang yang mengambang
// x dibatasi 5%-85% agar tidak meluber ke luar viewport di mobile
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (5 + ((i * 137.5) % 80)).toFixed(1) + "%",
  y: ((i * 79.3) % 95).toFixed(1) + "%",
  size: 2 + (i % 3),
  duration: 5 + (i % 5),
  delay: (i * 0.4) % 4,
  color: i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#4f46e5",
  opacity: 0.12 + (i % 4) * 0.05,
}));

export function HeroSection() {
  const { lang } = useLang();
  const ROTATING_WORDS = t.hero.rotatingWords[lang];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect untuk heading utama saat scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  // Typewriter animation effect
  useEffect(() => {
    const word = ROTATING_WORDS[currentWordIndex];
    const speed = isDeleting ? 50 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, ROTATING_WORDS]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      style={{ overflowX: "clip" }} // clip (not hidden) agar tidak break position:sticky di parent
    >
      {/* === Floating ambient particles === */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -14, 6, 0],
              x: [0, 5, -4, 0],
              opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background grid pattern (animated opacity breathe) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
                           linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        animate={{ opacity: [0.025, 0.045, 0.025] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Radial glow background — clamped to viewport width on mobile */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "min(700px, 100vw)",
          height: "min(700px, 100vw)",
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Hero content with parallax */}
      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
      >
        {/* Badge: Available for work */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-foreground-muted"
            whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.4)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {getText(t.hero.available, lang)}
            <MapPin className="w-3 h-3 ml-1" />
            Indonesia
          </motion.span>
        </motion.div>

        {/* Main headline */}
        <motion.div variants={itemVariants}>
          <h1 className="font-heading font-black text-foreground mb-2 leading-tight">
            {getText(t.hero.hiIm, lang)}{" "}
            <span className="gradient-text">Wahid Nurhisyam</span>
          </h1>
        </motion.div>

        {/* Captain/typewriter badge */}
        <motion.div variants={itemVariants} className="mb-4">
          <motion.span
            className="badge-gradient text-sm font-mono px-4 py-1.5 flex items-center justify-center mx-auto w-fit"
            animate={{ boxShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.25)", "0 0 0px rgba(139,92,246,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 mr-1.5 text-brand-violet" />
            Captain &amp; {displayText}
            <span
              className="ml-0.5 inline-block w-0.5 h-4 bg-brand-violet animate-pulse"
              aria-hidden="true"
            />
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          {getText(t.hero.description, lang)}
        </motion.p>

        {/* CTA Buttons - stack vertically on mobile, row on sm+ */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col xs:flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          {/* Primary CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link href="/contact" className="btn-primary group w-full justify-center sm:w-auto">
              {getText(t.nav.hireMe, lang)}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Project CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link href="/projects" className="btn-outline group w-full justify-center sm:w-auto">
              <FolderOpen className="w-4 h-4" />
              {getText(t.hero.viewProjects, lang)}
            </Link>
          </motion.div>

          {/* AI Interview CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              href="/ai-interview"
              className="btn-outline group w-full justify-center sm:w-auto border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10"
            >
              <Bot className="w-4 h-4 text-brand-cyan" />
              <span className="text-brand-cyan">{getText(t.hero.talkToAI, lang)}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Tech stack chips — staggered appearance */}
        <motion.div variants={itemVariants} className="mt-16">
          <p className="text-xs text-foreground-subtle uppercase tracking-widest mb-4 font-mono">
            {getText(t.hero.builtWith, lang)}
          </p>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            variants={chipContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              "Next.js",
              "TypeScript",
              "PostgreSQL",
              "Prisma",
              "Groq API",
              "pgvector",
              "Tailwind CSS",
              "Vercel",
            ].map((tech) => (
              <motion.span
                key={tech}
                variants={chipVariants}
                className="px-3 py-1 text-xs font-mono text-foreground-muted bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full cursor-default"
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(139,92,246,0.5)",
                  color: "var(--brand-violet)",
                  backgroundColor: "rgba(139,92,246,0.08)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={itemVariants} className="mt-16 flex justify-center">
          <motion.div
            className="flex flex-col items-center gap-2 text-foreground-subtle cursor-pointer"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() =>
              document
                .getElementById("projects-preview")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-xs font-mono uppercase tracking-widest">
              {getText(t.hero.scroll, lang)}
            </span>
            <motion.div
              className="w-px h-8"
              style={{
                background: "linear-gradient(to bottom, rgba(139,92,246,0.8), transparent)",
              }}
              animate={{ scaleY: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
