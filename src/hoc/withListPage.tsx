"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";
import SearchSection from "@/components/search/SearchSection";

interface SortableItem {
  [key: string]: any; // Generic object to support multiple keys
  is_active?: boolean;
  views?: number;
  title?: string;
  created_at?: string; // ISO timestamp
}

interface ListPageProps<T extends SortableItem> {
  title: string;
  fetchData: () => T[];
  renderCard: (item: T) => JSX.Element;
  defaultSortKey?: keyof T;
}

export function withListPage<T extends SortableItem>({
  title,
  fetchData,
  renderCard,
  defaultSortKey = "title",
}: ListPageProps<T>) {
  return function ListPage() {
    const router = useRouter();

    const [content] = useState<T[]>(fetchData());
    const [filteredContent, setFilteredContent] = useState<T[]>(fetchData());
    const [sortBy, setSortBy] = useState<string>("Related");

    useEffect(() => {
      if (!hasAuthToken()) {
        router.replace("/login");
      }
    }, [router]);

    const handleSearch = (query: string) => {
      const filtered = content.filter((item) =>
        item.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredContent(filtered);
    };

    const handleSortChange = (sortBy: string) => {
      setSortBy(sortBy);
      const sorted = sortContent(filteredContent, sortBy, { default: defaultSortKey });
      setFilteredContent(sorted);
    };

    const sortContent = (
      items: T[],
      sortBy: string,
      keyMap: Record<string, keyof T> = {}
    ): T[] => {
      const sortedItems = [...items];

      switch (sortBy) {
        case "Status: Inactive":
          sortedItems.sort((a, b) => Number(a.is_active) - Number(b.is_active));
          break;
        case "Status: Active":
          sortedItems.sort((a, b) => Number(b.is_active) - Number(a.is_active));
          break;
        case "Views: Ascending":
          sortedItems.sort((a, b) => (a.views || 0) - (b.views || 0));
          break;
        case "Views: Descending":
          sortedItems.sort((a, b) => (b.views || 0) - (a.views || 0));
          break;
        case "Date: Newest First":
          sortedItems.sort(
            (a, b) =>
              new Date(b.created_at || "").getTime() -
              new Date(a.created_at || "").getTime()
          );
          break;
        case "Date: Oldest First":
          sortedItems.sort(
            (a, b) =>
              new Date(a.created_at || "").getTime() -
              new Date(b.created_at || "").getTime()
          );
          break;
        default:
          const key = keyMap.default || "title";
          sortedItems.sort((a, b) =>
            (a[key]?.toString() || "").localeCompare(b[key]?.toString() || "")
          );
      }

      return sortedItems;
    };

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">{title}</h1>

        {/* Search and Sort */}
        <SearchSection
          onSearch={handleSearch}
          resultCount={filteredContent.length}
          onSortChange={handleSortChange}
        />

        {/* Render List */}
        <div className="grid gap-4">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => renderCard(item))
          ) : (
            <p className="text-gray-500 text-center">No {title.toLowerCase()} available.</p>
          )}
        </div>
      </div>
    );
  };
}