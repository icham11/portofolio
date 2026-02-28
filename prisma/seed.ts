// prisma/seed.ts - Script untuk mengisi database dengan data portfolio Wahid
// Menjalankan: npm run db:seed

import { PrismaClient } from "@prisma/client";
import profileData from "../src/content/profile.json";
import projectsData from "../src/content/projects.json";
import achievementsData from "../src/content/achievements.json";
import qaData from "../src/content/qa_bank.json";

// Inisialisasi Prisma client untuk seeding
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  console.log("🌱 Mulai seeding database portfolio Wahid Nurhisyam...");

  // ==========================================
  // 1. SEED PROFILE
  // ==========================================
  console.log("👤 Seeding profile...");
  await prisma.profile.upsert({
    where: { id: "wahid-profile-main" },
    update: {
      name: profileData.name,
      displayName: profileData.display_name,
      headline: profileData.headline,
      location: profileData.location,
      availability: profileData.availability,
      about: profileData.about,
      pitch30s: profileData.pitch_30s,
      coreStrengths: profileData.core_strengths,
      techStack: profileData.tech_stack,
      links: profileData.links,
      cta: profileData.cta,
    },
    create: {
      id: "wahid-profile-main",
      name: profileData.name,
      displayName: profileData.display_name,
      headline: profileData.headline,
      location: profileData.location,
      availability: profileData.availability,
      about: profileData.about,
      pitch30s: profileData.pitch_30s,
      coreStrengths: profileData.core_strengths,
      techStack: profileData.tech_stack,
      links: profileData.links,
      cta: profileData.cta,
    },
  });
  console.log("✅ Profile seeded");

  // ==========================================
  // 2. SEED PROJECTS
  // ==========================================
  console.log("📁 Seeding projects...");
  for (const [index, project] of projectsData.projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        status: project.status,
        type: project.type.en,
        period: project.period,
        role: project.role.en,
        team: project.team,
        summary: project.summary,
        problem: project.problem,
        solution: project.solution,
        impact: project.impact.en,
        features: project.features?.en ?? [],
        tech: project.tech,
        challenges: project.challenges?.en ?? [],
        links: project.links,
        order: index,
      },
      create: {
        slug: project.slug,
        title: project.title,
        status: project.status,
        type: project.type.en,
        period: project.period,
        role: project.role.en,
        team: project.team,
        summary: project.summary,
        problem: project.problem,
        solution: project.solution,
        impact: project.impact.en,
        features: project.features?.en ?? [],
        tech: project.tech,
        challenges: project.challenges?.en ?? [],
        links: project.links,
        order: index,
      },
    });
  }
  console.log(`✅ ${projectsData.projects.length} projects seeded`);

  // ==========================================
  // 3. SEED ACHIEVEMENTS
  // ==========================================
  console.log("🏆 Seeding achievements...");
  for (const cert of achievementsData.certifications) {
    await prisma.achievement.upsert({
      where: {
        id: `cert-${cert.name.toLowerCase().replace(/\s+/g, "-")}-${cert.authority.toLowerCase()}`,
      },
      update: {
        type: "certification",
        name: cert.name,
        authority: cert.authority,
        issuedAt: new Date(cert.issued_at),
        credentialUrl: cert.credential_url,
        description: cert.description,
      },
      create: {
        id: `cert-${cert.name.toLowerCase().replace(/\s+/g, "-")}-${cert.authority.toLowerCase()}`,
        type: "certification",
        name: cert.name,
        authority: cert.authority,
        issuedAt: new Date(cert.issued_at),
        credentialUrl: cert.credential_url,
        description: cert.description,
      },
    });
  }
  console.log(
    `✅ ${achievementsData.certifications.length} achievements seeded`,
  );

  // ==========================================
  // 4. SEED DOCUMENTS (untuk RAG indexing)
  // ==========================================
  console.log("📄 Seeding RAG documents...");

  // Document 1: Profile lengkap
  const profileContent = `
Name: ${profileData.name}
Role: ${profileData.headline.en}
Location: ${profileData.location}
About: ${profileData.about.en}
30-Second Pitch: ${profileData.pitch_30s.en}
Core Strengths: ${profileData.core_strengths.map((s) => s.en).join(", ")}
Tech Stack Frontend: ${profileData.tech_stack.frontend.join(", ")}
Tech Stack Backend: ${profileData.tech_stack.backend.join(", ")}
Tech Stack Database: ${profileData.tech_stack.database.join(", ")}
Tech Stack AI: ${profileData.tech_stack.ai.join(", ")}
Tech Stack Integrations: ${profileData.tech_stack.integrations.join(", ")}
Github: ${profileData.links.github}
LinkedIn: ${profileData.links.linkedin}
`.trim();

  await prisma.document.upsert({
    where: { id: "doc-profile" },
    update: {
      title: "Wahid Nurhisyam - Profile",
      type: "profile",
      content: profileContent,
    },
    create: {
      id: "doc-profile",
      title: "Wahid Nurhisyam - Profile",
      type: "profile",
      content: profileContent,
    },
  });

  // Document 2-N: Satu dokumen per project
  for (const project of projectsData.projects) {
    const content = `
Project: ${project.title}
Type: ${project.type.en}
Role: ${project.role.en}
Period: ${project.period}
Summary: ${project.summary.en}
Problem: ${project.problem.en}
Solution: ${project.solution.en}
Impact: ${project.impact.en.join(", ")}
Features: ${project.features?.en.join(", ") ?? ""}
Tech Stack: ${Object.values(project.tech).flat().join(", ")}
Challenges: ${project.challenges?.en.join(", ") ?? ""}
`.trim();

    await prisma.document.upsert({
      where: { id: `doc-project-${project.slug}` },
      update: { title: `Project: ${project.title}`, type: "project", content },
      create: {
        id: `doc-project-${project.slug}`,
        title: `Project: ${project.title}`,
        type: "project",
        content,
      },
    });
  }

  // Document: QA Bank (tiap entry jadi chunk tersendiri)
  for (const entry of qaData.entries) {
    const content = `
Q: ${entry.question.en}
A: ${entry.answer.en}
Category: ${entry.category}
Tags: ${entry.tags.join(", ")}
`.trim();

    await prisma.document.upsert({
      where: { id: `doc-qa-${entry.id}` },
      update: { title: `QA: ${entry.question.en}`, type: "qa", content },
      create: {
        id: `doc-qa-${entry.id}`,
        title: `QA: ${entry.question.en}`,
        type: "qa",
        content,
      },
    });
  }

  console.log(
    "✅ RAG documents seeded (jalankan /api/rag/index untuk embedding ke pgvector)",
  );

  // ==========================================
  // SUMMARY
  // ==========================================
  const counts = {
    profiles: await prisma.profile.count(),
    projects: await prisma.project.count(),
    achievements: await prisma.achievement.count(),
    documents: await prisma.document.count(),
  };

  console.log("\n🎉 Seeding selesai!");
  console.log("📊 Summary:", counts);
  console.log(
    "\n💡 Langkah selanjutnya untuk RAG:\n" +
      "   Pastikan GEMINI_API_KEY tersedia, lalu jalankan:\n" +
      "   POST /api/rag/index dengan daftar dokumen dari database\n",
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
