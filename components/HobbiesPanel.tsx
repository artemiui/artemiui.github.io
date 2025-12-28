"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

type Props = {
  imolaSvgUrl: string;
  imolaLapTime: number;
  osuPP: number;
  osuSince: string;
  memoryUrls?: string[];
};

export default function HobbiesPanel({ imolaSvgUrl, imolaLapTime, osuPP, osuSince, memoryUrls }: Props) {
  const galleryItems = (memoryUrls && memoryUrls.length > 0)
    ? memoryUrls.map((url, i) => ({ id: i, title: `Memory ${i + 1}`, url }))
    : Array.from({ length: 12 }, (_, i) => ({ id: i, title: `Memory ${i + 1}`, url: "/placeholder-avatar.gif" }));
  return (
    <div className="space-y-4">
      <OsuHeader pp={osuPP} since={osuSince} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImolaMap svgUrl={imolaSvgUrl} lapTime={imolaLapTime} />
        <MonkeytypeWidget />
      </div>
      <MemoryGalleryCarousel items={galleryItems} />
    </div>
  );
}

function ImolaMap({ svgUrl, lapTime }: { svgUrl: string; lapTime: number }) {
  const [d, setD] = useState<string>("");
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState<string>("0 0 700 507");

  useEffect(() => {
    let raf = 0;
    let start = 0;
    let total = 0;

    const tick = (t: number) => {
      if (!pathRef.current || !total) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const speed = total / lapTime;
      const dist = (elapsed * speed) % total;
      const p = pathRef.current.getPointAtLength(dist);
      setPos({ x: p.x, y: p.y });
      raf = requestAnimationFrame(tick);
    };

    const setup = () => {
      if (pathRef.current) {
        total = pathRef.current.getTotalLength();
      }
      raf = requestAnimationFrame(tick);
    };

    setup();
    return () => cancelAnimationFrame(raf);
  }, [lapTime, d]);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch(svgUrl);
      const text = await res.text();
      const m = text.match(/<path[^>]*d="([^"]+)"/i);
      if (m && active) setD(m[1]);
    })();
    return () => { active = false; };
  }, [svgUrl]);

  useEffect(() => {
    if (pathRef.current) {
      const bb = pathRef.current.getBBox();
      const pad = 24;
      setViewBox(`${bb.x - pad} ${bb.y - pad} ${bb.width + pad * 2} ${bb.height + pad * 2}`);
    }
  }, [d]);

  return (
    <div className="rounded-md border border-zinc-200/60 dark:border-zinc-800/60 p-4 bg-white/80 dark:bg-zinc-900/80">
      <h4 className="text-sm font-mono mb-2">Imola Circuit</h4>
      <div className="relative">
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="w-full h-48 md:h-56">
          {d && (
            <>
              {/* Track Layer (asphalt) */}
              <path
                d={d}
                fill="none"
                strokeWidth={10}
                strokeLinecap="round"
                className="stroke-zinc-700 dark:stroke-zinc-300"
                style={{ opacity: 0.25 }}
              />
              {/* Racing Line Layer (center path) */}
              <path
                ref={pathRef}
                d={d}
                fill="none"
                strokeWidth={2}
                strokeDasharray="4 6"
                className="stroke-zinc-500 dark:stroke-zinc-400"
                style={{ opacity: 0.3 }}
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={8}
                className="fill-red-500 dark:fill-pink-500"
                style={{ filter: "drop-shadow(0 0 5px rgba(255, 50, 100, 0.7))" }}
              />
            </>
          )}
        </svg>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">PR Fastest Lap: {lapTime.toFixed(3)}</p>
    </div>
  );
}

function OsuHeader({ pp, since }: { pp: number; since: string }) {
  return (
    <div className="rounded-md border border-zinc-200/60 dark:border-zinc-800/60 p-2 bg-white/70 dark:bg-zinc-900/70">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-green-500 bg-[length:200%_200%] animate-[gradientShift_6s_linear_infinite] bg-clip-text text-transparent">
            {pp.toLocaleString()}pp
          </span>
        </span>
        <span className="text-[10px] text-zinc-600 dark:text-zinc-400">since {since}</span>
      </div>
      <style>{`@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
    </div>
  );
}

function MonkeytypeWidget() {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const [active, setActive] = useState<Set<string>>(new Set());

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const interval = setInterval(() => {
      const k = letters[Math.floor(Math.random() * letters.length)];
      setActive(prev => {
        const next = new Set(prev);
        next.add(k);
        setTimeout(() => {
          setActive(n => {
            const nn = new Set(n);
            nn.delete(k);
            return nn;
          });
        }, 130);
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-md border border-zinc-200/60 dark:border-zinc-800/60 p-3 bg-white/70 dark:bg-zinc-900/70">
      <h4 className="text-sm font-mono mb-2">Monkeytype · 121 WPM</h4>
      <div className="space-y-1">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {row.split("").map((k) => {
              const hot = active.has(k);
              return (
                <motion.div
                  key={k}
                  className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-mono ${
                    hot ? "bg-green-500/70 dark:bg-red-500/70 text-white" : "bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300"
                  }`}
                  animate={hot ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {k}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function MemoryGalleryCarousel({ items }: { items: { id: number; title?: string; url: string }[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const ITEM_W = 160; // px
  const GAP = 12; // px
  const trackWidth = items.length * ITEM_W + (items.length - 1) * GAP;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxShift = Math.max(0, trackWidth - containerWidth);
  const progress = useTransform(mouseX, [0, Math.max(1, containerWidth)], [0, 1]);
  const transX = useTransform(progress, [0, 1], [0, -maxShift]);
  const x = useSpring(transX, { stiffness: 100, damping: 30 });

  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      setHighlight(Math.round(v * (items.length - 1)));
    });
    return () => { unsub && (unsub as any)(); };
  }, [progress, items.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
  };

  return (
    <div className="rounded-md border border-zinc-200/60 dark:border-zinc-800/60 p-3 bg-white/70 dark:bg-zinc-900/70">
      <h4 className="text-sm font-mono mb-2">System Memory Gallery</h4>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden w-full"
        style={{ height: 120 }}
      >
        <motion.div className="absolute left-0 top-0 flex" style={{ x, gap: GAP }}>
          {items.map((it, i) => {
            const dist = Math.abs(i - highlight);
            const scale = dist === 0 ? 1.1 : dist === 1 ? 0.95 : 0.9;
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.85 : 0.7;
            return (
              <motion.div
                key={it.id}
                className="rounded-md bg-white/80 dark:bg-zinc-900/80 border border-white/40 dark:border-zinc-700/50 shadow-sm overflow-hidden"
                style={{ width: ITEM_W, height: 100 }}
                initial={false}
                animate={{ scale, opacity }}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              >
                <img
                  src={it.url}
                  alt={it.title ?? `Memory ${it.id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}