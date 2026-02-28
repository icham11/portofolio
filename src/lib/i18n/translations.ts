// src/lib/i18n/translations.ts
// Semua string UI dalam dua bahasa (EN & ID) untuk fitur bahasa toggle

export type Lang = "en" | "id";

// Type-safe translations object
export const t = {
  // ─── NAVBAR ────────────────────────────────────────────────────────────────
  nav: {
    home:          { en: "Home",          id: "Beranda" },
    about:         { en: "About",         id: "Tentang" },
    projects:      { en: "Projects",      id: "Proyek" },
    simulator:     { en: "Simulator",     id: "Simulator" },
    aiInterview:   { en: "AI Interview",  id: "Wawancara AI" },
    recruiterMode: { en: "Recruiter Mode",id: "Mode Rekruter" },
    contact:       { en: "Contact",       id: "Kontak" },
    hireMe:        { en: "Hire Me",       id: "Rekrut Saya" },
    toggleLang:    { en: "Switch to Indonesian", id: "Ganti ke Bahasa Inggris" },
    toggleTheme:   { en: "Toggle theme", id: "Ganti tema" },
  },

  // ─── FOOTER ────────────────────────────────────────────────────────────────
  footer: {
    navigation:   { en: "Navigation",            id: "Navigasi" },
    connect:      { en: "Connect",               id: "Terhubung" },
    available:    { en: "Available for opportunities", id: "Tersedia untuk peluang kerja" },
    builtWith:    { en: "Built with Next.js, Tailwind CSS & ☕", id: "Dibuat dengan Next.js, Tailwind CSS & ☕" },
  },

  // ─── HERO ──────────────────────────────────────────────────────────────────
  hero: {
    available:      { en: "Available for fullstack roles & product engineering", id: "Tersedia untuk posisi fullstack & product engineering" },
    hiIm:           { en: "Hi, I'm",          id: "Halo, saya" },
    rotatingWords:  {
      en: ["Fullstack Developer", "Product Engineer", "System Builder", "AI Integrator"],
      id: ["Fullstack Developer", "Product Engineer", "System Builder", "AI Integrator"],
    },
    description:    {
      en: "Building stable, end-to-end products — from database to UI — with a focus on reliability, business impact, and AI integration.",
      id: "Membangun produk end-to-end yang stabil — dari database ke UI — dengan fokus pada reliabilitas, dampak bisnis, dan integrasi AI.",
    },
    viewProjects:   { en: "View Projects",    id: "Lihat Proyek" },
    talkToAI:       { en: "Talk to My AI",   id: "Chat dengan AI Saya" },
    builtWith:      { en: "Built with",       id: "Dibangun dengan" },
    scroll:         { en: "Scroll",           id: "Gulir" },
  },

  // ─── SKILLS SECTION ────────────────────────────────────────────────────────
  skills: {
    badge:       { en: "Tech Stack",                         id: "Teknologi" },
    heading:     { en: "Skills by",                          id: "Keahlian Berdasarkan" },
    headingHighlight: { en: "Real Use Case",                 id: "Kasus Nyata" },
    sub:         { en: "Not just logos — each skill mapped to real engineering problems I solve.", id: "Bukan sekadar logo — setiap skill dipetakan ke masalah engineering nyata yang saya selesaikan." },
    categories: {
      frontend:     { en: "UI & Product Layer",              id: "Layer UI & Produk" },
      backend:      { en: "API & Server Layer",              id: "Layer API & Server" },
      database:     { en: "Data & Persistence Layer",        id: "Layer Data & Penyimpanan" },
      ai:           { en: "Intelligence Layer",              id: "Layer Kecerdasan" },
      integrations: { en: "Third-party & Payments",          id: "Integrasi & Pembayaran" },
      deployment:   { en: "Infrastructure & DevOps",         id: "Infrastruktur & DevOps" },
    },
    descriptions: {
      frontend:     { en: "Building responsive, performant interfaces users love",               id: "Membangun antarmuka responsif dan performan yang disukai pengguna" },
      backend:      { en: "Designing robust APIs with proper auth, RBAC, and validation",        id: "Merancang API yang kuat dengan auth, RBAC, dan validasi yang tepat" },
      database:     { en: "Schema design, transactions, consistency, and vector search",          id: "Desain skema, transaksi, konsistensi data, dan pencarian vektor" },
      ai:           { en: "RAG pipelines, embedding search, streaming chat interfaces",           id: "Pipeline RAG, pencarian embedding, antarmuka chat streaming" },
      integrations: { en: "Payment gateways, OAuth, image CDN, and webhook handling",            id: "Payment gateway, OAuth, CDN gambar, dan penanganan webhook" },
      deployment:   { en: "CI/CD, production deployment, monitoring, and edge functions",        id: "CI/CD, deployment produksi, monitoring, dan edge functions" },
    },
  },

  // ─── PROJECTS PREVIEW ──────────────────────────────────────────────────────
  projects: {
    badge:        { en: "Featured Projects",       id: "Proyek Unggulan" },
    heading:      { en: "What I've",               id: "Yang Telah Saya" },
    headingHighlight: { en: "Built",               id: "Bangun" },
    sub:          { en: "Case studies showing my approach to real engineering problems.", id: "Studi kasus yang menunjukkan pendekatan saya terhadap masalah engineering nyata." },
    problemLabel: { en: "Problem",                 id: "Masalah" },
    solutionLabel:{ en: "Solution",                id: "Solusi" },
    impactLabel:  { en: "Impact",                  id: "Dampak" },
    liveDemo:     { en: "Live Demo",               id: "Demo Live" },
    repository:   { en: "Repository",              id: "Repository" },
    caseStudy:    { en: "Case Study",              id: "Studi Kasus" },
    viewAll:      { en: "View All Projects",        id: "Lihat Semua Proyek" },
    keyFeatures:  { en: "Key Features",             id: "Fitur Utama" },
    techStack:    { en: "Tech Stack",               id: "Tech Stack" },
    challenges:   { en: "Engineering Challenges",  id: "Tantangan Engineering" },
    teamLabel:    { en: "Team",                    id: "Tim" },
    fullCaseStudy:{ en: "Case Studies",            id: "Studi Kasus" },
    pageHeading:  { en: "Projects &",              id: "Proyek &" },
    pageHighlight:{ en: "Engineering Decisions",   id: "Keputusan Engineering" },
    pageSub:      { en: "Each project is a real engineering problem I solved — with real constraints, decisions, and outcomes.", id: "Setiap proyek adalah masalah engineering nyata yang saya selesaikan — dengan batasan, keputusan, dan hasil nyata." },
  },

  // ─── ABOUT ─────────────────────────────────────────────────────────────────
  about: {
    badge:          { en: "About Me",               id: "Tentang Saya" },
    heading:        { en: "The Story",              id: "Kisah" },
    headingHighlight:{ en: "Behind the Code",       id: "di Balik Kode" },
    strengthsTitle: { en: "Core Strengths",          id: "Kekuatan Utama" },
    journeyTitle:   { en: "My",                     id: "Perjalanan" },
    journeyHighlight:{ en: "Journey",               id: "Saya" },
    certTitle:      { en: "Certifications",         id: "Sertifikasi" },
    verify:         { en: "Verify",                 id: "Verifikasi" },
    issuedAt:       { en: "Issued",                 id: "Dikeluarkan" },
    seeProjects:    { en: "See My Projects",        id: "Lihat Proyek Saya" },
    highlightBadge: { en: "Highlight",              id: "Sorotan" },
    timeline: {
      en: [
        {
          year: "Before",
          title: "Foundation & Curiosity",
          description: "Developed a strong interest in technology, problem solving, and how digital products work. Started learning programming fundamentals and web basics independently.",
          type: "foundation",
        },
        {
          year: "2025",
          title: "Hacktiv8 Full Stack JavaScript Immersive",
          description: "Enrolled in an intensive full stack bootcamp. Learned JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, and REST API design. Built multiple projects from scratch.",
          type: "education",
        },
        {
          year: "2026",
          title: "Captain & Lead Developer — Cuanify",
          description: "Led a team to build Cuanify, an SME operations platform as a final project. Architected the full system: auth, POS, FIFO inventory, payment gateway via Midtrans, AI assistant with RAG, and deployment on Vercel.",
          type: "project",
          highlight: true,
        },
        {
          year: "Now",
          title: "Open for Impact",
          description: "Building personal branding portfolio with AI Interview Mode. Actively seeking fullstack and product engineering roles where I can solve meaningful problems.",
          type: "present",
        },
      ],
      id: [
        {
          year: "Sebelumnya",
          title: "Pondasi & Rasa Ingin Tahu",
          description: "Mengembangkan minat kuat pada teknologi, problem solving, dan cara kerja produk digital. Mulai belajar dasar pemrograman dan web secara mandiri.",
          type: "foundation",
        },
        {
          year: "2025",
          title: "Hacktiv8 Full Stack JavaScript Immersive",
          description: "Mengikuti bootcamp full stack intensif. Mempelajari JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, dan desain REST API. Membangun berbagai proyek dari awal.",
          type: "education",
        },
        {
          year: "2026",
          title: "Captain & Lead Developer — Cuanify",
          description: "Memimpin tim membangun Cuanify, platform operasional UKM sebagai proyek akhir. Merancang sistem: auth, kasir, inventaris FIFO, payment gateway Midtrans, asisten AI dengan RAG, dan deploy di Vercel.",
          type: "project",
          highlight: true,
        },
        {
          year: "Sekarang",
          title: "Terbuka untuk Berdampak",
          description: "Membangun portofolio personal branding dengan Mode Wawancara AI. Aktif mencari peran fullstack dan product engineering di mana saya bisa memecahkan masalah yang berarti.",
          type: "present",
        },
      ]
    }
  },

  // ─── CTA SECTION ───────────────────────────────────────────────────────────
  cta: {
    heading:      { en: "Ready to",           id: "Siap untuk" },
    headingHighlight: { en: "Build Together?",id: "Berkolaborasi?" },
    connect:      { en: "Let's Connect",      id: "Ayo Terhubung" },
    askAI:        { en: "Ask My AI Instead",  id: "Tanya AI Saya" },
  },

  // ─── AI INTERVIEW ──────────────────────────────────────────────────────────
  ai: {
    badge:        { en: "AI Interview Mode",         id: "Mode Wawancara AI" },
    heading:      { en: "Talk to",                   id: "Bicara dengan" },
    headingHighlight: { en: "Wahid AI",              id: "Wahid AI" },
    sub:          { en: "Powered by Groq LLM + RAG from real portfolio data. Ask anything about Wahid's work.", id: "Didukung Groq LLM + RAG dari data portofolio nyata. Tanyakan apa saja tentang pekerjaan Wahid." },
    info:         { en: "Wahid AI answers based on his real profile, projects, and Q&A bank via semantic search (RAG). It does not make up credentials.", id: "Wahid AI menjawab berdasarkan profil, proyek, dan Q&A nyatanya melalui pencarian semantik (RAG). Tidak mengada-ada." },
    welcome:      { en: "Ask me anything about Wahid", id: "Tanyakan apa saja tentang Wahid" },
    placeholder:  { en: "Ask about Wahid's skills, projects, or experience...", id: "Tanya tentang keahlian, proyek, atau pengalaman Wahid..." },
    thinking:     { en: "Wahid AI is thinking...",   id: "Wahid AI sedang berpikir..." },
    reset:        { en: "Reset",                     id: "Ulang" },
    serviceDown:  { en: "AI service is temporarily unavailable.", id: "Layanan AI sementara tidak tersedia." },
    setupHint:    { en: "The Groq API key may not be configured. Check the README for setup instructions.", id: "GROQ_API_KEY mungkin belum dikonfigurasi. Lihat README untuk instruksi setup." },
    suggestions: {
      en: [
        "Tell me about Wahid's main project.",
        "Why should we hire Wahid?",
        "How did Wahid handle payment gateway issues?",
        "What is his approach to debugging?",
        "Explain the RAG implementation in Cuanify.",
        "What are his career goals?",
      ],
      id: [
        "Ceritakan proyek utama Wahid.",
        "Mengapa kami harus merekrut Wahid?",
        "Bagaimana Wahid menangani masalah payment gateway?",
        "Apa pendekatan Wahid dalam debugging?",
        "Jelaskan implementasi RAG di Cuanify.",
        "Apa tujuan karier Wahid?",
      ],
    },
  },

  // ─── SIMULATOR ─────────────────────────────────────────────────────────────
  simulator: {
    badge:      { en: "Engineering Simulator",      id: "Simulator Engineering" },
    heading:    { en: "Incident",                   id: "Alur Debug" },
    headingHighlight: { en: "Debugging Flow",       id: "Insiden" },
    sub:        { en: "Real engineering scenarios I've encountered. Expand each incident to follow my structured debugging approach step by step.", id: "Skenario engineering nyata yang pernah saya hadapi. Buka setiap insiden untuk mengikuti pendekatan debugging terstruktur saya langkah demi langkah." },
    stepsDone:  { en: "steps done",                id: "langkah selesai" },
    lessonTitle:{ en: "💡 Lesson Learned",          id: "💡 Pelajaran yang Didapat" },
    stepTypes: {
      observe:  { en: "Observe",  id: "Amati" },
      diagnose: { en: "Diagnose", id: "Diagnosa" },
      fix:      { en: "Fix",      id: "Perbaiki" },
      verify:   { en: "Verify",   id: "Verifikasi" },
    },
    incidents: {
      en: [
        {
          id: "deployment-failure",
          title: "Production Build Failure on Vercel",
          emoji: "🚨",
          severity: "critical" as const,
          context: "After pushing new feature code, Vercel deployment fails. The app worked fine locally but fails at build time in CI.",
          error: "Error: Cannot find module '@/lib/ai/rag' or its corresponding type declarations",
          steps: [
            {
              label: "Observe the error",
              detail: "Open Vercel deployment logs. Identify the exact error message and which build step it failed at. Note: module resolution error, not a runtime error.",
              type: "observe" as const,
            },
            {
              label: "Check tsconfig paths",
              detail: "Verify the `@/` alias in tsconfig.json is correctly mapped to `./src/*`. Confirm the file physically exists at the expected path.",
              type: "diagnose" as const,
            },
            {
              label: "Check environment differences",
              detail: "Compare local Node.js version with Vercel's runtime. Check if the file was committed properly (not in .gitignore). Run `git status` to verify tracked files.",
              type: "diagnose" as const,
            },
            {
              label: "Fix: commit missing file + verify tsconfig",
              detail: "If file wasn't committed: `git add src/lib/ai/rag.ts && git commit`. If tsconfig issue: ensure `baseUrl: '.'` and `paths: { '@/*': ['./src/*'] }` are set.",
              type: "fix" as const,
            },
            {
              label: "Verify build locally",
              detail: "Run `npm run build` locally to reproduce the fixed state. Push and monitor the Vercel build log to confirm green.",
              type: "verify" as const,
            }
          ],
          lesson: "Always run `npm run build` locally before pushing. Build errors often surface environment differences invisible in `npm run dev`."
        },
        {
          id: "midtrans-401",
          title: "Midtrans Payment Gateway 401 Error",
          emoji: "💳",
          severity: "high" as const,
          context: "Users can't complete checkout. Payment fails silently. The Midtrans SDK is integrated but returns 401 Unauthorized.",
          error: "MidtransApiError: 401 Unauthorized — Access denied due to invalid credentials",
          steps: [
            {
              label: "Observe the error surface",
              detail: "Log the full Midtrans error response. Note HTTP status 401. Reproduce in sandbox mode using a test transaction.",
              type: "observe" as const,
            },
            {
              label: "Audit sandbox/production mode mismatch",
              detail: "Check if `MIDTRANS_IS_PRODUCTION` env is `false` in development but the Server Key used is a production key (or vice versa). This is the most common cause of 401.",
              type: "diagnose" as const,
            },
            {
              label: "Verify Server Key vs Client Key",
              detail: "Ensure `MIDTRANS_SERVER_KEY` is used server-side only. `MIDTRANS_CLIENT_KEY` is for the frontend Snap. Never expose Server Key to the browser.",
              type: "diagnose" as const,
            },
            {
              label: "Fix: Align mode and keys",
              detail: "Set correct key pair for the environment. For development: sandbox Server Key + `isProduction: false`. For production: live Server Key + `isProduction: true`. Update `.env`.",
              type: "fix" as const,
            },
            {
              label: "Verify webhook idempotency",
              detail: "After fixing auth, test the webhook endpoint. Ensure payment status updates are idempotent — processing the same notification twice doesn't double-update the transaction.",
              type: "verify" as const,
            }
          ],
          lesson: "Payment gateway 401s are almost always a key/mode mismatch. Keep sandbox and production credentials separated with clear naming conventions."
        },
        {
          id: "inventory-inconsistency",
          title: "Inventory Stock Goes Negative",
          emoji: "📦",
          severity: "high" as const,
          context: "A product's stock count shows -2 after a series of transactions. Two cashiers appear to have sold items simultaneously, bypassing stock validation.",
          error: "Inventory consistency violation: stock deducted to -2 for product ID #1234",
          steps: [
            {
              label: "Trace the transaction history",
              detail: "Query the database for all transactions touching product #1234 in the last hour. Check timestamps for concurrent transactions. Identify the exact deduction sequence.",
              type: "observe" as const,
            },
            {
              label: "Identify race condition",
              detail: "Two requests read stock=2 simultaneously, both validate OK, both deduct 2, resulting in stock=-2. This is a classic read-validate-write race condition without a lock.",
              type: "diagnose" as const,
            },
            {
              label: "Fix: Use database transaction + optimistic lock",
              detail: "Wrap stock deduction in a Prisma transaction. Use `UPDATE inventory SET stock = stock - $qty WHERE id = $id AND stock >= $qty` — atomic SQL prevents the race condition.",
              type: "fix" as const,
            },
            {
              label: "Add application-level guard",
              detail: "After DB fix, add stock check in API response: if rows affected = 0 (stock was insufficient at DB level), return 409 Conflict so the client can retry or show out-of-stock.",
              type: "fix" as const,
            },
            {
              label: "Verify with concurrent test",
              detail: "Simulate 5 concurrent requests for a product with stock=2. Verify only 1 or 2 succeed, rest get 409. Stock should never go below 0.",
              type: "verify" as const,
            }
          ],
          lesson: "Never trust application-level stock checks alone under concurrency. Always enforce constraints at the database level using atomic operations or row-level locks."
        }
      ],
      id: [
        {
          id: "deployment-failure",
          title: "Kegagalan Build Production di Vercel",
          emoji: "🚨",
          severity: "critical" as const,
          context: "Setelah memasukkan kode fitur baru, deployment Vercel gagal. Aplikasi berjalan lancar di lokal namun gagal saat tahap build di CI.",
          error: "Error: Cannot find module '@/lib/ai/rag' or its corresponding type declarations",
          steps: [
            {
              label: "Amati pesan error",
              detail: "Buka log deployment Vercel. Identifikasi pesan error persisnya dan pada tahap build mana error itu terjadi. Catatan: error resolusi modul, bukan error runtime.",
              type: "observe" as const,
            },
            {
              label: "Periksa paths tsconfig",
              detail: "Verifikasi alias `@/` di tsconfig.json apakah sudah dipetakan ke `./src/*` dengan benar. Pastikan file tersebut secara fisik ada di path yang diharapkan.",
              type: "diagnose" as const,
            },
            {
              label: "Cek perbedaan lingkungan (environment)",
              detail: "Bandingkan versi Node.js lokal dengan runtime Vercel. Cek apakah file sudah ter-commit dengan benar (tidak masuk .gitignore). Jalankan `git status` untuk memverifikasi track file.",
              type: "diagnose" as const,
            },
            {
              label: "Perbaiki: commit file yang hilang + verifikasi tsconfig",
              detail: "Jika file belum di-commit: `git add src/lib/ai/rag.ts && git commit`. Jika masalah tsconfig: pastikan `baseUrl: '.'` dan `paths: { '@/*': ['./src/*'] }` sudah dikonfigurasi.",
              type: "fix" as const,
            },
            {
              label: "Verifikasi build secara lokal",
              detail: "Jalankan `npm run build` di lokal untuk memproduksi status perbaikan. Push dan pantau log build Vercel hingga berhasil.",
              type: "verify" as const,
            }
          ],
          lesson: "Selalu jalankan `npm run build` secara lokal sebelum push. Error saat build seringkali muncul dari perbedaan environment yang tidak terlihat di `npm run dev`."
        },
        {
          id: "midtrans-401",
          title: "Error 401 Payment Gateway Midtrans",
          emoji: "💳",
          severity: "high" as const,
          context: "Pengguna tidak bisa menyelesaikan checkout. Pembayaran gagal diam-diam. SDK Midtrans sudah terintegrasi tetapi mengembalikan 401 Unauthorized.",
          error: "MidtransApiError: 401 Unauthorized — Access denied due to invalid credentials",
          steps: [
            {
              label: "Amati permukaan error",
              detail: "Catat seluruh respons error Midtrans. Perhatikan status HTTP 401. Coba reproduksi di mode sandbox menggunakan transaksi uji.",
              type: "observe" as const,
            },
            {
              label: "Audit ketidakcocokan mode sandbox/production",
              detail: "Cek apakah variabel lingkungan `MIDTRANS_IS_PRODUCTION` bernilai `false` di tahap development namun Server Key yang dipakai adalah key production (atau sebaliknya). Ini adalah penyebab utama 401.",
              type: "diagnose" as const,
            },
            {
              label: "Verifikasi Server Key vs Client Key",
              detail: "Pastikan `MIDTRANS_SERVER_KEY` digunakan secara server-side saja. `MIDTRANS_CLIENT_KEY` adalah untuk frontend Snap. Jangan pernah mengekspos Server Key ke browser.",
              type: "diagnose" as const,
            },
            {
              label: "Perbaiki: Sesuaikan mode dan kunci",
              detail: "Atur pasangan key yang benar untuk masing-masing lingkungan. Untuk development: sandbox Server Key + `isProduction: false`. Untuk production: live Server Key + `isProduction: true`. Perbarui `.env`.",
              type: "fix" as const,
            },
            {
              label: "Verifikasi webhook idempotensi",
              detail: "Setelah memperbaiki otorisasi, uji endpoint webhook. Pastikan pembaruan status payment selalu idempotensi — memproses notifikasi yang sama dua kali tidak meng-update ganda transaksi.",
              type: "verify" as const,
            }
          ],
          lesson: "Error 401 dari payment gateway hampir selalu ketidakcocokan antara key dan mode (sandbox/prod). Jauhkan credential sandbox dan production terpisah dengan penamaan yang jelas."
        },
        {
          id: "inventory-inconsistency",
          title: "Stok Inventaris Menjadi Negatif",
          emoji: "📦",
          severity: "high" as const,
          context: "Stok sebuah produk menunjukkan angka -2 setelah serangkaian transaksi. Dua kasir terlihat telah menjual item secara bersamaan, melewati validasi stok.",
          error: "Inventory consistency violation: stock deducted to -2 for product ID #1234",
          steps: [
            {
              label: "Telusuri rekam jejak transaksi",
              detail: "Query database untuk seluruh transaksi terkait produk #1234 dalam sejam terakhir. Perhatikan timestamp untuk transaksi konkuren. Identifikasi urutan persisnya.",
              type: "observe" as const,
            },
            {
              label: "Identifikasi race condition",
              detail: "Dua permintaan membaca stock=2 bersamaan, keduanya menganggap valid OK, dua-duanya mengurangi 2, alhasil stock=-2. Ini adalah race condition baca-validasi-tulis klasik tanpa sebuah lock.",
              type: "diagnose" as const,
            },
            {
              label: "Perbaiki: Gunakan transaksi database + optimis lock",
              detail: "Bungkus deduksi stok dalam sebuah Prisma transaction. Gunakan SQL atomik: `UPDATE inventory SET stock = stock - $qty WHERE id = $id AND stock >= $qty` — mencegah race condition pada level DB.",
              type: "fix" as const,
            },
            {
              label: "Tambahkan pengaman level-aplikasi",
              detail: "Setelah DB diperbaiki, tambahkan status cek stok di response API: jika rows yang berdampak = 0 (karena stok kurang dari permintaan), return 409 Conflict sehingga kasir bisa retry/tampilkan out-of-stock.",
              type: "fix" as const,
            },
            {
              label: "Verifikasi dengan pengetesan konkuren",
              detail: "Simulasikan 5 request konkuren untuk produk dengan stok=2. Verifikasi hanya 1 atau 2 yang sukses, sisanya mendapatkan 409. Stok seharusnya TIDAK pernah terjun ke bawah nol.",
              type: "verify" as const,
            }
          ],
          lesson: "Jangan pernah sekedar percaya pada pengecekan aplikasi di bawah concurrency yang berat. Selalu terapkan constraint di level database menggunakan aksi atomik atau kunci baris (row-level lock)."
        }
      ]
    }
  },

  // ─── RECRUITER MODE ────────────────────────────────────────────────────────
  recruiter: {
    badge:        { en: "Recruiter Mode",           id: "Mode Rekruter" },
    heading:      { en: "TL;DR",                    id: "Ringkasan" },
    headingHighlight: { en: "Version of Wahid",     id: "Singkat Wahid" },
    sub:          { en: "Everything a recruiter needs in one page. Copy the full summary with one click.", id: "Semua yang dibutuhkan rekruter dalam satu halaman. Salin ringkasan lengkap dengan satu klik." },
    copy:         { en: "Copy Full Summary",        id: "Salin Ringkasan" },
    copied:       { en: "Copied to clipboard!",     id: "Berhasil disalin!" },
    pitch30s:     { en: "30-Second Pitch",          id: "Pitch 30 Detik" },
    whyHire:      { en: "Why Hire Me",              id: "Kenapa Rekrut Saya" },
    strengths:    { en: "Top Strengths",            id: "Kekuatan Utama" },
    bestFit:      { en: "Best Fit Roles",           id: "Posisi yang Cocok" },
    contribution: { en: "What I'll do in the first 30 days", id: "Yang Akan Saya Lakukan di 30 Hari Pertama" },
    quickLinks:   { en: "Quick Links",              id: "Tautan Cepat" },
  },

  // ─── CONTACT ───────────────────────────────────────────────────────────────
  contact: {
    badge:        { en: "Contact",                  id: "Kontak" },
    heading:      { en: "Let's",                    id: "Ayo" },
    headingHighlight: { en: "Connect",              id: "Terhubung" },
    namePlaceholder:  { en: "Your name",            id: "Nama kamu" },
    emailPlaceholder: { en: "your@email.com",       id: "email@kamu.com" },
    subjectPlaceholder: { en: "What's this about?", id: "Tentang apa ini?" },
    messagePlaceholder: { en: "Hi Wahid, I'd like to...", id: "Halo Wahid, saya ingin..." },
    nameLabel:    { en: "Name",                     id: "Nama" },
    emailLabel:   { en: "Email",                    id: "Email" },
    subjectLabel: { en: "Subject",                  id: "Subjek" },
    messageLabel: { en: "Message",                  id: "Pesan" },
    send:         { en: "Send Message",             id: "Kirim Pesan" },
    sending:      { en: "Sending...",               id: "Mengirim..." },
    successTitle: { en: "Message Sent!",            id: "Pesan Terkirim!" },
    successSub:   { en: "Thanks for reaching out. I'll get back to you as soon as possible.", id: "Terima kasih sudah menghubungi. Saya akan segera membalas." },
    sendAnother:  { en: "Send Another",             id: "Kirim Lagi" },
    findMeAt:     { en: "Find me at",               id: "Temukan saya di" },
    available:    { en: "Available",                id: "Tersedia" },
    required:     { en: "required",                 id: "wajib" },
  },

  // ─── STATUS BADGES ─────────────────────────────────────────────────────────
  status: {
    live:       { en: "Live",        id: "Live" },
    in_progress:{ en: "In Progress", id: "Dalam Pengerjaan" },
    completed:  { en: "Completed",   id: "Selesai" },
    active:     { en: "Active",      id: "Aktif" },
  },
} as const;

/**
 * Helper: ambil string dari object terjemahan berdasarkan bahasa
 * Contoh: getText(t.nav.home, "en") => "Home"
 */
export function getText(
  obj: { en: string; id: string },
  lang: Lang
): string {
  return obj[lang];
}
