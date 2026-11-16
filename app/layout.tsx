import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IdleScreensaver from "@/components/IdleScreensaver";
import IntroWrapper from "@/components/IntroWrapper";
import "katex/dist/katex.min.css";
import GlobalRouteBackground from "@/components/GlobalRouteBackground";
import { siteConfig } from "@/lib/siteConfig";
import { ThemeProvider } from "@/lib/themeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 0xProto by 0xType (SIL OFL 1.1, see app/fonts/0xProto-LICENSE.txt)
const proto = localFont({
  src: [
    { path: "./fonts/0xProto-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/0xProto-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/0xProto-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-0xproto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        secureUrl: siteConfig.ogImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${proto.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <GlobalRouteBackground />
          <IntroWrapper>
            <div className="min-h-screen flex flex-col">
              <div className="flex-1 w-full max-w-[768px] mx-auto px-6 py-12">
                <Header />
                <main className="mt-6">{children}</main>
              </div>
              <Footer />
            </div>
            {siteConfig.features.enableScreensaver && <IdleScreensaver />}
          </IntroWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
