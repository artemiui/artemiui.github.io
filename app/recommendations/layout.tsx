import type { ReactNode } from "react";
import { sectionMetadata } from "../../lib/sectionMetadata";

export const metadata = sectionMetadata("Recommendations", "/recommendations", "recommendations");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
