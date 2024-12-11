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

export interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  status: "visible" | "hidden";
  contentType: "news" | "article";
  title: string;
  description: string;
  tags: string[] | null;
  onSave: (data: {
    title: string;
    description: string;
    tags: string[];
    status: "visible" | "hidden";
    contentType: "news" | "article";
  }) => void;
}
