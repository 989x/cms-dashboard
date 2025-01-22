// cms-dashboard/src/types/shared.types.ts

export interface ContentItem {
  _id: string; // MongoDB unique identifier
  public_id: string; // Unique public identifier
  admin_notice: string; // Notice for admin
  is_active: boolean;
  slug_url: string; // SEO-friendly URL
  redirect_url: string;
  cover_images: string[]; 
  content_type: 'news' | 'article' | 'promotion';
  content_tags: string[];
  title: string;
  description: string;
  view_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
