import { BusinessItem } from "@/types";

export const generateRandomBusiness = (count: number): BusinessItem[] => {
  const businessNames = [
    "FreshMart", "TechSavvy", "HomeStyle Bakery", "GreenLife Store",
    "AutoCare Center", "TravelEasy Agency", "BrightFuture Academy",
    "UrbanFitness Gym", "Cloud9 Coffee", "EcoFriendly Supplies"
  ];
  const descriptions = [
    "Providing top-notch services and products for our customers.",
    "A trusted name in the industry with years of experience.",
    "Delivering quality and value to our clients every day.",
    "A family-run business committed to excellence.",
    "Your go-to place for all your needs.",
    "Innovating for a better future.",
    "Dedicated to creating a memorable experience.",
    "The best choice for quality and service.",
    "Trusted by thousands of happy customers.",
    "Leading the way in sustainable business practices."
  ];
  const names = ["John", "Jane", "Alice", "Bob", "Chris", "Sophia", "Michael", "Emma"];
  const emails = [
    "info@example.com", "contact@example.com", "support@example.com",
    "hello@example.com", "sales@example.com"
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
    Array.from({ length: 6 }, () =>
      "abcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 36))
    ).join("");

  return Array.from({ length: count }, () => {
    const title = getRandomBusinessName();
    const description = `${title}: ${getRandomDescription()}`;
    return {
      id: generateRandomId(),
      title,
      date: new Date().toISOString(),
      contacts: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
        name: getRandomName(),
        phone: generateRandomPhoneNumber(),
        email: getRandomEmail(),
      })),
      description,
      image: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + 1}`,
      link: "#",
      views: Math.floor(Math.random() * 1000),
      status: Math.random() > 0.5 ? "visible" : "hidden",
      type: Math.random() > 0.5 ? "general" : "franchise",
      branches: Math.floor(Math.random() * 20) + 1, 
    };
  });
};

export const mockBusiness = generateRandomBusiness(20);

// Generate mock data for general businesses
export const mockGeneralBusiness = generateRandomBusiness(10).filter(
  (business) => business.type === "general"
);

// Generate mock data for franchise businesses
export const mockFranchiseBusiness = generateRandomBusiness(10).filter(
  (business) => business.type === "franchise"
);
