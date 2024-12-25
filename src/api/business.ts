import { BusinessItem } from "@/types/shared.types";

export const generateRandomBusiness = (count: number): BusinessItem[] => {
  const businessNames = [
    "FreshMart", "TechSavvy", "HomeStyle Bakery", "GreenLife Store",
    "AutoCare Center", "TravelEasy Agency", "BrightFuture Academy",
    "UrbanFitness Gym", "Cloud9 Coffee", "EcoFriendly Supplies",
  ];
  const descriptions = [
    "The best place for all your needs!",
    "Affordable and reliable services.",
    "Your trusted partner in success.",
    "We bring quality closer to you.",
    "Making your life easier, one step at a time.",
  ];
  const names = ["John", "Jane", "Alice", "Bob", "Chris", "Sophia", "Michael", "Emma"];
  const emails = [
    "info@example.com", "contact@example.com", "support@example.com",
    "hello@example.com", "sales@example.com",
  ];
  const links = [
    "https://example.com/business1",
    "https://example.com/business2",
    "https://example.com/business3",
  ];

  const getRandomName = () => names[Math.floor(Math.random() * names.length)];
  const getRandomEmail = () => emails[Math.floor(Math.random() * emails.length)];
  const getRandomBusinessName = () =>
    businessNames[Math.floor(Math.random() * businessNames.length)];
  const getRandomDescription = () =>
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const generateRandomPhoneNumber = () =>
    `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  const generateRandomId = () =>
    Array.from({ length: 24 }, () =>
      "abcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 36))
    ).join("");
  const getRandomLink = () => links[Math.floor(Math.random() * links.length)];
  const generateRandomImages = () =>
    Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, index) =>
      `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + index}`
    );

  const generateUniqueDates = (count: number): string[] => {
    const baseDate = new Date();
    const uniqueDates = new Set<string>();

    while (uniqueDates.size < count) {
      const randomOffset = Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000); // Random offset within a year
      const randomDate = new Date(baseDate.getTime() - randomOffset).toISOString();
      uniqueDates.add(randomDate);
    }

    return Array.from(uniqueDates);
  };

  const uniqueDates = generateUniqueDates(count);

  return Array.from({ length: count }, (_, index) => ({
    _id: generateRandomId(),
    is_active: Math.random() > 0.5,
    link_url: getRandomLink(),
    cover_images: generateRandomImages(),
    embedded_images: Math.random() > 0.5 ? generateRandomImages() : [],
    business_type: Math.random() > 0.5 ? "general" : "franchise",
    title: getRandomBusinessName(),
    description: getRandomDescription(),
    contacts: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      name: getRandomName(),
      phone: generateRandomPhoneNumber(),
      email: getRandomEmail(),
    })),
    views: Math.floor(Math.random() * 1000),
    branches: Math.floor(Math.random() * 20) + 1,
    created_at: uniqueDates[index],
    updated_at: uniqueDates[index],
  }));
};

// Generate mock data
export const mockBusiness = generateRandomBusiness(30);

// Generate mock data for general businesses
export const mockGeneralBusiness = mockBusiness.filter(
  (business) => business.business_type === "general"
);

// Generate mock data for franchise businesses
export const mockFranchiseBusiness = mockBusiness.filter(
  (business) => business.business_type === "franchise"
);
