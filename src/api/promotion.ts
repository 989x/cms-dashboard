// cms-dashboard/src/api/promotion.ts

import { PromotionItem } from "@/types/shared.types";

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

export const fetchPromotions = (): Promise<PromotionItem[]> =>
  fetchData<PromotionItem[]>("/api/v1/promotions");
