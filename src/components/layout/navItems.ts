import {
  FiInbox,
  FiPlusCircle,
  FiGlobe,
  FiShare2,
  FiFileText,
  FiBook,
  FiImage,
  FiSettings,
} from "react-icons/fi";

export const navItems = [
  {
    category: "Message",
    items: [
      {
        href: "/forms/franchise",
        label: "Franchise Forms",
        icon: FiInbox,
        description: "Manage and access all franchise-related forms efficiently.",
      },
      {
        href: "/forms/business",
        label: "Business Forms",
        icon: FiInbox,
        description: "Handle business-related forms and documents seamlessly.",
      },
    ],
  },
  {
    category: "Listing",
    items: [
      {
        href: "/business/add",
        label: "Create Listing",
        icon: FiPlusCircle,
        description: "Add a new business listing to the platform.",
      },
      {
        href: "/business/general",
        label: "Manage Business",
        icon: FiGlobe,
        description: "View and manage general business listings.",
      },
      {
        href: "/business/franchise",
        label: "Manage Franchise",
        icon: FiShare2,
        description: "Manage and update franchise-related listings.",
      },
    ],
  },
  {
    category: "Content",
    items: [
      {
        href: "/content/add",
        label: "Add Content",
        icon: FiPlusCircle,
        description: "Add new content such as articles or news posts.",
      },
      {
        href: "/content",
        label: "Manage News",
        icon: FiFileText,
        description: "Oversee and edit news content posted on the platform.",
      },
      {
        href: "/content",
        label: "Manage Article",
        icon: FiBook,
        description: "Handle and update articles published on the site.",
      },
    ],
  },
  {
    category: "System",
    items: [
      {
        href: "/content/images",
        label: "Manage Image",
        icon: FiImage,
        description: "Organize and manage image resources for the platform.",
      },
      {
        href: "/",
        label: "Setting",
        icon: FiSettings,
        description: "Access and modify system-wide settings.",
      },
    ],
  },
];
