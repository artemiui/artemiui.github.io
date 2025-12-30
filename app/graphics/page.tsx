"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const IMAGES: string[] = [
    "https://i.imgur.com/QlpiI6v.jpeg",
    "https://i.imgur.com/YK4iEq1.png",
    "https://i.imgur.com/nXUIyP0.png",
    "https://i.imgur.com/YK4iEq1.png",
    "https://i.imgur.com/SiDepcc.png",
    "https://i.imgur.com/90QKjh8.jpeg",
    "https://i.imgur.com/W22Mn7D.png",
    "https://i.imgur.com/RobWsAX.png",
    "https://i.imgur.com/uGviaL1.jpeg",
    "https://i.imgur.com/bLHidRJ.png",
    "https://i.imgur.com/2GLYLB2.jpeg",
    "https://i.imgur.com/nhUcTbC.png",
    "https://i.imgur.com/hlrGtxE.png"
];

export default function GraphicsPage() {
  function XMBGallery({ images }: { images: string[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const rawY = useMotionValue(0);
    const y = useSpring(rawY, { stiffness: 100, damping: 30 });
    const [activeIndex, setActiveIndex] = useState(0);
    const ITEM_H = 260;
    const GAP = 12;
    const [sizes, setSizes] = useState({ containerHeight: 720, trackHeight: 0, maxOffset: 0, centerPad: 0 });

    useEffect(() => {
      const ch = containerRef.current?.clientHeight ?? 720;
      const trackHeight = images.length * ITEM_H + Math.max(0, images.length - 1) * GAP;
      const maxOffset = Math.max(0, trackHeight - ch);
      const centerPad = Math.max(0, ch / 2 - ITEM_H / 2);
      setSizes({ containerHeight: ch, trackHeight, maxOffset, centerPad });
      rawY.set(0);
      setActiveIndex(0);
    }, [images.length]);

    const quarticOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const indexFromOffset = (offset: number, ch: number) => {
      const pos = offset + ch / 2;
      const i = Math.round((pos - ITEM_H / 2) / (ITEM_H + GAP));
      return Math.max(0, Math.min(images.length - 1, i));
    };

    useEffect(() => {
      const unsub = y.on("change", (val) => {
        const offset = -val;
        const idx = indexFromOffset(offset, sizes.containerHeight);
        setActiveIndex(idx);
      });
      return () => { (unsub as any)?.(); };
    }, [y, sizes.containerHeight, images.length]);

    const onWheel = (e: React.WheelEvent) => {
      const factor = Math.min(1, Math.max(0.2, images.length / 8));
      const next = Math.max(
        -sizes.maxOffset,
        Math.min(0, rawY.get() - (e.deltaY / sizes.containerHeight) * sizes.maxOffset * 0.25 * factor)
      );
      rawY.set(next);
    };

    return (
      <div className="relative">

        <div
          ref={containerRef}
          onWheel={onWheel}
          className="relative overflow-hidden"
          style={{ height: "70vh", perspective: "1000px", paddingTop: sizes.centerPad, paddingBottom: sizes.centerPad }}
        >
          <motion.div ref={trackRef} className="flex flex-col items-center" style={{ y, gap: GAP, height: sizes.trackHeight }}>
            {images.map((src, i) => {
              const distance = i - activeIndex;
              const depth = Math.min(3, Math.abs(distance));
              const baseScale = 1 - 0.08 * depth;
              const isActive = i === activeIndex;
              const focusScale = isActive ? 1.15 : 1;
              const targetScale = baseScale * focusScale;
              const opacity = 1 - 0.18 * depth;
              const rotateX = distance * -15;
              return (
                <motion.div
                  key={i}
                  data-item
                  className="rounded-lg overflow-hidden"
                  style={{ width: "80%", height: ITEM_H, transformStyle: "preserve-3d" }}
                  initial={false}
                  animate={{ scale: targetScale, opacity, rotateX, filter: isActive ? "drop-shadow(0 16px 32px rgba(96,165,250,0.35))" : "none" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                      <motion.img
                        key="contain"
                        src={src}
                        alt=""
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : (
                      <motion.img
                        key="cover"
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
      <XMBGallery images={IMAGES} />
    </div>
  );
}