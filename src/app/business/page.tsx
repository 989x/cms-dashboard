"use client";

import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";

import { useEffect, useState } from "react";
import { mockBusiness } from "@/api/business";
import SearchSortBar from "@/components/SearchSortBar";
import BusinessCard from "@/components/cards/BusinessCard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, [router]);

  const [businesses, setBusinesses] = useState(mockBusiness);
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusiness);
  const [sortBy, setSortBy] = useState("Related"); // Default sorting by 'Related'
  const [sortOrder, setSortOrder] = useState("Ascending"); // Default sorting order

  // Search Logic with Filtering
  const handleSearch = (query: string) => {
    const filtered = businesses.filter((business) =>
      business.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  // Handle Sorting
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder); // Update the sorting order
    const sortedBusinesses = [...filteredBusinesses];

    if (sortBy === "Status") {
      sortedBusinesses.sort((a, b) =>
        sortOrder === "Ascending"
          ? Number(a.is_active) - Number(b.is_active)
          : Number(b.is_active) - Number(a.is_active)
      );
    } else if (sortBy === "Views") {
      sortedBusinesses.sort((a, b) =>
        sortOrder === "Ascending" ? a.views - b.views : b.views - a.views
      );
    } else {
      // Default to "Related" (Sorting by title for example)
      sortedBusinesses.sort((a, b) => a.title.localeCompare(b.title)); // Example for "Related"
    }

    setFilteredBusinesses(sortedBusinesses);
  };

  // Filter Placeholder
  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage All Business Listings
      </h1>

      {/* Search, Sort, and Filter */}
      <SearchSortBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        resultCount={filteredBusinesses.length}
        onSortChange={handleSortChange}
      />

      {/* Business List */}
      <div className="grid gap-4">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <BusinessCard
              key={business._id}
              _id={business._id}
              title={business.title}
              description={business.description}
              images={business.images}
              contacts={business.contacts}
              created_at={business.created_at}
              updated_at={business.updated_at}
              link_url={business.link_url}
              views={business.views}
              is_active={business.is_active}
              business_type={business.business_type}
              branches={business.branches}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No businesses available.</p>
        )}
      </div>
    </div>
  );
}
