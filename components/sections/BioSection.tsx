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
      <p className="text-red-600 dark:text-red-500 leading-7 font-medium">
        {quote}
      </p>
    </section>
  );
}
