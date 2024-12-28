// cms-dashboard/src/api/content.ts

import { ContentItem } from "@/types/shared.types";

const BASE_URL = "http://128.199.202.159:8080";

const fetchData = async <T>(endpoint: string): Promise<T> => {
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

export const fetchAllContents = (): Promise<ContentItem[]> =>
  fetchData<ContentItem[]>("/api/v1/contents");

export const fetchContentArticles = (): Promise<ContentItem[]> =>
  fetchData<ContentItem[]>("/api/v1/contents/search/article");

export const fetchContentNews = (): Promise<ContentItem[]> =>
  fetchData<ContentItem[]>("/api/v1/contents/search/news");
