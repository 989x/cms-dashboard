"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockContentNews } from "@/api/content";
import ContentCard from "@/components/cards/ContentCard";

const NewsPage = withListPage({
  title: "Manage News Content",
  fetchData: () => mockContentNews,
  renderCard: (news) => <ContentCard key={news._id} {...news} />,
});

export default NewsPage;
