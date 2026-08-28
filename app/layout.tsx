import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
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

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
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
