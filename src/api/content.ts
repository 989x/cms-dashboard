// cms-dashboard/src/api/content.ts

import { ContentItem } from '@/types/shared.types';

const BASE_URL = 'http://128.199.202.159:8080';

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

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

const sendData = async <T>(endpoint: string, data: any): Promise<T> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = `Failed to post data to ${endpoint}`;
    try {
      const errorResponse = await response.json();
      if (errorResponse && errorResponse.message) {
        errorMessage = errorResponse.message;
      }
    } catch {
      errorMessage = `${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
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
  sendData<ContentItem>('/api/v1/contents', content);
