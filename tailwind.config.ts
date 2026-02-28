// tailwind.config.ts - Konfigurasi Tailwind CSS dengan tema custom
import type { Config } from "tailwindcss";

const config: Config = {
  // Mengatur source file yang dipindai Tailwind
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Mode gelap berdasarkan class
  darkMode: "class",
  theme: {
    extend: {
      // Font custom dari Google Fonts
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      // Warna brand custom
      colors: {
        brand: {
          violet: "#7c3aed",
          indigo: "#4f46e5",
          cyan: "#06b6d4",
          dark: "#0a0a0f",
          "dark-2": "#111118",
          "dark-3": "#1a1a2e",
        },
      },
      // Animasi custom
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "gradient-shift": "gradientShift 6s ease infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      // Gradient kustom
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 60%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.05) 100%)",
      },
      // Blur kustom untuk efek glassmorphism
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
