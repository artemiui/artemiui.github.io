"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LoadingProjectImage } from "../ProjectImageFrame";
import dimensions from "../image-dimensions.json";
import { canvaPortfolio, featuredVideo, mediaPieceCount, mediaProjects, type MediaProject } from "../data";
import { Lightbox, type LightboxState } from "../Lightbox";
import { ContactBlock, ExternalButton, FadeIn, focusRing, Meta, SubpageHeader } from "../ui";

const sizes: Record<string, number[]> = dimensions;
const ratio = (src: string) => {
  const [w, h] = sizes[src] ?? [4, 5];
  return w / h;
};
const pad = (n: number) => String(n).padStart(2, "0");

function ContactSheet({ project, onOpen }: { project: MediaProject; onOpen: (index: number) => void }) {
  return (
    <ul className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-3 [scrollbar-width:thin]">
      {project.gallery.map((image, index) => (
        <li key={image.src} className="snap-start">
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Open ${image.title ?? project.title}`}
            className={`group relative block h-40 shrink-0 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-inset ring-zinc-900/10 sm:h-52 dark:bg-zinc-900 dark:ring-white/10 cursor-zoom-in ${focusRing}`}
            style={{ aspectRatio: ratio(image.src) }}
          >
            <LoadingProjectImage src={image.src} alt={image.title ?? project.title} />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-150 group-hover:bg-black/10" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function MediaPortfolioPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <div className="space-y-16">
      <FadeIn>
        <SubpageHeader
          title="Design and media"
          lede={
            <>
              Sports graphics, merchandise, event campaigns, posters and sideline video for university organizations,
              varsity teams and a motorsport community.
              <span className="mt-2 block font-mono text-xs text-zinc-500 tabular-nums">
                {mediaProjects.length} projects · {mediaPieceCount} pieces
              </span>
            </>
          }
        />
      </FadeIn>

      <section className="space-y-4">
        <Meta parts={["Featured", "Video"]} />
        <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">{featuredVideo.title}</h2>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-zinc-900/10 dark:ring-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?start=${featuredVideo.start}`}
            title={featuredVideo.title}
            loading="lazy"
            className="size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <div className="space-y-16">
        {mediaProjects.map((project, i) => (
          <section key={project.id} id={project.id} className="scroll-mt-8 space-y-4">
            <div className="space-y-2">
              <Meta parts={[pad(i + 1), project.client, project.deliverable, `${project.gallery.length} pieces`]} />
              <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">{project.title}</h2>
              <p className="max-w-[64ch] text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>
            </div>
            <ContactSheet
              project={project}
              onOpen={(index) => setLightbox({ label: project.title, images: project.gallery, index })}
            />
            {project.liveUrl && <ExternalButton href={project.liveUrl}>Watch the reels</ExternalButton>}
          </section>
        ))}
      </div>

      <section className="border-t border-zinc-900/10 pt-8 dark:border-white/10">
        <a
          href={canvaPortfolio.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-4 rounded-xl ${focusRing}`}
        >
          <div className="relative aspect-[1200/630] w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-inset ring-zinc-900/10 sm:w-40 dark:bg-zinc-900 dark:ring-white/10">
            <LoadingProjectImage src={canvaPortfolio.image} alt="Older Canva portfolio" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Earlier work</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">My previous portfolio, built on Canva</p>
          </div>
          <ArrowUpRight
            className="ml-auto size-4 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
            strokeWidth={1.5}
          />
        </a>
      </section>

      <ContactBlock
        heading="Need a poster, a campaign or a reel?"
        body="Tell me what it's for, who will see it and when you need it."
        subject="Design inquiry"
      />

      <Lightbox state={lightbox} onChange={setLightbox} />
    </div>
  );
}
