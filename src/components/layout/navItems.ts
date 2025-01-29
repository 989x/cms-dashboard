// cms-dashboard/src/components/layout/navItems.ts

import { FiPlusCircle, FiGlobe, FiFileText, FiImage, FiDatabase, FiEdit } from 'react-icons/fi';

export const navItems = [
  {
    category: 'Business',
    items: [
      {
        href: '/business/add',
        label: 'Create Business',
        icon: FiPlusCircle,
        description: 'Easily add a new business listing to expand your platform.',
      },
      {
        href: '/business/general',
        label: 'Business Listings',
        icon: FiGlobe,
        description: 'View, manage, and organize all business listings in one place.',
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
        description: 'Create and publish new content such as articles or news posts.',
      },
      {
        href: '/content',
        label: 'Content Listings',
        icon: FiFileText,
        description: 'Browse and manage all posted content efficiently.',
      },
    ],
  },
  {
    category: 'System',
    items: [
      {
        href: '/content/images',
        label: 'Manage Images',
        icon: FiImage,
        description: 'Organize and handle image resources across the platform.',
      },
      {
        href: '/',
        label: 'Redis Cache',
        icon: FiDatabase,
        description: 'Monitor and configure system-wide Redis cache settings.',
      },
    ],
  },
];
