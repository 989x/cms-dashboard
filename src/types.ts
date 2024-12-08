export type BusinessItem = {
  id: string;
  title: string;
  date: string;
  contacts: {
    email: string; name: string; phone: string 
}[];
  description: string;
  image: string;
  link: string;
  views: number;
  status: "visible" | "hidden";
  type: "general" | "franchise";
};

export interface NewsItem {
  id: any;
  title: string | null;
  date: string | null; // ISO 8601 format, but can be null
  tags: string[] | null;
  description: string | null;
  image: string | null;
  link: string | null;
  views: number | null; // Allow null for view count
  status: "visible" | "hidden";
  type: "news" | "article";
}
