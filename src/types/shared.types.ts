export interface FranchiseForm {
  _id: string; // MongoDB unique identifier, e.g., "60f7b5a2c2a4d12345abc678"
  full_name: string;
  email: string;
  phone_number: string;
  line_or_whatsapp_id: string;
  company_or_store_name: string;
  brand_contract_type: string;
  branch_count: number;
  additional_details: string;
  created_at: Date; // ISO timestamp, e.g., "2024-06-19T12:00:00Z"
  updated_at: Date; // ISO timestamp, e.g., "2024-06-19T12:00:00Z"
  is_active: boolean;
}

export interface ContentItem {
  _id: string; // MongoDB unique identifier, e.g., "60f7b5a2c2a4d12345abc678"
  title: string | null;
  date: string | null; // ISO timestamp, e.g., "2024-06-19T12:00:00Z"
  tags: string[] | null;
  description: string | null;
  image: string | null;
  link: string | null;
  views: number | null;
  status: 'visible' | 'hidden';
  type: 'news' | 'article';
}

export interface BusinessItem {
  _id: string; // MongoDB unique identifier, e.g., "60f7b5a2c2a4d12345abc678"
  title: string;
  image: string;
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  date: string; // ISO timestamp, e.g., "2024-06-19T12:00:00Z"
  description: string;
  link: string;
  views: number;
  status: 'visible' | 'hidden';
  type: 'general' | 'franchise';
  branches: number;
}

export interface PromotionItem {
  _id: string; // MongoDB unique identifier, e.g., "60f7b5a2c2a4d12345abc678"
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  views: number;
  status: 'visible' | 'hidden';
  is_active: boolean;
  active_from: string; // ISO timestamp, e.g., "2024-06-19T12:00:00Z"
  active_until: string; // ISO timestamp, e.g., "2024-06-30T12:00:00Z"
}
