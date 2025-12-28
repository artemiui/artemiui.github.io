"use client";

import { useIdleTimer } from "@/lib/useIdleTimer";
import { useEffect, useState, useMemo } from "react";

interface EmberParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function IdleScreensaver() {
  const { isIdle, resetTimer } = useIdleTimer(5000);
  const [visible, setVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Generate square ember particles with memoization
  const emberParticles = useMemo(() => {
    const particles: EmberParticle[] = [];
    for (let i = 0; i < 8; i++) {
      particles.push({
        id: i,
        x: 40 + Math.random() * 20, // Keep particles centered around the fire
        y: 0,
        size: 1.5 + Math.random() * 2,
        duration: 1.5 + Math.random() * 1.5,
        delay: i * 0.2,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }
    return particles;
  }, []);

  // Smooth transition on idle state change
  useEffect(() => {
    if (isIdle) {
      setVisible(true);
      setTimeout(() => setFadeIn(true), 10);
    } else {
      setFadeIn(false);
      setTimeout(() => setVisible(false), 500);
    }
  }, [isIdle]);

  // Reset timer on any key press when idle
  useEffect(() => {
    if (isIdle) {
      const handleKeyPress = () => resetTimer();
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isIdle, resetTimer]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-500 ease-out ${
        fadeIn
          ? "bg-black/95 backdrop-blur-md"
          : "bg-transparent backdrop-blur-none"
      }`}
      onClick={resetTimer}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className={`h-full flex flex-col items-center justify-center transition-all duration-700 ease-out ${
          fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      >
        {/* Bonfire Container */}
        <div className="relative mb-12">
          {/* Soft Glow Layers */}
          <div
            className={`absolute inset-0 -z-30 rounded-full blur-3xl transition-all duration-1000 ${
              fadeIn ? "opacity-40 scale-150" : "opacity-0 scale-100"
            }`}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 60, 0, 0.15) 0%, rgba(255, 30, 0, 0.05) 30%, rgba(255, 15, 0, 0.02) 50%, transparent 80%)",
            }}
          />

          <div
            className={`absolute inset-0 -z-20 rounded-full blur-3xl transition-all duration-1000 ${
              fadeIn ? "opacity-70 scale-125" : "opacity-0 scale-100"
            }`}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 80, 0, 0.25) 0%, rgba(255, 40, 0, 0.1) 40%, rgba(255, 20, 0, 0.03) 60%, transparent 85%)",
            }}
          />

          <div
            className={`absolute inset-0 -z-10 rounded-full blur-xl transition-all duration-800 delay-75 ${
              fadeIn ? "opacity-50 scale-115" : "opacity-0 scale-100"
            }`}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 120, 40, 0.3) 0%, rgba(255, 80, 0, 0.15) 50%, rgba(255, 40, 0, 0.05) 70%, transparent 90%)",
            }}
          />

          {/* Bonfire Image Container */}
          <div className="relative z-10">
            <div className="relative w-48 h-48">
              {/* Bonfire image with cleaner borders */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/dark-souls-bonfire.gif"
                  alt="Bonfire"
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,100,0,0.3)]"
                  draggable="false"
                />
              </div>

              {/* Subtle flicker overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-transparent via-orange-500/5 to-transparent transition-opacity duration-300 ${
                  fadeIn ? "opacity-40" : "opacity-0"
                }`}
                style={{
                  animation: "flicker 2s ease-in-out infinite",
                }}
              />
            </div>

            {/* Fire base reflection */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-28 h-1.5 bg-gradient-to-r from-transparent via-orange-900/40 to-transparent rounded-full blur-sm" />
          </div>

          {/* Square Ember Particles */}
          {fadeIn &&
            emberParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute top-0 left-0 z-20"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.x}%`,
                  animation: `floatUp ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                  opacity: particle.opacity,
                }}
              >
                <div
                  className="w-full h-full transform rotate-45"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 180, 50, 0.9) 0%, 
                      rgba(255, 100, 0, 0.8) 50%, 
                      rgba(255, 50, 0, 0.6) 100%)`,
                    boxShadow: `0 0 ${particle.size * 2}px rgba(255, 100, 0, 0.5)`,
                    animation: `glowPulse ${particle.duration * 0.7}s ease-in-out ${particle.delay}s infinite`,
                  }}
                />
              </div>
            ))}
        </div>

        {/* Text Content */}
        <div
          className={`text-center transition-all duration-700 ease-out delay-300 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-white font-serif text-xl tracking-widest mb-3 font-light">
            The fire fades...
          </p>
          <p className="text-gray-300/80 font-serif text-sm tracking-wide animate-pulse font-light">
            Press any key to rekindle
          </p>
        </div>

        {/* Edge Vignette */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-60px) rotate(180deg) scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120px) rotate(360deg) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 2px rgba(255, 100, 0, 0.5));
          }
          50% {
            filter: brightness(1.3) drop-shadow(0 0 4px rgba(255, 150, 50, 0.7));
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 0.4;
          }
          25% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          75% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}