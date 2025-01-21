// shared.types.ts

export interface ContentItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  link_url: string;
  cover_images: string[]; // Array of URLs for cover images (primary images)
  embedded_images?: string[]; // Array of URLs for additional embedded images (from HTML or other sources)
  content_type: "news" | "article";
  categories?: ("others" | "food" | "medical" | "technology" | "education" | "entertainment")[];
  title: string;
  description: string;
  content_tags: string[];
  view_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface BusinessItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  link_url: string;
  cover_images: string[]; // Array of URLs for cover images (primary images)
  embedded_images?: string[]; // Array of URLs for additional embedded images (from HTML or other sources)
  business_nationality?: "thai" | "chinese" | "japanese" | "american" | "european" | "global";
  business_type: "general" | "franchise";
  categories?: ("others" | "food" | "medical" | "technology" | "education" | "entertainment")[];
  title: string;
  description: string;
  contacts: {
    email: string;
    name: string;
    phone: string;
    facebook?: string;
    line?: string;
    Website?: string;
  };
  investment_start?: number;
  investment_end?: number;
  payback_period?: number;
  branches?: number;
  service_area?: string;
  map_url?: string;
  special_deal?: {
    is_active: boolean;
    details: string;
    start_date?: string; // ISO timestamp
    end_date?: string; // ISO timestamp
  };
  view_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface PromotionItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  active_from: string; // ISO timestamp
  active_until: string; // ISO timestamp
  link_url: string;
  image_url: string; // Single image URL (Cover Image)
  title: string;
  description: string;
  view_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
