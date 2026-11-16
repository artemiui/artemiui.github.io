"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { openEmail } from "@/lib/contact";

export const ease = [0.16, 1, 0.3, 1] as const;

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const buttonPrimary = `inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-[background-color,transform] duration-150 hover:bg-zinc-700 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white cursor-pointer ${focusRing}`;

export const buttonSecondary = `inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-900/10 px-4 text-sm font-medium text-zinc-700 transition-[background-color,color,transform] duration-150 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98] dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 ${focusRing}`;

/** Fixed dark variants, for surfaces that stay dark in both themes. */
const darkPrimary = `inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-100 px-4 text-sm font-medium text-zinc-950 transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60`;
const darkSecondary = `inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-medium text-zinc-300 transition-[background-color,color,transform] duration-150 hover:bg-white/5 hover:text-white active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60`;

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

export function BackLink({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/projects"
      className={`inline-flex items-center gap-1.5 rounded text-sm transition-colors duration-150 ${
        dark ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      } ${focusRing}`}
    >
      <ArrowLeft className="size-4" strokeWidth={1.5} />
      Projects
    </Link>
  );
}

export function ContactBlock({
  heading,
  subject,
  dark = false,
}: {
  heading: string;
  subject: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${
        dark
          ? "border-white/10 bg-white/[0.03]"
          : "border-zinc-900/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/60"
      }`}
    >
      <h2 className={`text-xl font-medium ${dark ? "text-zinc-100" : "text-zinc-900 dark:text-zinc-100"}`}>{heading}</h2>
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <button type="button" onClick={() => openEmail(subject)} className={dark ? darkPrimary : buttonPrimary}>
          <Mail className="size-4" strokeWidth={1.5} />
          Email me
        </button>
        <Link href="/about" className={dark ? darkSecondary : buttonSecondary}>
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
      className={`inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-900/10 px-3 text-xs font-medium text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 ${focusRing}`}
    >
      {children}
      <ArrowUpRight className="size-3.5 text-zinc-500" strokeWidth={1.5} />
    </a>
  );
}
