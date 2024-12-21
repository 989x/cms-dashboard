"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentItem } from "@/types/shared.types";
import ContentCard from "@/components/cards/ContentCard";
import SearchSection from "@/components/search/SearchSection";
import { mockContents } from "@/api/content";
import { hasAuthToken } from "@/utils/authStorage";
import { sortItems } from "@/utils/sortItems";

export default function Home() {
  const router = useRouter();

  // State for contents and filtered data
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("Related");

  // Authentication and Data Fetching
  useEffect(() => {
    if (!hasAuthToken()) {
      router.replace("/login");
      return;
    }

    // Set contents data immediately
    setContents(mockContents);
    setFilteredContents(mockContents);
    setIsLoading(false);
  }, [router]);

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = contents.filter((content) =>
      content.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContents(filtered);
  };

  // Handle sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedContents = sortItems(filteredContents, sortBy, { default: "title" });
    setFilteredContents(sortedContents);
  };

  // Filter Placeholder
  const handleFilter = () => {
    console.log("Filter clicked: Future implementation!");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading content...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Manage All Content</h1>

      {/* Search, Sort, and Filter */}
      <SearchSection
        onSearch={handleSearch}
        resultCount={filteredContents.length}
        onSortChange={handleSortChange}
      />

      {/* Content List */}
      <div className="grid gap-6">
        {filteredContents.length > 0 ? (
          filteredContents.map((content) => (
            <ContentCard key={content._id} {...content} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No content available.</p>
        )}
      </div>
    </div>
  );
}
