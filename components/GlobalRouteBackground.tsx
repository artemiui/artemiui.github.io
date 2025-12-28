"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function PS3WaveBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const computeIsDark = () =>
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const update = () => setIsDark(computeIsDark());

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => update();
    mql.addEventListener("change", onChange);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", onChange);
    };
  }, []);



  const darkTheme = {
    bg: "bg-gradient-to-b from-black via-slate-900 to-blue-950",
    particleColor: "bg-white",
    waveColors: ["#3b82f6", "#1e3a8a"],
    orbColor: "rgba(59, 130, 246, 0.6)",
    orbColorEnd: "rgba(59, 130, 246, 0)",
    streakColor: "rgba(59, 130, 246, 0.8)",
  };
  const lightTheme = {
    bg: "bg-gradient-to-b from-sky-100 via-blue-50 to-indigo-100",
    particleColor: "bg-blue-400",
    waveColors: ["#60a5fa", "#93c5fd"],
    orbColor: "rgba(96, 165, 250, 0.4)",
    orbColorEnd: "rgba(96, 165, 250, 0)",
    streakColor: "rgba(96, 165, 250, 0.6)",
  };

  const ThemeLayer = ({ theme, layer }: { theme: any; layer: string }) => (
    <div className={`absolute inset-0 ${theme.bg}`}>
      {particles.map((p) => (
        <motion.div
          key={`${layer}-p-${p.id}`}
          className={`absolute rounded-full ${theme.particleColor} blur-sm`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity }}
          animate={{ x: [0, Math.random() * 100 - 50, 0], y: [0, Math.random() * 100 - 50, 0], opacity: [p.opacity, p.opacity * 0.5, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((index) => (
          <motion.div key={`${layer}-w-${index}`} className="absolute w-full" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <svg width="100%" height="400" viewBox="0 0 1200 400" preserveAspectRatio="none" className="opacity-30">
              <motion.path
                d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z"
                fill={`url(#gradient-${layer}-${index})`}
                animate={{ d: [
                  "M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z",
                  "M0,200 Q300,250 600,200 T1200,200 L1200,400 L0,400 Z",
                  "M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z",
                ] }}
                transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id={`gradient-${layer}-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={theme.waveColors[0]} stopOpacity={0.6 - index * 0.2} />
                  <stop offset="100%" stopColor={theme.waveColors[1]} stopOpacity={0.2 - index * 0.05} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`${layer}-orb-${i}`}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.orbColor} 0%, ${theme.orbColorEnd} 70%)`,
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
      <motion.div
        className="absolute w-full h-1 top-1/2"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.streakColor} 50%, transparent 100%)`,
          boxShadow: `0 0 30px ${theme.streakColor}`,
          filter: "blur(2px)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

  return (
    <>
      <motion.div initial={false} animate={{ opacity: isDark ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0">
        <ThemeLayer theme={darkTheme} layer="dark" />
      </motion.div>
      <motion.div initial={false} animate={{ opacity: isDark ? 0 : 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0">
        <ThemeLayer theme={lightTheme} layer="light" />
      </motion.div>
    </>
  );
}

export default function GlobalRouteBackground() {
  const pathname = usePathname();
  if (pathname !== "/graphics") return null;
  return <div className="fixed inset-0 -z-10 pointer-events-none"><PS3WaveBackground /></div>;
}