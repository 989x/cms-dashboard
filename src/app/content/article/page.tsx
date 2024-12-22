"use client";

import { withListPage } from "@/hoc/withListPage";
import { mockContentArticles } from "@/api/content";
import ContentCard from "@/components/cards/ContentCard";

const ArticlePage = withListPage({
  title: "Manage Article Content",
  fetchData: () => mockContentArticles,
  renderCard: (article) => <ContentCard key={article._id} {...article} />,
});

export default ArticlePage;
