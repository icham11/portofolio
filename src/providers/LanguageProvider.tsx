"use client";
// src/providers/LanguageProvider.tsx
// Context untuk state bahasa (EN/ID) yang dibagikan ke seluruh aplikasi

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Lang } from "@/lib/i18n/translations";

// Shape dari context
interface LanguageContextValue {
  lang: Lang;               // Bahasa aktif saat ini
  toggleLang: () => void;   // Fungsi untuk toggle antara EN dan ID
  isID: boolean;            // Shortcut: true jika bahasa Indonesia aktif
}

// Default context value
const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggleLang: () => {},
  isID: false,
});

/**
 * Provider yang membungkus seluruh aplikasi
 * Menyimpan state bahasa di memory (reset saat refresh, bukan localStorage)
 * Bisa diextend ke localStorage jika diperlukan persistence
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default bahasa: Inggris
  const [lang, setLang] = useState<Lang>("en");

  // Toggle antara "en" dan "id"
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggleLang,
        isID: lang === "id",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook untuk mengakses language context di komponen manapun
 * Usage: const { lang, toggleLang } = useLang();
 */
export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}
