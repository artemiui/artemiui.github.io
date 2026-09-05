"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Youtube,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  X,
} from "lucide-react";

interface GalleryImage {
  src: string;
  title?: string;
  description: string;
}

interface SubItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  gallery?: GalleryImage[];
  githubUrl?: string;
  liveUrl?: string;
  youtubeId?: string;
}

interface PanelItem {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  layout: "grid" | "single";
  featuredVideo?: {
    title?: string;
    youtubeId: string;
    start?: number;
    url?: string;
  };
  items: SubItem[];
}

const panelsData: PanelItem[] = [
  {
    id: "design-portfolio",
    title: "Design Portfolio",
    imageSrc: "/images/dssoc-design-header.png",
    layout: "grid", // 2 per row for landscape/16:9, 1 per row for portrait/9:16
    featuredVideo: {
      title: "THIS IS IMOLA",
      youtubeId: "pxMt7yt6x7I",
      start: 41,
      url: "https://www.youtube.com/watch?v=pxMt7yt6x7I&t=41s",
    },
    items: [
      {
        id: "design-1",
        title: "Placeholder",
        subtitle: "Placeholder",
        imageSrc: "/images/dssoc-igp-2.png",
        gallery: [
          {
            src: "/images/dssoc-igp-1.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/dssoc-igp-2.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/dssoc-igp-3.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/dssoc-igp-4.png",
            title: "Placeholder",
            description: "Placeholder",
          },
        ],
      },
      {
        id: "design-2",
        title: "Placeholder",
        subtitle: "Placeholder",
        imageSrc: "/images/paddock-south-1.png",
        gallery: [
          {
            src: "/images/paddock-south-1.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/paddock-south-2.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/paddock-south-3.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/paddock-south-4.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/paddock-south-5.png",
            title: "Placeholder",
            description: "Placeholder",
          },
        ],
      },
      {
        id: "design-3",
        title: "Placeholder",
        subtitle: "Placeholder",
        imageSrc: "/images/up-fighting-maroons-1.jpeg",
        gallery: [
          {
            src: "/images/up-fighting-maroons-1.jpeg",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/up-fighting-maroons-2.jpeg",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/up-fighting-maroons-3.jpeg",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/up-fighting-maroons-4.jpeg",
            title: "Placeholder",
            description: "Placeholder",
          },
        ],
      },
      {
        id: "design-4",
        title: "Placeholder",
        subtitle: "Placeholder",
        imageSrc: "/images/partner-pubs-1.png",
        gallery: [
          {
            src: "/images/partner-pubs-1.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/partner-pubs-2.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/partner-pubs-3.jpg",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/partner-pubs-4.jpg",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/partner-pubs-5.jpg",
            title: "Placeholder",
            description: "Placeholder",
          },
        ],
      },
      {
        id: "design-5",
        title: "Placeholder",
        subtitle: "Placeholder",
        imageSrc: "/images/up-evt-1.png",
        gallery: [
          {
            src: "/images/up-evt-1.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/up-evt-2.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/up-evt-3.png",
            title: "Placeholder",
            description: "Placeholder",
          },
        ],
      },
      {
        id: "design-6",
        title: "Placeholder",
        subtitle: "Placeholder",
        imageSrc: "/images/poster-1.png",
        gallery: [
          {
            src: "/images/poster-1.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-2.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-3.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-4.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-5.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-6.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-7.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-8.png",
            title: "Placeholder",
            description: "Placeholder",
          },
          {
            src: "/images/poster-9.png",
            title: "Placeholder",
            description: "Placeholder",
          },
        ],
      },
    ],
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    imageSrc: "/images/research-header.png",
    layout: "single", // 1 panel per row strictly
    items: [
      {
        id: "dev-1",
        title: "Pareto Frontier Framework for In-Silico Drug Design",
        subtitle: "Multi-Target Molecular Docking, ADMET AI Profiling & Efficacy-Toxicity Frontier Analysis",
        description:
          "By integrating P2Rank for binding site prediction and AutoDock Vina for molecular docking, I evaluated 33 plant-derived ligands against over 90 proteins (taking approximately 27 hours to generate on a GPU-less laptop), simultaneously utilizing ADMET AI to generate pharmacokinetic and toxicity profiles.\n\nRegression models like XGBoost and SVR achieved high precision in predicting static binding affinities, but the dataset's high structural diversity limited the accuracy of categorical hallmark classification—demonstrating that standard 1D and 2D physicochemical descriptors struggle to generalize without advanced 3D or graph-based modeling.\n\nAn efficacy-toxicity frontier analysis successfully identified four optimal lead compounds—Rutin, (-)-Epigallocatechin, α-Amyrin, and Paeoniflorin—that exhibit strong therapeutic potential characterized by robust binding affinities (stronger than -6.0 kcal/mol) and safe composite toxicity scores (below 0.30).",
        imageSrc: "/images/pareto-phyto-1.png",
        gallery: [
          {
            src: "/images/pareto-phyto-1.png",
            title: "Binding Affinity & Target Distribution",
            description:
              "P2Rank binding site prediction and AutoDock Vina molecular docking screening of 33 phytochemicals across 90+ cancer-associated protein targets.",
          },
          {
            src: "/images/pareto-phyto-2.png",
            title: "ADMET AI Pharmacokinetic & Toxicity Profile",
            description:
              "Comprehensive pharmacokinetic parameters and toxicity risk classification calculated via ADMET AI deep learning models.",
          },
          {
            src: "/images/pareto-phyto-3.png",
            title: "Efficacy-Toxicity Pareto Frontier Optimization",
            description:
              "Bi-objective Pareto frontier isolating non-dominated lead compounds (Rutin, (-)-Epigallocatechin, α-Amyrin, Paeoniflorin) balancing high affinity (≤ -6.0 kcal/mol) and low composite toxicity (< 0.30).",
          },
        ],
        githubUrl: "https://github.com/artemiui/ds102-pareto-frontier",
      },
      {
        id: "dev-2",
        title: "Classical Toy N-Body Simulation in Python",
        subtitle: "Gravitational Orbital Dynamics & Numerical Integration",
        description:
          "A numerical astrophysics and mechanics simulation modeling the gravitational interactions and orbital trajectories of an N-body celestial system in Python.\n\nImplements classical Newtonian gravitational mechanics and numerical integration to simulate pairwise mutual attraction, velocity vectors, and chaotic many-body orbital paths in real-time.",
        youtubeId: "sIIJ0w_KTBw",
        githubUrl: "https://www.youtube.com/watch?v=sIIJ0w_KTBw",
      },
      {
        id: "dev-3",
        title: "gödle — Propositional Symbolic Logic Game",
        subtitle: "Full-Stack Natural Deduction Proof Environment with Svelte, Node.js & SQLite",
        description:
          "gödle is a full-stack propositional symbolic logic web game inspired by the precision and pedagogical clarity of classic logic texts.\n\nBuilt on Svelte, Node.js, and SQLite, it implements Irving M. Copi's 19 formal rules of natural deduction—spanning 9 Rules of Inference (such as Modus Ponens, Modus Tollens, and Hypothetical Syllogism) and 10 Rules of Replacement (including De Morgan's Laws, Commutation, and Material Implication).\n\nThe platform features an interactive daily Wordle-style deduction challenge curated across Novice, Adept, and Master difficulty tiers, a timed survival mode (Logic Frenzy), a freeform proof sandbox equipped with an automated breadth-first search (BFS) theorem prover and shareable puzzles, and an interactive Copi rule codex.",
        imageSrc: "/images/godle-preview-1.png",
        gallery: [
          {
            src: "/images/godle-preview-1.png",
            title: "Truth Trees Landing & Game Mode Hub",
            description:
              "Interactive landing screen featuring minimalist truth-tree typographic background, mode selector, and daily problem tracker.",
          },
          {
            src: "/images/godle-preview-2.png",
            title: "Daily Natural Deduction Proof Engine",
            description:
              "Daily deductive puzzle interface with premise chaining, KaTeX mathematical formula rendering, rule justifications, and step validator.",
          },
          {
            src: "/images/godle-preview-3.png",
            title: "Prover Sandbox & Copi Problem Library",
            description:
              "Freeform sandbox theorem prover with automated BFS derivation solver, community puzzle authoring, and Irving Copi textbook problem sets.",
          },
        ],
        githubUrl: "https://github.com/artemiui/godle-logic-game",
        liveUrl: "https://godle-logic-game.vercel.app",
      },
    ],
  },
];

