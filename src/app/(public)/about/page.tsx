// src/app/(public)/about/page.tsx - Halaman About dengan timeline dan skills
import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Perjalanan Wahid Nurhisyam dari bootcamp Hacktiv8 hingga membangun Cuanify. Lihat timeline, skills, dan sertifikasi.",
};

export default function AboutPage() {
  return <AboutContent />;
}
