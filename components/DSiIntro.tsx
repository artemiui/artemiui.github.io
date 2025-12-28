'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Battery, Wifi } from 'lucide-react';

interface DSiIntroProps {
  onComplete?: () => void;
}

const DSiIntro: React.FC<DSiIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'boot' | 'welcome'>('boot');
  const [timeStr, setTimeStr] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('welcome');
    }, 1500);
    const interval = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const handleContinue = () => {
    onComplete?.();
  };

  const posRef = useRef<{ x: number; y: number }>({ x: 40, y: 60 });
  const velRef = useRef<{ vx: number; vy: number }>({ vx: 0.18, vy: 0.14 });
  const angleRef = useRef<number>(0);
  const angVelRef = useRef<number>(0.12);
  const [, forceTick] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const size = 96;
      let nx = posRef.current.x + velRef.current.vx * dt;
      let ny = posRef.current.y + velRef.current.vy * dt;
      let collided = false;
      if (nx <= 0) { nx = 0; velRef.current.vx = Math.abs(velRef.current.vx); collided = true; }
      else if (nx >= w - size) { nx = w - size; velRef.current.vx = -Math.abs(velRef.current.vx); collided = true; }
      if (ny <= 0) { ny = 0; velRef.current.vy = Math.abs(velRef.current.vy); collided = true; }
      else if (ny >= h - size) { ny = h - size; velRef.current.vy = -Math.abs(velRef.current.vy); collided = true; }
      posRef.current = { x: nx, y: ny };
      const dirAngle = Math.atan2(velRef.current.vy, velRef.current.vx) * 180 / Math.PI;
      if (collided) {
        angVelRef.current = (Math.random() * 0.3 + 0.15) * (Math.sign(velRef.current.vx) || 1);
      }
      angleRef.current = dirAngle + (angleRef.current + angVelRef.current * dt - dirAngle) * 0.98;
      forceTick(t => t + 1);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const spriteStyle: React.CSSProperties = {
    position: 'fixed',
    left: posRef.current.x,
    top: posRef.current.y,
    width: '96px',
    height: 'auto',
    zIndex: 100,
    pointerEvents: 'none',
    userSelect: 'none',
    transform: `rotate(${angleRef.current}deg)`,
    willChange: 'transform,left,top',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        .font-nds {
          font-family: 'DotGothic16', sans-serif;
          letter-spacing: -0.05em;
        }
      `}</style>

      <img src="/spriteko.png" alt="spriteko" style={spriteStyle} />

      <div className="min-h-screen bg-[#e0e0e0] flex items-center justify-center p-4 font-nds">
        <div className="absolute top-2 right-4 flex space-x-2 text-gray-500">
          <span className="text-xs mt-1 tabular-nums">{timeStr}</span>
          <Wifi size={16} />
          <Battery size={16} />
        </div>

        <div className="flex flex-col items-center justify-center h-full w-full">
          {stage === 'welcome' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl text-black mb-2 antialiased">hi, welcome</h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-cyan-400 mx-auto rounded-full max-w-xs"
              />
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center">
          <button onClick={handleContinue} className="text-gray-600 text-sm underline-offset-2 hover:text-black select-none">
            Touch the Touch Screen to continue.
          </button>
        </div>
      </div>
    </>
  );
};

export default DSiIntro;