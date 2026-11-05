export const siteConfig = {
  title: "artemiui",
  siteName: "artemiui",
  author: "Artemio Arcega",
  url: "https://artemiui.github.io",
  description:
    "Personal digital portfolio and collection of ideas, statistics, analytical philosophy, and pixels by Artemio Arcega at University of the Philippines Diliman.",
  ogImage: "https://artemiui.github.io/og-image.jpg",
  ogImageAlt:
    "Artemio Arcega - Personal site featuring an Obsidian graph background design",
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
