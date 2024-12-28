// cms-dashboard/src/app/content/page.tsx

"use client";

import { withListPage } from "@/hoc/withListPage";
import { fetchAllContents } from "@/api/content";
import ContentCard from "@/components/cards/ContentCard";

const ContentPage = withListPage({
  title: "Manage All Content",
  fetchData: fetchAllContents,
  renderCard: (content) => <ContentCard key={content._id} {...content} />,
});

export default ContentPage;
