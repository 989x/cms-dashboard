"use client";

import { useRouter } from 'next/navigation';
import { hasAuthToken } from '@/utils/authStorage';

import { useEffect, useState } from 'react';
import { mockFranchiseBusiness } from '@/api/business';
import SearchAndFilterBar from '@/components/SearchAndFilter';
import BusinessCard from '@/components/cards/BusinessCard';

export default function FranchiseBusinessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push('/login');
    }
  }, [router]); // Add 'router' as a dependency
  
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockFranchiseBusiness);

  const handleSearch = (query: string) => {
    const results = mockFranchiseBusiness.filter((business) =>
      business.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(results);
  };

  const handleFilter = () => {
    alert('Filter button clicked');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Manage Franchise Businesses
      </h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <p className="text-gray-600 text-sm font-medium mt-4 mb-8">
        Found {filteredBusinesses.length} results
      </p>
      <div className="grid gap-4">
        {filteredBusinesses.map((business) => (
          <BusinessCard
            key={business.id}
            id={business.id}
            title={business.title}
            image={business.image}
            contacts={business.contacts}
            date={business.date}
            description={business.description}
            link={business.link}
            views={business.views}
            status={business.status}
            type={business.type}
            branches={business.branches}
          />
        ))}
      </div>
    </div>
  );
}
