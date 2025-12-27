"use client";

import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Type definitions
type Book = {
  title: string;
  author: string;
  link?: string;
  coverUrl: string;
  description?: string;
};

type Games = {
  title: string;
  coverUrl: string;
  link: string;
  creator: string;
}

type YouTubeVideo = {
  title: string;
  channel: string;
  url: string;
  description?: string;
};

type MusicAlbum = {
  title: string;
  artist: string;
  coverUrl: string;
  link: string;
};

type RecommendationLink = {
  title: string;
  url: string;
  description?: string;
};

// function to get yt thumbnail
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeThumbnail = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

const musicAlbums: MusicAlbum[] = [
  {
    title: "What Was, Not Now",
    artist: "Stephen Sanchez",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273248a6e26a604a985c0be5c5c",
    link: "https://open.spotify.com/album/0izGGxTiCAzk9Sgu8loZTe?si=qFgvDoE_RRitmL2KCiz-Ig",
  },
  {
    title: "Worlds",
    artist: "Porter Robinson",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2731f675e7b8bae408653346dd9",
    link: "https://open.spotify.com/album/7eyQXxuf2nGj9d2367Rr5j",
  },
  {
    title: "ABIIOR",
    artist: "The 1975",
    coverUrl: "https://media.pitchfork.com/photos/6621ba5dff5c6aa81b93a44c/master/w_1280%2Cc_limit/The-1975.jpg",
    link: "https://open.spotify.com/album/6PWXKiakqhI17mTYM4y6oY?si=9327ec9ecec14d41",
  },
    {
    title: "LOVE LETTER Soundtrack",
    artist: "REMEDIOS",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273dc68d2c7fe0057d90ab3bf9e",
    link: "https://open.spotify.com/album/4bwtyBUKQu0nVw0zZ6XkSP?si=zGs78aVfTwa_lPOT9xf2nw",
  },
    {
    title: "A Shape of Light",
    artist: "Kensuke Ushio",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273598142e7eef56d543ec8f922",
    link: "https://open.spotify.com/album/0izGGxTiCAzk9Sgu8loZTe?si=qFgvDoE_RRitmL2KCiz-Ig",
  },
];

const books: Book[] = [
  {
    title: "Anthem",
    author: "Ayn Rand",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1401162953i/806847.jpg",
  },
    {
    title: "Days at the Morisaki Bookshop",
    author: "Satoshi Yagisawa",
    coverUrl: "https://img.perlego.com/book-covers/3631627/9780063278684.jpg",
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

const games: Games[] = [
  {
    title: "Undertale",
    coverUrl: "https://www.spritesanddice.com/media/images/sprites_and_dice_undertale_storytelling.width-1080.jpg",
    link: "i will not bother",
    creator: "Toby Fox",
  },
  {
    title: "Cyberpunk 2077",
    coverUrl: "https://enderg.com/wp-content/uploads/2022/08/cyberpunk-2077-box-art-01-ps4-us-06jun19.jpg",
    link: "i will not bother",
    creator: "CD Projekt RED",
  },
  {
    title: "Flesh, Blood, & Concrete",
    coverUrl: "https://howlongtobeat.com/games/98494_Flesh_Blood_&_Concrete.jpg",
    link: "https://waxwing0.itch.io/fbc",
    creator: "io",
  },
    {
    title: "Ender Lilies: Quietus of the Knights",
    coverUrl: "https://cdn.cdkeys.com/496x700/media/catalog/product/e/n/ender_lilies__quietus_of_the_knights_pc.jpg",
    link: "https://store.steampowered.com/app/1369630/ENDER_LILIES_Quietus_of_the_Knights/",
    creator: "Live Wire, AdGlobe",
  },
    {
    title: "Milk Inside a Bag of Milk Inside a Bag of Milk",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1392820/header.jpg?t=1743295757",
    link: "https://store.steampowered.com/app/1392820/Milk_inside_a_bag_of_milk_inside_a_bag_of_milk/",
    creator: "Nikita Kryukov",
  },
  // Add more games here
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
          <h2 className="text-xl font-mono font-semibold mb-6">To Read
            <img src="/read.png" alt="read" className="inline-block h-[1em] w-[1em] align-baseline mx-2"/>
          </h2> 
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col space-y-3"
                whileHover={{ y: -5 }}
              >
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[2/3] bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </a>
                
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground leading-tight group-hover:text-green-600 transition-colors">
                    {book.link ? (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <span className="line-clamp-2">{book.title}</span>
                      </a>
                    ) : (
                      <span className="line-clamp-2">{book.title}</span>
                    )}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {book.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* YouTube Videos Section */}
      {youtubeVideos.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-mono font-semibold mb-6">To Watch
              <img src="/watch.png" alt="watch" className="inline-block h-[1em] w-[1em] align-baseline mx-2"/>
          </h2>
          <div className="space-y-6">
            {youtubeVideos.map((video, index) => {
              const thumbnail = getYouTubeThumbnail(video.url);
              return (
                <div
                  key={index}
                  className="py-4 border-b border-zinc-200 dark:border-zinc-800"
                >
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {thumbnail && (
                        <div className="relative w-full sm:w-48 aspect-video flex-shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                          <img
                            src={thumbnail}
                            alt={video.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground group-hover:opacity-70 transition-opacity truncate">
                            {video.title}
                          </h3>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                          {video.channel}
                        </p>
                        {video.description && (
                          <p className="text-sm text-zinc-500 dark:text-zinc-500 line-clamp-2">
                            {video.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Games Section */}
      {games.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl text-yellow-600 font-mono font-semibold mb-6">To Play <img src="/games.png" alt="games" className="inline-block h-[1em] w-[1em] align-baseline mx-0"/>
            </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col space-y-3"
                whileHover={{ y: -5 }}
              >
                <a
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={game.coverUrl}
                    alt={game.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </a>
                
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground leading-tight group-hover:text-green-600 transition-colors">
                    {game.link ? (
                      <a
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <span className="line-clamp-2">{game.title}</span>
                      </a>
                    ) : (
                      <span className="line-clamp-2">{game.title}</span>
                    )}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {game.creator}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Music Section */}
      {musicAlbums.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-mono font-semibold mb-6">To Listen
            <img src="/music.png" alt="music" className="inline-block h-[1em] w-[1em] align-baseline mx-1.5"/>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {musicAlbums.map((album, index) => (
              <motion.a
                key={index}
                href={album.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                    {album.title}
                  </h3>
                  <p className="text-zinc-300 text-xs line-clamp-1">
                    {album.artist}
                  </p>
                </div>
              </motion.a>
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

