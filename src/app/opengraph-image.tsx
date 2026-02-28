import { ImageResponse } from "next/og";
import * as fs from "fs";
import * as path from "path";

// Image metadata
export const alt = "Wahid Nurhisyam | Fullstack Developer & Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Read logo file
  const file = fs.readFileSync(path.join(process.cwd(), "public", "logo.png"));
  const base64 = file.toString("base64");
  const imgSrc = `data:image/png;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f", // Dark theme background
          position: "relative",
        }}
      >
        {/* Background Gradients to match the site's dark mode ambient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, rgba(45, 212, 191, 0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <img
            src={imgSrc}
            width={240}
            height={120}
            style={{ objectFit: "contain", marginBottom: "40px" }}
            alt="Logo"
          />

          {/* Text */}
          <h1
            style={{
              fontSize: 64,
              fontFamily: "sans-serif",
              fontWeight: 800,
              color: "white",
              margin: 0,
              marginBottom: "16px",
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            Wahid Nurhisyam
          </h1>
          <p
            style={{
              fontSize: 32,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "#a1a1aa", // text-muted equivalent
              margin: 0,
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Fullstack Developer & AI Engineer
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
                padding: "8px 24px",
                borderRadius: "9999px",
                color: "white",
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              Next.js
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "8px 24px",
                borderRadius: "9999px",
                color: "white",
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              TypeScript
            </div>
            <div
              style={{
                background: "linear-gradient(to right, #2dd4bf, #06b6d4)",
                padding: "8px 24px",
                borderRadius: "9999px",
                color: "white",
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              PostgreSQL
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
