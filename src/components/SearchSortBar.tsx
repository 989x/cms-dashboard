import { useState } from 'react';
import { MdFilterList } from 'react-icons/md';

export default function SearchSortBar({
  onSearch,
  onFilter,
  resultCount,
  onSortChange,
}: {
  onSearch: (query: string) => void;
  onFilter: () => void;
  resultCount: number;
  onSortChange: (sortBy: string) => void; // Callback for sorting change
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Related'); // Default sorting by 'Related'

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortChange = (sortBy: string) => {
    setSelectedSort(sortBy);
    onSortChange(sortBy); // Notify parent component about the sort change
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Search and Filter Section */}
      <div className="flex items-center gap-3">
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
      
      <div className='flex gap-1.5 text-gray-600 text-sm font-medium mt-4 mb-6'>
        {/* Results Count */}
        <p>
          Found {resultCount} results
        </p>
        <p>
          &
        </p>
        <p>Sorting by</p>

        {/* Sorting UI: initially displayed as <p> and turns into dropdown on click */}
        <div className="relative text-blue-600">
          <p
            onClick={toggleDropdown}
            className="text-sm font-medium cursor-pointer"
          >
            {selectedSort}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[14px] w-[14px] ml-2 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </p>

          {isDropdownOpen && (
            <div className="absolute bg-white text-gray-700 shadow-lg rounded-lg border -ml-2 mt-2 z-10">
              <ul>
                <li
                  onClick={() => handleSortChange('Related')}
                  className="px-4 py-[9px] hover:bg-gray-100 cursor-pointer"
                >
                  Related
                </li>
                <li
                  onClick={() => handleSortChange('Status')}
                  className="px-4 py-[9px] hover:bg-gray-100 cursor-pointer"
                >
                  Status
                </li>
                <li
                  onClick={() => handleSortChange('Views')}
                  className="px-4 py-[9px] hover:bg-gray-100 cursor-pointer"
                >
                  Views
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
