import * as React from "react";
import Image from "next/image";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Wahid Nurhisyam Logo"
      width={160}
      height={80}
      className={`object-contain ${className || ""}`}
      priority
    />
  );
}