export default function ProjectsPage() {
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
    "design-portfolio": false,
    "developer-portfolio": false,
  });

  const [activeGalleryItem, setActiveGalleryItem] = useState<SubItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [devImageIndex, setDevImageIndex] = useState<Record<string, number>>({});

  const togglePanel = (id: string) => {
    setOpenPanels((prev) => {
      const wasOpen = !!prev[id];
      return {
        "design-portfolio": false,
        "developer-portfolio": false,
        [id]: !wasOpen,
      };
    });
  };

  const anyOpen = Object.values(openPanels).some(Boolean);

  const openGallery = (item: SubItem, startIndex: number = 0) => {
    if (item.gallery && item.gallery.length > 0) {
      setActiveGalleryItem(item);
      setCurrentImageIndex(startIndex);
    }
  };

  const closeGallery = () => {
    setActiveGalleryItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!activeGalleryItem?.gallery) return;
    setCurrentImageIndex((prev) =>
      prev < (activeGalleryItem.gallery?.length ?? 1) - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    if (!activeGalleryItem?.gallery) return;
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : (activeGalleryItem.gallery?.length ?? 1) - 1
    );
  };

  // Keyboard navigation for gallery overlay
  useEffect(() => {
    if (!activeGalleryItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGallery();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryItem]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pb-2 border-b border-zinc-200 dark:border-zinc-800"
      >
        <h1 className="text-2xl font-mono font-semibold text-zinc-900 dark:text-zinc-100">
          Projects
        </h1>
      </motion.div>

      {/* Stacked 3:1 Dropdown Image Panels */}
      <div className="space-y-4">
        {panelsData.map((panel, index) => {
          const isOpen = !!openPanels[panel.id];
          const isDimmed = anyOpen && !isOpen;

          return (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-full"
            >
              {/* Interactive Parent Button with Dynamic Focus & Deemphasis */}
              <button
                type="button"
                onClick={() => togglePanel(panel.id)}
                aria-expanded={isOpen}
                className={`group relative w-full rounded-2xl overflow-hidden transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 text-left block cursor-pointer ${
                  isDimmed
                    ? "aspect-[4/1] sm:aspect-[6/1] opacity-35 hover:opacity-80 grayscale-[35%] hover:grayscale-0 scale-[0.985] hover:scale-[0.995] shadow-none"
                    : "aspect-[3/1] opacity-100 scale-100 shadow-md ring-1 ring-zinc-900/10 dark:ring-white/15"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={panel.imageSrc}
                    alt={panel.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isDimmed
                        ? "filter brightness-90 group-hover:scale-100"
                        : "group-hover:scale-105"
                    }`}
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                    unoptimized
                  />
                </div>

                {/* Theme-Adaptive Gradient / Vignette Overlay */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isDimmed
                      ? "bg-white/75 dark:bg-black/75 group-hover:bg-white/60 dark:group-hover:bg-black/60"
                      : "bg-gradient-to-t from-white/90 via-white/40 to-transparent group-hover:from-white/95 group-hover:via-white/50 dark:from-black/80 dark:via-black/40 dark:to-transparent dark:group-hover:from-black/85 dark:group-hover:via-black/50"
                  }`}
                />

                {/* Overlay Content & Chevron Toggle */}
                <div
                  className={`absolute inset-0 flex items-end justify-between text-zinc-900 dark:text-white z-10 transition-all duration-500 ${
                    isDimmed ? "p-3 sm:p-4" : "p-4 sm:p-6"
                  }`}
                >
                  <div className="space-y-0.5">
                    <h2 className="font-sans font-bold tracking-tight text-zinc-900 dark:text-white drop-shadow-sm text-lg sm:text-xl md:text-2xl">
                      {panel.title}
                    </h2>
                    {panel.subtitle && (
                      <p
                        className={`font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-200/90 drop-shadow-sm transition-opacity duration-300 ${
                          isDimmed ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {panel.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Animated Chevron Indicator */}
                  <div
                    className={`p-1.5 sm:p-2 rounded-full backdrop-blur-sm text-zinc-800 dark:text-white/90 shadow-sm transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "bg-white dark:bg-white/20 text-zinc-900 dark:text-white ring-1 ring-black/10 dark:ring-white/30"
                        : "bg-white/80 dark:bg-black/40 group-hover:bg-white dark:group-hover:bg-black/60"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>
                </div>
              </button>

              {/* Expandable Dropdown Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden space-y-4 antialiased"
                  >
                    {/* Big Featured Video Panel (after parent panel, before subpanels) */}
                    {panel.featuredVideo && (
                      <div className="pt-3">
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-black border border-zinc-200/60 dark:border-white/10">
                          <iframe
                            src={`https://www.youtube.com/embed/${panel.featuredVideo.youtubeId}${
                              panel.featuredVideo.start ? `?start=${panel.featuredVideo.start}` : ""
                            }`}
                            title={panel.featuredVideo.title || "Featured Video"}
                            loading="lazy"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}

                    {/* Sub-panels Grid / List */}
                    <div
                      className={`pb-2 ${!panel.featuredVideo ? "pt-5 sm:pt-6" : ""} ${
                        panel.layout === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-6"
                          : "space-y-8"
                      }`}
                    >
                      {panel.items.map((item) => {
                        const isSingleRow = panel.layout === "single";
                        const hasGallery = item.gallery && item.gallery.length > 0;

                        if (!isSingleRow) {
                          // Design Portfolio: Card with unhindered thumbnail on top, readable text below
                          return (
                            <div
                              key={item.id}
                              onClick={() => hasGallery && openGallery(item)}
                              className={`group flex flex-col text-left ${
                                hasGallery ? "cursor-pointer" : ""
                              }`}
                            >
                              {/* Clean Thumbnail Box */}
                              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-zinc-100 dark:bg-zinc-800">
                                {item.imageSrc && !item.imageSrc.startsWith("/placeholder") ? (
                                  <Image
                                    src={item.imageSrc}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    unoptimized
                                  />
                                ) : (
                                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500">
                                      <ImageIcon className="w-5 h-5 opacity-60" />
                                      <span className="text-[10px] font-mono tracking-wider uppercase opacity-70">
                                        Thumbnail Placeholder
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Readable Text Below Thumbnail */}
                              <div className="pt-2.5 px-0.5 flex items-start justify-between gap-2">
                                <div className="space-y-0.5 min-w-0">
                                  <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors tracking-tight truncate">
                                    {item.title}
                                  </h3>
                                  {item.subtitle && (
                                    <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 truncate">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {item.liveUrl && (
                                    <a
                                      href={item.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label="View live demo"
                                      title="View Live Web App"
                                      className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex-shrink-0"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                  {item.githubUrl && (
                                    <a
                                      href={item.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label="View repository on GitHub"
                                      title="View GitHub Repository"
                                      className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex-shrink-0"
                                    >
                                      <Github className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Developer Portfolio: 4:3 Media on Left, Balanced Details on Right
                        const selectedIdx = devImageIndex[item.id] || 0;
                        const currentSrc =
                          item.gallery && item.gallery[selectedIdx]
                            ? item.gallery[selectedIdx].src
                            : item.imageSrc;
                        const isYoutube = item.githubUrl?.includes("youtube.com") || !!item.youtubeId;

                        return (
                          <div
                            key={item.id}
                            className="group flex flex-col md:flex-row items-start gap-4 sm:gap-6 text-left w-full"
                          >
                            {/* Left Column: 4:3 YouTube Embed or Figure Preview */}
                            <div className="w-full md:w-5/12 lg:w-5/12 flex flex-col gap-2 flex-shrink-0">
                              {item.youtubeId ? (
                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-black flex-shrink-0">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                                    title={item.title}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  />
                                </div>
                              ) : (
                                <>
                                  {/* Main 4:3 Image Preview (Click to open full Lightbox) */}
                                  <div
                                    onClick={() => hasGallery && openGallery(item, selectedIdx)}
                                    className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-zinc-100 dark:bg-zinc-800 ${
                                      hasGallery ? "cursor-pointer" : ""
                                    }`}
                                  >
                                    {currentSrc && !currentSrc.startsWith("/placeholder") ? (
                                      <Image
                                        src={currentSrc}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        priority
                                        unoptimized
                                      />
                                    ) : (
                                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500">
                                          <ImageIcon className="w-6 h-6 opacity-60" />
                                          <span className="text-[10px] font-mono tracking-wider uppercase opacity-70">
                                            4:3 Banner Placeholder
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* 3 Thumbnail Buttons to switch between figures */}
                                  {item.gallery && item.gallery.length > 1 && (
                                    <div className="grid grid-cols-3 gap-2">
                                      {item.gallery.map((img, gIdx) => (
                                        <button
                                          key={gIdx}
                                          type="button"
                                          onClick={() =>
                                            setDevImageIndex((prev) => ({
                                              ...prev,
                                              [item.id]: gIdx,
                                            }))
                                          }
                                          className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                                            gIdx === selectedIdx
                                              ? "border-zinc-900 dark:border-white shadow-sm scale-[1.02]"
                                              : "border-transparent opacity-60 hover:opacity-100"
                                          }`}
                                        >
                                          <img
                                            src={img.src}
                                            alt=""
                                            className="w-full h-full object-cover"
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Right Column: Title, Subtitle, Action Button & Formatted Description */}
                            <div className="flex-1 min-w-0 space-y-2.5 w-full flex flex-col justify-start">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-0.5 min-w-0">
                                  <h3 className="font-sans font-bold text-base sm:text-lg md:text-xl text-zinc-900 dark:text-zinc-100 tracking-tight">
                                    {item.title}
                                  </h3>
                                  {item.subtitle && (
                                    <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>

                                {/* External / Repository Button */}
                                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                  {item.liveUrl && (
                                    <a
                                      href={item.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label="View live web app"
                                      title="View Live Web App"
                                      className="p-2 sm:p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm border border-zinc-200 dark:border-zinc-700 transition-all flex items-center justify-center flex-shrink-0"
                                    >
                                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                  )}
                                  {item.githubUrl && (
                                    <a
                                      href={item.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label={isYoutube ? "Watch on YouTube" : "View source repository on GitHub"}
                                      title={isYoutube ? "Watch on YouTube" : "View GitHub Repository"}
                                      className="p-2 sm:p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm border border-zinc-200 dark:border-zinc-700 transition-all flex items-center justify-center flex-shrink-0"
                                    >
                                      {isYoutube ? (
                                        <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-500" />
                                      ) : (
                                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                      )}
                                    </a>
                                  )}
                                </div>
                              </div>

                              {/* Formatted Project Description */}
                              {item.description && (
                                <div className="pt-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans space-y-2.5 border-t border-zinc-200/60 dark:border-zinc-800/60">
                                  {item.description.split("\n\n").map((paragraph, pIdx) => (
                                    <p key={pIdx}>{paragraph}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Interactive Gallery Modal Overlay */}
      <AnimatePresence>
        {activeGalleryItem && activeGalleryItem.gallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeGallery}
              className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-md"
            />

            {/* Seamless Floating Modal with No Panel Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10 select-none max-h-[94vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Viewport: Full Uncropped Display */}
              <div className="relative w-full flex items-center justify-center p-2 sm:p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex items-center justify-center"
                  >
                    <img
                      src={activeGalleryItem.gallery[currentImageIndex].src}
                      alt={
                        activeGalleryItem.gallery[currentImageIndex].title ||
                        activeGalleryItem.title
                      }
                      className="max-h-[62vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Close Button */}
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 pointer-events-auto">
                  <button
                    onClick={closeGallery}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:scale-105"
                    aria-label="Close overlay"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Left / Right Chevron Controls */}
                {activeGalleryItem.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:scale-105 z-20"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:scale-105 z-20"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom Details Floating directly over backdrop */}
              <div className="w-full pt-3 px-4 sm:px-6 space-y-2 text-center sm:text-left z-20">
                <div className="space-y-0.5">
                  {activeGalleryItem.gallery[currentImageIndex].title && (
                    <h3 className="font-sans font-bold text-base sm:text-xl text-white drop-shadow-md tracking-tight">
                      {activeGalleryItem.gallery[currentImageIndex].title}
                    </h3>
                  )}
                  <p className="font-sans text-xs sm:text-sm text-zinc-200/90 leading-relaxed drop-shadow-md max-w-3xl">
                    {activeGalleryItem.gallery[currentImageIndex].description}
                  </p>
                </div>

                {/* Seamless Indicator Dots */}
                {activeGalleryItem.gallery.length > 1 && (
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                    {activeGalleryItem.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`Jump to image ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "w-6 bg-white"
                            : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
