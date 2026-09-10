import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import TableOfContents from "@/components/TableOfContents";
import AudioPlayer from "@/components/AudioPlayer";
import remarkMath from "remark-math";

import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "hast-util-sanitize";

type Props = {
  params: Promise<{ slug: string }>;
};

const baseTagNames = defaultSchema?.tagNames ?? [];
const baseAttributes = defaultSchema?.attributes ?? {} as Record<string, any>;

const katexSanitizeOptions = {
  ...(defaultSchema ?? {}),
  tagNames: [
    ...baseTagNames,
    'span', 'div',
    'math', 'semantics', 'mrow', 'mi', 'mn', 'mo', 'mfrac', 'msup', 'msub', 'mtext', 'annotation', 'mspace', 'msqrt', 'mtable', 'mtr', 'mtd', 'munder', 'mover', 'munderover', 'mlabeledtr', 'maligngroup', 'malignmark', 'mpadded', 'mphantom', 'mroot', 'mstyle', 'menclose', 'mmultiscripts', 'mprescripts', 'none'
  ],
  attributes: {
    ...baseAttributes,
    span: ['className', 'aria-hidden', 'style'],
    div: ['className', 'style'],
    math: ['className', 'xmlns', 'display'],
    semantics: ['className'],
    mrow: ['className'],
    mi: ['className', 'mathvariant'],
    mn: ['className'],
    mo: ['className', 'fence', 'stretchy', 'symmetric', 'largeop', 'movablelimits', 'accent', 'lspace', 'rspace', 'minsize', 'maxsize'],
    mfrac: ['className', 'linethickness'],
    msup: ['className'],
    msub: ['className'],
    mtext: ['className'],
    annotation: ['className', 'encoding'],
    mspace: ['className', 'width', 'height', 'depth'],
    msqrt: ['className'],
    mtable: ['className', 'columnalign', 'rowspacing', 'columnspacing'],
    mtr: ['className'],
    mtd: ['className', 'columnalign'],
    munder: ['className', 'accentunder'],
    mover: ['className', 'accent'],
    munderover: ['className'],
    mpadded: ['className', 'width', 'height', 'depth', 'lspace', 'voffset'],
    mphantom: ['className'],
    mroot: ['className'],
    mstyle: ['className', 'displaystyle', 'scriptlevel'],
    '*': [...(baseAttributes['*'] ?? []), 'className', 'aria-hidden', 'style']
  }
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article id="article-root" className="relative w-full">
      {/* Back to Home/Blog */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Back</span>
      </Link>

      {/* Anthropic-Style Table of Contents (Desktop Sticky/Locking Sidebar + Mobile Pill Drawer) */}
      <TableOfContents content={post.content} />

      {/* Article Header (outside .prose so heading indexing matches markdown 1:1) */}
      <header id="article-header" className="mb-8">
        <h1
          id="article-title"
          className="text-2xl sm:text-3xl font-semibold mb-2 leading-tight break-words text-zinc-900 dark:text-zinc-100"
        >
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500 flex-wrap">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.frontmatter.category}</span>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs font-sans bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Full-width Blog Post Content: Fills the entire div */}
      <div className="w-full prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          components={{
            AudioPlayer,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </div>
    </article>
  );
}

