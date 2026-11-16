import type { ReactNode } from "react";
import { sectionMetadata } from "../../../lib/sectionMetadata";

export const metadata = { title: "Software and research", ...sectionMetadata("Software and research", "/projects/developer", "projects") };

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
