"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/themeContext";
import ThemeToggle from "@/components/ThemeToggle";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isCenter?: boolean;
}

interface Edge {
  source: string;
  target: string;
  length?: number;
}

interface ObsidianGraphIntroProps {
  onComplete: () => void;
}

const INITIAL_NODES: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  // Core
  { id: "artemiui", label: "artemiui", radius: 6.5, isCenter: true },

  // Philosophy, Epistemology & Theology
  { id: "philosophy", label: "philosophy of science", radius: 5 },
  { id: "epistemology", label: "epistemology", radius: 4.5 },
  { id: "metaphysics", label: "metaphysics", radius: 4.5 },
  { id: "analytical-phil", label: "analytical philosophy", radius: 4.5 },
  { id: "catholicism", label: "roman catholicism", radius: 4.5 },

  // Music & Classical
  { id: "music", label: "music & piano", radius: 4.5 },
  { id: "rachmaninoff", label: "rachmaninoff", radius: 4 },
  { id: "classical", label: "romanticism and classical music", radius: 4.5 },

  // Games, Anime & Cinema
  { id: "undertale", label: "undertale", radius: 4.5 },
  { id: "elden-ring", label: "elden ring", radius: 4.5 },
  { id: "cyberpunk", label: "cyberpunk 2077", radius: 4.5 },
  { id: "genshin", label: "genshin impact", radius: 4.5 },
  { id: "minecraft", label: "minecraft", radius: 4 },
  { id: "roblox", label: "roblox jailbreak", radius: 4 },
  { id: "pokemon", label: "pokemon black", radius: 4 },
  { id: "csgo", label: "cs:go", radius: 4 },
  { id: "spiderman", label: "the amazing spider man", radius: 4.5 },
  { id: "steins-gate", label: "steins;gate", radius: 4.5 },
  { id: "aot", label: "attack on titan", radius: 4.5 },
  { id: "tokyo-ghoul", label: "tokyo ghoul :re", radius: 4.5 },
  { id: "drive-my-car", label: "drive my car", radius: 4.5 },
  { id: "perfect-days", label: "perfect days", radius: 4.5 },

  // Science, Mathematics, Statistics & ML
  { id: "mathematics", label: "mathematics", radius: 5.5 },
  { id: "statistics", label: "statistics", radius: 5.5 },
  { id: "data-science", label: "data science", radius: 5.5 },
  { id: "ml", label: "machine learning", radius: 5 },
  { id: "drug-discovery", label: "drug discovery", radius: 4.5 },
  { id: "pareto", label: "pareto frontier", radius: 4 },
  { id: "biostatistics", label: "biostatistics", radius: 4.5 },
  { id: "n-body", label: "n-body simulation", radius: 4 },
  { id: "resilience", label: "community resilience", radius: 4.5 },

  // Creative & Writing
  { id: "design", label: "creative design", radius: 5 },
  { id: "editorial", label: "editorial & layout", radius: 4 },
  { id: "writing", label: "creative writing", radius: 4.5 },
];

