// cms-dashboard/src/api/content.ts

const BASE_URL = "http://128.199.202.159:8080";

const fetchData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  const result = await response.json();
  return result.data;
};

export const fetchAllContents = () =>
  fetchData("/api/v1/contents");

export const fetchContentArticles = () =>
  fetchData("/api/v1/contents/search/article");

export const fetchContentNews = () =>
  fetchData("/api/v1/contents/search/news");
