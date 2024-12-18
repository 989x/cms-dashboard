import { ContentItem } from "@/types/shared.types";

export const generateRandomContents = (count: number): ContentItem[] => {
  const loremWords = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"
  ];

  const getRandomLorem = (wordCount: number) => {
    return Array.from({ length: wordCount }, () =>
      loremWords[Math.floor(Math.random() * loremWords.length)]
    ).join(" ");
  };

  const generateRandomId = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 6 }, () =>
      characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  return Array.from({ length: count }, () => {
    const title = getRandomLorem(Math.floor(Math.random() * 5) + 5); // Title with 5 to 9 words
    const description = getRandomLorem(title.split(" ").length * 60); // Description 60 times longer than the title
    return {
      id: generateRandomId(),
      title,
      date: new Date().toISOString(),
      tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        loremWords[Math.floor(Math.random() * loremWords.length)]
      ),
      description,
      image: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + 1}`, // Random image between 1-100
      link: "#",
      views: Math.floor(Math.random() * 1000),
      status: Math.random() > 0.5 ? "visible" : "hidden",
      type: Math.random() > 0.5 ? "news" : "article"
    };
  });
};

export const mockContents: ContentItem[] = generateRandomContents(30);

// Generate mock data for articles
export const mockContentArticles = generateRandomContents(30).filter(
  (news) => news.type === "article"
);

// Generate mock data for news
export const mockContentNews = generateRandomContents(30).filter(
  (news) => news.type === "news"
);
