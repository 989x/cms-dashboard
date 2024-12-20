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

  return Array.from({ length: count }, () => {
    return {
      _id: generateRandomId(),
      title: getRandomBusinessName(),
      description: getRandomDescription(),
      images: generateRandomImages(),
      contacts: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
        name: getRandomName(),
        phone: generateRandomPhoneNumber(),
        email: getRandomEmail(),
      })),
      link_url: getRandomLink(),
      views: Math.floor(Math.random() * 1000),
      business_type: Math.random() > 0.5 ? "general" : "franchise",
      branches: Math.floor(Math.random() * 20) + 1,
      is_active: Math.random() > 0.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
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
