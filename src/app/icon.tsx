import { ImageResponse } from "next/og";
import * as fs from "fs";
import * as path from "path";

// Image metadata
export const size = {
  width: 96,
  height: 96,
};
export const contentType = "image/png";

export default async function Icon() {
  // Directly read the logo from the public directory so it works during Vercel builds
  const file = fs.readFileSync(path.join(process.cwd(), "public", "logo.png"));
  const base64 = file.toString("base64");
  const imgSrc = `data:image/png;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={imgSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "scale(2.2)",
          }}
          alt="Wahid Nurhisyam Logo"
        />
      </div>
    ),
    { ...size },
  );
}
