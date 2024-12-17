export interface PromotionItem {
  _id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
  activeFrom: string;
  activeUntil: string;
}
