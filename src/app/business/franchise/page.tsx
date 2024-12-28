// cms-dashboard/src/app/business/franchise/page.tsx

"use client";

import { withListPage } from "@/hoc/withListPage";
import { fetchFranchiseBusinesses } from "@/api/business";
import BusinessCard from "@/components/cards/BusinessCard";

const FranchiseBusinessPage = withListPage({
  title: "Manage Franchise Businesses",
  fetchData: fetchFranchiseBusinesses,
  renderCard: (business) => <BusinessCard key={business._id} {...business} />,
});

export default FranchiseBusinessPage;
