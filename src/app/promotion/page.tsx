"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PromotionItem } from "@/types/shared.types";
import PromotionCard from "@/components/cards/PromotionCard";
import SearchSortBar from "@/components/SearchSortBar";
import { mockPromotions } from "@/api/promotion";

export default function PromotionPage() {
  const router = useRouter();

  // State for promotions and filtered data
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<PromotionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("Related");
  const [sortOrder, setSortOrder] = useState<string>("Ascending"); // Default sort order

  // Authentication and Data Fetching
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      router.replace("/login");
      return;
    }

    // Set promotions data immediately
    setPromotions(mockPromotions);
    setFilteredPromotions(mockPromotions);
    setIsLoading(false);
  }, [router]);

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = promotions.filter((promo) =>
      promo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPromotions(filtered);
  };

  // Handle sorting
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder); // Update the sort order based on user choice
    const sortedPromotions = [...filteredPromotions];

    if (sortBy === "Status") {
      // Sort by active status in the selected order
      sortedPromotions.sort((a, b) =>
        sortOrder === "Ascending"
          ? Number(a.is_active) - Number(b.is_active)
          : Number(b.is_active) - Number(a.is_active)
      );
    } else if (sortBy === "Views") {
      // Sort by views in the selected order
      sortedPromotions.sort((a, b) =>
        sortOrder === "Ascending" ? a.views - b.views : b.views - a.views
      );
    } else {
      // Default to "Related" (Sorting by title for example)
      sortedPromotions.sort((a, b) => a.title.localeCompare(b.title)); // Example for "Related"
    }

    setFilteredPromotions(sortedPromotions);
  };

  // Filter Placeholder
  const handleFilter = () => {
    console.log("Filter clicked: Future implementation!");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading promotions...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Manage Promotions</h1>

      {/* Search, Sort, and Filter */}
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredPromotions.length}
        onSortChange={handleSortChange}
      />

      {/* Promotion List */}
      <div className="grid gap-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promotion) => (
            <PromotionCard key={promotion._id} {...promotion} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No promotions available.</p>
        )}
      </div>
    </div>
  );
}
