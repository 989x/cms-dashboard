// cms-dashboard/src/api/business.ts

import { BusinessItem } from "@/types/shared.types";

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

export const fetchAllBusinesses = (): Promise<BusinessItem[]> =>
  fetchData<BusinessItem[]>("/api/v1/businesses");

export const fetchGeneralBusinesses = (): Promise<BusinessItem[]> =>
  fetchData<BusinessItem[]>("/api/v1/businesses/search/general");

export const fetchFranchiseBusinesses = (): Promise<BusinessItem[]> =>
  fetchData<BusinessItem[]>("/api/v1/businesses/search/franchise");
