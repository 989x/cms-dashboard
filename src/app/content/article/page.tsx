// cms-dashboard/src/app/content/article/page.tsx

'use client';

import { withListPage } from '@/hoc/withListPage';
import { fetchContentArticles } from '@/api/content';
import ContentCard from '@/components/cards/ContentCard';

const ArticlePage = withListPage({
  title: 'Manage Article Content',
  fetchData: fetchContentArticles,
  renderCard: (article) => <ContentCard key={article._id} {...article} />,
});

export default ArticlePage;
