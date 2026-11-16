export interface GalleryImage {
  src: string;
  title?: string;
  description: string;
  url?: string;
}

export interface MediaProject {
  id: string;
  title: string;
  client: string;
  deliverable: string;
  description: string;
  gallery: GalleryImage[];
  liveUrl?: string;
}

export interface DevProject {
  id: string;
  title: string;
  summary: string;
  context: string;
  stack: string[];
  description: string;
  gallery?: GalleryImage[];
  fit?: "cover" | "contain";
  youtubeId?: string;
  liveUrl?: string;
  sourceUrl?: string;
  videoUrl?: string;
}

export const featuredVideo = {
  title: "This is Imola",
  youtubeId: "pxMt7yt6x7I",
  start: 41,
};

export const canvaPortfolio = {
  url: "https://artemiui.my.canva.site/portfolio",
  image: "/images/canva-portfolio-preview.png",
};

export const organizations = [
  "UP Data Science Society",
  "UP Office for Athletics and Sports Development",
  "UP Esports Varsity Team",
  "Paddock South",
  "UP CSSP Student Council",
  "BetterGov.ph",
];

export const mediaProjects: MediaProject[] = [
  {
    id: "varsity",
    title: "UP Fighting Maroons Varsity",
    client: "UP OASD and UP Esports Varsity",
    deliverable: "Sports graphics",
    description:
      "As a graphics and media volunteer for the UP Office of Athletics and Sports Development and the UP Esports Varsity Team, I created roster reveals, the UAAP Season 88 Final Four poster, matchday MVP graphics, and team postcards. The work carries the varsity's sponsors and partners, including Acer Predator, Converge FiberX, Nissin Yakisoba, Pulsar Gaming Gears, Nature's Spring, Celest, and Nowhere To Go But UP Foundation.",
    gallery: [
      {
        src: "/images/up-evt-final-four.png",
        title: "UAAP Season 88 Esports: Final Four team poster",
        description:
          "Post-season poster I designed for the UP Fighting Maroons as the squad advanced into the Final Four, featuring the full varsity roster and partners Celest, Pulsar, and Nowhere To Go But UP Foundation.",
      },
      {
        src: "/images/up-evt-1.png",
        title: "UAAP Season 88 roster reveal: Clemente (VALORANT)",
        description:
          "Tournament roster publication featuring varsity athlete Clemente for UAAP S88 at MVP Studios, with jersey sponsors Acer Predator, Converge FiberX, Nissin Yakisoba, and Nowhere To Go But UP Foundation.",
      },
      {
        src: "/images/up-evt-2.png",
        title: "Matchday MVP: Sicat (Mobile Legends: Bang Bang)",
        description:
          "MVP graphic for Sicat's game-winning performance (583 GPM, 72% KP, 01/02/12 KDA) against the FEU Tamaraws. I designed the template for this matchday series, with Celest and Nowhere To Go But UP branding.",
      },
      {
        src: "/images/up-evt-3.png",
        title: "Matchday MVP: San Gabriel (VALORANT)",
        description:
          "MVP graphic for San Gabriel's 320 ACS and 27/15/2 KDA in a 13–10 win over FEU in Game 2, with tournament partners Pulsar Gaming Gears, Nature's Spring, and Celest.",
      },
      {
        src: "/images/up-tennis-postcards.png",
        title: "Postcards from the UP Men's Tennis Team",
        description:
          "Social and video thumbnail for UP OASD, capturing the UP Men's Tennis Team in training drills on the indoor courts.",
      },
    ],
  },
  {
    id: "oasd-coverage",
    title: "Sideline coverage and interviews",
    client: "UP OASD",
    deliverable: "Video",
    description:
      "Sideline videography, athlete interviews, and social reels produced for the UP Office for Athletics and Sports Development across UAAP Season 88 and Season 89.",
    liveUrl: "https://www.facebook.com/reel/1406007901680381",
    gallery: [
      {
        src: "/images/up-oasd-reel-1.jpg",
        title: "UP Women's Football Team: road to the first Season 89 win",
        description:
          "Sideline interview capturing the team's post-match energy heading into their final Round 1 fixture. Filmed by Art Arcega and Kirsten Hiwatig.",
        url: "https://www.facebook.com/reel/1406007901680381",
      },
      {
        src: "/images/up-oasd-reel-2.jpg",
        title: "Women's Month: what makes women athletes powerful?",
        description:
          "Athlete feature on the courage, discipline, and grit of the UP Fighting Maroons women athletes. Filmed by Art Arcega, Misha Daquila, Kirsten Hiwatig, and Pat Yapit.",
        url: "https://www.facebook.com/reel/935340148903024",
      },
      {
        src: "/images/up-oasd-reel-3.jpg",
        title: "Dennis Trillo at the UAAP Season 88 fencing tournament",
        description:
          "Sideline interview with actor Dennis Trillo, cheering on his son Calix Ho to a gold-medal finish. Filmed by Art Arcega.",
        url: "https://www.facebook.com/reel/779513934881128",
      },
      {
        src: "/images/up-oasd-reel-4.jpg",
        title: "Debunking fencing misconceptions with the UP Fencing Team",
        description:
          "Interview and sport feature on common misconceptions about collegiate fencing. Filmed and edited by Art Arcega, written by Louise Pili.",
        url: "https://www.facebook.com/reel/958814873309930",
      },
    ],
  },
  {
    id: "merch",
    title: "Merchandise collection",
    client: "UP Data Science Society",
    deliverable: "Apparel and accessories",
    description:
      "I designed the official merchandise collection for the UP Data Science Society, translating its mission of 'Agham ng Datos Para sa Bayan' into apparel and accessories: the ASCII Oblation graphic tee, executive polos, die-cast circuit enamel pins, and collegiate lanyards.",
    gallery: [
      {
        src: "/images/dssoc-igp-1.png",
        title: "Collection lineup",
        description:
          "Flat-lay of the 'mr26' collection: the ASCII Oblation shirt, a sticker pack with statistical puns ('THAT'S MEAN!', 'NaNstop'), and collegiate lanyards.",
      },
      {
        src: "/images/dssoc-igp-2.png",
        title: "ASCII Oblation graphic tee",
        description:
          "An ASCII rendering of the UP Oblation combined with stereonet projections and data pipeline pseudocode.",
      },
      {
        src: "/images/dssoc-igp-3.png",
        title: "Executive polo and enamel pins",
        description:
          "Polos with diagonal chevron blocking in violet, black, and white, paired with die-cast pins modeled after the society's circuit-arrow emblem.",
      },
      {
        src: "/images/dssoc-igp-4.png",
        title: "Lanyards: D4T4 and I?KOLAR",
        description:
          "The 'D4T4' ribbon for data science for the nation, and the 'I?KOLAR' band with Baybayin motifs and 'Dangal, Husay, at Serbisyo'.",
      },
    ],
  },
  {
    id: "partner-pubs",
    title: "Partner event publications",
    client: "UP DSSoc with GCash and Globe Telecom",
    deliverable: "Event campaigns",
    description:
      "I led creative direction for the UP Data Science Society's partnership events with GCash (Mynt) and Globe Telecom: key visuals, speaker profiles, and broadcast teasers.",
    gallery: [
      {
        src: "/images/partner-pubs-1.png",
        title: "GCash x UP DSSoc: Building Trust in Fintech",
        description:
          "Key visual for the joint webinar with GCash (Mynt) on responsible AI and data privacy in finance, with Lead Software Engineer and Research Scientist JC Diamante.",
      },
      {
        src: "/images/partner-pubs-2.png",
        title: "Speaker profile: JC Diamante",
        description:
          "Profile card covering JC Diamante's work on cloud microservices at GCash, aerial computer vision research at Mapúa University, and civic tech with BetterGov.ph.",
      },
      {
        src: "/images/partner-pubs-3.jpg",
        title: "Globe Data Sessions: Beyond AI Adoption",
        description:
          "Event announcement for Globe Telecom x UP Data Science Society, introducing an industry session on responsible AI adoption in schools and workplaces.",
      },
      {
        src: "/images/partner-pubs-4.jpg",
        title: "Speaker feature: Celso T. Villano Jr.",
        description:
          "Speaker feature for Celso T. Villano Jr., MLOps Manager at Globe Telecom and PhD candidate in Data Science at UP Diliman.",
      },
      {
        src: "/images/partner-pubs-5.jpg",
        title: "Globe Data Sessions: broadcast teaser",
        description:
          "Countdown and broadcast alert adapted for Zoom and Facebook Live, following Globe Telecom's corporate identity.",
      },
    ],
  },
  {
    id: "paddock-south",
    title: "Race-week publications",
    client: "Paddock South",
    deliverable: "Motorsport graphics",
    description:
      "As creative publication lead for Paddock South, a Southeast Asian motorsport and Formula 1 community, I designed race-week posters, circuit breakdowns, milestone artwork, and retro Grand Prix packages.",
    gallery: [
      {
        src: "/images/paddock-south-1.png",
        title: "RUSH movie night poster",
        description:
          "Retro-grain poster for the community screening of 'RUSH' (dir. Ron Howard), depicting the 1976 rivalry between Niki Lauda and James Hunt with Nürburgring styling.",
      },
      {
        src: "/images/paddock-south-2.png",
        title: "Canadian GP: Circuit Gilles-Villeneuve breakdown",
        description:
          "Race briefing on the Montreal circuit covering cornering speeds, DRS zones, asphalt grip, and Pirelli compounds (C4, C5, C6).",
      },
      {
        src: "/images/paddock-south-3.png",
        title: "2,000 members milestone",
        description:
          "Artwork for Paddock South reaching 2,000 members, built around a wireframe schematic of a ground-effect Formula 1 car.",
      },
      {
        src: "/images/paddock-south-4.png",
        title: "Austrian GP: Red Bull Ring poster",
        description:
          "Race-weekend creative for Red Bull Racing at Spielberg, featuring Max Verstappen, Yuki Tsunoda, and the Red Bull Ring bull monument.",
      },
      {
        src: "/images/paddock-south-5.png",
        title: "British GP: 16-bit special",
        description:
          "A 16-bit arcade-style illustration for Silverstone, featuring George Russell and his team radio quote.",
      },
    ],
  },
  {
    id: "posters",
    title: "Posters and infographics",
    client: "CSSP, BetterGov.ph, GeoRisk Philippines and others",
    deliverable: "Print and social",
    description:
      "Posters for student leadership, advocacy campaigns, academic initiatives, music events, and disaster risk communication, made for the UP Diliman College of Social Sciences and Philosophy, BetterGov.ph, GeoRisk Philippines, and independent community projects.",
    gallery: [
      {
        src: "/images/poster-1.png",
        title: "Niña Maria: Rock Nation champions",
        description:
          "Victory poster for indie rock band Niña Maria after winning Battle of the Bands: Rock Nation at Holy Family School Quezon City.",
      },
      {
        src: "/images/poster-2.png",
        title: "Ang Awit ng Mendiola",
        description:
          "Human rights poster for the UP CSSP Freshie, Shiftee, and Transferee Council, commemorating the Mendiola peasant struggle.",
      },
      {
        src: "/images/poster-3.png",
        title: "Sumanib sa Pagkondena: EDSA People Power",
        description:
          "Mobilization poster made with the UP Diliman CSSP Student Council and CSSP FSTC, invoking the People Power Monument.",
      },
      {
        src: "/images/poster-4.png",
        title: "UP Data Science Society primer",
        description:
          "Organizational primer covering bootcamps, open-source projects, the Philippine Junior Data Science Challenge, and partners including Thinking Machines, Globe, BPI, and GCash.",
      },
      {
        src: "/images/poster-5.png",
        title: "Huwag Kukurap: procurement anomaly detection",
        description:
          "Event poster for UP DSSoc and BetterGov.ph, promoting an open-source Python repository for detecting irregularities in government procurement data.",
      },
      {
        src: "/images/poster-6.png",
        title: "AStranghero 2025 events calendar",
        description:
          "Calendar for the UP CSSP Freshie, Shiftee, and Transferee Month, with portal doors inspired by Makoto Shinkai's Suzume.",
      },
      {
        src: "/images/poster-7.png",
        title: "Seismic hazard assessment: La Trinidad, Benguet",
        description:
          "Hazard infographic mapping the Tubao and Mirador faults and elevation models, using GeoRisk Philippines and HazardHunterPH data.",
      },
      {
        src: "/images/poster-8.png",
        title: "The red flags of electricity and e-waste",
        description:
          "Science infographic (Arcega, 2025) on electrical safety, the E-L-E-C-T-R-I-C mnemonic, and responsible e-waste handling.",
      },
      {
        src: "/images/poster-9.png",
        title: "Sustainability: who, how, what",
        description:
          "Environmental graphic framing community climate action around reforestation, the sustainable development goals, and ecosystem protection.",
      },
    ],
  },
  {
    id: "f1-livery",
    title: "UP Fighting Maroons F1 concept livery",
    client: "Personal project",
    deliverable: "Livery and renders",
    description:
      "A concept livery that brings the identity and activist heritage of the University of the Philippines to Formula 1. I designed and rendered a 2026-spec livery on the RSS Formula Hybrid chassis in Assetto Corsa.",
    gallery: [
      {
        src: "/images/up-fighting-maroons-1.jpeg",
        title: "Overhead cockpit and halo",
        description:
          "Top-down render showing the maroon-and-white fade running over the halo and carbon tub.",
      },
      {
        src: "/images/up-fighting-maroons-2.jpeg",
        title: "Sidepods and the UP clenched fist",
        description:
          "Side elevation of the ground-effect sidepods, carrying the Fighting Maroons fist emblem and university slogans.",
      },
      {
        src: "/images/up-fighting-maroons-3.jpeg",
        title: "Nosecone #08 and the Oblation",
        description:
          "Front view with racing number #08, the Oblation silhouette, and yellow Pirelli medium tires.",
      },
      {
        src: "/images/up-fighting-maroons-4.jpeg",
        title: "Panning shot: STATE U",
        description:
          "Panning shot down the main straight, showing the 'STATE U' engine cover and Cordillera textile patterns on the rear wing endplates.",
      },
    ],
  },
];

