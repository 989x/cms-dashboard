"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BusinessItem } from "@/types/shared.types";
import BusinessCard from "@/components/cards/BusinessCard";
import SearchSection from "@/components/search/SearchSection";
import { mockGeneralBusiness } from "@/api/business";
import { hasAuthToken } from "@/utils/authStorage";
import { sortItems } from "@/utils/sortItems";

export default function GeneralBusinessPage() {
  const router = useRouter();

  // State for businesses and filtered data
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("Related");

  // Authentication and Data Fetching
  useEffect(() => {
    if (!hasAuthToken()) {
      router.replace("/login");
      return;
    }

    // Set businesses data immediately
    setBusinesses(mockGeneralBusiness);
    setFilteredBusinesses(mockGeneralBusiness);
    setIsLoading(false);
  }, [router]);

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = businesses.filter((business) =>
      business.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  // Handle sorting
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
    const sortedBusinesses = sortItems(filteredBusinesses, sortBy, { default: "title" });
    setFilteredBusinesses(sortedBusinesses);
  };

  // Filter Placeholder
  const handleFilter = () => {
    console.log("Filter clicked: Future implementation!");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading businesses...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Manage General Businesses</h1>

      {/* Search, Sort, and Filter */}
      <SearchSection
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredBusinesses.length}
        onSortChange={handleSortChange}
      />

      {/* Business List */}
      <div className="grid gap-6">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <BusinessCard key={business._id} {...business} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No businesses available.</p>
        )}
      </div>
    </div>
  );
}
