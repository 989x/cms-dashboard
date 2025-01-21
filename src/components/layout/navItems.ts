import { FiPlusCircle, FiGlobe, FiShare2, FiFileText, FiBook, FiImage, FiSettings, FiTag, } from 'react-icons/fi';

export const navItems = [
  {
    category: 'Promotion',
    items: [
      {
        href: '/promotions/add',
        label: 'Add Promotion',
        icon: FiPlusCircle,
        description: 'Create new promotions for the landing page',
      },
      {
        href: '/promotion',
        label: 'Manage Promotion',
        icon: FiTag,
        description: 'View and update existing promotions on the landing page',
      },
    ],
  },
  {
    category: 'Listing',
    items: [
      {
        href: '/business/add',
        label: 'Create Listing',
        icon: FiPlusCircle,
        description: 'Add a new business listing to the platform',
      },
      {
        href: '/business/general',
        label: 'Manage Business',
        icon: FiGlobe,
        description: 'View and manage general business listings',
      },
      {
        href: '/business/franchise',
        label: 'Manage Franchise',
        icon: FiShare2,
        description: 'Manage and update franchise-related listings',
      },
    ],
  },
  {
    category: 'Content',
    items: [
      {
        href: '/content/add',
        label: 'Add Content',
        icon: FiPlusCircle,
        description: 'Add new content such as articles or news posts',
      },
      {
        href: '/content',
        label: 'Manage Contents',
        icon: FiFileText,
        description: 'Oversee and edit news content posted on the platform',
      },
    ],
  },
  {
    category: 'System',
    items: [
      {
        href: '/content/images',
        label: 'Manage Image',
        icon: FiImage,
        description: 'Organize and manage image resources for the platform',
      },
      {
        href: '/',
        label: 'Redis Cache',
        icon: FiSettings,
        description: 'Access and modify system-wide settings',
      },
    ],
  },
];
