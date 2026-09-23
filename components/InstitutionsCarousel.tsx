"use client";

interface InstitutionItem {
  name: string;
  role?: string;
  logo: string;
  className?: string;
}

const institutionsList: InstitutionItem[] = [
  {
    name: "UP Office of Athletics and Sports Development",
    role: "Media Volunteer",
    logo: "/logos/oasd.png",
    className: "h-10 sm:h-12 w-auto object-contain",
  },
  {
    name: "UP Data Science Society",
    role: "Deputy Director, Research Fellow",
    logo: "/logos/dssoc.png",
    className: "h-10 sm:h-12 w-auto object-contain dark:invert",
  },
  {
    name: "St. James Academy Alumni Association",
    role: "Board of Trustees",
    logo: "/logos/sjaaa.png",
    className: "h-10 sm:h-12 w-auto object-contain",
  },
  {
    name: "UP Resilience Institute",
    role: "Research & Creative Work",
    logo: "/logos/upri-banner.png",
    className: "h-8 sm:h-9 w-auto object-contain",
  },
  {
    name: "UP Philosophical Society",
    role: "Academic Committee",
    logo: "/logos/philosoc.png",
    className: "h-10 sm:h-12 w-auto object-contain dark:invert",
  },
];

// Duplicate items 4 times to ensure seamless infinite scrolling loop on all screens
const marqueeItems = [
  ...institutionsList,
  ...institutionsList,
  ...institutionsList,
  ...institutionsList,
];

export default function InstitutionsCarousel() {
  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Edge gradient fade masks for smooth transition */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 bg-gradient-to-l from-background to-transparent" />

      {/* Infinite scrolling track */}
      <div className="animate-logo-marquee flex items-center">
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center shrink-0 px-6 sm:px-8 cursor-pointer group"
            title={`${item.name}${item.role ? ` — ${item.role}` : ""}`}
          >
            <img
              src={item.logo}
              alt={item.name}
              className={`${item.className} opacity-75 group-hover:opacity-100 transition-all duration-200 group-hover:scale-105`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
