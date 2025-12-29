"use client";

import { useEffect, useState } from "react";

const sanitizeHeadingLabelDisplay = (input: string) => {
  try {
    return input.replace(/[^\p{L}\p{N}\s\.\-]/gu, "");
  } catch {
    return input.replace(/[^\w\s\.\-]/g, "");
  }
};

const generateMdHeadingId = (index: number, text: string) => {
  const safe = text
    .toLowerCase()
    .replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"))
    .replace(/\s+/g, "-");
  return `heading-${index}-${safe}`;
};

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    const extracted: Heading[] = matches.map((match, index) => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateMdHeadingId(index, text);
      return { id, text, level };
    });

    setHeadings(extracted);

    // Add IDs to headings in the DOM
    const headingElements = document.querySelectorAll("h1, h2, h3");
    headingElements.forEach((el, index) => {
      if (index < extracted.length) {
        el.id = extracted[index].id;
      }
    });

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24">
      <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-4">
        Contents
      </h3>
      <ul className="space-y-2 text-xs">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-zinc-500 dark:text-zinc-500 hover:text-foreground transition-colors ${
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : ""
              }`}
            >
              {sanitizeHeadingLabelDisplay(heading.text)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

