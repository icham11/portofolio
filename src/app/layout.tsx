// src/app/layout.tsx - Root layout dengan ThemeProvider + LanguageProvider
import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AppProviders } from "@/providers/AppProviders";

// Font body - Inter untuk readability yang baik
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Font heading - Outfit untuk karakter yang kuat dan modern
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Font monospace - JetBrains Mono untuk code snippets
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ichamreadyto.dev"),
  title: {
    default: "Wahid Nurhisyam | Fullstack Developer & Software Engineer",
    template: "%s | Wahid Nurhisyam",
  },
  description:
    "Wahid Nurhisyam is a Fullstack Developer and Software Engineer from Indonesia. Specializing in Next.js, React, TypeScript, PostgreSQL, and AI-driven applications. View my portfolio, projects, and AI-powered simulation tools.",
  keywords: [
    "Wahid Nurhisyam",
    "Wahid Nurhisyam Portfolio",
    "Wahid Nurhisyam Fullstack Developer",
    "Wahid Nurhisyam Software Engineer",
    "Wahid Nurhisyam Programmer",
    "Fullstack Developer Indonesia",
    "Next.js Developer Indonesia",
    "React Developer",
    "AI Developer",
    "TypeScript Expert",
    "PostgreSQL",
    "Hacktiv8 Graduate",
    "Wahid Nurhisyam CV",
    "Wahid Nurhisyam Projects"
  ],
  authors: [{ name: "Wahid Nurhisyam", url: "https://www.ichamreadyto.dev" }],
  creator: "Wahid Nurhisyam",
  publisher: "Wahid Nurhisyam",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "id-ID": "/id-ID",
    },
  },
  openGraph: {
    type: "profile",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://www.ichamreadyto.dev",
    title: "Wahid Nurhisyam | Fullstack Developer & Software Engineer",
    description: "Portfolio of Wahid Nurhisyam, a Fullstack Developer building scalable web applications with Next.js, AI integrations, and responsive designs.",
    siteName: "Wahid Nurhisyam Portfolio",
    images: [{
      url: "https://www.ichamreadyto.dev/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Wahid Nurhisyam - Fullstack Developer Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@icham",
    creator: "@icham",
    title: "Wahid Nurhisyam | Fullstack Developer & Software Engineer",
    description: "Discover the portfolio and modern web projects by Wahid Nurhisyam. Expert in Next.js, React, and Fullstack Web Development.",
    images: ["https://www.ichamreadyto.dev/opengraph-image"],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f8f7ff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning diperlukan untuk next-themes agar tidak muncul hydration mismatch
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col antialiased transition-colors duration-200">
        <AppProviders>
          {/* Background gradient ambient - hanya tampil di dark mode */}
          {/* Ukuran dibatasi max-w viewport agar tidak overflow horizontal di mobile */}
          <div
            className="fixed top-0 left-0 pointer-events-none dark:block hidden"
            style={{ width: "min(600px, 100vw)", height: "min(600px, 100vh)" }}
            aria-hidden="true"
          >
            <div className="w-full h-full bg-orb bg-orb-violet" />
          </div>
          <div
            className="fixed bottom-0 right-0 pointer-events-none dark:block hidden"
            style={{ width: "min(400px, 100vw)", height: "min(400px, 100vh)" }}
            aria-hidden="true"
          >
            <div className="w-full h-full bg-orb bg-orb-cyan" />
          </div>

          {/* Navbar sticky */}
          <Navbar />

          {/* Konten utama */}
          <main className="flex-1 relative z-10">{children}</main>

          {/* Footer */}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
