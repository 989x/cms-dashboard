import { useState } from 'react';
import { MdFilterList } from 'react-icons/md';

export default function SearchAndFilterBar({
  onSearch,
  onFilter,
}: {
  onSearch: (query: string) => void;
  onFilter: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-4xl">
      {/* Search Section */}
      <div className="flex items-center border rounded-lg px-4 py-2 w-full sm:w-[400px]">
        <input
          type="text"
          placeholder="Search..."
          className="text-sm flex-1 bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.1-6.4a7.4 7.4 0 11-14.8 0 7.4 7.4 0 0114.8 0z"
            />
          </svg>
        </button>
      </div>

      {/* Filter Button */}
      <button
        onClick={onFilter}
        className="font-medium text-sm text-gray-700 px-4 py-2 border rounded-lg flex items-center gap-2"
      >
        <MdFilterList className="h-5 w-5" />
        Filter
      </button>
    </div>
  );
}
