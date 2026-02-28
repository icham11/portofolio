"use client";
// src/providers/AppProviders.tsx
// Wrapper tunggal untuk semua providers: ThemeProvider + LanguageProvider
// Diletakkan di layout.tsx agar semua halaman bisa akses context

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    // ThemeProvider dari next-themes: menangani dark/light mode
    // attribute="class" → menambah class "dark" ke <html>
    // defaultTheme="dark" → default tampilan gelap sesuai desain portofolio
    // enableSystem → baca preferensi sistem operasi pengguna
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {/* LanguageProvider: menangani toggle bahasa EN/ID */}
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
