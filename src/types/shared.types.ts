// cms-dashboard/src/types/shared.types.ts

export interface ContentItem {
  _id: string; // MongoDB unique identifier
  public_id: string; // Unique public identifier
  is_active: boolean; // Status of the content item
  slug_url: string; // SEO-friendly URL
  redirect_url: string; // URL for redirection
  cover_images: string[]; // Array of URLs for cover images
  content_type: 'news' | 'article'; // Allowed values: "news" | "article"
  content_tags: string[]; // Tags related to the content item
  title: string; // Title of the content item
  description: string; // Description of the content item
  view_count: number; // View count of the content item
  created_at: string; // ISO timestamp for content creation
  updated_at: string; // ISO timestamp for content update
}
