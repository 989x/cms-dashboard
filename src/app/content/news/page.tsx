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

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = newsArticles.filter((news) =>
      news.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedNews = [...filteredNews];

    if (sortBy === "Status: Inactive") {
      // Sort by inactive first
      sortedNews.sort((a, b) => Number(a.is_active) - Number(b.is_active));
    } else if (sortBy === "Status: Active") {
      // Sort by active first
      sortedNews.sort((a, b) => Number(b.is_active) - Number(a.is_active));
    } else if (sortBy === "Views: Ascending") {
      // Sort by views in ascending order
      sortedNews.sort((a, b) => a.views - b.views);
    } else if (sortBy === "Views: Descending") {
      // Sort by views in descending order
      sortedNews.sort((a, b) => b.views - a.views);
    } else {
      // Default to "Related" (e.g., alphabetical sort by title)
      sortedNews.sort((a, b) => a.title.localeCompare(b.title));
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
