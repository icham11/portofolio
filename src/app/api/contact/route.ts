// src/app/api/contact/route.ts - API route untuk form kontak dengan Resend
// Jika RESEND_API_KEY tidak tersedia, pesan tetap disimpan ke database

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { log } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validasi field wajib
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Semua field wajib diisi: name, email, subject, message" },
        { status: 400 },
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Format email tidak valid" },
        { status: 400 },
      );
    }

    log("info", "Form kontak diterima", { name, email, subject });

    // Simpan pesan ke database
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Kirim email via Resend jika API key tersedia
    if (process.env.RESEND_API_KEY) {
      try {
        // Dynamic import untuk menghindari error jika Resend tidak terinstall
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Wahid Portfolio <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL || "ichamdaiboz@gmail.com",
          subject: `[Portfolio] ${subject} - dari ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2>Pesan Baru dari Portfolio</h2>
              <p><strong>Nama:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr />
              <p><strong>Pesan:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
              <hr />
              <small>Dikirim dari portfolio wahidnurhisyam.vercel.app</small>
            </div>
          `,
        });

        log("info", "Email berhasil dikirim via Resend", {
          messageId: contactMessage.id,
        });
      } catch (emailError) {
        // Email gagal tapi data tetap tersimpan
        log("warn", "Gagal kirim email via Resend, data tersimpan di DB", {
          error:
            emailError instanceof Error
              ? emailError.message
              : String(emailError),
          messageId: contactMessage.id,
        });
      }
    } else {
      log("info", "RESEND_API_KEY tidak tersedia, pesan hanya disimpan ke DB", {
        messageId: contactMessage.id,
      });
    }

    return Response.json({
      success: true,
      message: "Pesan berhasil dikirim! Saya akan balas secepatnya.",
      id: contactMessage.id,
    });
  } catch (error) {
    log("error", "Contact form error", {
      error: error instanceof Error ? error.message : String(error),
    });

    return Response.json(
      { error: "Gagal mengirim pesan. Silakan coba lagi." },
      { status: 500 },
    );
  }
}
