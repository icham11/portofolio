"use client";
// src/components/sections/Footer.tsx
// Enhanced: staggered nav links, spring hover on social icons, animated availability badge

import Link from "next/link";
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import profile from "@/content/profile.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";
import { LogoIcon } from "@/components/ui/LogoIcon";

// Stagger variants for lists
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLang();

  const navLinks = [
    { href: "/", label: getText(t.nav.home, lang) },
    { href: "/about", label: getText(t.nav.about, lang) },
    { href: "/projects", label: getText(t.nav.projects, lang) },
    { href: "/ai-interview", label: getText(t.nav.aiInterview, lang) },
    { href: "/simulator", label: getText(t.nav.simulator, lang) },
    { href: "/recruiter-mode", label: getText(t.nav.recruiterMode, lang) },
  ];

  const socialLinks = [
    {
      href: profile.links.github,
      icon: Github,
      label: "github.com/icham11",
      color: "group-hover:text-brand-violet",
    },
    {
      href: profile.links.linkedin,
      icon: Linkedin,
      label: "in/wahid-nurhisyam",
      color: "group-hover:text-brand-indigo",
    },
    {
      href: `mailto:${profile.links.email}`,
      icon: Mail,
      label: profile.links.email,
      color: "group-hover:text-brand-cyan",
    },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-background-card backdrop-blur-xl overflow-hidden">
      {/* Subtle background gradient orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-3 group w-fit">
              <LogoIcon className="w-24 h-12 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-heading font-bold text-foreground">
                Wahid<span className="gradient-text">N</span>
              </span>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
              {profile.headline[lang]}
            </p>
          </motion.div>

          {/* Navigation column — staggered */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {getText(t.footer.navigation, lang)}
            </h3>
            <motion.ul
              className="space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={listItemVariants}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-brand-violet transition-colors duration-200 relative group inline-block"
                  >
                    {link.label}
                    {/* Underline slide-in on hover */}
                    <span className="absolute bottom-0 left-0 h-px bg-brand-violet w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Social / Contact column — spring icon hover */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {getText(t.footer.connect, lang)}
            </h3>
            <div className="space-y-3">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${color}`} />
                  </motion.span>
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-foreground-subtle">
            © {currentYear} Wahid Nurhisyam. {getText(t.footer.builtWith, lang)}
          </p>
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-foreground-subtle">
              <Sparkles className="w-3 h-3 text-brand-violet" />
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {getText(t.footer.available, lang)}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
