"use client";
// src/components/sections/ProjectsPreview.tsx - Preview 2 proyek utama di homepage
// Dengan link ke halaman Projects lengkap

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Zap } from "lucide-react";
import projectsData from "@/content/projects.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

const statusConfig: Record<string, { labelKey: keyof typeof t.status; className: string }> = {
  live: { labelKey: "live", className: "status-live" },
  in_progress: { labelKey: "in_progress", className: "status-progress" },
  completed: { labelKey: "completed", className: "status-live" },
  active: { labelKey: "active", className: "status-live" },
};

export function ProjectsPreview() {
  const { lang } = useLang();
  const projects = projectsData.projects.slice(0, 2);

  return (
    <section id="projects-preview" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-gradient mb-4 inline-block">
            {getText(t.projects.badge, lang)}
          </span>
          <h2 className="font-heading font-bold text-foreground mt-3">
            {getText(t.projects.heading, lang)} <span className="gradient-text">{getText(t.projects.headingHighlight, lang)}</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto mt-3">
            {getText(t.projects.sub, lang)}
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => {
            const status =
              statusConfig[project.status] || statusConfig.in_progress;
            const allTech = Object.values(project.tech).flat();

            return (
              <motion.article
                key={project.slug}
                className="glass-card p-6 flex flex-col gap-4 group relative overflow-hidden"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 0 1px rgba(139,92,246,0.3), 0 12px 45px -14px rgba(139,92,246,0.35), 0 20px 60px -20px rgba(6,182,212,0.15)",
                  transition: { duration: 0.25 },
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`badge-gradient ${status.className} text-xs px-2 py-0.5`}
                      >
                        {getText(t.status[status.labelKey], lang)}
                      </span>
                      <span className="text-xs text-foreground-subtle font-mono">
                        {(project.type as any)[lang]}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-xl">
                      {project.title}
                    </h3>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      {(project.role as any)[lang]} · {project.period}
                    </p>
                  </div>
                  <Zap className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                </div>

                {/* Summary */}
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {(project.summary as any)[lang]}
                </p>

                {/* Problem → Solution strip — stacks vertically on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 rounded-lg p-3">
                    <p className="text-xs text-red-500 dark:text-red-400 font-mono mb-1">
                      {getText(t.projects.problemLabel, lang)}
                    </p>
                    <p className="text-xs text-foreground-muted line-clamp-3">
                      {(project.problem as any)[lang]}
                    </p>
                  </div>
                  <div className="bg-green-500/5 dark:bg-green-500/10 border border-green-500/10 dark:border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-600 dark:text-green-400 font-mono mb-1">
                      {getText(t.projects.solutionLabel, lang)}
                    </p>
                    <p className="text-xs text-foreground-muted line-clamp-3">
                      {(project.solution as any)[lang]}
                    </p>
                  </div>
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {allTech.slice(0, 6).map((tech) => (
                    <span key={tech} className="badge-gradient text-xs">
                      {tech}
                    </span>
                  ))}
                  {allTech.length > 6 && (
                    <span className="text-xs text-foreground-subtle self-center">
                      +{allTech.length - 6} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1 border-t border-border">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-brand-cyan hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {getText(t.projects.liveDemo, lang)}
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      {getText(t.projects.repository, lang)}
                    </a>
                  )}
                  <Link
                    href={`/projects#${project.slug}`}
                    className="ml-auto flex items-center gap-1 text-xs text-brand-violet hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
                  >
                    {getText(t.projects.caseStudy, lang)} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/projects" className="btn-outline inline-flex">
              {getText(t.projects.viewAll, lang)}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
