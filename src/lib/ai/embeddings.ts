// src/lib/ai/embeddings.ts - Gemini embedding client untuk RAG
// Menggunakan gemini-embedding-001 (menggantikan text-embedding-004 yang deprecated Jan 2026)
// Output: 768 dimensi (via MRL truncation) — sesuai skema pgvector di Prisma

import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "@/lib/utils";

// Inisialisasi Gemini AI client dengan API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Model embedding terbaru dari Google (GA sejak Juli 2025)
// Menggantikan text-embedding-004 yang deprecated 14 Jan 2026
const EMBEDDING_MODEL = "gemini-embedding-001";

// Dimensi vektor yang digunakan — sesuai schema pgvector (768)
// gemini-embedding-001 default 3072 dim, truncate ke 768 via MRL
const EMBEDDING_DIMENSIONS = 768;

/**
 * Membuat embedding vektor dari teks menggunakan Gemini
 * @param text - Teks yang akan di-embed
 * @param taskType - Jenis task: RETRIEVAL_DOCUMENT (indexing) atau RETRIEVAL_QUERY (pencarian)
 * @returns Array float berisi 768 dimensi vektor
 */
export async function createEmbedding(
  text: string,
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" = "RETRIEVAL_DOCUMENT"
): Promise<number[]> {
  try {
    // Pastikan GEMINI_API_KEY tersedia sebelum request
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY tidak tersedia di environment");
    }

    // Bersihkan teks dari whitespace berlebih sebelum di-embed
    const cleanText = text.replace(/\s+/g, " ").trim();

    // Truncate teks jika terlalu panjang (Gemini max ~2048 token)
    const maxChars = 8000;
    const finalText =
      cleanText.length > maxChars ? cleanText.slice(0, maxChars) + "..." : cleanText;

    // Ambil model dan embed dengan request object eksplisit
    // Gunakan any cast untuk outputDimensionality karena typing SDK belum update untuk gemini-embedding-001
    const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody: any = {
      content: { parts: [{ text: finalText }], role: "user" },
      taskType,
      outputDimensionality: EMBEDDING_DIMENSIONS,
    };

    const result = await model.embedContent(requestBody);
    const embedding = result.embedding.values;

    log("info", "Embedding berhasil dibuat", {
      textLength: finalText.length,
      embeddingDimensions: embedding.length,
      taskType,
    });

    return embedding;
  } catch (error) {
    log("error", "Gagal membuat embedding", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error(
      `Embedding gagal: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Membuat embedding untuk multiple teks sekaligus (batch processing)
 * @param texts - Array teks yang akan di-embed
 * @param taskType - Jenis task untuk semua teks dalam batch ini
 * @returns Array of embedding vectors
 */
export async function createBatchEmbeddings(
  texts: string[],
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" = "RETRIEVAL_DOCUMENT"
): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (const text of texts) {
    // Delay 150ms antar request untuk menghormati Gemini rate limit
    await new Promise((resolve) => setTimeout(resolve, 150));
    const embedding = await createEmbedding(text, taskType);
    embeddings.push(embedding);
  }

  return embeddings;
}
