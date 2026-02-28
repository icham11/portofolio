"use client";
// src/components/sections/Navbar.tsx - Navigasi utama yang sticky dan responsif
// Dengan active link highlighting, efek blur pada scroll, language toggle & dark/light toggle

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLang } from "@/providers/LanguageProvider";
import { t, getText } from "@/lib/i18n/translations";
import { LogoIcon } from "@/components/ui/LogoIcon";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Hooks for Theme and Language
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  // Handle hydration mismatch for next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Deteksi scroll untuk mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup mobile menu saat navigasi
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Daftar navigasi dinamis dengan terjemahan
  const navLinks = [
    { href: "/", label: getText(t.nav.home, lang) },
    { href: "/about", label: getText(t.nav.about, lang) },
    { href: "/projects", label: getText(t.nav.projects, lang) },
    { href: "/simulator", label: getText(t.nav.simulator, lang) },
    { href: "/ai-interview", label: getText(t.nav.aiInterview, lang) },
    { href: "/recruiter-mode", label: getText(t.nav.recruiterMode, lang) },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[rgba(248,247,255,0.85)] dark:bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm dark:shadow-lg"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="Wahid Nurhisyam Homepage"
          >
            {/* Custom SVG Logo */}
            <LogoIcon className="w-24 h-12 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-heading font-bold text-foreground hidden sm:block">
              Wahid<span className="gradient-text">N</span>
            </span>
          </Link>

          {/* Navigasi Desktop */}
          <ul className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-brand-violet dark:text-white"
                        : "text-foreground-subtle hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5",
                    )}
                  >
                    {/* Indikator active link */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600/10 to-indigo-600/10 dark:from-violet-600/20 dark:to-indigo-600/20 border border-violet-500/20 dark:border-violet-500/30"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions: Theme + Lang + CTA */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            {mounted && (
              <div className="flex items-center gap-1 bg-background-2 border border-border rounded-full p-1">
                {/* Language Toggle */}
                <button
                  onClick={toggleLang}
                  className="p-1.5 rounded-full text-foreground-subtle hover:text-foreground hover:bg-background-3 transition-colors flex items-center gap-1.5"
                  title={getText(t.nav.toggleLang, lang)}
                  aria-label="Toggle language"
                >
                  <Languages className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase w-5 text-center">{lang}</span>
                </button>
                
                {/* Divider */}
                <span className="w-px h-4 bg-border mx-1"></span>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-1.5 rounded-full text-foreground-subtle hover:text-foreground hover:bg-background-3 transition-colors"
                  title={getText(t.nav.toggleTheme, lang)}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            <Link href="/contact" className="btn-primary text-sm py-2 px-5 hidden xl:flex">
              {getText(t.nav.hireMe, lang)}
            </Link>
          </div>

          {/* Mobile Right Actions (Theme + Menu) */}
          <div className="flex items-center gap-2 xl:hidden">
            {mounted && (
              <div className="flex items-center gap-1 bg-background-2 border border-border rounded-full p-1 mr-2">
                <button
                  onClick={toggleLang}
                  className="p-1.5 rounded-full text-foreground-subtle hover:text-foreground transition-colors flex items-center"
                >
                  <span className="text-xs font-bold uppercase">{lang}</span>
                </button>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-1.5 rounded-full text-foreground-subtle hover:text-foreground transition-colors"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            )}
            
            <button
              className="p-2 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-[rgba(248,247,255,0.95)] dark:bg-[rgba(10,10,15,0.95)] backdrop-blur-xl border-t border-black/5 dark:border-white/5 overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-violet-600/10 dark:bg-violet-600/20 text-brand-violet dark:text-white border border-violet-500/20 dark:border-violet-500/30"
                          : "text-foreground-subtle hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center text-sm"
                >
                  {getText(t.nav.hireMe, lang)}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
