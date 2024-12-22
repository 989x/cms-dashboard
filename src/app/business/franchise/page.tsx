"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockFranchiseBusiness } from "@/api/business";
import BusinessCard from "@/components/cards/BusinessCard";

const FranchiseBusinessPage = withListPage({
  title: "Manage Franchise Businesses",
  fetchData: () => mockFranchiseBusiness,
  renderCard: (business) => <BusinessCard key={business._id} {...business} />,
});

export default FranchiseBusinessPage;
