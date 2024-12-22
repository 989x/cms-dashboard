"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockBusiness } from "@/api/business";
import BusinessCard from "@/components/cards/BusinessCard";

const BusinessPage = withListPage({
  title: "Manage All Business Listings",
  fetchData: () => mockBusiness,
  renderCard: (business) => <BusinessCard key={business._id} {...business} />,
});

export default BusinessPage;
