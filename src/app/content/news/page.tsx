"use client";

import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";

import { useEffect, useState } from "react";
import { mockContentNews } from "@/api/content";
import SearchSortBar from "@/components/SearchSortBar";
import ContentCard from "@/components/cards/ContentCard";

export default function NewsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, [router]);

  const [newsArticles, setNewsArticles] = useState(mockContentNews);
  const [filteredNews, setFilteredNews] = useState(mockContentNews);
  const [sortBy, setSortBy] = useState("Related"); // Default sorting by 'Related'
  const [sortOrder, setSortOrder] = useState("Ascending"); // Default sort order

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = newsArticles.filter((news) =>
      news.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder); // Update the sort order
    const sortedNews = [...filteredNews];

    if (sortBy === "Status") {
      sortedNews.sort((a, b) =>
        sortOrder === "Ascending"
          ? Number(a.is_active) - Number(b.is_active)
          : Number(b.is_active) - Number(a.is_active)
      );
    } else if (sortBy === "Views") {
      sortedNews.sort((a, b) =>
        sortOrder === "Ascending" ? a.views - b.views : b.views - a.views
      );
    } else {
      // Default to "Related" (Sorting by title for example)
      sortedNews.sort((a, b) => a.title.localeCompare(b.title)); // Example for "Related"
    }

    setFilteredNews(sortedNews);
  };

  // Filter Placeholder
  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage News Content
      </h1>

      {/* Search, Sort, and Filter */}
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredNews.length}
        onSortChange={handleSortChange}
      />

      {/* News List */}
      <div className="grid gap-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <ContentCard
              key={news._id}
              _id={news._id}
              title={news.title}
              image_url={news.image_url}
              tags={news.tags}
              created_at={news.created_at}
              updated_at={news.updated_at}
              description={news.description}
              link_url={news.link_url}
              views={news.views}
              is_active={news.is_active}
              content_type={news.content_type}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No news articles available.</p>
        )}
      </div>
    </div>
  );
}
