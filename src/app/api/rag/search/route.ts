// src/app/api/rag/search/route.ts - API route untuk semantic search
// Mencari konten relevan dari knowledge base menggunakan pgvector

import { NextRequest } from "next/server";
import { retrieveContext } from "@/lib/ai/rag";
import { log } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    // Ambil query parameter
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const topK = parseInt(searchParams.get("k") || "5");

    // Validasi parameter
    if (!query || query.trim().length === 0) {
      return Response.json(
        { error: "Parameter q (query) diperlukan" },
        { status: 400 },
      );
    }

    if (topK < 1 || topK > 20) {
      return Response.json(
        { error: "Parameter k harus antara 1 dan 20" },
        { status: 400 },
      );
    }

    log("info", "Semantic search request", {
      query: query.substring(0, 100),
      topK,
    });

    // Jalankan semantic search
    const results = await retrieveContext(query, topK);

    return Response.json({
      query,
      topK,
      results,
      count: results.length,
    });
  } catch (error) {
    log("error", "RAG search error", {
      error: error instanceof Error ? error.message : String(error),
    });

    return Response.json(
      { error: "Search gagal. Coba lagi nanti." },
      { status: 500 },
    );
  }
}
