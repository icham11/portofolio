// src/lib/db/prisma.ts - Singleton Prisma client untuk Next.js dev hot reload
// Mencegah pembuatan instance baru setiap kali module di-reload

import { PrismaClient } from "@prisma/client";

// Deklarasi global untuk menyimpan instance di development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Gunakan instance yang sudah ada jika ada (development) atau buat baru (production)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Simpan instance di global hanya saat development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
