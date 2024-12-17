"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockPromotions } from '@/api/promotion';
import { PromotionItem } from '@/types/promotionTypes';
import PromotionCard from '@/components/cards/PromotionCard';
import SearchAndFilterBar from '@/components/SearchAndFilter';

export default function PromotionPage() {
  const router = useRouter();
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<PromotionItem[]>([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!localStorage.getItem("authToken")) {
      router.push('/login');
    }
    // Set promotions from mock data
    setPromotions(mockPromotions);
    setFilteredPromotions(mockPromotions);
  }, [router]);

  const handleSearch = (query: string) => {
    const results = mockPromotions.filter((promo) =>
      promo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPromotions(results);
  };

  const handleFilter = () => {
    alert('Filter button clicked');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Promotions</h1>

      {/* Search and Filter Bar */}
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />

      <p className="text-gray-600 text-sm font-medium mt-4 mb-8">
        Found {filteredPromotions.length} results
      </p>

      {/* Promotion List */}
      <div className="grid gap-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promo) => (
            <PromotionCard
              key={promo._id}
              title={promo.title}
              imageUrl={promo.imageUrl}
              linkUrl={promo.linkUrl}
              activeFrom={promo.activeFrom}
              activeUntil={promo.activeUntil}
            />
          ))
        ) : (
          <p>No promotions available at this time.</p>
        )}
      </div>
    </div>
  );
}
