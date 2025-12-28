import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IdleScreensaver from "@/components/IdleScreensaver";
import ThemeToggle from "@/components/ThemeToggle";
import IntroWrapper from "@/components/IntroWrapper";
import "katex/dist/katex.min.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "artemiui",
  description: "a collection of ideas and pixels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-background text-foreground">
        <IntroWrapper>
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1 w-full max-w-[768px] mx-auto px-6 py-12">
              <Header />
              <main className="mt-6">{children}</main>
            </div>
            <Footer />
          </div>
          <IdleScreensaver />
        </IntroWrapper>
      </body>
    </html>
  );
}
