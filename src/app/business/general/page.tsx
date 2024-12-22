"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockGeneralBusiness } from "@/api/business";
import BusinessCard from "@/components/cards/BusinessCard";

const GeneralBusinessPage = withListPage({
  title: "Manage General Businesses",
  fetchData: () => mockGeneralBusiness,
  renderCard: (business) => <BusinessCard key={business._id} {...business} />,
});

export default GeneralBusinessPage;
