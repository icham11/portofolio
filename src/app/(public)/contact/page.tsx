"use client";
// src/app/(public)/contact/page.tsx
// Enhanced: floating input labels, split-entrance (left/right), animated success sequence
// Artistic social link hover with spring physics

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  Loader2,
  Check,
  AlertCircle,
  Sparkles,
  Clock,
} from "lucide-react";
import profile from "@/content/profile.json";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Reusable floating-label input field
function FloatingField({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  required,
  rows,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  const baseClass =
    "w-full bg-black/5 dark:bg-white/5 border rounded-xl px-4 pt-6 pb-2 text-sm text-foreground outline-none transition-all duration-200 resize-none";
  const borderClass = focused
    ? "border-brand-violet/60 bg-brand-violet/5 dark:bg-brand-violet/10 shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
    : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20";

  return (
    <div className="relative">
      {/* Floating label */}
      <motion.label
        htmlFor={id}
        className="absolute left-4 pointer-events-none text-foreground-subtle font-medium origin-left"
        animate={{
          top: isFloated ? "8px" : "50%",
          y: isFloated ? "0%" : "-50%",
          fontSize: isFloated ? "10px" : "13px",
          color: focused ? "rgb(139, 92, 246)" : "rgba(120, 110, 160, 0.8)",
          letterSpacing: isFloated ? "0.05em" : "0em",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ top: "50%", y: "-50%" }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </motion.label>

      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClass} ${borderClass}`}
          style={{ paddingTop: "1.5rem" }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClass} ${borderClass}`}
        />
      )}
    </div>
  );
}

// Social link with spring hover
function SocialLink({
  href,
  icon: Icon,
  label,
  iconBg,
  iconColor,
  delay,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  iconBg: string;
  iconColor: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm text-foreground-muted hover:text-foreground transition-colors group"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
    >
      <motion.div
        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${iconBg}`}
        whileHover={{ scale: 1.15, rotate: -6 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </motion.div>
      <span>{label}</span>
    </motion.a>
  );
}

export default function ContactPage() {
  const { lang } = useLang();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const isFormValid = form.name && form.email && form.subject && form.message;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative" style={{ overflowX: "clip" }}>
      {/* Background orb — clamped so it cannot overflow mobile viewport */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "min(600px, 100vw)",
          height: "min(400px, 60vw)",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge-gradient mb-4 inline-block">{getText(t.contact.badge, lang)}</span>
          <h1 className="font-heading font-bold text-foreground mt-3 mb-3">
            {getText(t.contact.heading, lang)}{" "}
            <span className="gradient-text">{getText(t.contact.headingHighlight, lang)}</span>
          </h1>
          <p className="text-foreground-muted max-w-lg mx-auto">
            {profile.cta[lang as keyof typeof profile.cta]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact form — enters from left */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Card shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(139,92,246,0.04) 50%, transparent 70%)",
                  backgroundSize: "300% 100%",
                }}
                animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              <AnimatePresence mode="wait">
                {/* === Success state === */}
                {status === "success" ? (
                  <motion.div
                    key="success"
                    className="text-center py-10"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Animated checkmark rings */}
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      {[0, 1].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border border-green-400/30"
                          animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                        />
                      ))}
                      <motion.div
                        className="relative z-10 w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                      >
                        <Check className="w-9 h-9 text-green-400" />
                      </motion.div>
                    </div>
                    <motion.h3
                      className="font-heading font-bold text-foreground mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {getText(t.contact.successTitle, lang)}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-foreground-muted mb-6"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {getText(t.contact.successSub, lang)}
                    </motion.p>
                    <motion.button
                      onClick={() => setStatus("idle")}
                      className="btn-outline text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {getText(t.contact.sendAnother, lang)}
                    </motion.button>
                  </motion.div>
                ) : (
                  /* === Form === */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingField
                        id="name"
                        name="name"
                        label={getText(t.contact.nameLabel, lang)}
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <FloatingField
                        id="email"
                        name="email"
                        type="email"
                        label={getText(t.contact.emailLabel, lang)}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <FloatingField
                      id="subject"
                      name="subject"
                      label={getText(t.contact.subjectLabel, lang)}
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />

                    <FloatingField
                      id="message"
                      name="message"
                      label={getText(t.contact.messageLabel, lang)}
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />

                    {/* Error */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          className="flex items-center gap-2 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl p-3"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading" || !isFormValid}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {getText(t.contact.sending, lang)}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {getText(t.contact.send, lang)}
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar — enters from right */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Availability */}
            <motion.div
              className="glass-card p-5"
              whileHover={{ scale: 1.02, boxShadow: "0 0 0 1px rgba(34,197,94,0.2), 0 6px 24px -8px rgba(34,197,94,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  {getText(t.contact.available, lang)}
                </span>
              </div>
              <p className="text-xs text-foreground-muted mb-2">{profile.availability}</p>
              <div className="flex items-center gap-1.5 text-xs text-foreground-subtle mt-2">
                <Clock className="w-3 h-3" />
                <span>WIB (UTC+7)</span>
              </div>
            </motion.div>

            {/* Social links */}
            <div className="glass-card p-5 space-y-3">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {getText(t.contact.findMeAt, lang)}
              </h3>
              <SocialLink
                href={profile.links.github}
                icon={Github}
                label="github.com/icham11"
                iconBg="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                iconColor="text-foreground"
                delay={0.3}
              />
              <SocialLink
                href={profile.links.linkedin}
                icon={Linkedin}
                label="in/wahid-nurhisyam"
                iconBg="bg-blue-600/10 border-blue-500/20 hover:border-blue-500/50"
                iconColor="text-blue-500 dark:text-blue-400"
                delay={0.38}
              />
              <SocialLink
                href={`mailto:${profile.links.email}`}
                icon={Mail}
                label={profile.links.email}
                iconBg="bg-brand-violet/10 border-brand-violet/20 hover:border-brand-violet/50"
                iconColor="text-brand-violet"
                delay={0.46}
              />
            </div>

            {/* Fun fact card */}
            <motion.div
              className="glass-card p-5 border-brand-violet/20 bg-brand-violet/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-violet" />
                <span className="text-xs font-semibold text-brand-violet uppercase tracking-wider">
                  Pro tip
                </span>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {lang === "id"
                  ? "Respon biasanya dalam 1×24 jam. Untuk proyek urgent, mention saja di pesan."
                  : "Usually replies within 24h. For urgent projects, mention it in your message."}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
