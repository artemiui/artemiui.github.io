"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { ProjectImageFrame } from "../ProjectImageFrame";

const slides = [
  { src: "/images/pjdsc26-preview-1.png", label: "Landscape · PJDSC homepage" },
  { src: "/images/paddock-south-1.png", label: "Portrait · Paddock South" },
];

export default function ImageLoadingDemo() {
  const [index, setIndex] = useState(0);
  if (process.env.NODE_ENV === "production") notFound();
  const slide = slides[index];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Gallery loading demo</h1>
      <p>Switch images to see the new frame resize before its image request starts, after a two-second delay.</p>
      <button type="button" className="min-h-11 rounded-lg border px-4" onClick={() => setIndex((value) => 1 - value)}>
        Switch to {index === 0 ? "portrait" : "landscape"}
      </button>
      <figure className="space-y-2">
        <ProjectImageFrame src={slide.src} alt={slide.label} delay={2000} />
        <figcaption>{slide.label}</figcaption>
      </figure>
    </div>
  );
}
