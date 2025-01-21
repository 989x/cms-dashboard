// cms-dashboard/src/components/forms/SearchSection.tsx

const SearchIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M21 21l-4.35-4.35m1.1-6.4a7.4 7.4 0 11-14.8 0 7.4 7.4 0 0114.8 0z'
    />
  </svg>
);

const DropdownArrowIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-[14px] w-[14px] ml-2 inline'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
);

export default function SearchSection() {
  return (
    <div className='w-full max-w-4xl'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center border rounded-lg px-4 py-2 w-full sm:w-[400px]'>
          <input
            type='text'
            placeholder='Search...'
            className='text-sm flex-1 bg-transparent outline-none'
          />
          <button className='ml-2 text-gray-500 hover:text-gray-700'>
            <SearchIcon />
          </button>
        </div>

        <button className='font-medium text-sm text-gray-700 px-3 py-2 border rounded-lg flex items-center gap-2'>
          Refresh
        </button>
      </div>

      <div className='flex gap-1.5 text-gray-600 text-sm font-medium mt-4 mb-6'>
        <p>Found X results</p>
        <p>&</p>
        <p>Sort by</p>
        <div className='relative text-blue-600'>
          <p className='text-sm font-medium cursor-pointer'>
            Related
            <DropdownArrowIcon />
          </p>

          <div className='absolute bg-white text-gray-700 shadow-lg rounded-lg border -ml-6 mt-2 z-10'>
            <ul className='divide-y divide-gray-100'>
              {/* Example options */}
              {/* <li className='px-4 py-3 cursor-pointer hover:bg-gray-100 whitespace-nowrap'>Option 1</li> */}
              {/* <li className='px-4 py-3 cursor-pointer hover:bg-gray-100 whitespace-nowrap'>Option 2</li> */}
              {/* <li className='px-4 py-3 cursor-pointer hover:bg-gray-100 whitespace-nowrap'>Option 3</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
