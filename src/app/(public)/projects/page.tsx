// src/app/(public)/projects/page.tsx - Halaman Projects dengan case study cards
import type { Metadata } from "next";
import { ProjectsContent } from "@/components/sections/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case study proyek Wahid Nurhisyam — Cuanify (SME operations platform) dan AI Portfolio. Problem, solution, tech decisions, dan impact.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
