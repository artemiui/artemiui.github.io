import { getAllPosts } from "./mdx";
import { FeedItemType } from "@/components/FeedItem";

// External links that don't have MDX files
const externalLinks: FeedItemType[] = [
  {
    title: "A Computational Model of Piano Finger Technique",
    date: "2023-12-15",
    url: "https://nlp.lab.uic.edu/wp-content/uploads/sites/314/2023/06/Randolph_CRF2.pdf",
    description: "An interesting paper on modeling piano fingering using CRF. Initial thoughts of innovation given features is that we can optimize for teaching piano finger arrangement much easier. Also, accessibility.",
    category: "Knowledge",
  },
  {
    title: "The Most Beautiful Line in a Video Game",
    date: "2025-5-05",
    url: "https://www.youtube.com/watch?v=UKU4YYOHdk0",
    category: "Media",
    description: "A video I made earlier this year on UNDERTALE's iconic line that despite everything, it's still you.",
  },
  {
    title: "Zettelkasten workflow for research papers | Zotero & Obsidian",
    date: "2026-02-28",
    url: "https://www.youtube.com/watch?v=D9ivU_IKO6M",
    category: "Knowledge",
    description: "A research system I've adopted from the great Artem, a neuroscientist I share a name with.",
  },
  {
    title: "Computer-Aided Drug Design (CADD) Vault",
    date: "2026-04-02",
    url: "https://drugbud-suite.github.io/CADD_Vault/",
    category: "Knowledge",
    description: "An open-source collection of computional drug discovery software. Great for computational biology research.",
  },  
  {
    title: "Anthropic’s philosopher answers your questions",
    date: "2026-04-02",
    url: "https://www.youtube.com/watch?v=I9aGC6Ui3eE",
    category: "Knowledge",
    description: "Amanda Askell is a philosopher at Anthropic who works on Claude's character.",
  },
	{
		title: "On the Ontological Limitations of Digital Twins",
		date: "2026-04-28",
		url: "https://philosophy.upd.edu.ph/wp-content/uploads/2026/04/On-the-Formal-Isomorphism-and-the-Asymptotic-Limits-of-Digital-Twins.pdf",
		category: "Knowledge",
		description: "I had recently presented a paper in the Emmanuel Q. Fernando Undergraduate Seminar of the UP Diliman Department of Philosophy under the Philosophy of Science category.",
	},
	{
		title: "UP Diliman Department of Philosophy Hosts the Second Emmanuel Q. Fernando Philosophy Undergraduate Conference",
		date: "2026-04-28",
		url: "https://philosophy.upd.edu.ph/up-diliman-department-of-philosophy-hosts-the-second-emmanuel-q-fernando-philosophy-undergraduate-conference/",
		category: "Knowledge",
		description: "For the second year in a row, the UP Diliman Department of Philosophy hosted the Emmanuel Q. Fernando Philosophy Undergraduate Conference from April 27-28, 2026.",
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
  const externalItems: FeedItemType[] = externalLinks;

  // Combine and sort by date (newest first)
  const allItems = [...postItems, ...externalItems].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allItems;
}

