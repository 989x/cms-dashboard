"use client";

import { useRouter } from 'next/navigation';
import { hasAuthToken } from '@/utils/authStorage';

import { useEffect, useState } from 'react';
import { mockContentNews } from '@/api/content';
import SearchAndFilterBar from '@/components/SearchAndFilter';
import ContentCard from '@/components/cards/ContentCard';

export default function NewsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push('/login');
    }
  }, [router]); // Add 'router' as a dependency
  
  const [filteredNews, setFilteredNews] = useState(mockContentNews);

  const handleSearch = (query: string) => {
    const results = mockContentNews.filter((news) =>
      news.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(results);
  };

  const handleFilter = () => {
    alert('Filter button clicked');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage News Content
      </h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <p className="text-gray-600 text-sm font-medium mt-4 mb-8">
        Found {filteredNews.length} results
      </p>
      <div className="grid gap-4">
        {filteredNews.map((news) => (
          <ContentCard
            key={news.id}
            id={news.id}
            title={news.title}
            image={news.image}
            tags={news.tags}
            date={news.date}
            description={news.description}
            link={news.link}
            views={news.views}
            status={news.status}
            type={news.type}
          />
        ))}
      </div>
    </div>
  );
}
