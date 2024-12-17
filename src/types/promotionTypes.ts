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
