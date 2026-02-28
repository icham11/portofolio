"use client";
// src/components/sections/ProjectsContent.tsx - Full projects page with case studies

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Users,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import projectsData from "@/content/projects.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

const statusConfig: Record<string, { label: string; className: string }> = {
  live: { label: "Live", className: "status-live" },
  in_progress: { label: "In Progress", className: "status-progress" },
};

export function ProjectsContent() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-gradient mb-4 inline-block">{getText(t.projects.fullCaseStudy, lang)}</span>
          <h1 className="font-heading font-black text-foreground mt-3 mb-4">
            {getText(t.projects.pageHeading, lang)}{" "}
            <span className="gradient-text">{getText(t.projects.pageHighlight, lang)}</span>
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            {getText(t.projects.pageSub, lang)}
          </p>
        </motion.div>

        {/* Project case studies */}
        <div className="space-y-12">
          {projectsData.projects.map((project, index) => {
            const status =
              statusConfig[project.status] || statusConfig.in_progress;
            const allTechs = Object.entries(project.tech);

            return (
              <motion.article
                key={project.slug}
                id={project.slug}
                className="glass-card p-5 sm:p-8 relative overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  boxShadow: "0 0 0 1px rgba(139,92,246,0.2), 0 16px 60px -20px rgba(139,92,246,0.25)",
                }}
              >
                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(139,92,246,0.04) 50%, transparent 70%)",
                    backgroundSize: "300% 100%",
                  }}
                  initial={{ backgroundPosition: "-100% 0" }}
                  whileHover={{ backgroundPosition: "200% 0" }}
                  transition={{ duration: 0.8 }}
                />
                {/* Project header */}
                <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`badge-gradient ${status.className} text-xs px-3 py-0.5`}
                      >
                        {status.label}
                      </span>
                      <span className="text-xs text-foreground-subtle font-mono">
                        {project.type[lang as keyof typeof project.type]}
                      </span>
                      <span className="text-xs text-foreground-subtle font-mono">
                        {project.period}
                      </span>
                    </div>
                  <h2 className="font-heading font-black text-foreground text-xl sm:text-2xl md:text-3xl">
                    {project.title}
                  </h2>
                    <p className="text-foreground-muted mt-1">{project.role[lang as keyof typeof project.role]}</p>
                  </div>
                  <Zap className="w-8 h-8 text-violet-400 flex-shrink-0" />
                </div>

                {/* Team */}
                <div className="flex items-center gap-2 mb-6 text-sm text-foreground-muted">
                  <Users className="w-4 h-4" />
                  <span>{getText(t.projects.teamLabel, lang)}: {project.team.join(", ")}</span>
                </div>

                {/* Summary */}
                <p className="text-foreground-muted text-base leading-relaxed mb-8">
                  {project.summary[lang as "id" | "en"]}
                </p>

                {/* Problem / Solution / Impact grid — stacks on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {/* Problem */}
                  <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
                      <span className="text-sm font-semibold text-red-500 dark:text-red-400">
                        {getText(t.projects.problemLabel, lang)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {project.problem[lang as "id" | "en"]}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="bg-brand-violet/5 border border-brand-violet/15 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-brand-violet" />
                      <span className="text-sm font-semibold text-brand-violet">
                        {getText(t.projects.solutionLabel, lang)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {project.solution[lang as "id" | "en"]}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span className="text-sm font-semibold text-green-500 dark:text-green-400">
                        {getText(t.projects.impactLabel, lang)}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {project.impact[lang as "id" | "en"].map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-foreground-muted flex items-start gap-1.5"
                        >
                          <span className="text-green-500 dark:text-green-400 mt-0.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Features list — staggered chips */}
                {project.features && project.features[lang as "id" | "en"]?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {getText(t.projects.keyFeatures, lang)}
                    </h3>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                    >
                      {project.features[lang as "id" | "en"].map((feature, i) => (
                        <motion.span
                          key={i}
                          variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }}
                          className="flex items-center gap-1.5 text-xs text-foreground-muted bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5"
                          whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.4)" }}
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-500 dark:text-green-400" />
                          {feature}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Tech stack breakdown */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {getText(t.projects.techStack, lang)}
                  </h3>
                  <div className="space-y-2">
                    {allTechs.map(([category, techs]) => (
                      <div
                        key={category}
                        className="flex items-center gap-3 flex-wrap"
                      >
                        <span className="text-xs text-foreground-subtle font-mono w-20 capitalize">
                          {category}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(techs as string[]).map((tech) => (
                            <span key={tech} className="badge-gradient text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                {project.challenges && project.challenges[lang as "id" | "en"]?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {getText(t.projects.challenges, lang)}
                    </h3>
                    <div className="space-y-2">
                      {project.challenges[lang as "id" | "en"].map((challenge, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground-muted"
                        >
                          <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                          {challenge}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-black/5 dark:border-white/5 flex-wrap">
                  {project.links.live && (
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-brand-cyan hover:opacity-80 transition-opacity font-medium"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {getText(t.projects.liveDemo, lang)}
                    </motion.a>
                  )}
                  {project.links.repo && (
                    <motion.a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Github className="w-4 h-4" />
                      {getText(t.projects.repository, lang)}
                    </motion.a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
