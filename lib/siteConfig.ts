export const siteConfig = {
  title: "artemiui",
  description: "a collection of ideas and pixels",
  quote: "",
  navLinks: [
    { label: "Blog", href: "/" },
    { label: "About", href: "/about" },
    { label: "Artboxd", href: "/media" },
    { label: "Recs", href: "/recommendations" },
    { label: "♡", href: "/gf" },
  ],
  features: {
    enableScreensaver: true,
    enableIntroAnimation: true,
  },
};

export type SiteConfig = typeof siteConfig;
