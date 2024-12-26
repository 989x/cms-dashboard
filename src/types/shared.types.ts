export interface FranchiseForm {
  _id: string; // MongoDB unique identifier, e.g., "60f7b5a2c2a4d12345abc678"
  is_active: boolean;
  full_name: string;
  email: string;
  phone_number: string;
  line_or_whatsapp_id: string;
  company_or_store_name: string;
  brand_contract_type: string;
  branch_count: number;
  additional_details: string;
  created_at: Date; // ISO timestamp, e.g., "2024-06-19T12:00:00Z"
  updated_at: Date; // ISO timestamp
}

export interface ContentItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  link_url: string;
  cover_images: string[]; // Array of URLs for cover images (primary images)
  embedded_images?: string[]; // Array of URLs for additional embedded images (from HTML or other sources)
  content_type: "news" | "article";
  title: string;
  description: string;
  tags: string[];
  views: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface BusinessItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  link_url: string;
  cover_images: string[]; // Array of URLs for cover images (primary images)
  embedded_images?: string[]; // Array of URLs for additional embedded images (from HTML or other sources)
  business_nationality?: "Thai" | "Chinese" | "Japanese" | "American" | "European" | "Global";
  business_type: "general" | "franchise";
  title: string;
  description: string;
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  branches?: number;
  investment_start?: number;
  investment_end?: number;
  payback_period?: number;
  views: number;
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
  views: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
