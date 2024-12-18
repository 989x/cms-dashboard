"use client";

import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";

import { useEffect, useState } from "react";
import { mockContentNews } from "@/api/content";
import SearchAndFilterBar from "@/components/SearchAndFilter";
import ContentCard from "@/components/cards/ContentCard";

export default function NewsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, [router]);

  const [filteredNews, setFilteredNews] = useState(mockContentNews);

  const handleSearch = (query: string) => {
    // Update logic for handling search if needed (currently empty behavior)
    setFilteredNews(mockContentNews); // Resets to default data
  };

  const handleFilter = () => {
    alert("Filter button clicked");
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
        ))}
      </div>
    </div>
  );
}
