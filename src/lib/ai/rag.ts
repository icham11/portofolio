// src/lib/ai/rag.ts - RAG (Retrieval Augmented Generation) menggunakan pgvector
// Mengambil konteks relevan dari database untuk ditambahkan ke prompt AI

import { prisma } from "@/lib/db/prisma";
import { createEmbedding, createBatchEmbeddings } from "@/lib/ai/embeddings";
import { chunkText, log } from "@/lib/utils";

// Jumlah chunk yang diambil per query (top-k)
const DEFAULT_TOP_K = 5;

/**
 * Tipe untuk hasil retrieval
 */
export interface RetrievedChunk {
  id: string;
  content: string;
  documentTitle: string;
  documentType: string;
  similarity: number;
}

/**
 * Mengindex dokumen ke dalam pgvector
 * Memecah teks jadi chunk, buat embedding, simpan ke DocumentChunk
 * @param documentId - ID dokumen yang sudah ada di tabel Document
 * @param text - Isi dokumen yang akan di-index
 */
export async function indexDocument(
  documentId: string,
  text: string,
): Promise<void> {
  try {
    log("info", "Mulai indexing dokumen", { documentId });

    // 1. Pecah teks menjadi chunk-chunk
    const chunks = chunkText(text, 500, 50);
    log("info", `Dokumen dipecah menjadi ${chunks.length} chunk`, {
      documentId,
    });

    // 2. Buat embedding untuk semua chunk dengan taskType RETRIEVAL_DOCUMENT
    const embeddings = await createBatchEmbeddings(chunks, "RETRIEVAL_DOCUMENT");

    // 3. Hapus chunk lama jika ada (untuk re-indexing)
    await prisma.documentChunk.deleteMany({
      where: { documentId },
    });

    // 4. Simpan chunk + embedding ke database menggunakan raw SQL
    // Karena Prisma belum support pgvector natively untuk insert
    for (let i = 0; i < chunks.length; i++) {
      const embeddingStr = `[${embeddings[i].join(",")}]`;

      await prisma.$executeRaw`
        INSERT INTO document_chunks (id, document_id, content, embedding, chunk_index, created_at)
        VALUES (
          gen_random_uuid(),
          ${documentId},
          ${chunks[i]},
          ${embeddingStr}::vector,
          ${i},
          NOW()
        )
      `;
    }

    log("info", "Indexing selesai", { documentId, chunkCount: chunks.length });
  } catch (error) {
    log("error", "Indexing gagal", {
      documentId,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Mencari chunk paling relevan menggunakan cosine similarity
 * @param query - Pertanyaan atau query dari user
 * @param topK - Jumlah chunk yang diambil
 * @returns Array chunk yang paling relevan beserta similarity score
 */
export async function retrieveContext(
  query: string,
  topK = DEFAULT_TOP_K,
): Promise<RetrievedChunk[]> {
  try {
    log("info", "Mulai retrieval RAG", { query: query.substring(0, 100) });

    // 1. Buat embedding dari query user dengan taskType RETRIEVAL_QUERY
    const queryEmbedding = await createEmbedding(query, "RETRIEVAL_QUERY");
    const embeddingStr = `[${queryEmbedding.join(",")}]`;

    // 2. Cari chunk terdekat menggunakan cosine similarity di pgvector
    // Operator <=> adalah cosine distance (lebih kecil = lebih mirip)
    const results = await prisma.$queryRaw<
      Array<{
        id: string;
        content: string;
        similarity: number;
        document_id: string;
        title: string;
        type: string;
      }>
    >`
      SELECT 
        dc.id,
        dc.content,
        1 - (dc.embedding <=> ${embeddingStr}::vector) as similarity,
        dc.document_id,
        d.title,
        d.type
      FROM document_chunks dc
      JOIN documents d ON dc.document_id = d.id
      WHERE dc.embedding IS NOT NULL
      ORDER BY dc.embedding <=> ${embeddingStr}::vector
      LIMIT ${topK}
    `;

    const chunks: RetrievedChunk[] = results.map((r) => ({
      id: r.id,
      content: r.content,
      documentTitle: r.title,
      documentType: r.type,
      similarity: Number(r.similarity),
    }));

    log("info", "Retrieval selesai", {
      query: query.substring(0, 50),
      chunksFound: chunks.length,
      topSimilarity: chunks[0]?.similarity,
    });

    return chunks;
  } catch (error) {
    log("warn", "RAG retrieval gagal, menggunakan konteks kosong", {
      error: error instanceof Error ? error.message : String(error),
    });
    // Return kosong jika gagal - AI akan menjawab dari knowledge base sendiri
    return [];
  }
}

/**
 * Format chunk-chunk menjadi string konteks untuk system prompt
 * @param chunks - Array chunk yang diambil dari RAG
 * @returns String konteks terformat
 */
export function formatContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return "";

  const contextParts = chunks.map(
    (chunk, i) => `[Source ${i + 1}: ${chunk.documentTitle}]\n${chunk.content}`,
  );

  return `\n\n--- PORTFOLIO KNOWLEDGE BASE ---\n${contextParts.join("\n\n")}\n--- END OF KNOWLEDGE BASE ---`;
}
