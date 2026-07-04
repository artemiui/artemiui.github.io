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
		category: "Papers",
		description: "I had recently presented a paper in the Emmanuel Q. Fernando Undergraduate Seminar of the UP Diliman Department of Philosophy under the Philosophy of Science category.",
	},
  {
		title: "Public Knowledge and Attitudes on Microplastic Contamination of Aquaculture and Fisheries Products in CAMANAVA ",
		date: "2025-09-16",
		url: "https://journals.e-palli.com/home/index.php/ijrud/article/view/4932/2642",
		category: "Papers",
		description: "My first published paper which is apparently being used to LGUs today. It was a tremendously difficult experience for the me at the time, but I enjoyed it a lot.",
	},
  {
    title: "ML-Based Phytochemical Analysis for Multi-objective Optimization of Efficacy and Toxicity Metrics",
    date: "2026-04-25",
    url: "https://drive.google.com/drive/u/1/folders/1aO2ewk3dSRG02Ct3vogqERu6sKifYzId",
    category: "Papers",
    description: "The following notebook contains a curated collection of what I consider to be the notable findings and additional results throughout the entirety of the UP Data Science Society Bootcamp: Data Science 102.",
  },
  {
    title: "Aftershock Frequency and Magnitude Estimation of Philippine Earthquakes Using Omori’s Law and Bath’s Law",
    date: "2024-11-23",
    url: "https://docs.google.com/document/d/1Te7ByhbU47PxUtrkSUKDf14tvqDCkQ5p/edit?usp=sharing&ouid=108053967144609741023&rtpof=true&sd=true",
    category: "Papers",
    description: "A paper I presented in high school for the University of the Philippines Resilience Institute hosted event Quake Quest 2024.",
  },
	{
		title: "UP Diliman Department of Philosophy Hosts the Second Emmanuel Q. Fernando Philosophy Undergraduate Conference",
		date: "2026-04-28",
		url: "https://philosophy.upd.edu.ph/up-diliman-department-of-philosophy-hosts-the-second-emmanuel-q-fernando-philosophy-undergraduate-conference/",
		category: "Knowledge",
		description: "For the second year in a row, the UP Diliman Department of Philosophy hosted the Emmanuel Q. Fernando Philosophy Undergraduate Conference from April 27-28, 2026.",
	},
  {
    title: "How to self-study pure math - Aleph0",
    date: "2026-05-15",
    url: "https://www.youtube.com/watch?v=byNaO_zn2fI",
    description: "This video has a list of books, videos, and exercises that goes through the undergrad pure mathematics curriculum from start to finish.",
    category: "Knowledge",
  },
{
    title: "The Vienna Circle and its Significance | Virtual Bath Royal",
    date: "2026-05-17",
    url: "https://youtu.be/shuHzSMUy30",
    description: "The vienna circle has astounded me since I encountered the philosophy of language and logical positivism. Their work, On Scientific Conceptions of the World, has a particular hold on me because of its criticism of traditional metaphysics and convoluted language.",
    category: "Knowledge",
  },
{
    title: "Ludwig Wittgenstein (1889—1951) The Limits of Language",
    date: "2026-05-7",
    url: "https://youtu.be/VgW_PFl-Xs4?si=ejA5dwydkZNhtGyR",
    description: "Wittgenstein: The limits of my language mean the limits of my world",
    category: "Knowledge",
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

