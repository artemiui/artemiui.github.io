"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/themeContext";

interface InteractivePostProps {
  src: string;
  title: string;
}

/**
 * Renders an interactive rendition as the article body itself.
 *
 * The rendition is a standalone document under /public. It owns its own
 * title block, prose, figures and references; this component only gives it
 * the page. Two messages cross the boundary:
 *
 *   rendition-height  child -> host   so the frame grows to its content and
 *                                     the page scrolls as one document
 *   theme             host  -> child   so a theme change follows immediately
 *                                     rather than waiting on a storage event
 */
export default function InteractivePost({ src, title }: InteractivePostProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1400);
  const [ready, setReady] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "rendition-height" && typeof data.height === "number") {
        const next = Math.max(600, Math.min(200000, Math.ceil(data.height)));
        setHeight(next);
        setReady(true);
      }
      // the rendition has its own theme control; keep the host in step
      if (data.type === "rendition-theme" && (data.theme === "dark" || data.theme === "light")) {
        setTheme(data.theme);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [setTheme]);

  const pushTheme = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage({ theme }, window.location.origin);
  }, [theme]);

  useEffect(pushTheme, [pushTheme]);

  return (
    <div className="w-full">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        onLoad={pushTheme}
        scrolling="no"
        className="w-full border-0 block"
        style={{
          height: `${height}px`,
          opacity: ready ? 1 : 0,
          transition: "opacity 240ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
      <noscript>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This paper is an interactive rendition.{" "}
          <a href={src} className="underline">
            Open it directly
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}
