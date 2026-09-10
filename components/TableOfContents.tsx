"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCK_TOP = 80; // Distance in pixels from viewport top when locked


const cleanHeadingText = (input: string) => {
  return input
    .replace(/[*_`]/g, "") // Strip bold, italic, inline code formatting
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Strip markdown links [text](url) -> text
    .trim();
};

const generateMdHeadingId = (index: number, text: string) => {
  const safe = text
    .toLowerCase()
    .replace(/[*_`]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `section-${index}-${safe || "item"}`;
};

type Heading = {
  id: string;
  text: string;
  level: number;
};

const extractHeadings = (content: string): Heading[] => {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const matches = Array.from(content.matchAll(headingRegex));
  return matches.map((match, index) => {
    const level = match[1].length;
    const rawText = match[2].trim();
    const text = cleanHeadingText(rawText);
    const id = generateMdHeadingId(index, text);
    return { id, text, level };
  });
};

interface TableOfContentsProps {
  content: string;
  isMobile?: boolean;
}

export default function TableOfContents({ content, isMobile }: TableOfContentsProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [sidebarTop, setSidebarTop] = useState<number>(260);

  const desktopAsideRef = useRef<HTMLElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Compute position: aligns with article title until title scrolls past LOCK_TOP, then locks
  const computeSidebarTop = useCallback(() => {
    const titleEl = document.getElementById("article-title") || document.getElementById("article-header");
    const articleEl = document.getElementById("article-root") || document.querySelector("article");
    const asideEl = desktopAsideRef.current || document.getElementById("desktop-toc-aside");

    if (!titleEl) {
      return 260;
    }

    const titleRect = titleEl.getBoundingClientRect();
    // When at top of page, titleRect.top is ~200-260px; sidebar starts aligned with title.
    // As user scrolls down, titleRect.top decreases.
    // Once titleRect.top <= LOCK_TOP, sidebar locks in place at LOCK_TOP.
    let top = Math.max(LOCK_TOP, titleRect.top);

    // Bottom boundary: ensure sidebar does not push past the article into the footer
    if (articleEl && asideEl) {
      const articleRect = articleEl.getBoundingClientRect();
      const asideHeight = asideEl.offsetHeight || 300;
      const maxTop = articleRect.bottom - asideHeight - 32;
      if (top > maxTop) {
        top = maxTop;
      }
    }

    return Math.round(top);
  }, []);

  useEffect(() => {
    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }

    // Assign IDs to headings strictly inside the article body (.prose)
    const proseHeadings = document.querySelectorAll(".prose h1, .prose h2, .prose h3");
    proseHeadings.forEach((el, index) => {
      if (index < headings.length) {
        el.id = headings[index].id;
      }
    });

    // Intersection Observer for scroll tracking
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-60px 0px -70% 0px",
        threshold: [0, 1],
      }
    );

    proseHeadings.forEach((el) => observer.observe(el));

    // Real-time scroll listener for both active heading and sidebar locking
    const handleScrollAndPosition = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        // 1. Update dynamic top position of sidebar
        const computedTop = computeSidebarTop();
        if (desktopAsideRef.current) {
          desktopAsideRef.current.style.top = `${computedTop}px`;
        }
        setSidebarTop(computedTop);

        // 2. Update active heading
        const headingsList = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"));
        if (headingsList.length === 0) return;

        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY < 120 && headings.length > 0) {
          setActiveId(headings[0].id);
          return;
        }

        let currentId = headingsList[0].id;
        for (const el of headingsList) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= LOCK_TOP + 40) {
            currentId = el.id;
          } else {
            break;
          }
        }
        if (currentId) {
          setActiveId(currentId);
        }
      });
    };

    // Initial positioning calculation
    const updateInitialPosition = () => {
      const top = computeSidebarTop();
      if (desktopAsideRef.current) {
        desktopAsideRef.current.style.top = `${top}px`;
      }
      setSidebarTop(top);
    };

    updateInitialPosition();
    const frameId = requestAnimationFrame(updateInitialPosition);
    const timerId = setTimeout(updateInitialPosition, 100);

    window.addEventListener("scroll", handleScrollAndPosition, { passive: true });
    window.addEventListener("resize", handleScrollAndPosition, { passive: true });

    // Watch article resize (e.g. late-loading images or dynamic elements)
    const articleEl = document.getElementById("article-root") || document.querySelector("article");
    let resizeObserver: ResizeObserver | null = null;
    if (articleEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleScrollAndPosition();
      });
      resizeObserver.observe(articleEl);
    }

    return () => {
      proseHeadings.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScrollAndPosition);
      window.removeEventListener("resize", handleScrollAndPosition);
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [headings, computeSidebarTop]);

  if (headings.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const rect = target.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - LOCK_TOP;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      setActiveId(id);
      if (history.pushState) {
        history.pushState(null, "", `#${id}`);
      }
    }
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const activeHeading = headings.find((h) => h.id === activeId) || headings[0];

  // Mobile Floating View (< xl) that follows the scroll
  if (isMobile) {
    return (
      <>
        {/* Floating Tribar Button following the scroll */}
        <div className="fixed bottom-6 left-6 z-40">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-all text-xs font-sans focus:outline-none"
            title="Toggle Table of Contents"
            aria-label="Toggle Table of Contents"
          >
            <Menu className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <span className="font-medium truncate max-w-[140px] sm:max-w-[200px]">
              {activeHeading ? activeHeading.text : "Contents"}
            </span>
          </button>
        </div>

        {/* Mobile Slide-Up / Popover Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
              />

              {/* Floating Menu */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-20 left-6 right-6 sm:right-auto sm:w-80 max-h-[60vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl z-50 space-y-2"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Menu className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                      Table of Contents
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <ul className="space-y-2">
                  {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                      <li
                        key={heading.id}
                        className={heading.level > 1 ? "pl-3 text-[12px]" : "pl-0 text-[13px]"}
                      >
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => handleLinkClick(e, heading.id)}
                          className={`block font-sans leading-snug transition-colors py-0.5 ${
                            isActive
                              ? "text-zinc-900 dark:text-zinc-100 font-bold"
                              : "text-zinc-500 dark:text-zinc-400 font-normal hover:text-zinc-900 dark:hover:text-zinc-100"
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Combined Responsive View:
  // Desktop: Fixed Anthropic sidebar locking after scrolling past the title
  // Mobile: Floating bottom-left pill trigger with drawer
  return (
    <>
      {/* Desktop Anthropic-Style Sticky Sidebar View (xl+) */}
      <aside
        id="desktop-toc-aside"
        ref={desktopAsideRef}
        style={{ top: `${sidebarTop}px` }}
        className="hidden xl:block fixed left-[max(1rem,calc(50vw-384px-16rem))] 2xl:left-[max(2rem,calc(50vw-384px-18rem))] w-56 2xl:w-64 z-30 pointer-events-auto"
      >
        <div className="max-h-[calc(100vh-6rem)] overflow-y-auto pr-3 scrollbar-hide">
          <nav className="w-full py-1 text-left" aria-label="Table of contents">
            {/* Subtle Tribar Toggle Button (Sticky, follows the scroll) */}
            <div className="mb-3.5 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-2 p-1 -ml-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors focus:outline-none"
                title={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
                aria-label={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
              >
                <Menu className="w-4 h-4 transition-transform group-hover:scale-105" />
                <span className="text-[11px] font-mono tracking-wider uppercase opacity-75">
                  Contents
                </span>
              </button>
            </div>

            {/* Toggleable Heading List with Smooth Animation */}
            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.ul
                  key="toc-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="space-y-2 overflow-hidden"
                >
                  {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                      <li
                        key={heading.id}
                        className={heading.level > 1 ? "pl-3 text-[12px]" : "pl-0 text-[13px]"}
                      >
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => handleLinkClick(e, heading.id)}
                          className={`block font-sans leading-snug transition-colors duration-150 py-0.5 ${
                            isActive
                              ? "text-zinc-900 dark:text-zinc-100 font-bold"
                              : "text-zinc-500 dark:text-zinc-400 font-normal hover:text-zinc-900 dark:hover:text-zinc-100"
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    );
                  })}
                </motion.ul>
              ) : (
                <motion.div
                  key="toc-collapsed-pill"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="text-left w-full group py-1"
                    title="Click to expand Table of Contents"
                  >
                    <span className="text-xs font-sans text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 leading-relaxed">
                      {activeHeading ? activeHeading.text : "Expand contents"}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </aside>

      {/* Mobile Floating View (< xl) */}
      <div className="xl:hidden">
        <div className="fixed bottom-6 left-6 z-40">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-all text-xs font-sans focus:outline-none"
            title="Toggle Table of Contents"
            aria-label="Toggle Table of Contents"
          >
            <Menu className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <span className="font-medium truncate max-w-[140px] sm:max-w-[200px]">
              {activeHeading ? activeHeading.text : "Contents"}
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
              />

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-20 left-6 right-6 sm:right-auto sm:w-80 max-h-[60vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl z-50 space-y-2"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Menu className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                      Table of Contents
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <ul className="space-y-2">
                  {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                      <li
                        key={heading.id}
                        className={heading.level > 1 ? "pl-3 text-[12px]" : "pl-0 text-[13px]"}
                      >
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => handleLinkClick(e, heading.id)}
                          className={`block font-sans leading-snug transition-colors py-0.5 ${
                            isActive
                              ? "text-zinc-900 dark:text-zinc-100 font-bold"
                              : "text-zinc-500 dark:text-zinc-400 font-normal hover:text-zinc-900 dark:hover:text-zinc-100"
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

