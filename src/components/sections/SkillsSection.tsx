"use client";
// src/components/sections/SkillsSection.tsx - Skills grouped by real-world use case
// Enhanced: 3D entrance animations, glow card hover, staggered tech chip appearances

import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Database,
  BrainCircuit,
  Link2,
  Rocket,
} from "lucide-react";
import profile from "@/content/profile.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

// Skill category configuration
const skillCategories = [
  {
    icon: Globe,
    category: "Frontend",
    label: "UI & Product Layer",
    color: "text-violet-400",
    borderColor: "border-violet-500/20",
    bgColor: "bg-violet-500/5",
    glowColor: "rgba(139, 92, 246, 0.3)",
    description: "Building responsive, performant interfaces users love",
    techs: profile.tech_stack.frontend,
  },
  {
    icon: Server,
    category: "Backend",
    label: "API & Server Layer",
    color: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    bgColor: "bg-indigo-500/5",
    glowColor: "rgba(79, 70, 229, 0.3)",
    description: "Designing robust APIs with proper auth, RBAC, and validation",
    techs: profile.tech_stack.backend,
  },
  {
    icon: Database,
    category: "Database",
    label: "Data & Persistence Layer",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    bgColor: "bg-cyan-500/5",
    glowColor: "rgba(6, 182, 212, 0.3)",
    description: "Schema design, transactions, consistency, and vector search",
    techs: profile.tech_stack.database,
  },
  {
    icon: BrainCircuit,
    category: "AI / ML",
    label: "Intelligence Layer",
    color: "text-pink-400",
    borderColor: "border-pink-500/20",
    bgColor: "bg-pink-500/5",
    glowColor: "rgba(236, 72, 153, 0.3)",
    description: "RAG pipelines, embedding search, streaming chat interfaces",
    techs: profile.tech_stack.ai,
  },
  {
    icon: Link2,
    category: "Integrations",
    label: "Third-party & Payments",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/20",
    bgColor: "bg-yellow-500/5",
    glowColor: "rgba(234, 179, 8, 0.3)",
    description: "Payment gateways, OAuth, image CDN, and webhook handling",
    techs: profile.tech_stack.integrations,
  },
  {
    icon: Rocket,
    category: "Deployment",
    label: "Infrastructure & DevOps",
    color: "text-green-400",
    borderColor: "border-green-500/20",
    bgColor: "bg-green-500/5",
    glowColor: "rgba(34, 197, 94, 0.3)",
    description: "CI/CD, production deployment, monitoring, and edge functions",
    techs: profile.tech_stack.deployment,
  },
];

// Stagger variants for chips inside each card
const chipContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const chipVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function SkillsSection() {
  const { lang } = useLang();

  const getCategoryTranslation = (categoryId: string) => {
    switch (categoryId) {
      case "Frontend": return { label: getText(t.skills.categories.frontend, lang), desc: getText(t.skills.descriptions.frontend, lang) };
      case "Backend": return { label: getText(t.skills.categories.backend, lang), desc: getText(t.skills.descriptions.backend, lang) };
      case "Database": return { label: getText(t.skills.categories.database, lang), desc: getText(t.skills.descriptions.database, lang) };
      case "AI / ML": return { label: getText(t.skills.categories.ai, lang), desc: getText(t.skills.descriptions.ai, lang) };
      case "Integrations": return { label: getText(t.skills.categories.integrations, lang), desc: getText(t.skills.descriptions.integrations, lang) };
      case "Deployment": return { label: getText(t.skills.categories.deployment, lang), desc: getText(t.skills.descriptions.deployment, lang) };
      default: return { label: "", desc: "" };
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle section background orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(79, 70, 229, 0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge-gradient mb-4 inline-block">{getText(t.skills.badge, lang)}</span>
          <h2 className="font-heading font-bold text-foreground mt-3">
            {getText(t.skills.heading, lang)}{" "}
            <span className="gradient-text">{getText(t.skills.headingHighlight, lang)}</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto mt-3">
            {getText(t.skills.sub, lang)}
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, index) => {
            const Icon = cat.icon;
            const translated = getCategoryTranslation(cat.category);
            return (
              <motion.div
                key={cat.category}
                className={`glass-card glow-card p-5 ${cat.bgColor} border ${cat.borderColor} overflow-hidden relative`}
                initial={{ opacity: 0, y: 40, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 0 0 1px ${cat.glowColor}, 0 10px 40px -12px ${cat.glowColor}`,
                  transition: { duration: 0.25 },
                }}
              >
                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, ${cat.glowColor.replace("0.3", "0.08")} 50%, transparent 60%)`,
                    backgroundSize: "300% 100%",
                  }}
                  initial={{ backgroundPosition: "-100% 0" }}
                  whileHover={{ backgroundPosition: "200% 0" }}
                  transition={{ duration: 0.7 }}
                />

                {/* Icon + Label */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className={`p-2 rounded-lg ${cat.bgColor} border ${cat.borderColor}`}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </motion.div>
                  <div>
                    <h3 className={`text-sm font-semibold ${cat.color}`}>
                      {cat.category}
                    </h3>
                    <p className="text-xs text-foreground-subtle font-mono">
                      {translated.label}
                    </p>
                  </div>
                </div>

                {/* Context description */}
                <p className="text-xs text-foreground-muted mb-3 leading-relaxed">
                  {translated.desc}
                </p>

                {/* Tech chips — staggered appearance */}
                <motion.div
                  className="flex flex-wrap gap-1.5"
                  variants={chipContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {cat.techs.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={chipVariants}
                      className="px-2 py-0.5 text-xs font-mono text-foreground-muted bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
