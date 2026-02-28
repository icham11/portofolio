"use client";
// src/app/ai-interview/page.tsx - AI Interview Mode dengan RAG chat streaming
// Chat dengan Wahid AI yang menjawab berdasarkan profile + project data

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Loader2, RotateCcw, Info } from "lucide-react";

import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";

export default function AIInterviewPage() {
  const { lang } = useLang();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    setMessages,
  } = useChat({
    api: "/api/ai/chat",
  });

  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  // Ref pada container scroll chat — bukan window, agar halaman tidak ikut scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ke bawah di dalam container chat saat pesan baru masuk atau sedang loading
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    // Hanya auto-scroll jika pengguna sudah berada di dekat bagian bawah (< 80px dari bawah)
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      80;
    if (isNearBottom || isLoading) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Deteksi error service unavailable
  useEffect(() => {
    if (error) {
      setIsServiceAvailable(false);
    }
  }, [error]);

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setMessages([]);
    setIsServiceAvailable(true);
  };

  return (
    /*
     * Layout strategy:
     * - Div terluar: full height minus Navbar (64px) dengan overflow hidden
     *   supaya konten tidak meluber keluar halaman
     * - Kolom dalam: flex-col, messages area grow, input sticky di bawah
     */
    <div
      className="flex flex-col px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24"
      style={{ height: "100svh", overflow: "hidden" }}
    >
      <div className="max-w-3xl w-full mx-auto flex flex-col flex-1 min-h-0">
        {/* Header */}
        <motion.div
          className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 flex-shrink-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex-1">
            <span className="badge-gradient mb-2 inline-block">
              {getText(t.ai.badge, lang)}
            </span>
            <h1 className="font-heading font-bold text-foreground mt-1 text-xl sm:text-2xl">
              {getText(t.ai.heading, lang)}{" "}
              <span className="gradient-text">
                {getText(t.ai.headingHighlight, lang)}
              </span>
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              {getText(t.ai.sub, lang)}
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-foreground-subtle hover:text-foreground transition-colors sm:mt-1 flex-shrink-0 self-start sm:self-auto bg-white/5 sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded-md sm:rounded-none border border-white/10 sm:border-transparent"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {getText(t.ai.reset, lang)}
            </button>
          )}
        </motion.div>

        {/* Info banner */}
        <motion.div
          className="flex items-start gap-2 p-3 rounded-lg bg-brand-indigo/5 border border-brand-indigo/20 mb-3 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Info className="w-4 h-4 text-brand-indigo flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground-muted">
            <span className="text-brand-indigo font-medium">Wahid AI</span>{" "}
            {getText(t.ai.info, lang)}
          </p>
        </motion.div>

        {/* Chat messages area — flex-1 + min-h-0 agar bisa shrink dalam flex parent */}
        <div
          ref={chatContainerRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-4 mb-3 pr-1 scroll-smooth"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(139,92,246,0.3) transparent",
          }}
        >
          {/* Welcome state */}
          {messages.length === 0 && (
            <motion.div
              className="text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <p className="text-foreground-muted text-sm mb-6">
                {getText(t.ai.welcome, lang)}
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                {t.ai.suggestions[lang].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-xs px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground-muted hover:border-brand-violet/40 hover:text-foreground transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-indigo-600"
                      : "bg-gradient-to-br from-violet-600 to-indigo-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-indigo-600/20 border border-indigo-500/30 text-foreground"
                      : "glass-card text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass-card px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-brand-violet animate-spin" />
                <span className="text-xs text-foreground-subtle">
                  {getText(t.ai.thinking, lang)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Error state */}
          {!isServiceAvailable && (
            <div className="glass-card p-4 border-red-500/20 bg-red-500/5 text-center">
              <p className="text-sm text-red-500 dark:text-red-400 mb-2">
                {getText(t.ai.serviceDown, lang)}
              </p>
              <p className="text-xs text-foreground-muted">
                {getText(t.ai.setupHint, lang)}
              </p>
            </div>
          )}
        </div>

        {/* Input form — flex-shrink-0 agar selalu tampil di bawah */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center glass-card p-2 flex-shrink-0 mb-4"
        >
          <input
            ref={inputRef}
            id="chat-input"
            name="chat-input"
            value={input}
            onChange={handleInputChange}
            placeholder={getText(t.ai.placeholder, lang)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground-subtle outline-none px-3 py-2"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
