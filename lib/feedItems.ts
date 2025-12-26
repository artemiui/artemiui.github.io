import { getAllPosts } from "./mdx";
import { FeedItemType } from "@/components/FeedItem";

// External links that don't have MDX files
const externalLinks: Omit<FeedItemType, "category" | "description">[] = [
  {
    title: "A Computational Model of Piano Finger Technique",
    date: "2023-12-15",
    url: "https://nlp.lab.uic.edu/wp-content/uploads/sites/314/2023/06/Randolph_CRF2.pdf",
  },
];

export async function getFeedItems(): Promise<FeedItemType[]> {
  const posts = await getAllPosts();
  
  // Convert MDX posts to feed items
  const postItems: FeedItemType[] = posts.map((post) => ({
    title: post.frontmatter.title,
    date: post.frontmatter.date,
    slug: post.slug,
    category: post.frontmatter.category,
    description: post.frontmatter.description,
  }));

  // Add external links with their categories
  const externalItems: FeedItemType[] = externalLinks.map((link) => ({
    ...link,
    category: "Knowledge" as const, // Default category for external links
  }));

  // Combine and sort by date (newest first)
  const allItems = [...postItems, ...externalItems].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allItems;
}

