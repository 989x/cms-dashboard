// cms-dashboard/src/api/content.ts

import { ContentItem } from '@/types/shared.types';

const BASE_URL = 'http://128.199.202.159:8080';

const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  const result = await response.json();
  return result.data;
};

const sendPostRequest = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post data to ${endpoint}`);
  }

  const result = await response.json();
  return result.data;
};

export const fetchAllContents = (): Promise<ContentItem[]> =>
  fetchData<ContentItem[]>('/api/v1/contents/search');

export const fetchContentByType = (type: string): Promise<ContentItem[]> =>
  fetchData<ContentItem[]>(`/api/v1/contents/search?type=${type}`);

export const fetchContentById = (id: string): Promise<ContentItem> =>
  fetchData<ContentItem>(`/api/v1/contents/_id/${id}`);

export const createContent = (content: Partial<ContentItem>): Promise<ContentItem> =>
  sendPostRequest<ContentItem>('/api/v1/contents', content);
