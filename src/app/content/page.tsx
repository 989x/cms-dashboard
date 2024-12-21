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
  const [filteredContents, setFilteredContents] = useState(mockContents);
  const [sortBy, setSortBy] = useState("Related"); // Default sorting by 'Related'

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = contents.filter((content) =>
      content.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContents(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedContents = [...filteredContents];

    if (sortBy === "Status: Inactive") {
      // Sort by inactive first
      sortedContents.sort((a, b) => Number(a.is_active) - Number(b.is_active));
    } else if (sortBy === "Status: Active") {
      // Sort by active first
      sortedContents.sort((a, b) => Number(b.is_active) - Number(a.is_active));
    } else if (sortBy === "Views: Ascending") {
      // Sort by views in ascending order
      sortedContents.sort((a, b) => a.views - b.views);
    } else if (sortBy === "Views: Descending") {
      // Sort by views in descending order
      sortedContents.sort((a, b) => b.views - a.views);
    } else {
      // Default to "Related" (e.g., alphabetical sort by title)
      sortedContents.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredContents(sortedContents);
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
        resultCount={filteredContents.length}
        onSortChange={handleSortChange}
      />

      {/* Content List */}
      <div className="grid gap-4">
        {filteredContents.length > 0 ? (
          filteredContents.map((content) => (
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
