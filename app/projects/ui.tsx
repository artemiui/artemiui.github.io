"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { openEmail } from "@/lib/contact";

export const ease = [0.16, 1, 0.3, 1] as const;

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const buttonPrimary = `inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-[background-color,transform] duration-150 hover:bg-zinc-700 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white cursor-pointer ${focusRing}`;

export const buttonSecondary = `inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-900/10 px-4 text-sm font-medium text-zinc-700 transition-[background-color,color,transform] duration-150 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98] dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 ${focusRing}`;

export const linkQuiet = `inline-flex items-center gap-1.5 rounded text-sm text-zinc-600 underline decoration-zinc-900/20 underline-offset-4 transition-colors duration-150 hover:text-zinc-900 hover:decoration-zinc-900/60 dark:text-zinc-400 dark:decoration-white/20 dark:hover:text-zinc-100 dark:hover:decoration-white/60 ${focusRing}`;

export { focusRing };

/** Mono meta line: the signature detail. Parts are joined with a middle dot. */
export function Meta({ parts, className = "" }: { parts: (string | number | undefined)[]; className?: string }) {
  return (
    <p className={`font-mono text-xs text-zinc-500 tabular-nums ${className}`}>
      {parts.filter(Boolean).join(" · ")}
    </p>
  );
}

export function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SubpageHeader({ title, lede }: { title: string; lede: ReactNode }) {
  return (
    <header className="space-y-4 border-b border-zinc-900/10 pb-8 dark:border-white/10">
      <Link href="/projects" className={`${linkQuiet} no-underline`}>
        <ArrowLeft className="size-4" strokeWidth={1.5} />
        Projects
      </Link>
      <h1 className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
      <p className="max-w-[60ch] text-base leading-7 text-zinc-600 dark:text-zinc-400">{lede}</p>
    </header>
  );
}

export function ContactBlock({ heading, body, subject }: { heading: string; body: string; subject: string }) {
  return (
    <section className="rounded-2xl border border-zinc-900/10 bg-zinc-50 p-6 sm:p-8 dark:border-white/10 dark:bg-zinc-900/60">
      <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">{heading}</h2>
      <p className="mt-2 max-w-[56ch] text-sm leading-6 text-zinc-600 dark:text-zinc-400">{body}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => openEmail(subject)} className={buttonPrimary}>
          <Mail className="size-4" strokeWidth={1.5} />
          Email me
        </button>
        <Link href="/about" className={buttonSecondary}>
          Read my CV
        </Link>
      </div>
    </section>
  );
}

export function ExternalButton({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${buttonSecondary} h-9 px-3`}
    >
      {children}
      <ArrowUpRight className="size-4 text-zinc-500" strokeWidth={1.5} />
    </a>
  );
}
