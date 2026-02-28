"use client";
// src/app/simulator/page.tsx - Incident Simulator: real engineering debugging scenarios
// Step-by-step debugging flow dari 3 insiden production nyata

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Bug,
  Wrench,
} from "lucide-react";

interface Step {
  label: string;
  detail: string;
  type: "observe" | "diagnose" | "fix" | "verify";
}

interface Incident {
  id: string;
  title: string;
  emoji: string;
  severity: "critical" | "high" | "medium";
  context: string;
  error: string;
  steps: Step[];
  lesson: string;
}

import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

const severityColors: Record<string, string> = {
  critical: "text-red-400 border-red-500/30 bg-red-500/5",
  high: "text-orange-400 border-orange-500/30 bg-orange-500/5",
  medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/5",
};

const stepTypeConfig: Record<
  string,
  {
    label: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  observe: {
    label: "Observe",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    icon: Bug,
  },
  diagnose: {
    label: "Diagnose",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: AlertTriangle,
  },
  fix: {
    label: "Fix",
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    icon: Wrench,
  },
  verify: {
    label: "Verify",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
    icon: CheckCircle2,
  },
};

export default function SimulatorPage() {
  const { lang } = useLang();
  const incidents = t.simulator.incidents[lang];

  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<
    Record<string, Set<number>>
  >({});

  const toggleStep = (incidentId: string, stepIndex: number) => {
    setCompletedSteps((prev) => {
      const prevSet = prev[incidentId]
        ? new Set(prev[incidentId])
        : new Set<number>();
      if (prevSet.has(stepIndex)) {
        prevSet.delete(stepIndex);
      } else {
        prevSet.add(stepIndex);
      }
      return { ...prev, [incidentId]: prevSet };
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-gradient mb-4 inline-block">
            {getText(t.simulator.badge, lang)}
          </span>
          <h1 className="font-heading font-bold text-foreground mt-3 mb-4">
            {getText(t.simulator.heading, lang)} <span className="gradient-text">{getText(t.simulator.headingHighlight, lang)}</span>
          </h1>
          <p className="text-foreground-muted max-w-xl mx-auto">
            {getText(t.simulator.sub, lang)}
          </p>
        </motion.div>

        {/* Incident cards */}
        <div className="space-y-4">
          {incidents.map((incident, index) => {
            const isExpanded = expandedIncident === incident.id;
            const completed = completedSteps[incident.id];
            const completedCount = completed ? completed.size : 0;

            return (
              <motion.div
                key={incident.id}
                className={`glass-card border ${severityColors[incident.severity]} relative overflow-hidden`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 28, delay: index * 0.12 }}
                whileHover={{
                  boxShadow: incident.severity === "critical"
                    ? "0 0 0 1px rgba(239,68,68,0.2), 0 8px 30px -10px rgba(239,68,68,0.15)"
                    : incident.severity === "high"
                    ? "0 0 0 1px rgba(249,115,22,0.2), 0 8px 30px -10px rgba(249,115,22,0.15)"
                    : "0 0 0 1px rgba(234,179,8,0.2), 0 8px 30px -10px rgba(234,179,8,0.15)",
                }}
              >
                {/* Incident header - clickable */}
                <button
                  onClick={() =>
                    setExpandedIncident(isExpanded ? null : incident.id)
                  }
                  className="w-full p-6 text-left flex items-start gap-4"
                  aria-expanded={isExpanded}
                >
                  <span className="text-3xl flex-shrink-0">
                    {incident.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {/* Severity badge with pulse ring */}
                      <span className="relative inline-flex items-center">
                        {incident.severity === "critical" && (
                          <motion.span
                            className="absolute inset-0 rounded-full border border-red-400/50"
                            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                        <span
                          className={`badge-gradient text-xs px-2 py-0.5 capitalize ${
                            incident.severity === "critical" ? "status-live" : "status-progress"
                          }`}
                        >
                          {incident.severity}
                        </span>
                      </span>
                      {completedCount > 0 && (
                        <span className="text-xs text-foreground-subtle font-mono">
                          {completedCount}/{incident.steps.length} {getText(t.simulator.stepsDone, lang)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-semibold text-foreground text-sm sm:text-base">
                      {incident.title}
                    </h2>
                    <p className="text-sm text-foreground-muted mt-1 line-clamp-2">
                      {incident.context}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-foreground-subtle" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-foreground-subtle" />
                    )}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        {/* Error message — scrollable horizontally so long strings don't break layout */}
                        <div className="mb-6 p-3 rounded-lg bg-red-500/5 border border-red-500/20 overflow-x-auto">
                          <p className="text-xs text-red-400 font-mono whitespace-nowrap">
                            {incident.error}
                          </p>
                        </div>

                        {/* Steps — staggered reveal when panel opens */}
                        <motion.div
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                          {incident.steps.map((step, stepIndex) => {
                            const config = stepTypeConfig[step.type];
                            const StepIcon = config.icon;
                            const isDone = completed?.has(stepIndex);

                            return (
                              <motion.div
                                key={stepIndex}
                                className={`rounded-xl border p-4 cursor-pointer transition-colors duration-200 ${
                                  isDone
                                    ? "bg-green-500/5 border-green-500/20"
                                    : "bg-white/2 border-white/10 hover:border-white/20"
                                }`}
                                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                                onClick={() => toggleStep(incident.id, stepIndex)}
                                whileHover={{ scale: 1.015 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <div className="flex items-start gap-3">
                                  {/* Animated step number → checkmark */}
                                  <motion.div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                                      isDone
                                        ? "bg-green-500 text-white"
                                        : "bg-black/10 dark:bg-white/10 text-foreground-subtle"
                                    }`}
                                    animate={{ scale: isDone ? [1, 1.2, 1] : 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepIndex + 1}
                                  </motion.div>

                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${config.color}`}>
                                        <StepIcon className="w-3 h-3" />
                                        {getText(t.simulator.stepTypes[step.type as keyof typeof t.simulator.stepTypes], lang)}
                                      </span>
                                      <span className={`text-sm font-medium ${
                                        isDone ? "text-green-500 dark:text-green-400 line-through" : "text-foreground"
                                      }`}>
                                        {step.label}
                                      </span>
                                    </div>
                                    <p className="text-xs text-foreground-muted leading-relaxed">{step.detail}</p>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </motion.div>

                        {/* Lesson learned — slides in after steps */}
                        <motion.div
                          className="mt-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/20"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: incident.steps.length * 0.08 + 0.1 }}
                        >
                          <p className="text-xs text-brand-violet font-mono mb-1">
                            {getText(t.simulator.lessonTitle, lang)}
                          </p>
                          <p className="text-sm text-foreground-muted leading-relaxed">
                            {incident.lesson}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
