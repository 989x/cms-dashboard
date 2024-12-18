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

  const [filteredArticles, setFilteredArticles] = useState(mockContentArticles);

  const handleSearch = (query: string) => {
    const results = mockContentArticles.filter((article) =>
      article.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(results);
  };

  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage Article Content
      </h1>
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredArticles.length}
      />
      <div className="grid gap-4">
        {filteredArticles.map((article) => (
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
        ))}
      </div>
    </div>
  );
}
