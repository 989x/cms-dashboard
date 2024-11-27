"use client"

import { useState } from 'react';
import { mockNews } from '@/api/news';
import SearchAndFilterBar from '@/components/SearchAndFilter';
import NewsCard from '@/components/NewsCard';

export default function Home() {
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
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
        Explore the Latest News
      </h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <p className="text-gray-600 font-medium mt-4 mb-8">
        Found {filteredNews.length} results.
      </p>
      <div className="grid gap-10">
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
          />
        ))}
      </div>
    </div>
  );
}
