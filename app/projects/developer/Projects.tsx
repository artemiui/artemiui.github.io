"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { optimized } from "../ProjectImageFrame";
import { devProjects, type DevProject } from "../data";
import { Lightbox, type LightboxState } from "../Lightbox";
import { ExternalButton, focusRing } from "../ui";

function Shot({ project, featured, onOpen }: { project: DevProject; featured: boolean; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const panel = `relative flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-inset ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5 ${
    featured ? "aspect-[16/9] p-8 sm:p-12" : "aspect-[4/3] p-6 sm:p-8"
  }`;

  if (project.youtubeId) {
    return (
      <div className={`${panel} !p-0`}>
        <iframe
          src={`https://www.youtube.com/embed/${project.youtubeId}`}
          title={project.title}
          loading="lazy"
          className="absolute inset-0 size-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const cover = project.gallery?.[0];
  if (!cover) return null;
  const count = project.gallery?.length ?? 0;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open screenshots of ${project.title}`}
      className={`group block w-full cursor-zoom-in ${panel} ${focusRing}`}
    >
      <img
        src={optimized(cover.src, featured ? 1200 : 828)}
        alt={cover.title ?? project.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(img) => {
          if (img?.complete && img.naturalWidth) setLoaded(true);
        }}
        className={`max-h-full max-w-full rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_16px_40px_-16px_rgba(0,0,0,0.35)] ring-1 ring-zinc-900/10 transition-[opacity,transform] duration-300 ease-out group-hover:-translate-y-1 dark:ring-white/10 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {count > 1 && (
        <span className="absolute bottom-3 right-3 rounded-md bg-zinc-950/70 px-2 py-1 font-mono text-[11px] text-white tabular-nums opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {count} images
        </span>
      )}
    </button>
  );
}

function Card({ project, featured, onOpen }: { project: DevProject; featured: boolean; onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    project.liveUrl && { href: project.liveUrl, label: "Live" },
    project.sourceUrl && { href: project.sourceUrl, label: "Source" },
    project.videoUrl && { href: project.videoUrl, label: "Video" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <article id={project.id} className={`scroll-mt-8 ${featured ? "sm:col-span-2" : ""}`}>
      <Shot project={project} featured={featured} onOpen={onOpen} />

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className={`font-mono font-semibold text-zinc-900 dark:text-zinc-100 ${featured ? "text-xl" : "text-base"}`}>
            {project.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-500">{project.summary}</p>
        </div>
        {links.length > 0 && (
          <div className="flex shrink-0 gap-2">
            {links.map((l) => (
              <ExternalButton key={l.label} href={l.href}>
                {l.label}
              </ExternalButton>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((tool) => (
            <li
              key={tool}
              className="inline-flex h-6 items-center rounded-md bg-zinc-100 px-2 text-xs text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
            >
              {tool}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`inline-flex h-6 shrink-0 items-center gap-1 rounded text-xs text-zinc-500 transition-colors duration-150 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer ${focusRing}`}
        >
          {open ? "Less" : "More"}
          <Plus className={`size-3.5 transition-transform duration-200 ${open ? "rotate-45" : ""}`} strokeWidth={1.5} />
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t border-zinc-900/10 pt-4 text-sm leading-6 text-zinc-600 dark:border-white/10 dark:text-zinc-400">
          {project.description.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <>
      <div className="grid items-start gap-x-6 gap-y-16 sm:grid-cols-2">
        {devProjects.map((project, i) => (
          <Card
            key={project.id}
            project={project}
            featured={i === 0}
            onOpen={() =>
              project.gallery && setLightbox({ label: project.title, images: project.gallery, index: 0 })
            }
          />
        ))}
      </div>
      <Lightbox state={lightbox} onChange={setLightbox} />
    </>
  );
}
