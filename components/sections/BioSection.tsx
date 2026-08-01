import { siteConfig } from "@/lib/siteConfig";

interface BioSectionProps {
  quote?: string;
  className?: string;
}

export default function BioSection({
  quote = siteConfig.quote,
  className = "",
}: BioSectionProps) {
  return (
    <section className={`bio-section ${className}`}>
      <p className="text-green-600 dark:text-zinc-300 leading-7">
        {quote}
      </p>
    </section>
  );
}