const INITIAL_EDGES: Edge[] = [
  // Core connections
  { source: "artemiui", target: "mathematics", length: 110 },
  { source: "artemiui", target: "statistics", length: 115 },
  { source: "artemiui", target: "data-science", length: 105 },
  { source: "artemiui", target: "philosophy", length: 115 },
  { source: "artemiui", target: "design", length: 105 },
  { source: "artemiui", target: "music", length: 110 },
  { source: "artemiui", target: "catholicism", length: 115 },
  { source: "artemiui", target: "elden-ring", length: 120 },
  { source: "artemiui", target: "cyberpunk", length: 120 },
  { source: "artemiui", target: "spiderman", length: 110 },

  // Philosophy & Theology
  { source: "philosophy", target: "epistemology", length: 80 },
  { source: "philosophy", target: "metaphysics", length: 80 },
  { source: "philosophy", target: "analytical-phil", length: 75 },
  { source: "philosophy", target: "ml", length: 105 },
  { source: "epistemology", target: "analytical-phil", length: 75 },
  { source: "epistemology", target: "catholicism", length: 85 },
  { source: "metaphysics", target: "catholicism", length: 85 },
  { source: "metaphysics", target: "epistemology", length: 75 },
  { source: "analytical-phil", target: "artemiui", length: 95 },

  // Music & Classical
  { source: "music", target: "rachmaninoff", length: 75 },
  { source: "music", target: "classical", length: 80 },
  { source: "rachmaninoff", target: "classical", length: 70 },
  { source: "undertale", target: "music", length: 85 },
  { source: "writing", target: "music", length: 80 },

  // Gaming, Anime & Cinema
  { source: "artemiui", target: "genshin", length: 110 },
  { source: "artemiui", target: "perfect-days", length: 115 },
  { source: "genshin", target: "elden-ring", length: 85 },
  { source: "genshin", target: "pokemon", length: 80 },
  { source: "elden-ring", target: "cyberpunk", length: 90 },
  { source: "elden-ring", target: "undertale", length: 85 },
  { source: "cyberpunk", target: "csgo", length: 80 },
  { source: "cyberpunk", target: "spiderman", length: 90 },
  { source: "cyberpunk", target: "steins-gate", length: 85 },
  { source: "steins-gate", target: "aot", length: 80 },
  { source: "steins-gate", target: "n-body", length: 85 },
  { source: "aot", target: "tokyo-ghoul", length: 75 },
  { source: "tokyo-ghoul", target: "writing", length: 80 },
  { source: "drive-my-car", target: "perfect-days", length: 75 },
  { source: "drive-my-car", target: "classical", length: 85 },
  { source: "drive-my-car", target: "writing", length: 80 },
  { source: "perfect-days", target: "music", length: 85 },
  { source: "minecraft", target: "roblox", length: 75 },
  { source: "minecraft", target: "pokemon", length: 75 },
  { source: "roblox", target: "csgo", length: 75 },
  { source: "pokemon", target: "undertale", length: 80 },
  { source: "spiderman", target: "writing", length: 85 },

  // Statistics, Mathematics & ML
  { source: "mathematics", target: "statistics", length: 80 },
  { source: "mathematics", target: "data-science", length: 85 },
  { source: "mathematics", target: "n-body", length: 80 },
  { source: "statistics", target: "data-science", length: 85 },
  { source: "statistics", target: "biostatistics", length: 80 },
  { source: "statistics", target: "ml", length: 90 },
  { source: "data-science", target: "ml", length: 80 },
  { source: "data-science", target: "drug-discovery", length: 85 },
  { source: "data-science", target: "resilience", length: 85 },
  { source: "data-science", target: "pareto", length: 80 },
  { source: "ml", target: "drug-discovery", length: 85 },
  { source: "ml", target: "n-body", length: 80 },
  { source: "drug-discovery", target: "pareto", length: 70 },
  { source: "drug-discovery", target: "biostatistics", length: 80 },
  { source: "n-body", target: "data-science", length: 90 },
  { source: "resilience", target: "statistics", length: 90 },

  // Design & Editorial
  { source: "design", target: "editorial", length: 70 },
  { source: "design", target: "writing", length: 80 },
  { source: "editorial", target: "artemiui", length: 100 },
];

