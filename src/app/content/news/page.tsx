// cms-dashboard/src/app/content/news/page.tsx

"use client";

import { withListPage } from "@/hoc/withListPage";
import { fetchContentNews } from "@/api/content";
import ContentCard from "@/components/cards/ContentCard";

const NewsPage = withListPage({
  title: "Manage News Content",
  fetchData: fetchContentNews,
  renderCard: (news) => <ContentCard key={news._id} {...news} />,
});

export default NewsPage;