export const devProjects: DevProject[] = [
  {
    id: "pjdsc26",
    title: "Philippine Junior Data Science Challenge 2026",
    summary: "Competition website",
    context: "UP Data Science Society",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "I designed and built the official competition website with the Next.js App Router. Dedicated pages organize the primer, milestone timeline, dataset catalogue, and workshop programme so teams can reach each resource directly.\n\nA canvas-rendered background carries the visual identity, and a client-side countdown tracks upcoming deadlines. The homepage brings the current competition phase and workshop updates together with links to the detailed resources.",
    gallery: [
      {
        src: "/images/pjdsc26-preview-1.png",
        title: "Homepage",
        description: "Introduces the public health challenge and links to the primer and dataset catalogue.",
      },
      {
        src: "/images/pjdsc26-preview-2.png",
        title: "Dataset catalogue",
        description: "Teams filter open datasets by topic and review their sources, coverage periods, and geographic scope.",
      },
      {
        src: "/images/pjdsc26-preview-3.png",
        title: "Workshop programme",
        description: "Schedule, venue, online session details, and materials in one place.",
      },
    ],
    liveUrl: "https://pjdsc26-website.vercel.app",
  },
  {
    id: "godle",
    title: "gödle",
    summary: "Daily logic puzzle game with a theorem prover",
    context: "Personal project",
    stack: ["Svelte", "Node.js", "SQLite", "KaTeX"],
    description:
      "gödle is a propositional logic game built on Irving M. Copi's 19 rules of natural deduction: 9 rules of inference, such as Modus Ponens and Hypothetical Syllogism, and 10 rules of replacement, including De Morgan's Laws and Material Implication.\n\nIt has a daily Wordle-style proof across Novice, Adept, and Master tiers, a timed survival mode, a proof sandbox with a breadth-first search theorem prover and shareable puzzles, and an interactive codex of Copi's rules.",
    gallery: [
      {
        src: "/images/godle-preview-1.png",
        title: "Landing and mode select",
        description: "Truth-tree background, mode selector, and daily problem tracker.",
      },
      {
        src: "/images/godle-preview-2.png",
        title: "Daily proof",
        description: "Premise chaining, KaTeX rendering, rule justifications, and a step validator.",
      },
      {
        src: "/images/godle-preview-3.png",
        title: "Sandbox and problem library",
        description: "Freeform prover with an automated BFS solver, puzzle authoring, and Copi's textbook problem sets.",
      },
    ],
    liveUrl: "https://godle-logic-game.vercel.app",
    sourceUrl: "https://github.com/artemiui/godle-logic-game",
  },
  {
    id: "narra",
    title: "Narra",
    summary: "Markdown and LaTeX editor for Windows and Linux",
    context: "Personal project",
    stack: ["Tauri", "Rust", "TypeScript", "CodeMirror"],
    description:
      "Narra is a single-file desktop editor. Markdown and KaTeX math render inline as you write, so the document looks finished without a separate preview pane. Ctrl+P opens a command palette of actions and templates, and Ctrl+O searches a dictionary of math symbols by name, category, or LaTeX.\n\nIt runs from the terminal like any other editor: \"narra notes.md\", piped input, or \"narra --wait\" as Git's commit editor. Named files autosave, and the backend watches the file on disk and reloads outside edits, so Narra can sit beside nvim as a live frontend.",
    gallery: [
      {
        src: "/images/narra-demo.gif",
        title: "Writing in Narra",
        description: "Markdown and KaTeX render in place as the document is typed, while the source stays editable.",
      },
      {
        src: "/images/narra-preview-2.png",
        title: "Command palette",
        description: "Ctrl+P searches formatting commands, math templates, and file actions.",
      },
      {
        src: "/images/narra-preview-3.png",
        title: "Nordic Slate theme",
        description: "One of the built-in dark themes, alongside custom colors and fonts.",
      },
    ],
    sourceUrl: "https://github.com/artemiui/narra",
  },
  {
    id: "phi",
    title: "phi",
    summary: "Self-hosted timeline and media journal",
    context: "Personal project",
    stack: ["JavaScript", "Node.js", "SQLite"],
    description:
      "Phi is a self-hosted journal with a vanilla JavaScript frontend, a Node.js server, and a local SQLite database. The timeline supports text, photo grids, and KaTeX math. A separate media log keeps ratings, dates, and notes, searchable by type. Backups export and import from Settings.\n\nOptional widgets read iCalendar feeds, show GitHub contributions, and map links in a local Obsidian vault. Each widget can sit in the timeline or the sidebar.",
    gallery: [
      { src: "/images/phi-timeline.jpg", title: "Timeline", description: "A timeline with entries and optional personal widgets." },
      { src: "/images/phi-log.jpg", title: "Media log", description: "A searchable collection of movies, games, books, and other media." },
    ],
    sourceUrl: "https://github.com/artemiui/phi",
  },
  {
    id: "pareto",
    title: "Pareto frontier for in-silico drug design",
    summary: "Screening 33 plant compounds against 90+ proteins",
    context: "Research",
    stack: ["P2Rank", "AutoDock Vina", "ADMET AI", "XGBoost", "SVR"],
    description:
      "I used P2Rank for binding site prediction and AutoDock Vina for docking to evaluate 33 plant-derived ligands against more than 90 proteins, about 27 hours of compute on a laptop without a GPU, and ADMET AI for pharmacokinetic and toxicity profiles.\n\nXGBoost and SVR predicted binding affinities with high precision, but the dataset's structural diversity limited hallmark classification, which suggests 1D and 2D descriptors need 3D or graph-based features to generalize.\n\nAn efficacy-toxicity frontier identified four lead compounds, Rutin, (-)-Epigallocatechin, α-Amyrin, and Paeoniflorin, with binding affinities stronger than -6.0 kcal/mol and composite toxicity scores below 0.30.",
    gallery: [
      {
        src: "/images/pareto-phyto-1.png",
        title: "Binding affinity and target distribution",
        description: "Docking results for 33 phytochemicals across 90+ cancer-associated protein targets.",
      },
      {
        src: "/images/pareto-phyto-2.png",
        title: "ADMET profile",
        description: "Pharmacokinetic parameters and toxicity risk from ADMET AI models.",
      },
      {
        src: "/images/pareto-phyto-3.png",
        title: "Efficacy-toxicity frontier",
        description: "Non-dominated leads balancing affinity (≤ -6.0 kcal/mol) and composite toxicity (< 0.30).",
      },
    ],
    fit: "contain",
    sourceUrl: "https://github.com/artemiui/ds102-pareto-frontier",
  },
  {
    id: "series-tree",
    title: "Series convergence decision tree",
    summary: "Interactive map of convergence tests in calculus",
    context: "Personal project",
    stack: ["D3.js", "KaTeX"],
    description:
      "An interactive decision tree for choosing an infinite series convergence test, from the nth-term divergence check and special forms (geometric, p-series, telescoping, harmonic) through comparison tests, the alternating series test, ratio and root tests, and power series intervals.\n\nIt offers hierarchical and radial layouts, lineage highlighting back to the root, formula search, category filters, and a theorem inspector with worked examples.",
    gallery: [
      {
        src: "/images/series-tree-preview-1.png",
        title: "Full decision tree",
        description: "All 5 test categories, the preliminary divergence check, 12 convergence theorems, and the terminal classifications.",
      },
      {
        src: "/images/series-tree-preview-2.png",
        title: "Radial layout",
        description: "Tests arranged in concentric rings around the series origin for compact exploration.",
      },
      {
        src: "/images/series-tree-preview-3.png",
        title: "Comparison and alternating tests",
        description: "Integral, direct and limit comparison, alternating series, ratio and root tests with KaTeX rendering.",
      },
    ],
    liveUrl: "/series-convergence/",
  },
  {
    id: "n-body",
    title: "N-body simulation",
    summary: "Gravitational orbits with numerical integration",
    context: "Personal project",
    stack: ["Python"],
    description:
      "A simulation of the gravitational interactions and orbital trajectories of an N-body system. It applies Newtonian gravity and numerical integration to model pairwise attraction, velocity vectors, and chaotic many-body orbits in real time.",
    youtubeId: "sIIJ0w_KTBw",
    videoUrl: "https://www.youtube.com/watch?v=sIIJ0w_KTBw",
  },
];

export const mediaPieceCount = mediaProjects.reduce((n, p) => n + p.gallery.length, 0);
