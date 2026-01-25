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
    <article className="w-full">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="flex gap-12">
        <div className="flex-1 prose prose-slate dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">{post.frontmatter.title}</h1>
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.frontmatter.category}</span>
            </div>
          </header>

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

        <aside className="hidden lg:block w-48 flex-shrink-0">
          <TableOfContents content={post.content} />
        </aside>
      </div>
    </article>
  );
}

