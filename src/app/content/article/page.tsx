"use client";

import { useRouter } from 'next/navigation';
import { hasAuthToken } from '@/utils/authStorage';

import { useEffect, useState } from 'react';
import { mockContentArticles } from '@/api/content';
import SearchAndFilterBar from '@/components/SearchAndFilter';
import ContentCard from '@/components/cards/ContentCard';

export default function ArticlePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push('/login');
    }
  }, [router]); // Add 'router' as a dependency
  
  const [filteredArticles, setFilteredArticles] = useState(mockContentArticles);

  const handleSearch = (query: string) => {
    const results = mockContentArticles.filter((article) =>
      article.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(results);
  };

  const handleFilter = () => {
    alert('Filter button clicked');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage Article Content
      </h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <p className="text-gray-600 text-sm font-medium mt-4 mb-8">
        Found {filteredArticles.length} results
      </p>
      <div className="grid gap-4">
        {filteredArticles.map((article) => (
          <ContentCard
            key={article._id}
            _id={article._id}
            title={article.title}
            image={article.image}
            tags={article.tags}
            date={article.date}
            description={article.description}
            link={article.link}
            views={article.views}
            status={article.status}
            type={article.type}
          />
        ))}
      </div>
    </div>
  );
}
