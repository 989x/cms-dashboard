"use client";

import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";

import { useEffect, useState } from "react";
import { mockContentArticles } from "@/api/content";
import SearchSortBar from "@/components/SearchSortBar";
import ContentCard from "@/components/cards/ContentCard";

export default function ArticlePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, [router]);

  const [articles, setArticles] = useState(mockContentArticles);
  const [filteredArticles, setFilteredArticles] = useState(mockContentArticles);
  const [sortBy, setSortBy] = useState("Related"); // Default sorting by 'Related'

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedArticles = [...filteredArticles];

    if (sortBy === "Status: Inactive") {
      // Sort by inactive first
      sortedArticles.sort((a, b) => Number(a.is_active) - Number(b.is_active));
    } else if (sortBy === "Status: Active") {
      // Sort by active first
      sortedArticles.sort((a, b) => Number(b.is_active) - Number(a.is_active));
    } else if (sortBy === "Views: Ascending") {
      // Sort by views in ascending order
      sortedArticles.sort((a, b) => a.views - b.views);
    } else if (sortBy === "Views: Descending") {
      // Sort by views in descending order
      sortedArticles.sort((a, b) => b.views - a.views);
    } else {
      // Default to "Related" (e.g., alphabetical sort by title)
      sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredArticles(sortedArticles);
  };

  // Filter Placeholder
  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage Article Content
      </h1>

      {/* Search, Sort, and Filter */}
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredArticles.length}
        onSortChange={handleSortChange}
      />

      {/* Article List */}
      <div className="grid gap-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ContentCard
              key={article._id}
              _id={article._id}
              title={article.title}
              image_url={article.image_url}
              tags={article.tags}
              created_at={article.created_at}
              updated_at={article.updated_at}
              description={article.description}
              link_url={article.link_url}
              views={article.views}
              is_active={article.is_active}
              content_type={article.content_type}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No articles available.</p>
        )}
      </div>
    </div>
  );
}
