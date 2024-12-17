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

const descriptions = [
  "Don't miss this amazing sale!",
  "Hurry, limited stock available!",
  "Shop now and save big.",
  "Exclusive deals for a limited time.",
  "Great offers only this season.",
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
      description: descriptions[Math.floor(Math.random() * descriptions.length)], // Random description
      imageUrl: `https://picsum.photos/seed/promo${i}/600/400`, // Generate random image
      linkUrl: links[Math.floor(Math.random() * links.length)],
      views: Math.floor(Math.random() * 1000), // Random views (0-999)
      status: Math.random() > 0.5 ? "visible" : "hidden", // Random status: visible/hidden
      isActive: Math.random() > 0.5, // Random true/false
      activeFrom,
      activeUntil,
    });
  }
  return promotions;
};

// Mock promotions export
export const mockPromotions = generateRandomPromotions(6);