export default function ObsidianGraphIntro({ onComplete }: ObsidianGraphIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const [isExiting, setIsExiting] = useState(false);

  // Physics simulation state stored in refs for 60fps canvas performance
  const nodesRef = useRef<Node[]>([]);
  const draggedNodeRef = useRef<Node | null>(null);
  const hoveredNodeRef = useRef<Node | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleDismiss = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  }, [isExiting, onComplete]);

  // Keyboard navigation to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDismiss]);

  // Initialize node positions smoothly clustered around center
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;

    nodesRef.current = INITIAL_NODES.map((n, i) => {
      const angle = (i / INITIAL_NODES.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const dist = n.isCenter ? 0 : 80 + Math.random() * 160;
      return {
        ...n,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
      };
    });
  }, []);

  // Main Canvas Animation & Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const runPhysics = (w: number, h: number) => {
      const nodes = nodesRef.current;
      const edges = INITIAL_EDGES;
      const cx = w / 2;
      const cy = h / 2;

      // 1. Stable Bounded Repulsion
      const kRepel = 1700;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) || 1;

          if (dist < 260) {
            const force = kRepel / (dist * dist + 160);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (n1 !== draggedNodeRef.current) {
              n1.vx -= fx;
              n1.vy -= fy;
            }
            if (n2 !== draggedNodeRef.current) {
              n2.vx += fx;
              n2.vy += fy;
            }
          }
        }
      }

      // 2. Soft Edge Spring Attraction (Hooke's Law)
      const kSpring = 0.016;
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));

      for (const edge of edges) {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) continue;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = edge.length || 90;
        const displacement = dist - targetDist;
        const force = displacement * kSpring;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (source !== draggedNodeRef.current) {
          source.vx += fx;
          source.vy += fy;
        }
        if (target !== draggedNodeRef.current) {
          target.vx -= fx;
          target.vy -= fy;
        }
      }

      // 3. Grounded Centering Gravity, High Damping & Clamped Speed (No wobbliness)
      const kGravity = 0.0022;
      const damping = 0.78;
      const maxSpeed = 3.5;

      for (const node of nodes) {
        if (node === draggedNodeRef.current) continue;

        // Pull gently toward center of screen
        const dx = cx - node.x;
        const dy = cy - node.y;
        node.vx += dx * kGravity;
        node.vy += dy * kGravity;

        // High friction damping to prevent wobble/oscillation
        node.vx *= damping;
        node.vy *= damping;

        // Clamp speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Integrate velocity
        node.x += node.vx;
        node.y += node.vy;

        // Keep inside bounds
        const pad = 45;
        if (node.x < pad) { node.x = pad; node.vx = 0; }
        if (node.x > w - pad) { node.x = w - pad; node.vx = 0; }
        if (node.y < pad) { node.y = pad; node.vy = 0; }
        if (node.y > h - pad) { node.y = h - pad; node.vy = 0; }
      }
    };

    const render = () => {
      const isDark = theme === "dark";
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update simulation
      runPhysics(w, h);

      // Colors based on theme (Rosy Red accents)
      const bgColor = isDark ? "#09090b" : "#fafafa";
      const defaultEdgeColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.10)";
      const highlightedEdgeColor = isDark ? "rgba(251, 113, 133, 0.60)" : "rgba(225, 29, 72, 0.45)";
      const defaultNodeFill = isDark ? "#71717a" : "#71717a";
      const centerNodeFill = isDark ? "#fb7185" : "#e11d48";
      const hoveredNodeFill = isDark ? "#fda4af" : "#be123c";
      const textPrimary = isDark ? "#f4f4f5" : "#18181b";
      const textMuted = isDark ? "#a1a1aa" : "#71717a";

      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const edges = INITIAL_EDGES;
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const hoveredNode = hoveredNodeRef.current;

      // Set of highlighted node IDs
      const highlightedNodeIds = new Set<string>();
      if (hoveredNode) {
        highlightedNodeIds.add(hoveredNode.id);
        for (const e of edges) {
          if (e.source === hoveredNode.id) highlightedNodeIds.add(e.target);
          if (e.target === hoveredNode.id) highlightedNodeIds.add(e.source);
        }
      }

      // 1. Draw Edges
      ctx.lineWidth = 1;
      for (const edge of edges) {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) continue;

        const isEdgeHighlighted =
          hoveredNode && (edge.source === hoveredNode.id || edge.target === hoveredNode.id);

        ctx.strokeStyle = isEdgeHighlighted ? highlightedEdgeColor : defaultEdgeColor;
        ctx.lineWidth = isEdgeHighlighted ? 1.5 : 1;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }

      // 2. Draw Nodes & Labels
      for (const node of nodes) {
        const isHovered = hoveredNode === node;
        const isHighlighted = highlightedNodeIds.has(node.id);
        const isCenter = !!node.isCenter;

        // Outer subtle glow for center or hovered node
        if (isCenter || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + (isHovered ? 5 : 3.5), 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? isCenter
              ? "rgba(251, 113, 133, 0.22)"
              : "rgba(253, 164, 175, 0.16)"
            : isCenter
            ? "rgba(225, 29, 72, 0.18)"
            : "rgba(225, 29, 72, 0.10)";
          ctx.fill();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? hoveredNodeFill
          : isCenter
          ? centerNodeFill
          : defaultNodeFill;
        ctx.fill();

        // Node Border / Ring
        ctx.strokeStyle = isDark
          ? isCenter || isHovered
            ? "rgba(251, 113, 133, 0.4)"
            : "rgba(255,255,255,0.2)"
          : isCenter || isHovered
          ? "rgba(225, 29, 72, 0.3)"
          : "rgba(0,0,0,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pure Sans-Serif Text Label (All Low-Caps)
        ctx.font = isCenter
          ? '600 12px ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          : '500 11px ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.fillStyle = isCenter
          ? isDark
            ? "#fda4af"
            : "#be123c"
          : isHovered || isHighlighted
          ? textPrimary
          : textMuted;
        const labelX = node.x + node.radius + 5;
        const labelY = node.y + 0.5;
        ctx.fillText(node.label, labelX, labelY);
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [theme]);

  // Pointer Event Handlers (Mouse & Touch)
  const getNodeAt = (x: number, y: number): Node | null => {
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      const dx = node.x - x;
      const dy = node.y - y;
      const hitRadius = Math.max(node.radius + 12, 22);
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        return node;
      }
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dragStartPosRef.current = { x, y };
    hasDraggedRef.current = false;

    const hit = getNodeAt(x, y);
    if (hit) {
      draggedNodeRef.current = hit;
      hit.x = x;
      hit.y = y;
      hit.vx = 0;
      hit.vy = 0;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };

    const dx = x - dragStartPosRef.current.x;
    const dy = y - dragStartPosRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > 4) {
      hasDraggedRef.current = true;
    }

    if (draggedNodeRef.current) {
      draggedNodeRef.current.x = x;
      draggedNodeRef.current.y = y;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else {
      const hit = getNodeAt(x, y);
      hoveredNodeRef.current = hit;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hit ? "grab" : "pointer";
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const wasDraggingNode = !!draggedNodeRef.current;
    if (draggedNodeRef.current) {
      draggedNodeRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }

    // If user clicked anywhere on the canvas background without dragging, open the site
    if (!wasDraggingNode && !hasDraggedRef.current) {
      handleDismiss();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 overflow-hidden select-none bg-zinc-50 dark:bg-zinc-950 font-sans"
    >
      {/* Interactive Obsidian Physics Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 block w-full h-full touch-none"
      />

      {/* Top Header Bar with Theme Toggle (Borderless) */}
      <div className="absolute top-5 right-6 z-20 flex items-center gap-3">
        <ThemeToggle className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors" />
      </div>

      {/* Bottom Centered Hint / Enter Action with Game-Menu Breathing Opacity */}
      <motion.div
        onClick={handleDismiss}
        animate={{ opacity: [0.35, 0.95, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 sm:bottom-10 left-0 right-0 z-20 flex items-center justify-center cursor-pointer pointer-events-auto group px-4 text-center select-none"
      >
        <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors tracking-normal">
          Click anywhere to enter
        </p>
      </motion.div>
    </motion.div>
  );
}
