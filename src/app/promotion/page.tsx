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
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedPromotions = [...filteredPromotions];

    if (sortBy === "Status") {
      sortedPromotions.sort((a, b) => Number(b.is_active) - Number(a.is_active));
    } else if (sortBy === "Views") {
      sortedPromotions.sort((a, b) => b.views - a.views);
    } else {
      // Default to "Related" (You can change this logic to match real "Related" sorting)
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
