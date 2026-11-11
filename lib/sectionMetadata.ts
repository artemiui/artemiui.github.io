import { siteConfig } from "./siteConfig";

export function sectionMetadata(title: string, route: string, image: string) {
  const url = new URL(route, siteConfig.url).href;
  const images = [{ url: new URL(`/share/${image}.jpg`, siteConfig.url).href, width: 1200, height: 630, alt: `${title} by artemiui — editorial collage` }];
  return {
    alternates: { canonical: url },
    openGraph: { type: "website" as const, title, siteName: siteConfig.siteName, url, images },
    twitter: { card: "summary_large_image" as const, title, images },
  };
}

