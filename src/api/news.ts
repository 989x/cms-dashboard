import { NewsItem } from "@/types";

export const generateRandomNews = (count: number): NewsItem[] => {
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
    const description = getRandomLorem(title.split(" ").length * 2); // Description twice the length of title
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

export const mockNews: NewsItem[] = generateRandomNews(20);
