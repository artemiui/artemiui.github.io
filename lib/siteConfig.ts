const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://artemiui.vercel.app";
};

const siteUrl = getSiteUrl();

export const siteConfig = {
  title: "artemiui",
  siteName: "artemiui",
  author: "Artemio Arcega",
  url: siteUrl,
  description: "a collection of ideas and pixels.",
  ogImage: `${siteUrl}/og-image.jpg`,
  ogImageAlt:
    "artemiui - Personal site featuring an Obsidian graph background design",
  quote: "",
  navLinks: [
    { label: "Blog", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Artboxd", href: "/media" },
    { label: "Recs", href: "/recommendations" },
    { label: "♡", href: "/gf" },
  ],
  features: {
    enableScreensaver: true,
  },
};

export type SiteConfig = typeof siteConfig;
