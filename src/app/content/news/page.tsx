"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentItem } from "@/types/shared.types";
import ContentCard from "@/components/cards/ContentCard";
import SearchSection from "@/components/SearchSection";
import { mockContentNews } from "@/api/content";
import { hasAuthToken } from "@/utils/authStorage";
import { sortItems } from "@/utils/sortItems";

export default function NewsPage() {
  const router = useRouter();

  // State for news articles and filtered data
  const [newsArticles, setNewsArticles] = useState<ContentItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("Related");

  // Authentication and Data Fetching
  useEffect(() => {
    if (!hasAuthToken()) {
      router.replace("/login");
      return;
    }

    // Set news articles data immediately
    setNewsArticles(mockContentNews);
    setFilteredNews(mockContentNews);
    setIsLoading(false);
  }, [router]);

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = newsArticles.filter((news) =>
      news.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  // Handle sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedNews = sortItems(filteredNews, sortBy, { default: "title" });
    setFilteredNews(sortedNews);
  };

  // Filter Placeholder
  const handleFilter = () => {
    console.log("Filter clicked: Future implementation!");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading news articles...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Manage News Content</h1>

      {/* Search, Sort, and Filter */}
      <SearchSection
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredNews.length}
        onSortChange={handleSortChange}
      />

      {/* News List */}
      <div className="grid gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <ContentCard key={news._id} {...news} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No news articles available.</p>
        )}
      </div>
    </div>
  );
}
