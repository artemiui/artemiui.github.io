"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const IMAGES: string[] = [
  "https://media.discordapp.net/attachments/1454778907659337778/1454809412760764436/AUSTRIA4.png?ex=69527059&is=69511ed9&hm=f1b89dd7af58cd1569f15e435ff14918d238e42766903d677e3edf0914a4788a&=&format=webp&quality=lossless&width=691&height=864",
  "https://media.discordapp.net/attachments/1454778907659337778/1454779587769667616/dsad.png?ex=69525492&is=69510312&hm=00b51f466823838b4440ec25785529c24ff4e570d6d0fd987d4130bbe110856f&=&format=webp&quality=lossless&width=1317&height=864",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809490414108765/BatmanAK_2024-03-17_00-21-58.png?ex=6952706b&is=69511eeb&hm=f80ded3297b66a96aa2ac95ee10d8e940ff60138c7a95179d936645508066dbf&=&format=webp&quality=lossless&width=1536&height=864",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809651320193149/image.png?ex=69527091&is=69511f11&hm=8224ae5380450e6f21db16b41b05f479da929b3562cbebd9e154f0cf342bcf93&=&format=webp&quality=lossless&width=1291&height=968",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809411045429320/wowow.png?ex=69527058&is=69511ed8&hm=7a84e68520e040a22b6c0ea36d8327de3bcff1e3fe598c82081c9e04b91314d1&=&format=webp&quality=lossless&width=1615&height=864",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809412081422511/LA_DONNA_PIU_BELLA8.png?ex=69527058&is=69511ed8&hm=1f79ec50b04a4a530ba1985af6c586fdc3e4c3f4f545738fc131c4643bd0ea60&=&format=webp&quality=lossless&width=691&height=864",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809410365817064/love_letter.png?ex=69527058&is=69511ed8&hm=a7c7085061d321d2734e7c1090fae5f6eb9e63fb1424787ffc6adfc2d0064171&=&format=webp&quality=lossless&width=691&height=864",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809438010740892/480395131_9307364345952847_2338362512387404289_n.jpg?ex=6952705f&is=69511edf&hm=f14c164cc4f53c19654094cfcc804559d9d6f50afa05ce1c5f4f60473e79f705&=&format=webp&width=1768&height=786",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809439591862282/492543972_9736218379734106_772455341996175060_n.jpg?ex=6952705f&is=69511edf&hm=a02708041f6795bca93678d96ea70c953d785c1bf0da732aee37267051317c4a&=&format=webp&width=1768&height=776",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809440153894932/492389293_9736218403067437_1597346472671661106_n.jpg?ex=6952705f&is=69511edf&hm=ce9f98f8480446b47d43f0e2653179c94815eae677ba609224d94938ea0857d5&=&format=webp&width=1768&height=776",
  "https://media.discordapp.net/attachments/1454778907659337778/1454809440799690847/481079954_9412473058775308_2426509438069038583_n.jpg?ex=6952705f&is=69511edf&hm=acc0d54885b22864dd771aa4d1cbaaba7a244f3e9510a4a256f04fce5f86713e&=&format=webp&width=1768&height=589",
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