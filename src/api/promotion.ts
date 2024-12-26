import { PromotionItem } from "@/types/shared.types";

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
    const active_from = randomDate(new Date("2024-06-01"), new Date("2024-06-20"));
    const active_until = randomDate(new Date(active_from), new Date("2024-07-01"));

    promotions.push({
      _id: `promo_${i + 1}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)], // Random description
      image_url: `https://picsum.photos/seed/promo${i}/600/400`, // Generate random image
      link_url: links[Math.floor(Math.random() * links.length)],
      view_count: Math.floor(Math.random() * 1000), // Random view_count (0-999)
      is_active: Math.random() > 0.5, // Boolean value
      active_from,
      active_until,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  return promotions;
};

// Mock promotions export
export const mockPromotions = generateRandomPromotions(6);
