"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockContents } from "@/api/content";
import ContentCard from "@/components/cards/ContentCard";

const ContentPage = withListPage({
  title: "Manage All Content",
  fetchData: () => mockContents,
  renderCard: (content) => <ContentCard key={content._id} {...content} />,
});

export default ContentPage;
