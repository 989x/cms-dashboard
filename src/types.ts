export interface NewsItem {
  id: any;
  title: string | null;
  date: string | null; // ISO 8601 format, but can be null
  tags: string[] | null;
  description: string | null;
  image: string | null;
  link: string | null;
  views: number | null; // Allow null for view count
}
