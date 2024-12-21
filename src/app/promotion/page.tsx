"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PromotionItem } from "@/types/shared.types";
import PromotionCard from "@/components/cards/PromotionCard";
import SearchSection from "@/components/search/SearchSection";
import { mockPromotions } from "@/api/promotion";
import { hasAuthToken } from "@/utils/authStorage";
import { sortItems } from "@/utils/sortItems";

export default function PromotionPage() {
  const router = useRouter();

  const [promotions] = useState<PromotionItem[]>(mockPromotions); // Static original data
  const [filteredPromotions, setFilteredPromotions] = useState<PromotionItem[]>(mockPromotions); // Filtered data state
  const [sortBy, setSortBy] = useState<string>("Related"); // Current sorting option

  // Authentication Check
  useEffect(() => {
    if (!hasAuthToken()) {
      router.replace("/login");
    }
  }, [router]);

  // Search Logic
  const handleSearch = (query: string) => {
    const filtered = promotions.filter((promo) =>
      promo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPromotions(filtered);
  };

  // Sort Logic
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sorted = sortItems(filteredPromotions, sortBy, { default: "title" });
    setFilteredPromotions(sorted);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Manage Promotions</h1>

      {/* Search, Sort, and Refresh */}
      <SearchSection
        onSearch={handleSearch}
        resultCount={filteredPromotions.length}
        onSortChange={handleSortChange}
      />

      {/* Promotion List */}
      <div className="grid gap-4">
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
