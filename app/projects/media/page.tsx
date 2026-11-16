"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LoadingProjectImage } from "../ProjectImageFrame";
import dimensions from "../image-dimensions.json";
import { canvaPortfolio, featuredVideo, mediaPieceCount, mediaProjects, type MediaProject } from "../data";
import { Lightbox, type LightboxState } from "../Lightbox";
import { BackLink, ContactBlock, FadeIn } from "../ui";

const sizes: Record<string, number[]> = dimensions;
const ratio = (src: string) => {
  const [w, h] = sizes[src] ?? [4, 5];
  return `${w} / ${h}`;
};

const wallFocus = "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function Wall({ project, onOpen }: { project: MediaProject; onOpen: (index: number) => void }) {
  const avg = project.gallery.reduce((n, g) => n + (sizes[g.src] ? sizes[g.src][0] / sizes[g.src][1] : 0.8), 0) / project.gallery.length;
  const cols = avg < 0.65 ? "columns-2 md:columns-4" : project.gallery.length >= 5 ? "columns-2 md:columns-3" : "columns-2";
  return (
    <div className={`${cols} gap-3 [&>*]:mb-3`}>
      {project.gallery.map((image, index) => (
        <button
          key={image.src}
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`Open ${image.title ?? project.title}`}
          className={`group relative block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-md bg-zinc-900 ${wallFocus}`}
          style={{ aspectRatio: ratio(image.src) }}
        >
          <LoadingProjectImage src={image.src} alt={image.title ?? project.title} width={640} />
          <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/10" />
          <span className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          {image.title && (
            <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-1 text-left text-xs font-medium leading-4 text-white opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {image.title}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default function MediaPortfolioPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <div className="-mb-12 ml-[calc(50%-50vw)] w-screen bg-zinc-950 font-[family-name:var(--font-display)] text-zinc-100 antialiased">
      <div className="mx-auto max-w-[1120px] space-y-20 px-6 pb-24 pt-12 sm:px-8">
        <FadeIn className="space-y-10">
          <BackLink dark />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h1 className="text-5xl font-medium leading-none tracking-[-0.045em] text-white sm:text-[88px]">
              Design and media
            </h1>
            <p className="font-[family-name:var(--font-display-mono)] text-xs text-zinc-500 tabular-nums">
              {mediaProjects.length} projects · {mediaPieceCount} pieces
            </p>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?start=${featuredVideo.start}`}
              title={featuredVideo.title}
              loading="lazy"
              className="size-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </FadeIn>

        {mediaProjects.map((project) => (
          <section key={project.id} id={project.id} className="grid scroll-mt-8 gap-8 border-t border-white/10 pt-8 md:grid-cols-[240px_1fr] md:gap-12">
            <div className="md:sticky md:top-8 md:self-start">
              <h2 className="text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-white sm:text-[28px]">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-5 text-zinc-400">{project.client}</p>
              <p className="mt-1 font-[family-name:var(--font-display-mono)] text-xs text-zinc-600 tabular-nums">
                {project.gallery.length} pieces
              </p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center gap-1.5 rounded text-sm text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-white/60 ${wallFocus}`}
                >
                  Watch on Facebook
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
            <Wall project={project} onOpen={(index) => setLightbox({ label: project.title, images: project.gallery, index })} />
          </section>
        ))}

        <div className="space-y-12">
          <a
            href={canvaPortfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 rounded-lg border-t border-white/10 pt-8 ${wallFocus}`}
          >
            <span className="text-sm text-zinc-400 transition-colors duration-150 group-hover:text-white">
              Earlier work on Canva
            </span>
            <ArrowUpRight className="size-4 text-zinc-500 transition-colors duration-150 group-hover:text-white" strokeWidth={1.5} />
          </a>
          <ContactBlock dark heading="Need a poster, a campaign or a reel?" subject="Design inquiry" />
        </div>
      </div>

      <Lightbox state={lightbox} onChange={setLightbox} />
    </div>
  );
}
