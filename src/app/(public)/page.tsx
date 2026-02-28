// src/app/(public)/page.tsx - Halaman beranda portfolio
// Menampilkan hero, projects preview, dan skills highlight

import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CTASection } from "@/components/sections/CTASection";

// Metadata halaman beranda
export const metadata: Metadata = {
  title: "Wahid Nurhisyam — Captain & Fullstack Developer",
  description:
    "Portfolio Wahid Nurhisyam — Fullstack developer yang membangun produk end-to-end dengan Next.js, TypeScript, PostgreSQL, dan AI integration. Coba AI Interview Mode.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero section dengan CTA utama */}
      <HeroSection />

      {/* Block skills section */}
      <SkillsSection />

      {/* Preview 2 proyek utama */}
      <ProjectsPreview />

      {/* CTA strip sebelum footer */}
      <CTASection />
    </>
  );
}
