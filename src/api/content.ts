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
    return Array.from({ length: 24 }, () =>
      characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  return Array.from({ length: count }, () => {
    const title = getRandomLorem(Math.floor(Math.random() * 5) + 5); // Always non-null
    const description = getRandomLorem(title.split(" ").length * 10); // Always non-null
    return {
      _id: generateRandomId(), // MongoDB ObjectId style
      title,
      description,
      tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        loremWords[Math.floor(Math.random() * loremWords.length)]
      ), // Always an array of strings
      image_url: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + 1}`, // Always non-null
      link_url: "#", // Always a placeholder link
      views: Math.floor(Math.random() * 1000), // Always a number
      is_active: Math.random() > 0.5, // Boolean value
      content_type: Math.random() > 0.5 ? "news" : "article",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
};

// Generate mock data
export const mockContents: ContentItem[] = generateRandomContents(30);

// Generate mock data for articles
export const mockContentArticles = mockContents.filter(
  (content) => content.content_type === "article"
);

// Generate mock data for news
export const mockContentNews = mockContents.filter(
  (content) => content.content_type === "news"
);
