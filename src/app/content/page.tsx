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

  const [contents, setContents] = useState(mockContents);
  const [filteredNews, setFilteredNews] = useState(mockContents);
  const [sortBy, setSortBy] = useState("Related"); // Default sorting by 'Related'
  const [sortOrder, setSortOrder] = useState("Ascending"); // Default sort order

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = contents.filter((content) =>
      content.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder); // Update the sorting order
    const sortedContents = [...filteredNews];

    if (sortBy === "Status") {
      sortedContents.sort((a, b) =>
        sortOrder === "Ascending"
          ? Number(a.is_active) - Number(b.is_active)
          : Number(b.is_active) - Number(a.is_active)
      );
    } else if (sortBy === "Views") {
      sortedContents.sort((a, b) =>
        sortOrder === "Ascending" ? a.views - b.views : b.views - a.views
      );
    } else {
      // Default to "Related" (Sorting by title for example)
      sortedContents.sort((a, b) => a.title.localeCompare(b.title)); // Example for "Related"
    }

    setFilteredNews(sortedContents);
  };

  // Filter Placeholder
  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage All Content
      </h1>

      {/* Search, Sort, and Filter */}
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredNews.length}
        onSortChange={handleSortChange}
      />

      {/* Content List */}
      <div className="grid gap-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((content) => (
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
          ))
        ) : (
          <p className="text-gray-500 text-center">No content available.</p>
        )}
      </div>
    </div>
  );
}
