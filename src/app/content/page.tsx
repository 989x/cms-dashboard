"use client";

import { useRouter } from 'next/navigation';
import { hasAuthToken } from '@/utils/authStorage';

import { useEffect, useState } from 'react';
import { mockNews } from '@/api/news';
import SearchAndFilterBar from '@/components/SearchAndFilter';
import NewsCard from '@/components/NewsCard';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push('/login');
    }
  }, []);
  
  const [filteredNews, setFilteredNews] = useState(mockNews);

  const handleSearch = (query: string) => {
    const results = mockNews.filter((news) =>
      news.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(results);
  };

  const handleFilter = () => {
    alert('Filter button clicked');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage News Content
      </h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <p className="text-gray-600 text-sm font-medium mt-4 mb-8">
        Found {filteredNews.length} results
      </p>
      <div className="grid gap-8">
        {filteredNews.map((news) => (
          <NewsCard
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
