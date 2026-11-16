"use client";

import { useState } from "react";
import { LoadingProjectImage } from "../ProjectImageFrame";
import { devProjects, type DevProject } from "../data";
import { Lightbox, type LightboxState } from "../Lightbox";
import { ContactBlock, ExternalButton, FadeIn, focusRing, Meta, SubpageHeader } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

function Media({ project, onOpen }: { project: DevProject; onOpen: (index: number) => void }) {
  const [selected, setSelected] = useState(0);

  if (project.youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-zinc-900/10 dark:ring-white/10">
        <iframe
          src={`https://www.youtube.com/embed/${project.youtubeId}`}
          title={project.title}
          loading="lazy"
          className="size-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const gallery = project.gallery ?? [];
  const current = gallery[selected];
  if (!current) return null;
  const fit = project.fit ?? "cover";

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onOpen(selected)}
        aria-label={`Open ${current.title ?? project.title}`}
        className={`relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-inset ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10 ${fit === "cover" ? "[&_img]:object-top" : "[&_img]:p-4"} ${focusRing}`}
      >
        <LoadingProjectImage key={current.src} src={current.src} alt={current.title ?? project.title} fit={fit} />
      </button>
      {gallery.length > 1 && (
        <div className="flex items-start gap-2">
          {gallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Show ${image.title ?? `image ${index + 1}`}`}
              aria-pressed={index === selected}
              className={`relative aspect-[16/10] w-20 overflow-hidden rounded-md bg-zinc-100 transition-[opacity,box-shadow] duration-150 sm:w-24 dark:bg-zinc-900 ${
                index === selected
                  ? "ring-2 ring-zinc-900 dark:ring-zinc-100"
                  : "opacity-60 ring-1 ring-inset ring-zinc-900/10 hover:opacity-100 dark:ring-white/10"
              } ${focusRing}`}
            >
              <img src={image.src} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top" />
            </button>
          ))}
          {current.title && (
            <p className="ml-auto hidden max-w-[40%] pt-1 text-right text-xs leading-5 text-zinc-500 sm:block">
              {current.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function DeveloperPortfolioPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <div className="space-y-16">
      <FadeIn>
        <SubpageHeader
          title="Software and research"
          lede="Websites, desktop tools, games and data research. Each project lists what it was built with and links to the live site or source where there is one."
        />
      </FadeIn>

      <div className="space-y-20">
        {devProjects.map((project, i) => (
          <article key={project.id} id={project.id} className="scroll-mt-8 space-y-6">
            <div className="space-y-2">
              <Meta parts={[pad(i + 1), project.context, project.summary]} />
              <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">{project.title}</h2>
            </div>

            <Media
              project={project}
              onOpen={(index) =>
                project.gallery && setLightbox({ label: project.title, images: project.gallery, index })
              }
            />

            <div className="grid gap-6 sm:grid-cols-[1fr_176px] sm:gap-10">
              <div className="space-y-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {project.description.split("\n\n").map((paragraph, p) => (
                  <p key={p}>{paragraph}</p>
                ))}
              </div>

              <aside className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Built with</h3>
                  <ul className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    {project.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
                {(project.liveUrl || project.sourceUrl || project.videoUrl) && (
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-start">
                    {project.liveUrl && <ExternalButton href={project.liveUrl}>Live site</ExternalButton>}
                    {project.sourceUrl && <ExternalButton href={project.sourceUrl}>Source</ExternalButton>}
                    {project.videoUrl && <ExternalButton href={project.videoUrl}>Watch video</ExternalButton>}
                  </div>
                )}
              </aside>
            </div>
          </article>
        ))}
      </div>

      <ContactBlock
        heading="Need a website or a data tool?"
        body="Tell me what it should do, who will use it and when you need it."
        subject="Development inquiry"
      />

      <Lightbox state={lightbox} onChange={setLightbox} />
    </div>
  );
}
