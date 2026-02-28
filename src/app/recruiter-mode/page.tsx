"use client";
// src/app/recruiter-mode/page.tsx
// Redesigned as 2-column dashboard on desktop.
// Left: 30s pitch + links. Right: staggered bullet sections with line-by-line reveal.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Briefcase,
  Star,
  Clock,
  ExternalLink,
  Github,
  Linkedin,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import recruiterData from "@/content/recruiter_mode.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

// Stagger container/item variants for bullet lists
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const listItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// Chip variants
const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};
const chipContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function RecruiterModePage() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const generateCopyText = (): string => {
    const data = recruiterData;
    return `WAHID NURHISYAM — ${data.role}

📋 30-SECOND PITCH
${data.summary_30s[lang as keyof typeof data.summary_30s]}

✅ WHY HIRE ME
${data.why_hire_me[lang as keyof typeof data.why_hire_me].map((w, i) => `${i + 1}. ${w}`).join("\n")}

🏆 TOP STRENGTHS
${data.top_strengths.map((s) => `• ${s}`).join("\n")}

🎯 BEST FIT ROLES
${data.best_fit_roles.join(" | ")}

🚀 30-DAY CONTRIBUTION
${data.immediate_contribution_30_days[lang as keyof typeof data.immediate_contribution_30_days].map((c, i) => `${i + 1}. ${c}`).join("\n")}

🔗 LINKS
LinkedIn: ${data.links.linkedin}
GitHub: ${data.links.github}
Project (Cuanify): ${data.links.project_live}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCopyText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      console.error("Clipboard copy failed");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative" style={{ overflowX: "clip" }}>
      {/* Background orb — clamped to viewport width so it doesn't overflow on mobile */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "min(400px, 100vw)",
          height: "min(400px, 100vw)",
          background: "radial-gradient(ellipse at top right, rgba(79,70,229,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge-gradient mb-4 inline-block">{getText(t.recruiter.badge, lang)}</span>
          <h1 className="font-heading font-bold text-foreground mt-3 mb-3">
            <span className="gradient-text">{getText(t.recruiter.heading, lang)}</span>{" "}
            {getText(t.recruiter.headingHighlight, lang)}
          </h1>
          <p className="text-foreground-muted max-w-lg mx-auto text-sm">
            {getText(t.recruiter.sub, lang)}
          </p>

          {/* Copy button with animated checkmark */}
          <motion.button
            onClick={handleCopy}
            className="mt-6 btn-primary inline-flex gap-2 relative overflow-hidden"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Check className="w-4 h-4" /> {getText(t.recruiter.copied, lang)}
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Copy className="w-4 h-4" /> {getText(t.recruiter.copy, lang)}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* 2-column dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* === LEFT COLUMN (2/5) === */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 30-second pitch */}
            <motion.div
              className="glass-card p-6 relative overflow-hidden"
              whileHover={{ scale: 1.01, boxShadow: "0 0 0 1px rgba(6,182,212,0.2), 0 8px 30px -10px rgba(6,182,212,0.15)" }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(6,182,212,0.04) 50%, transparent 60%)",
                  backgroundSize: "300% 100%",
                }}
                animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-brand-cyan" />
                <h2 className="text-sm font-semibold text-foreground">{getText(t.recruiter.pitch30s, lang)}</h2>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {recruiterData.summary_30s[lang as keyof typeof recruiterData.summary_30s]}
              </p>
            </motion.div>

            {/* Best fit roles */}
            <motion.div
              className="glass-card p-6"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-brand-indigo" />
                <h2 className="text-sm font-semibold text-foreground">{getText(t.recruiter.bestFit, lang)}</h2>
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={chipContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {recruiterData.best_fit_roles.map((role) => (
                  <motion.span
                    key={role}
                    variants={chipVariants}
                    className="px-3 py-1 text-xs font-medium text-white bg-indigo-600/20 border border-indigo-500/30 rounded-lg"
                    whileHover={{ scale: 1.08 }}
                  >
                    {role}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Top strengths */}
            <motion.div
              className="glass-card p-6"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-brand-violet" />
                <h2 className="text-sm font-semibold text-foreground">{getText(t.recruiter.strengths, lang)}</h2>
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={chipContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {recruiterData.top_strengths.map((strength) => (
                  <motion.span
                    key={strength}
                    variants={chipVariants}
                    className="badge-gradient text-xs"
                    whileHover={{ scale: 1.08 }}
                  >
                    {strength}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              className="glass-card p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-sm font-semibold text-foreground mb-4">{getText(t.recruiter.quickLinks, lang)}</h2>
              <div className="flex flex-col gap-2">
                {[
                  { href: recruiterData.links.linkedin, icon: Linkedin, label: "LinkedIn", colorClass: "bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20" },
                  { href: recruiterData.links.github, icon: Github, label: "GitHub", colorClass: "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/10" },
                  { href: recruiterData.links.project_live, icon: ExternalLink, label: "Cuanify Live", colorClass: "bg-cyan-500/10 border-cyan-500/30 text-brand-cyan hover:bg-cyan-500/20" },
                ].map(({ href, icon: Icon, label, colorClass }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${colorClass}`}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-50" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* === RIGHT COLUMN (3/5) === */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Why hire me — staggered bullets */}
            <motion.div
              className="glass-card p-6"
              whileHover={{ boxShadow: "0 0 0 1px rgba(234,179,8,0.2), 0 8px 30px -10px rgba(234,179,8,0.12)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-400" />
                <h2 className="text-sm font-semibold text-foreground">{getText(t.recruiter.whyHire, lang)}</h2>
              </div>
              <motion.ul
                className="space-y-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {recruiterData.why_hire_me[lang as keyof typeof recruiterData.why_hire_me].map((reason, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm text-foreground-muted"
                    variants={listItemVariants}
                  >
                    <span className="text-brand-violet font-mono font-bold flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="min-w-0">{reason}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* 30-day contribution — staggered */}
            <motion.div
              className="glass-card p-6"
              whileHover={{ boxShadow: "0 0 0 1px rgba(34,197,94,0.2), 0 8px 30px -10px rgba(34,197,94,0.12)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-green-400" />
                <h2 className="text-sm font-semibold text-foreground">{getText(t.recruiter.contribution, lang)}</h2>
              </div>
              <motion.ul
                className="space-y-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {recruiterData.immediate_contribution_30_days[lang as keyof typeof recruiterData.immediate_contribution_30_days].map(
                  (item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-foreground-muted"
                      variants={listItemVariants}
                    >
                      <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">→</span>
                      <p className="min-w-0">{item}</p>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
