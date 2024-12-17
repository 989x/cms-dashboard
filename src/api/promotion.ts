import { PromotionItem } from "@/types/promotionTypes";

// Mock data for random promotions
const titles = [
  "Big Sale 50% Off",
  "End of Season Clearance",
  "Buy 1 Get 1 Free",
  "Limited Time Offer",
  "Special New Year Sale",
  "Exclusive Online Discount",
];

const links = [
  "https://example.com/sale",
  "https://example.com/clearance",
  "https://example.com/offer",
  "https://example.com/discount",
];

// Function to generate random date within range
const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Function to generate random promotions
export const generateRandomPromotions = (count: number): PromotionItem[] => {
  const promotions: PromotionItem[] = [];
  for (let i = 0; i < count; i++) {
    const activeFrom = randomDate(new Date("2024-06-01"), new Date("2024-06-20"));
    const activeUntil = randomDate(new Date(activeFrom), new Date("2024-07-01"));

    promotions.push({
      _id: `promo_${i + 1}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      imageUrl: `https://picsum.photos/seed/promo${i}/600/400`, // Generate random image
      linkUrl: links[Math.floor(Math.random() * links.length)],
      isActive: Math.random() > 0.5, // Random true/false
      activeFrom,
      activeUntil,
    });
  }
  return promotions;
};

// Mock promotions export
export const mockPromotions = generateRandomPromotions(6);
