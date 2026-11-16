import type { ReactNode } from "react";
import { sectionMetadata } from "../../../lib/sectionMetadata";

export const metadata = { title: "Design and media", ...sectionMetadata("Design and media", "/projects/media", "projects") };

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
