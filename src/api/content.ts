import { ContentItem } from "@/types/shared.types";

export const generateRandomContents = (count: number): ContentItem[] => {
  const loremWords = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua",
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

  const generateUniqueDates = (count: number): string[] => {
    const baseDate = new Date();
    const uniqueDates = new Set<string>();

    while (uniqueDates.size < count) {
      const randomOffset = Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000); // Random offset within a year
      const randomDate = new Date(baseDate.getTime() - randomOffset).toISOString();
      uniqueDates.add(randomDate);
    }

    return Array.from(uniqueDates);
  };

  const uniqueDates = generateUniqueDates(count);

  return Array.from({ length: count }, (_, index) => {
    const title = getRandomLorem(Math.floor(Math.random() * 5) + 5); // Always non-null
    const description = getRandomLorem(title.split(" ").length * 10); // Always non-null
    return {
      _id: generateRandomId(), // MongoDB ObjectId style
      title,
      description,
      content_tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        loremWords[Math.floor(Math.random() * loremWords.length)]
      ), // Always an array of strings
      cover_images: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) =>
        `https://picsum.photos/300/200?random=${index}-${i}`
      ), // Array of URLs for cover images
      embedded_images: Math.random() > 0.5
        ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) =>
            `https://picsum.photos/400/300?random=${index}-embed-${i}`
          )
        : [], // Array of URLs for embedded images, optional
      link_url: "#", // Always a placeholder link
      view_count: Math.floor(Math.random() * 1000), // Always a number
      is_active: Math.random() > 0.5, // Boolean value
      content_type: Math.random() > 0.5 ? "news" : "article",
      created_at: uniqueDates[index],
      updated_at: uniqueDates[index],
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
