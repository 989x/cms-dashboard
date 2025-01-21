// cms-dashboard/src/app/business/general/page.tsx

'use client';

import { withListPage } from '@/hoc/withListPage';
import { fetchGeneralBusinesses } from '@/api/business';
import BusinessCard from '@/components/cards/BusinessCard';

const GeneralBusinessPage = withListPage({
  title: 'Manage General Businesses',
  fetchData: fetchGeneralBusinesses,
  renderCard: (business) => <BusinessCard key={business._id} {...business} />,
});

export default GeneralBusinessPage;
