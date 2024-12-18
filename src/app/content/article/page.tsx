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
  const [sortOrder, setSortOrder] = useState("Ascending"); // Default sort order

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder); // Update the sort order
    const sortedArticles = [...filteredArticles];

    if (sortBy === "Status") {
      sortedArticles.sort((a, b) =>
        sortOrder === "Ascending"
          ? Number(a.is_active) - Number(b.is_active)
          : Number(b.is_active) - Number(a.is_active)
      );
    } else if (sortBy === "Views") {
      sortedArticles.sort((a, b) =>
        sortOrder === "Ascending" ? a.views - b.views : b.views - a.views
      );
    } else {
      // Default to "Related" (Sorting by title for example)
      sortedArticles.sort((a, b) => a.title.localeCompare(b.title)); // Example for "Related"
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
