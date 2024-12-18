"use client";

import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";

import { useEffect, useState } from "react";
import { mockContents } from "@/api/content";
import SearchSortBar from "@/components/SearchSortBar";
import ContentCard from "@/components/cards/ContentCard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, [router]);

  const [filteredNews, setFilteredNews] = useState(mockContents);

  const handleSearch = (query: string) => {
    const results = mockContents.filter((content) =>
      content.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(results);
  };

  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage All Content
      </h1>
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredNews.length}
      />
      <div className="grid gap-4">
        {filteredNews.map((content) => (
          <ContentCard
            key={content._id}
            _id={content._id}
            title={content.title}
            image_url={content.image_url}
            tags={content.tags}
            created_at={content.created_at}
            updated_at={content.updated_at}
            description={content.description}
            link_url={content.link_url}
            views={content.views}
            is_active={content.is_active}
            content_type={content.content_type}
          />
        ))}
      </div>
    </div>
  );
}
