export const siteConfig = {
  title: "artemiui",
  description: "a collection of ideas and pixels",
  quote: '"The divide between the arts and the sciences is a mistake."',
  navLinks: [
    { label: "Blog", href: "/" },
    { label: "About", href: "/about" },
    { label: "Recs", href: "/recommendations" },
  ],
  features: {
    enableScreensaver: true,
    enableIntroAnimation: true,
    enableThemeToggle: true,
  },
};

export type SiteConfig = typeof siteConfig;
