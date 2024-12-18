export interface ContentItem {
  id: string;
  title: string | null;
  date: string | null; // ISO 8601 format, but can be null
  tags: string[] | null;
  description: string | null;
  image: string | null;
  link: string | null;
  views: number | null; // Allow null for view count
  status: 'visible' | 'hidden';
  type: 'news' | 'article';
}

export interface BusinessItem {
  id: string;
  title: string;
  image: string;
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  date: string;
  description: string;
  link: string;
  views: number;
  status: 'visible' | 'hidden';
  type: 'general' | 'franchise';
  branches: number;
}

export interface PromotionItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  views: number;
  status: "visible" | "hidden";
  isActive: boolean;
  activeFrom: string;
  activeUntil: string;
}
