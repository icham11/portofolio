# Wahid Nurhisyam — AI Portfolio

> Personal branding portfolio website featuring AI Interview Mode (RAG), Incident Simulator, Recruiter Mode, and case-study project pages.

**Live Features:**

- 🤖 **AI Interview Mode** — Chat with Wahid AI powered by Groq LLM + RAG via pgvector
- 🎮 **Incident Simulator** — Step-through real engineering debugging scenarios
- 📋 **Recruiter Mode** — One-click generated summary with copy button
- 📁 **Projects** — Full case studies: Cuanify + AI Portfolio
- 📬 **Contact Form** — With optional email delivery via Resend

---

## Quick Start

### 1. Clone and install

```bash
cd "Porto lagi"
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in these values in `.env`:

| Variable         | Description                                       | Required              |
| ---------------- | ------------------------------------------------- | --------------------- |
| `DATABASE_URL`   | PostgreSQL connection string                      | ✅ For AI/DB features |
| `GROQ_API_KEY`   | From [console.groq.com](https://console.groq.com) | ✅ For AI chat        |
| `GEMINI_API_KEY` | From [ai.google.dev](https://ai.google.dev)       | ✅ For RAG embeddings |
| `IMAGEKIT_*`     | From [imagekit.io](https://imagekit.io)           | ⬜ Optional           |
| `RESEND_API_KEY` | From [resend.com](https://resend.com)             | ⬜ Optional           |

The site renders correctly without API keys — AI features degrade gracefully.

### 3. Set up database (PostgreSQL with pgvector)

**Recommended providers:** [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app)

Enable the pgvector extension in your PostgreSQL console:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Then run migrations and seed:

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed portfolio data
```

### 4. Index documents for RAG (AI Interview Mode)

After seeding, index documents into pgvector by calling the API:

```bash
# Start dev server first
npm run dev

# Then in another terminal:
curl -X POST http://localhost:3000/api/rag/index \
  -H "Content-Type: application/json" \
  -d '{"documents": []}'
```

Or visit the seed summary — it will print instructions after `npm run db:seed`.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
  app/
    (public)/
      page.tsx              # Home
      about/page.tsx        # About + Timeline
      projects/page.tsx     # Case Studies
      contact/page.tsx      # Contact Form
    ai-interview/page.tsx   # AI Chat (RAG)
    simulator/page.tsx      # Incident Simulator
    recruiter-mode/page.tsx # Recruiter Summary
    api/
      ai/chat/route.ts      # Groq streaming chat
      rag/index/route.ts    # Index docs to pgvector
      rag/search/route.ts   # Semantic search
      contact/route.ts      # Contact form + Resend
  components/
    sections/               # Page-level sections
  lib/
    ai/chat.ts              # Groq config + system prompt
    ai/embeddings.ts        # Gemini embeddings
    ai/rag.ts               # RAG pipeline
    db/prisma.ts            # Prisma singleton
    utils/index.ts          # Helpers
  content/                  # Editable JSON content
    profile.json
    projects.json
    achievements.json
    qa_bank.json
    recruiter_mode.json
  styles/globals.css
prisma/
  schema.prisma             # DB schema with pgvector
  seed.ts                   # Database seeder
```

---

## Updating Content

All content is in **editable JSON files** — no code changes needed:

| File                              | What to update                    |
| --------------------------------- | --------------------------------- |
| `src/content/profile.json`        | Name, headline, links, tech stack |
| `src/content/projects.json`       | Projects, case studies, links     |
| `src/content/achievements.json`   | Certifications                    |
| `src/content/qa_bank.json`        | Q&A pairs for AI Interview Mode   |
| `src/content/recruiter_mode.json` | Recruiter summary content         |

After changing JSON files, re-run `npm run db:seed` to update the database.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or:
vercel env add DATABASE_URL
vercel env add GROQ_API_KEY
vercel env add GEMINI_API_KEY
```

After deployment, run migrations from the Vercel dashboard or:

```bash
DATABASE_URL="your-prod-url" npx prisma migrate deploy
```

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom design system
- **Animation:** Framer Motion
- **Database:** PostgreSQL + Prisma + pgvector
- **AI Chat:** Groq API (llama-3.3-70b-versatile) via Vercel AI SDK
- **RAG Embeddings:** Gemini text-embedding-004 (768-dim)
- **Email:** Resend (optional)
- **Deployment:** Vercel

---

## API Endpoints

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/api/ai/chat`          | Streaming AI chat with RAG  |
| POST   | `/api/rag/index`        | Index documents to pgvector |
| GET    | `/api/rag/search?q=...` | Semantic search             |
| POST   | `/api/contact`          | Contact form submission     |

---

Built with ⚡ by [Wahid Nurhisyam](https://github.com/icham11)
