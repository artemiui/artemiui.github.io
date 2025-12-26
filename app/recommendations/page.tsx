"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ArrowLeft } from "lucide-react";

// Type definitions
type Book = {
  title: string;
  author: string;
  link?: string;
  description?: string;
};

type YouTubeVideo = {
  title: string;
  channel: string;
  url: string;
  description?: string;
};

type RecommendationLink = {
  title: string;
  url: string;
  description?: string;
};

// Sample data - replace with your actual recommendations
const books: Book[] = [
  {
    title: "Example Book Title",
    author: "Author Name",
    link: "https://example.com",
    description: "A great book about...",
  },
  // Add more books here
];

const youtubeVideos: YouTubeVideo[] = [
  {
    title: "How Liberty Dies: The Politics of Star Wars",
    channel: "Arken the Amerikan",
    url: "https://www.youtube.com/watch?v=v6Q6y4-qKac",
    description: "A masterfully written piece of analysis of the underlying politics behind the Star Wars prequels. Prior to Andor, this highlighted the potential of diving into the compexities of the political conflicts within Star Wars.",
  },
  {
    title: "The Banach-Tarski Paradox",
    channel: "VSauce",
    url: "https://www.youtube.com/watch?v=s86-Z-CbaHA&pp=ygUVYmFuYWNoIHRhcnNraSBwYXJhZG942AZc",
    description: "One of the first few videos I saw as a kid that had me interested in mathematical paradoxes.",
  },
  {
    title: " Let's reproduce the calculations from Interstellar ",
    channel: "ScienceClic",
    url: "https://www.youtube.com/watch?v=ABFGKdKKKyg",
  },
  {
    title: "A Rose-Colored Discussion - Hyouka Series",
    channel: "Replay Value",
    url: "https://www.youtube.com/playlist?list=PLdXcEDO2xtB-pjqwTiPmWn1wxKmYZqjN8",
    description: "This series is one of the most comprehensive analysis of 氷菓 and arguably also one of the best analyses of an anime period.",
  },
  // Add more videos here
];

const links: RecommendationLink[] = [
  {
    title: "ani-cli",
    url: "https://github.com/pystardust/ani-cli",
    description: "A cli tool to browse and play anime",
  },
  {
    title: "sakay.ph",
    url: "https://www.sakay.ph/",
    description: "For getting around Metro Manila via commute",
  },
  // Add more links here
];

export default function RecommendationsPage() {
  return (
    <div className="space-y-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Page Title */}
      <h1 className="text-3xl font-mono font-semibold mb-8 text-green-600">Recommendations</h1>

      {/* Books Section */}
      {books.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-mono font-semibold mb-6">To Read</h2>
          <div className="space-y-4">
            {books.map((book, index) => (
              <div
                key={index}
                className="py-3 border-b border-zinc-200 dark:border-zinc-800"
              >
                {book.link ? (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground group-hover:opacity-70 transition-opacity">
                            {book.title}
                          </h3>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          by {book.author}
                        </p>
                        {book.description && (
                          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                            {book.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      by {book.author}
                    </p>
                    {book.description && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                        {book.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* YouTube Videos Section */}
      {youtubeVideos.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-mono font-semibold mb-6">To Watch</h2>
          <div className="space-y-4">
            {youtubeVideos.map((video, index) => (
              <div
                key={index}
                className="py-3 border-b border-zinc-200 dark:border-zinc-800"
              >
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground group-hover:opacity-70 transition-opacity">
                          {video.title}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {video.channel}
                      </p>
                      {video.description && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Links Section */}
      {links.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-mono font-semibold mb-6">Useful Links</h2>
          <div className="space-y-4">
            {links.map((link, index) => (
              <div
                key={index}
                className="py-3 border-b border-zinc-200 dark:border-zinc-800"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground group-hover:opacity-70 transition-opacity">
                          {link.title}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      </div>
                      {link.description && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {books.length === 0 && youtubeVideos.length === 0 && links.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-500 py-8">
          No recommendations yet. Check back soon!
        </p>
      )}
    </div>
  );
}

