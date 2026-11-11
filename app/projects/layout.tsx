import type { ReactNode } from "react";
import { sectionMetadata } from "../../lib/sectionMetadata";

export const metadata = sectionMetadata("Projects", "/projects", "projects");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
