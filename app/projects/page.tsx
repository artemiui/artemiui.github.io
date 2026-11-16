"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoadingProjectImage } from "./ProjectImageFrame";
import { devProjects, mediaPieceCount, mediaProjects } from "./data";
import { ContactBlock, FadeIn, focusRing } from "./ui";

const fan = [
  { src: "/images/paddock-south-1.png", alt: "RUSH movie night poster", ratio: "1414/2000", cls: "-translate-x-[62%] -rotate-[7deg] group-hover:-translate-x-[68%] group-hover:-rotate-[9deg]" },
  { src: "/images/poster-2.png", alt: "Ang Awit ng Mendiola poster", ratio: "2000/2500", cls: "translate-x-[62%] rotate-[7deg] group-hover:translate-x-[68%] group-hover:rotate-[9deg]" },
  { src: "/images/up-evt-final-four.png", alt: "UAAP Season 88 Final Four poster", ratio: "2970/3713", cls: "z-10 -translate-y-1 group-hover:-translate-y-2" },
];

export default function ProjectsPage() {
  const live = devProjects.filter((p) => p.liveUrl).length;

  return (
    <div className="space-y-16">
      <FadeIn className="space-y-8">
        <h1 className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Projects</h1>

        <nav aria-label="Portfolios" className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/projects/media"
            className={`group flex flex-col overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-zinc-900/10 dark:ring-white/10 ${focusRing}`}
          >
            <div className="relative h-72 overflow-hidden">
              {fan.map((p) => (
                <div
                  key={p.src}
                  className={`absolute left-1/2 top-1/2 w-[38%] -ml-[19%] -mt-[25%] overflow-hidden rounded-md shadow-[0_12px_32px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-transform duration-300 ease-out ${p.cls}`}
                  style={{ aspectRatio: p.ratio }}
                >
                  <LoadingProjectImage src={p.src} alt={p.alt} width={640} />
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between gap-4 px-6 pb-6 pt-2">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium leading-none tracking-[-0.03em] text-white">
                  Design and media
                </h2>
                <p className="mt-2 font-mono text-xs text-zinc-500 tabular-nums">
                  {mediaProjects.length} projects · {mediaPieceCount} pieces
                </p>
              </div>
              <ArrowRight className="mb-1 size-4 shrink-0 text-zinc-500 transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-white" strokeWidth={1.5} />
            </div>
          </Link>

          <Link
            href="/projects/developer"
            className={`group flex flex-col overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10 ${focusRing}`}
          >
            <div className="relative h-72 overflow-hidden">
              <div className="absolute left-6 top-8 aspect-[4/3] w-[72%] overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-zinc-900/10 transition-transform duration-300 ease-out group-hover:-translate-y-1 dark:ring-white/10">
                <LoadingProjectImage src="/images/godle-preview-1.png" alt="gödle landing screen" width={640} />
              </div>
              <div className="absolute right-6 top-24 aspect-[16/10] w-[72%] overflow-hidden rounded-lg shadow-[0_12px_32px_rgba(0,0,0,0.22)] ring-1 ring-zinc-900/10 transition-transform duration-300 ease-out group-hover:translate-y-1 dark:ring-white/10 [&_img]:object-left-top">
                <LoadingProjectImage src="/images/pjdsc26-preview-1.png" alt="Philippine Junior Data Science Challenge website" width={640} />
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 px-6 pb-6 pt-2">
              <div>
                <h2 className="font-mono text-xl font-semibold leading-none text-zinc-900 dark:text-zinc-100">
                  Software and research
                </h2>
                <p className="mt-2 font-mono text-xs text-zinc-500 tabular-nums">
                  {devProjects.length} projects · {live} live
                </p>
              </div>
              <ArrowRight className="mb-1 size-4 shrink-0 text-zinc-500 transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" strokeWidth={1.5} />
            </div>
          </Link>
        </nav>
      </FadeIn>

      <ContactBlock heading="Have something in mind?" subject="Project inquiry" />
    </div>
  );
}
