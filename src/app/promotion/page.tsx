// cms-dashboard/src/app/promotion/page.tsx

'use client';

import { withListPage } from '@/hoc/withListPage';
import { fetchPromotions } from '@/api/promotion';
import PromotionCard from '@/components/cards/PromotionCard';

const PromotionPage = withListPage({
  title: 'Manage Promotions',
  fetchData: fetchPromotions,
  renderCard: (promotion) => <PromotionCard key={promotion._id} {...promotion} />
});

export default PromotionPage;
