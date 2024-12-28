// cms-dashboard/src/api/business.ts

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

export const fetchAllBusinesses = () =>
  fetchData("/api/v1/businesses");

export const fetchGeneralBusinesses = () =>
  fetchData("/api/v1/businesses/search/general");

export const fetchFranchiseBusinesses = () =>
  fetchData("/api/v1/businesses/search/franchise");  
