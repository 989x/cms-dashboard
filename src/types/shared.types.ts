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
  content_type: "news" | "article";
  title: string;
  description: string;
  tags: string[];
  image_url: string;
  views: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface BusinessItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  link_url: string;
  business_type: "general" | "franchise";
  title: string;
  description: string;
  images: string[]; // Array of image URLs for multiple images
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  views: number;
  branches: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface PromotionItem {
  _id: string; // MongoDB unique identifier
  is_active: boolean;
  active_from: string; // ISO timestamp
  active_until: string; // ISO timestamp
  link_url: string;
  title: string;
  description: string;
  image_url: string;
  views: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
