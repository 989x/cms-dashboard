import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, DropdownArrowIcon } from "./SearchSvg";
import { MdRefresh } from "react-icons/md";

const sortOptions = [
  { label: "Related", sortBy: "Related" },
  { label: "Status (Inactive First)", sortBy: "Status: Inactive" },
  { label: "Status (Active First)", sortBy: "Status: Active" },
  { label: "Views (Low to High)", sortBy: "Views: Ascending" },
  { label: "Views (High to Low)", sortBy: "Views: Descending" },
  { label: "Date (Newest First)", sortBy: "Date: Newest First" },
  { label: "Date (Oldest First)", sortBy: "Date: Oldest First" },
];

export default function SearchSection({
  onSearch,
  resultCount,
  onSortChange,
}: {
  onSearch: (query: string) => void;
  resultCount: number;
  onSortChange: (sortBy: string) => void;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Related");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortChange = (option: { label: string; sortBy: string }) => {
    setSelectedSort(option.label);
    onSortChange(option.sortBy);
    setIsDropdownOpen(false);
  };

  const getSortLabel = () => selectedSort;

  // Handle page refresh
  const handleRefresh = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg px-4 py-2 w-full sm:w-[400px]">
          <input
            type="text"
            placeholder="Search..."
            className="text-sm flex-1 bg-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="ml-2 text-gray-500 hover:text-gray-700">
            <SearchIcon />
          </button>
        </div>

        <button
          onClick={handleRefresh}
          className="font-medium text-sm text-gray-700 px-3 py-2 border rounded-lg flex items-center gap-2"
        >
          <MdRefresh className="h-5 w-5" />
          Refresh
        </button>
      </div>

      <div className="flex gap-1.5 text-gray-600 text-sm font-medium mt-4 mb-6">
        <p>Found {resultCount} results</p>
        <p>&</p>
        <p>Sort by</p>
        <div className="relative text-blue-600">
          <p onClick={toggleDropdown} className="text-sm font-medium cursor-pointer">
            {getSortLabel()}
            <DropdownArrowIcon />
          </p>

          {isDropdownOpen && (
            <div className="absolute bg-white text-gray-700 shadow-lg rounded-lg border -ml-6 mt-2 z-10">
              <ul className="divide-y divide-gray-100">
                {sortOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSortChange(option)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 whitespace-nowrap ${
                      selectedSort === option.label ? "text-blue-500 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
