// cms-dashboard/src/app/businesses/page.tsx

'use client';

import { withListPage } from '@/hoc/withListPage';
import { fetchAllBusinesses } from '@/api/business';
import BusinessCard from '@/components/cards/BusinessCard';

const BusinessPage = withListPage({
  title: 'Manage All Business Listings',
  fetchData: fetchAllBusinesses,
  renderCard: (business) => <BusinessCard key={business._id} {...business} />,
});

export default BusinessPage;
