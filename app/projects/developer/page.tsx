import Heatmap from "./Heatmap";
import Projects from "./Projects";
import { BackLink, ContactBlock, FadeIn } from "../ui";

export const revalidate = 86400;

export default function DeveloperPortfolioPage() {
  return (
    <div className="space-y-20">
      <FadeIn className="space-y-8">
        <BackLink />
        <h1 className="sr-only">Software and research</h1>
        <Heatmap />
      </FadeIn>

      <Projects />

      <ContactBlock heading="Need a website or a data tool?" subject="Development inquiry" />
    </div>
  );
}
