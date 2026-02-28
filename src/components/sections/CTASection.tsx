"use client";
// src/components/sections/CTASection.tsx - Call-to-action strip sebelum footer
// Enhanced: multi-ring ripple, animated gradient mesh, shimmer card border

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import profile from "@/content/profile.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

export function CTASection() {
  const { lang } = useLang();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient mesh */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(139, 92, 246, 0.07) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="glass-card gradient-border p-10 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            boxShadow: "0 0 0 1px rgba(139,92,246,0.3), 0 20px 60px -15px rgba(139,92,246,0.3)",
          }}
        >
          {/* Shimmer sweep on the card */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(139,92,246,0.06) 50%, rgba(6,182,212,0.04) 55%, transparent 70%)",
              backgroundSize: "300% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Animated multi-ring ripple icon */}
          <div className="flex justify-center mb-8">
            <div className="relative flex items-center justify-center w-20 h-20">
              {/* Outer ripple rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-violet-500/30"
                  animate={{ scale: [1, 2.2 + i * 0.3], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeOut",
                  }}
                />
              ))}
              {/* Center icon */}
              <motion.div
                className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>

          <motion.h2
            className="font-heading font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {getText(t.cta.heading, lang)}{" "}
            <span className="gradient-text">{getText(t.cta.headingHighlight, lang)}</span>
          </motion.h2>
          <motion.p
            className="text-foreground-muted max-w-lg mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {profile.cta[lang]}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                {getText(t.cta.connect, lang)}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/ai-interview"
                className="btn-outline w-full sm:w-auto border-brand-cyan/30 hover:border-brand-cyan"
              >
                <Bot className="w-4 h-4 text-brand-cyan" />
                <span className="text-brand-cyan">{getText(t.cta.askAI, lang)}</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
