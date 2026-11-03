"use client";

import { useEffect, useState } from "react";
import dimensions from "./image-dimensions.json";

const sizes: Record<string, number[]> = dimensions;

export function LoadingProjectImage({ src, alt, fit = "cover", delay = 0 }: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  delay?: number;
}) {
  const [requested, setRequested] = useState(delay === 0);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!delay) return;
    const timer = window.setTimeout(() => setRequested(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <>
      {status === "loading" && (
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <span className="absolute inset-0 bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800" />
          <span className="relative size-6 rounded-full border-2 border-zinc-400 border-t-zinc-800 motion-safe:animate-spin dark:border-zinc-600 dark:border-t-zinc-100" />
        </span>
      )}
      {status === "error" && (
        <span className="absolute inset-0 grid place-items-center px-3 text-center text-sm">Image unavailable</span>
      )}
      {requested && status !== "error" && (
        <img
          ref={(image) => {
            if (image?.complete) setStatus(image.naturalWidth ? "loaded" : "error");
          }}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 size-full motion-safe:transition-opacity motion-safe:duration-200 ${fit === "contain" ? "object-contain" : "object-cover"} ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}

export function ProjectImageFrame({ src, alt, delay }: { src: string; alt: string; delay?: number }) {
  const [width, height] = sizes[src] ?? [4, 3];

  return (
    <div className="w-full [container-type:inline-size]">
      <div
        className="relative mx-auto overflow-hidden rounded-xl bg-zinc-100 motion-safe:transition-[height,width] motion-safe:duration-300 motion-safe:ease-out dark:bg-zinc-900"
        style={{
          height: `min(${100 * height / width}cqw, 58dvh)`,
          width: `min(100%, ${58 * width / height}dvh)`,
        }}
      >
        <LoadingProjectImage key={src} src={src} alt={alt} fit="contain" delay={delay} />
      </div>
    </div>
  );
}
