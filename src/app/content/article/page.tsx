"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentItem } from "@/types/shared.types";
import ContentCard from "@/components/cards/ContentCard";
import SearchSection from "@/components/SearchSection";
import { mockContentArticles } from "@/api/content";
import { hasAuthToken } from "@/utils/authStorage";
import { sortItems } from "@/utils/sortItems";

export default function ArticlePage() {
  const router = useRouter();

  // State for articles and filtered data
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("Related");

  // Authentication and Data Fetching
  useEffect(() => {
    if (!hasAuthToken()) {
      router.replace("/login");
      return;
    }

    // Set articles data immediately
    setArticles(mockContentArticles);
    setFilteredArticles(mockContentArticles);
    setIsLoading(false);
  }, [router]);

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  // Handle sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedArticles = sortItems(filteredArticles, sortBy, { default: "title" });
    setFilteredArticles(sortedArticles);
  };

  // Filter Placeholder
  const handleFilter = () => {
    console.log("Filter clicked: Future implementation!");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading articles...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Manage Article Content</h1>

      {/* Search, Sort, and Filter */}
      <SearchSection
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredArticles.length}
        onSortChange={handleSortChange}
      />

      {/* Article List */}
      <div className="grid gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ContentCard key={article._id} {...article} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No articles available.</p>
        )}
      </div>
    </div>
  );
}
