// src/lib/utils/index.ts - Utility functions untuk seluruh aplikasi
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi cn() untuk menggabungkan class Tailwind dengan aman
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fungsi untuk memformat tanggal ke format yang mudah dibaca
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
}

// Fungsi untuk memotong teks agar tidak terlalu panjang
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

// Fungsi untuk membagi teks menjadi chunk-chunk untuk RAG indexing
export function chunkText(
  text: string,
  chunkSize = 500,
  overlap = 50,
): string[] {
  const chunks: string[] = [];
  const words = text.split(" ");
  let currentChunk: string[] = [];
  let currentSize = 0;

  for (const word of words) {
    // Tambahkan kata ke chunk saat ini
    currentChunk.push(word);
    currentSize += word.length + 1; // +1 untuk spasi

    // Jika chunk sudah cukup besar, simpan dan mulai chunk baru
    if (currentSize >= chunkSize) {
      chunks.push(currentChunk.join(" "));
      // Ambil kata-kata terakhir sebagai overlap untuk konteks
      const overlapWords = currentChunk.slice(-Math.ceil(overlap / 6));
      currentChunk = overlapWords;
      currentSize = overlapWords.join(" ").length;
    }
  }

  // Simpan sisa chunk terakhir
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks.filter((chunk) => chunk.trim().length > 0);
}

// Fungsi untuk logging terstruktur
export function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data }),
  };

  if (level === "error") {
    console.error(JSON.stringify(logEntry));
  } else if (level === "warn") {
    console.warn(JSON.stringify(logEntry));
  } else {
    console.log(JSON.stringify(logEntry));
  }
}
