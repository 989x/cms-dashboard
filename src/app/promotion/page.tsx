"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockPromotions } from "@/api/promotion";
import PromotionCard from "@/components/cards/PromotionCard";

const PromotionPage = withListPage({
  title: "Manage Promotions",
  fetchData: () => mockPromotions,
  renderCard: (promotion) => <PromotionCard key={promotion._id} {...promotion} />,
});

export default PromotionPage;
