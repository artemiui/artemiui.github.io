"use client";

import { X, GraduationCap, Heart, Gamepad2, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import HobbiesPanel from "./HobbiesPanel";

type AboutOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SaveFile = {
  id: string;
  title: string;
  timePlayed: string;
  skills: string[];
  icon?: React.ComponentType<{ className?: string }>;
  imageUrl?: string;
  description?: string;
};

const saveFiles: SaveFile[] = [
  {
    id: "education",
    title: "education",
    timePlayed: "4 Years",
    skills: ["Philosophy", "Computer Science", "Mathematics"],
    description: "Undergraduate philosophy student at the University of the Philippines Diliman. Worked as an intern at a BPO for human resources department. Previously an intern of the UP Resilience Institute for Research & Creative Work.",
    icon: GraduationCap,
  },
  {
    id: "interests",
    title: "interests",
    timePlayed: "∞ Years",
    description: "I like building stuff. Tinkering has always been my thing. I love video games. I grew up with Mario as a kid, particularly SM64, SMW, and NSMBDS. Also Minecraft, ROBLOX, Pokemon, and so on. I love me my pop culture references. I love visual design, classical music just as much as I do computational science. I often watch F1 on the weekends, anime sometimes, and playing around with computer vision and NLP. Academically: Data science, machine learning, computational sciences, statistical analyses, physics, philosophy of science.",
    skills: ["Data Science", "AI", "Film", "Music", "Retro Games"],
    icon: Heart,
  },
  {
    id: "hobbies",
    title: "hobbies",
    timePlayed: "Countless Hours",
    skills: ["Gaming", "Reading", "Piano", "Language Learning"],
    description: "Vocalist in a band called Niña Maria based in Manila. I love building up my skills as well. I love learning in general. Can play some piano, a little of drums. Pre-school proficiency in ITAL and NIHONGO xd.", 
    icon: Gamepad2,
  },
  {
    id: "projects",
    title: "projects",
    timePlayed: "2 Years",
    skills: ["Web Dev", "ML", "Open Source", "Writing"],
    icon: Briefcase,
    description: "Primary author of a peer-reviewed, published quantitative research paper under the International Journal of Rural and Urban Development. In the same year, I developed geophysical machine learning algorithms, skills in data analysis and computational research involving quantitative surveying, and computational biology particularly molecular docking. Worked on projects around social media marketing, advertising, posters, logos, newsletters, and image manipulation for clients internationally and locally. Also participated in regional layout design competitions.",
  },
];

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const selected = saveFiles.find(f => f.id === selectedFile);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
            onClick={onClose}
          />

          {/* Overlay content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full md:max-h-[90vh] z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg shadow-2xl p-8 md:p-12">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </button>

              {/* Save Files Menu */}
              <div className="mb-8">
                <h3 className="text-lg font-mono font-semibold mb-4 text-center">Load Game</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
                  {saveFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative w-full sm:w-72 h-20 cursor-pointer transition-all duration-200 filter drop-shadow-lg"
                      style={{
                        backgroundImage: `url(${hoveredFile === file.id ? '/selected_about.svg' : '/unselected.svg'})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                      onMouseEnter={() => setHoveredFile(file.id)}
                      onMouseLeave={() => setHoveredFile(null)}
                      onClick={() => setSelectedFile(selectedFile === file.id ? null : file.id)}
                    >
                      {/* Icon placeholder in left square */}
                      <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-opacity-0 rounded flex items-center justify-center overflow-hidden">
                        {file.imageUrl ? (
                          <img src={file.imageUrl} alt={file.title} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                        ) : file.icon ? (
                          <file.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                        ) : null}
                      </div>
                      {/* Text in right rectangle, vertically centered */}
                      <div
                        className="absolute left-20 top-1/2 transform -translate-y-1/2 text-center font-mono text-base font-semibold"
                        style={{ fontFamily: "'NDS12', monospace" }}
                      >
                        {file.title}
                      </div>
                      {/* Details on click */}
                    </div>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {selected && (
                    <motion.div
                      key={selected.id}
                      initial={{ opacity: 0, y: -12, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -12, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mt-4 rounded-md border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 p-4 overflow-hidden"
                      layout
                    >
                      <motion.div
                        key={`${selected.id}-content`}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-3"
                        layout
                      >
                        <div className="flex items-center gap-2">
                          {selected.imageUrl ? (
                            <img src={selected.imageUrl} alt={selected.title} className="w-8 h-8 object-contain rounded" loading="lazy" decoding="async" />
                          ) : selected.icon ? (
                            <selected.icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                          ) : null}
                          <span className="font-mono text-sm">{selected.title}</span>
                          <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">{selected.timePlayed}</span>
                        </div>

                        {selected.id === "hobbies" ? (
                          <HobbiesPanel
                            imolaSvgUrl="/ImolaCircuit.svg"
                            imolaLapTime={74.206}
                            osuPP={3185}
                            osuSince="July 2018"
                            memoryUrls={[
                              "https://i.imgur.com/84i8LAh.jpeg",
                              "https://i.imgur.com/GmAqvdW.png",
                              "https://i.imgur.com/AWAfrRQ.jpeg",
                              "https://i.imgur.com/ysRfNG3.png",
                              "https://i.imgur.com/ukZhCB7.jpeg",
                              "https://i.imgur.com/95MC8aa.jpeg",
                              "https://i.imgur.com/VUmcGjx.jpeg",
                              "https://i.imgur.com/XWq6vjX.jpeg",
                              "https://i.imgur.com/ukZhCB7.jpeg",
                          ]}
                          />
                        ) : (
                          <>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300">{selected.description ?? "Details coming soon..."}</p>
                            <div className="flex flex-wrap gap-1">
                              {selected.skills.map((s, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800/60 text-xs">{s}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold font-mono mb-6 text-red-600">bungiorno a tutti !</h2>
                
                <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-7">
                  <p>
                    Mi chiamo Artemio, puoi chiamarmi Art. I made this blog as a means of knowledge sharing.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

