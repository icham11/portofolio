// src/app/api/rag/index/route.ts - API route untuk indexing dokumen ke pgvector
// Digunakan oleh seed script untuk memasukkan data ke vector database

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { indexDocument } from "@/lib/ai/rag";
import { log } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documents } = body;

    // Validasi input
    if (!documents || !Array.isArray(documents)) {
      return Response.json(
        { error: "Parameter documents (array) diperlukan" },
        { status: 400 },
      );
    }

    // Jika documents kosong, ambil SEMUA dokumen dari database secara otomatis
    let docsToIndex = documents;
    if (documents.length === 0) {
      log("info", "documents kosong — mengambil semua dokumen dari DB");
      const dbDocs = await prisma.document.findMany();
      docsToIndex = dbDocs.map((d) => ({
        id: d.id,
        title: d.title,
        type: d.type,
        content: d.content,
      }));
      log("info", "Dokumen dari DB berhasil diambil", { count: docsToIndex.length });
    }

    log("info", "Mulai indexing batch dokumen", { count: docsToIndex.length });

    const results = [];

    for (const doc of docsToIndex) {
      // Validasi setiap dokumen
      if (!doc.title || !doc.type || !doc.content) {
        results.push({ error: "Dokumen tidak lengkap", doc });
        continue;
      }

      try {
        // Upsert dokumen ke tabel Document (jika belum ada)
        const document = await prisma.document.upsert({
          where: { id: doc.id || "nonexistent" },
          update: {
            title: doc.title,
            type: doc.type,
            content: doc.content,
            metadata: doc.metadata || {},
          },
          create: {
            title: doc.title,
            type: doc.type,
            content: doc.content,
            metadata: doc.metadata || {},
          },
        });

        // Index konten dokumen ke pgvector (generate embeddings)
        await indexDocument(document.id, doc.content);
        log("info", `Indexed: ${doc.title}`);
        results.push({ id: document.id, title: doc.title, status: "indexed" });
      } catch (docError) {
        // Satu dokumen gagal tidak hentikan seluruh proses
        log("warn", `Gagal index dokumen: ${doc.title}`, {
          error: docError instanceof Error ? docError.message : String(docError),
        });
        results.push({ title: doc.title, status: "failed" });
      }
    }

    log("info", "Batch indexing selesai", { indexed: results.filter((r) => r.status === "indexed").length, failed: results.filter((r) => r.status === "failed").length });

    return Response.json({
      success: true,
      indexed: results.filter((r) => r.status === "indexed").length,
      failed: results.filter((r) => r.status === "failed").length,
      results,
    });
  } catch (error) {
    log("error", "RAG indexing error", {
      error: error instanceof Error ? error.message : String(error),
    });

    return Response.json(
      {
        error: "Indexing gagal",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 },
    );
  }
}
