import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { sectionMetadata } from "../../lib/sectionMetadata";

const display = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const displayMono = Geist_Mono({
  variable: "--font-display-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = sectionMetadata("Projects", "/projects", "projects");

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={`${display.variable} ${displayMono.variable}`}>{children}</div>;
}
