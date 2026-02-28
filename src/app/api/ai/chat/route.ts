// src/app/api/ai/chat/route.ts - API route untuk Wahid AI chat dengan streaming
// Menggunakan Vercel AI SDK + Groq untuk streaming response + RAG context

import { streamText, convertToCoreMessages } from "ai";
import { NextRequest } from "next/server";
import {
  groq,
  CHAT_MODEL,
  FALLBACK_MODEL,
  buildSystemPrompt,
  isGroqAvailable,
} from "@/lib/ai/chat";
import { retrieveContext, formatContext } from "@/lib/ai/rag";
import { log } from "@/lib/utils";

// Maksimum token yang dihasilkan per response
const MAX_TOKENS = 1024;

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { messages } = body;

    // Validasi messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages adalah parameter wajib" },
        { status: 400 },
      );
    }

    log("info", "Chat request diterima", { messageCount: messages.length });

    // Cek apakah Groq API tersedia
    if (!isGroqAvailable()) {
      log("warn", "GROQ_API_KEY tidak tersedia, mengirim fallback response");
      return Response.json(
        {
          error:
            "AI service sedang tidak tersedia. Silakan cek portfolio langsung.",
          fallback: true,
        },
        { status: 503 },
      );
    }

    // Ambil pesan terakhir dari user untuk RAG retrieval
    const lastUserMessage = messages
      .filter((m: { role: string }) => m.role === "user")
      .at(-1);

    // Ambil konteks relevan dari RAG (pgvector)
    let ragContext = "";
    if (lastUserMessage?.content) {
      try {
        const chunks = await retrieveContext(lastUserMessage.content, 5);
        if (chunks.length > 0) {
          ragContext = formatContext(chunks);
          log("info", "RAG context berhasil diambil", {
            chunkCount: chunks.length,
          });
        }
      } catch (ragError) {
        // RAG gagal - lanjutkan tanpa konteks (graceful degradation)
        log("warn", "RAG retrieval gagal, lanjut tanpa konteks", {
          error:
            ragError instanceof Error ? ragError.message : String(ragError),
        });
      }
    }

    // Build system prompt dengan RAG context jika ada
    const systemPrompt = buildSystemPrompt(ragContext);

    // Stream response dari Groq dengan fallback ke model yang lebih kecil
    let result;
    try {
      result = streamText({
        model: groq(CHAT_MODEL),
        system: systemPrompt,
        messages: convertToCoreMessages(messages),
        maxTokens: MAX_TOKENS,
        temperature: 0.7,
        onFinish: (res) => {
          log("info", "Chat selesai", {
            model: CHAT_MODEL,
            usage: res.usage,
            finishReason: res.finishReason,
          });
        },
      });
    } catch (primaryError) {
      // Coba fallback model jika model utama gagal inisialisasi
      log("warn", "Model utama gagal, mencoba fallback model", {
        error:
          primaryError instanceof Error
            ? primaryError.message
            : String(primaryError),
        fallbackModel: FALLBACK_MODEL,
      });
      result = streamText({
        model: groq(FALLBACK_MODEL),
        system: systemPrompt,
        messages: convertToCoreMessages(messages),
        maxTokens: MAX_TOKENS,
        temperature: 0.7,
      });
    }

    // Return stream response
    return result.toDataStreamResponse();
  } catch (error) {
    log("error", "Chat API error", {
      error: error instanceof Error ? error.message : String(error),
    });

    return Response.json(
      {
        error: "Terjadi error di server. Silakan coba lagi.",
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
