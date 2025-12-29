import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  category: "Knowledge" | "Media" | "Hobby" | "Design";
  description?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug))
  );
  return posts.filter((post): post is Post => post !== null);
}

export function generateMdHeadingId(index: number, text: string): string {
  const safe = text
    .toLowerCase()
    .replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"))
    .replace(/\s+/g, "-");
  return `heading-${index}-${safe}`;
}

export function sanitizeHeadingLabelDisplay(input: string): string {
  try {
    return input.replace(/[^\p{L}\p{N}\s\.\-]/gu, "");
  } catch {
    return input.replace(/[^\w\s\.\-]/g, "");
  }
}

