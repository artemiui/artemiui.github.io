"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { openEmail } from "@/lib/contact";
import { LoadingProjectImage } from "./ProjectImageFrame";
import { devProjects, mediaPieceCount, mediaProjects, organizations } from "./data";
import { buttonPrimary, buttonSecondary, ContactBlock, FadeIn, focusRing, Meta } from "./ui";

const liveCount = devProjects.filter((p) => p.liveUrl).length;

const doors = [
  {
    href: "/projects/media",
    title: "Design and media",
    body: "Posters, merchandise, sports graphics and sideline video",
    meta: [`${mediaProjects.length} projects`, `${mediaPieceCount} pieces`],
    cover: (
      <div className="grid h-full grid-cols-2 gap-1">
        <div className="relative overflow-hidden">
          <LoadingProjectImage src="/images/up-evt-final-four.png" alt="UAAP Season 88 Final Four poster for the UP Fighting Maroons" />
        </div>
        <div className="relative overflow-hidden">
          <LoadingProjectImage src="/images/paddock-south-1.png" alt="RUSH movie night poster for Paddock South" />
        </div>
      </div>
    ),
  },
  {
    href: "/projects/developer",
    title: "Software and research",
    body: "Websites, desktop apps, games and data research",
    meta: [`${devProjects.length} projects`, `${liveCount} live`],
    cover: (
      <div className="relative h-full overflow-hidden [&_img]:object-left-top">
        <LoadingProjectImage src="/images/pjdsc26-preview-1.png" alt="Philippine Junior Data Science Challenge 2026 website" />
      </div>
    ),
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-16">
      <FadeIn className="space-y-12">
        <header className="space-y-4">
          <h1 className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Projects</h1>
          <p className="max-w-[60ch] text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            I design posters, merchandise and sports graphics, film sideline coverage, and build websites and data
            tools. Clients so far include UP Diliman organizations, its varsity teams, and the Paddock South motorsport
            community.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="button" onClick={() => openEmail("Project inquiry")} className={buttonPrimary}>
              <Mail className="size-4" strokeWidth={1.5} />
              Email me
            </button>
            <Link href="/about" className={buttonSecondary}>
              Read my CV
            </Link>
          </div>
        </header>

        <nav aria-label="Portfolios" className="grid gap-4 sm:grid-cols-2">
          {doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-900/10 bg-white transition-colors duration-150 hover:border-zinc-900/25 dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/25 ${focusRing}`}
            >
              <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-900">{door.cover}</div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="space-y-1">
                  <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">{door.title}</h2>
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{door.body}</p>
                  <Meta parts={door.meta} className="pt-1" />
                </div>
                <ArrowRight
                  className="mt-0.5 size-4 shrink-0 text-zinc-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          ))}
        </nav>
      </FadeIn>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Organizations I&apos;ve made work for</h2>
        <ul className="grid border-t border-zinc-900/10 sm:grid-cols-2 sm:gap-x-8 dark:border-white/10">
          {organizations.map((org) => (
            <li
              key={org}
              className="flex h-11 items-center border-b border-zinc-900/10 font-mono text-xs text-zinc-600 dark:border-white/10 dark:text-zinc-400"
            >
              {org}
            </li>
          ))}
        </ul>
      </section>

      <ContactBlock
        heading="Have something in mind?"
        body="Tell me what it's for, who will see it and when you need it."
        subject="Project inquiry"
      />
    </div>
  );
}
