"use client";

import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";

import { useEffect, useState } from "react";
import { mockGeneralBusiness } from "@/api/business";
import SearchAndFilterBar from "@/components/SearchAndFilter";
import BusinessCard from "@/components/cards/BusinessCard";

export default function GeneralBusinessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, [router]);

  const [filteredBusinesses, setFilteredBusinesses] = useState(mockGeneralBusiness);

  const handleSearch = (query: string) => {
    const results = mockGeneralBusiness.filter((business) =>
      business.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(results);
  };

  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage General Businesses
      </h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <p className="text-gray-600 text-sm font-medium mt-4 mb-8">
        Found {filteredBusinesses.length} results
      </p>
      <div className="grid gap-4">
        {filteredBusinesses.map((business) => (
          <BusinessCard
            key={business._id}
            _id={business._id}
            title={business.title}
            images={business.images}
            contacts={business.contacts}
            created_at={business.created_at}
            updated_at={business.updated_at}
            description={business.description}
            link_url={business.link_url}
            views={business.views}
            is_active={business.is_active}
            business_type={business.business_type}
            branches={business.branches}
          />
        ))}
      </div>
    </div>
  );
}
