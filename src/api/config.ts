export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

if (!API_BASE_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_API_BASE_URL is not defined");
}

// Extract the server IP from API_BASE_URL
export const SERVER_IP = API_BASE_URL.match(/\d+\.\d+\.\d+\.\d+/)?.[0] || "Unknown";
