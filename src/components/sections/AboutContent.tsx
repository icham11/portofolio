"use client";
// src/components/sections/AboutContent.tsx - Konten halaman About
// Timeline karir, skills, dan sertifikasi Wahid Nurhisyam

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Award, Calendar, ArrowRight } from "lucide-react";
import profile from "@/content/profile.json";
import achievements from "@/content/achievements.json";
import { formatDate } from "@/lib/utils";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

const timelineColors: Record<string, string> = {
  foundation: "border-foreground-subtle bg-black/5 dark:bg-white/5",
  education: "border-brand-indigo bg-brand-indigo/10",
  project: "border-brand-violet bg-brand-violet/10",
  present: "border-brand-cyan bg-brand-cyan/10",
};

export function AboutContent() {
  const { lang } = useLang();
  const timeline = t.about.timeline[lang] as unknown as any[];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-gradient mb-4 inline-block">{getText(t.about.badge, lang)}</span>
          <h1 className="font-heading font-black text-foreground mt-3 mb-4">
            {getText(t.about.heading, lang)} <span className="gradient-text">{getText(t.about.headingHighlight, lang)}</span>
          </h1>
          <p className="text-lg text-foreground-muted leading-relaxed max-w-2xl">
            {profile.about[lang]}
          </p>
        </motion.div>

        {/* Core strengths — staggered grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
        >
          {profile.core_strengths.map((strength, i) => (
            <motion.div
              key={i}
              className="glass-card p-4 flex items-start gap-3"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 0 1px rgba(139,92,246,0.25), 0 4px 20px -8px rgba(139,92,246,0.2)" }}
            >
              <span className="text-brand-violet font-mono text-lg">
                0{i + 1}
              </span>
              <p className="text-sm text-foreground-muted">{strength[lang]}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline with alternating entrance animations */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-heading font-bold text-foreground mb-8">
            {getText(t.about.journeyTitle, lang)}{" "}
            <span className="gradient-text">{getText(t.about.journeyHighlight, lang)}</span>
          </h2>

          <div className="relative">
            {/* Animated vertical line */}
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <div className="space-y-5">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative pl-10 sm:pl-14"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Animated timeline dot — positioned relative to reduced gutter */}
                  <div
                    className={`absolute left-2 sm:left-3.5 top-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${timelineColors[item.type]} flex items-center justify-center`}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-current opacity-60"
                      animate={{ scale: item.highlight ? [1, 1.4, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Card with hover glow */}
                  <motion.div
                    className={`glass-card p-5 ${item.highlight ? "border-brand-violet/30 bg-brand-violet/5" : ""}`}
                    whileHover={{
                      scale: 1.015,
                      boxShadow: "0 0 0 1px rgba(139,92,246,0.2), 0 8px 30px -12px rgba(139,92,246,0.2)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-foreground-subtle" />
                      <span className="text-xs font-mono text-foreground-subtle">
                        {item.year}
                      </span>
                      {item.highlight && (
                        <span className="badge-gradient text-xs status-live ml-1">
                          {getText(t.about.highlightBadge, lang)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-bold text-foreground mb-8">
            <span className="gradient-text">{getText(t.about.certTitle, lang)}</span>
          </h2>

          <div className="space-y-3">
            {achievements.certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 sm:p-5 flex items-start gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.015,
                  boxShadow: "0 0 0 1px rgba(139,92,246,0.25), 0 6px 24px -8px rgba(139,92,246,0.2)",
                }}
              >
                <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 flex-shrink-0">
                  <Award className="w-4 h-4 text-brand-violet" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-0.5">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {cert.authority} · {formatDate(cert.issued_at)}
                      </p>
                    </div>
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-brand-violet hover:text-violet-600 dark:hover:text-violet-300 transition-colors flex-shrink-0"
                      >
                        {getText(t.about.verify, lang)} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-foreground-subtle mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/projects" className="btn-primary inline-flex">
              {getText(t.about.seeProjects, lang)} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
