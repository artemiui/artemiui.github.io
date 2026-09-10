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
        title: "Merchandise Work",
        subtitle: "UP Data Science Society",
        description:
          "I designed the official merchandise collection for the UP Data Science Society, translating our mission of 'Agham ng Datos Para sa Bayan' into apparel and accessories. The release includes the ASCII Oblation graphic tee, executive corporate polos, die-cast circuit enamel pins, and custom collegiate lanyards.",
        imageSrc: "/images/dssoc-igp-2.png",
        gallery: [
          {
            src: "/images/dssoc-igp-1.png",
            title: "Merchandise Collection Lineup & Overview",
            description:
              "A flat-lay showcase of the UP Data Science Society 'mr26' merchandise collection that I designed, highlighting the ASCII Oblation shirt, custom sticker pack with statistical puns ('THAT'S MEAN!', 'NaNstop'), and collegiate lanyards.",
          },
          {
            src: "/images/dssoc-igp-2.png",
            title: "ASCII Oblation Graphic Tee",
            description:
              "I created an ASCII-art rendering of the UP Oblation statue combined with stereonet projections and data pipeline pseudocode, uniting UP heritage with the ethos of 'Agham ng Datos Para sa Bayan'.",
          },
          {
            src: "/images/dssoc-igp-3.png",
            title: "Executive Corporate Polo & Enamel Pins",
            description:
              "Official corporate apparel for UP Data Science Society members featuring diagonal chevron color blocking in violet, black, and white, paired with custom die-cast enamel pins modeled after our circuit-arrow emblem.",
          },
          {
            src: "/images/dssoc-igp-4.png",
            title: "Collegiate Lanyards: D4T4 & I?KOLAR",
            description:
              "Bespoke lanyards I designed for UP Diliman students: the 'D4T4' ribbon celebrating data science for the nation, and the 'I?KOLAR' band incorporating traditional Baybayin motifs and 'Dangal, Husay, at Serbisyo'.",
          },
        ],
      },
      {
        id: "design-2",
        title: "Sports Publication",
        subtitle: "Paddock South",
        description:
          "During my time directing creative publication for Paddock South—a premier Southeast Asian motorsport and Formula 1 community—I designed race-week posters, circuit telemetry breakdowns, community milestone celebrations, and retro-themed Grand Prix visual packages.",
        imageSrc: "/images/paddock-south-1.png",
        gallery: [
          {
            src: "/images/paddock-south-1.png",
            title: "RUSH Community Movie Night Poster",
            description:
              "I designed this retro-grain race poster for Paddock South's community screening of 'RUSH' (dir. Ron Howard), depicting the iconic 1976 championship rivalry between Niki Lauda (Scuderia Ferrari) and James Hunt (McLaren) with Nürburgring heritage styling.",
          },
          {
            src: "/images/paddock-south-2.png",
            title: "Canadian GP: Circuit Gilles-Villeneuve Engineering Infographic",
            description:
              "Technical race briefing I created breaking down Circuit Gilles-Villeneuve in Montreal, analyzing cornering speeds, DRS zones, asphalt grip, and Pirelli tire compound metrics (C4, C5, C6) powered by Paddock South.",
          },
          {
            src: "/images/paddock-south-3.png",
            title: "Paddock South 2K Members Milestone",
            description:
              "Commemorative artwork celebrating Paddock South reaching 2,000 community members, featuring a detailed wireframe 3D CAD schematic of a contemporary Formula 1 ground-effect race car.",
          },
          {
            src: "/images/paddock-south-4.png",
            title: "Austrian GP: Red Bull Ring Race Poster",
            description:
              "Race-weekend creative celebrating Oracle Red Bull Racing at their home circuit in Spielberg, highlighting 3-time world champion Max Verstappen, Yuki Tsunoda, and the iconic Red Bull Ring bull monument under @virtualsarili.",
          },
          {
            src: "/images/paddock-south-5.png",
            title: "Silverstone GP: 16-Bit Pixel Special",
            description:
              "A nostalgic 16-bit arcade-style publication I illustrated for the British Grand Prix at Silverstone, featuring Mercedes-AMG PETRONAS driver George Russell and his famous cockpit team radio quote.",
          },
        ],
      },
      {
        id: "design-3",
        title: "UP Fighting Maroons F1 Concept Livery",
        subtitle: "Personal Project",
        description:
          "A personal passion project merging open-wheel Formula 1 motorsport aesthetics with the collegiate identity and activist heritage of the University of the Philippines. I authored and rendered a complete 2026-spec concept livery on the RSS Formula Hybrid chassis in Assetto Corsa.",
        imageSrc: "/images/up-fighting-maroons-1.jpeg",
        gallery: [
          {
            src: "/images/up-fighting-maroons-1.jpeg",
            title: "Overhead Cockpit & Halo View",
            description:
              "A top-down trackside render I produced in Assetto Corsa, showing the maroon-and-white gradient transitioning smoothly over the titanium Halo protection system and carbon tub.",
          },
          {
            src: "/images/up-fighting-maroons-2.jpeg",
            title: "Sidepod Venturi Tunnels & UP Clenched Fist",
            description:
              "Side elevation highlighting the sculpted aerodynamic ground-effect sidepods, carrying the UP Fighting Maroons clenched fist emblem and bold university slogans in high contrast.",
          },
          {
            src: "/images/up-fighting-maroons-3.jpeg",
            title: "Nosecone #08 & Oblation Silhouette",
            description:
              "Front aerodynamic view showcasing racing number #08 with the silhouette of the UP Oblation, front wing carbon dive planes, and yellow Pirelli P-Zero medium compound tires.",
          },
          {
            src: "/images/up-fighting-maroons-4.jpeg",
            title: "High-Speed Panning Shot: 'STATE U'",
            description:
              "Dynamic high-speed panning shot down the main straight, accentuating the 'STATE U' engine cowl graphics and traditional Cordillera indigenous textile patterns adorning the rear wing endplates.",
          },
        ],
      },
      {
        id: "design-4",
        title: "Partner Publications",
        subtitle: "UP Data Science Society",
        description:
          "I spearheaded promotional creative direction and branding publications for UP Data Science Society's corporate and enterprise partnership events, collaborating with industry leaders including GCash (Mynt) and Globe Telecom.",
        imageSrc: "/images/partner-pubs-1.png",
        gallery: [
          {
            src: "/images/partner-pubs-1.png",
            title: "GCash x UP DSSoc: Building Trust in Fintech",
            description:
              "Key visual poster I designed for our collaborative webinar with GCash (Mynt), spotlighting Responsible AI and Data Privacy in the Financial Sector with Lead Software Engineer and Research Scientist JC Diamante.",
          },
          {
            src: "/images/partner-pubs-2.png",
            title: "Speaker Profile: John Christian 'JC' Diamante",
            description:
              "Speaker profile card highlighting JC Diamante's work across cloud microservices at GCash, aerial computer vision research at Mapúa University, and open-source civic tech contributions with BetterGov.ph.",
          },
          {
            src: "/images/partner-pubs-3.jpg",
            title: "Globe Data Sessions: Beyond AI Adoption",
            description:
              "Official event announcement I crafted for Globe Telecom x UP Data Science Society, introducing an industry session on fostering responsible AI adoption across academe and corporate workplaces.",
          },
          {
            src: "/images/partner-pubs-4.jpg",
            title: "Speaker Feature: Celso T. Villano Jr. (Globe Telecom)",
            description:
              "Detailed speaker feature detailing the academic and professional milestones of Celso T. Villano Jr., MLOps Manager at Globe Telecom and PhD candidate in Data Science at UP Diliman.",
          },
          {
            src: "/images/partner-pubs-5.jpg",
            title: "Globe Data Sessions: Broadcast Teaser",
            description:
              "Social media countdown and broadcast alert I adapted for multi-channel streaming across Zoom and Facebook Live, adhering strictly to Globe Telecom's modern corporate identity.",
          },
        ],
      },
      {
        id: "design-5",
        title: "UP Fighting Maroons Varsity",
        subtitle: "Office of Athletics and Sports Development",
        description:
          "As a graphics and media volunteer for the UP Office of Athletics and Sports Development (OASD) and the UP Esports Varsity Team, I created official roster reveals, post-season Final Four celebration posters, matchday MVP graphics, and team postcards. My work incorporated university varsity sponsors and partners including Acer Predator, Converge FiberX, Nissin Yakisoba, Pulsar Gaming Gears, Nature's Spring, Celest, and Nowhere To Go But UP Foundation.",
        imageSrc: "/images/up-evt-final-four.png",
        gallery: [
          {
            src: "/images/up-evt-final-four.png",
            title: "UAAP Season 88 Esports: Final Four Team Poster",
            description:
              "Official UAAP Season 88 Esports post-season celebration poster I designed for the UP Fighting Maroons as the squad advanced into the Final Four, featuring the full varsity roster and partners Celest, Pulsar, and Nowhere To Go But UP Foundation.",
          },
          {
            src: "/images/up-evt-1.png",
            title: "UAAP Season 88 Roster Reveal: Clemente (VALORANT)",
            description:
              "Official tournament roster publication I produced featuring varsity athlete Clemente for UAAP S88 at MVP Studios, showcasing official jersey sponsors Acer Predator, Converge FiberX, Nissin Yakisoba, and Nowhere To Go But UP Foundation.",
          },
          {
            src: "/images/up-evt-2.png",
            title: "Matchday MVP: Sicat (Mobile Legends: Bang Bang)",
            description:
              "Post-match MVP victory graphic celebrating Sicat's game-winning performance (583 GPM, 72% KP, 01/02/12 KDA) against the FEU Tamaraws. I designed the official template for this matchday series, incorporating Celest and Nowhere To Go But UP branding.",
          },
          {
            src: "/images/up-evt-3.png",
            title: "Matchday MVP: San Gabriel 'ACE' (VALORANT)",
            description:
              "Clutch match MVP graphic celebrating San Gabriel's 320 ACS and 27/15/2 KDA performance in a 13-10 victory over FEU Game 2, highlighting tournament partners Pulsar Gaming Gears, Nature's Spring, and Celest.",
          },
          {
            src: "/images/up-tennis-postcards.png",
            title: "Postcards from the UP Men's Tennis Team",
            description:
              "Social media and video feature thumbnail I produced for the UP Office of Athletics and Sports Development (OASD), capturing the UP Men's Tennis Team in live high-intensity training drills on the indoor courts.",
          },
        ],
      },
      {
        id: "design-6",
        title: "Poster Work",
        subtitle: "Mixed",
        description:
          "A curated collection of poster designs across student leadership, advocacy campaigns, academic initiatives, music events, and scientific risk communication. This anthology features design work produced for the UP Diliman College of Social Sciences and Philosophy (CSSP FSTC / CSSPSC), BetterGov.ph, GeoRisk Philippines, and independent community projects.",
        imageSrc: "/images/poster-1.png",
        gallery: [
          {
            src: "/images/poster-1.png",
            title: "Niña Maria: Rock Nation Champions",
            description:
              "Concert victory poster I created for indie rock band Niña Maria after winning Battle of the Bands: Rock Nation at Holy Family School Quezon City, featuring prism light leaks and stage photography.",
          },
          {
            src: "/images/poster-2.png",
            title: "Ang Awit ng Mendiola: State Accountability",
            description:
              "Human rights advocacy poster I designed for the UP CSSP FSTC (Freshie, Shiftee, and Transferee Council), commemorating the Mendiola peasant struggle and calling for justice for state violence victims.",
          },
          {
            src: "/images/poster-3.png",
            title: "Sumanib sa Pagkondena: EDSA People Power",
            description:
              "Mobilization poster created with the UP Diliman CSSP Student Council (CSSPSC) and CSSP FSTC, invoking the People Power Monument and collective resistance against authoritarian abuses.",
          },
          {
            src: "/images/poster-4.png",
            title: "UP Data Science Society Ecosystem Primer",
            description:
              "Comprehensive organizational primer I laid out for UP DSSoc, highlighting our bootcamps, open-source projects, the Philippine Junior Data Science Challenge, and corporate partners including Thinking Machines, Globe, BPI, and GCash.",
          },
          {
            src: "/images/poster-5.png",
            title: "Huwag Kukurap: Public Procurement Anomaly Detection",
            description:
              "ACLE event poster I designed for UP DSSoc and civic tech partner BetterGov.ph, promoting our open-source Python repository for detecting irregularities in government procurement datasets.",
          },
          {
            src: "/images/poster-6.png",
            title: "AStranghero 2025: CSSP FST Month Events",
            description:
              "Event calendar poster for the UP CSSP Freshie, Shiftee, and Transferee Month ('AStranghero 2025'), featuring symbolic portal doors inspired by Makoto Shinkai's Suzume to welcome incoming students.",
          },
          {
            src: "/images/poster-7.png",
            title: "Seismic Hazard Assessment: La Trinidad, Benguet",
            description:
              "Disaster risk reduction and geospatial hazard infographic I drafted for La Trinidad, Benguet, incorporating fault lines (Tubao & Mirador Faults) and elevation models via GeoRisk Philippines and HazardHunterPH.",
          },
          {
            src: "/images/poster-8.png",
            title: "The Red Flags of Electricity & E-Waste",
            description:
              "Educational science infographic published under my author citation Arcega (2025), illustrating electrical safety fundamentals, the E-L-E-C-T-R-I-C mnemonic, and responsible e-waste lifecycle stewardship.",
          },
          {
            src: "/images/poster-9.png",
            title: "Sustainability: Ecological Stewardship & Action",
            description:
              "Minimalist environmental advocacy graphic framing community-level climate action around 'Who, How, What' to support reforestation, sustainable development goals, and ecosystem protection.",
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
  const [canvaViewMode, setCanvaViewMode] = useState<"preview" | "iframe">("preview");

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
                                {hasGallery && (
                                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-mono tracking-wider font-medium flex items-center gap-1.5 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                                    <Layers className="w-3 h-3" />
                                    <span>{item.gallery!.length} items</span>
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
                                  {item.description && (
                                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed pt-0.5">
                                      {item.description}
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

                    {/* Canva Archive Portfolio Section (Design Portfolio) */}
                    {panel.id === "design-portfolio" && (
                      <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-medium text-red-600 dark:text-red-400">
                                Archive & Extended Works
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight text-zinc-900 dark:text-zinc-100">
                              Canva Portfolio Archive
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-2xl leading-relaxed">
                              My foundational portfolio retrospective showcasing freelance client commissions, branding systems, cover artwork, and event publications.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <a
                              href="https://artemiui.my.canva.site/portfolio"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 transition-all shadow-sm"
                            >
                              <span>Open in New Tab</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Interactive Viewport Container */}
                        <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-md flex flex-col">
                          {/* Browser Window Header Bar */}
                          <div className="px-3.5 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                              </div>
                              <span className="text-[11px] font-mono text-zinc-400 ml-2 hidden sm:inline truncate">
                                artemiui.my.canva.site/portfolio
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  setCanvaViewMode(canvaViewMode === "preview" ? "iframe" : "preview")
                                }
                                className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/60 transition-colors"
                              >
                                {canvaViewMode === "preview" ? "Try Live Embed" : "Show Snapshot"}
                              </button>
                              <a
                                href="https://artemiui.my.canva.site/portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open full site"
                                className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>

                          {/* Body: Either Live Iframe or High-Res Snapshot with Interactive Overlay */}
                          {canvaViewMode === "iframe" ? (
                            <div className="relative w-full h-[600px] sm:h-[750px] bg-black">
                              <iframe
                                src="https://artemiui.my.canva.site/portfolio"
                                title="Artemio Arcega Canva Portfolio"
                                loading="lazy"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <a
                              href="https://artemiui.my.canva.site/portfolio"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative block w-full aspect-[16/9] sm:aspect-[16/8.5] max-h-[600px] overflow-hidden bg-black cursor-pointer"
                            >
                              <Image
                                src="/images/canva-portfolio-preview.png"
                                alt="Artemio Arcega Canva Portfolio"
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                                priority
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20 shadow-xl group-hover:bg-white group-hover:text-black transition-all">
                                  <span>Explore on Canva</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
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
