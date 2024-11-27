import Image from 'next/image';
import { NewsItem } from '@/types';
import { formatToThaiDate } from '@/utils/formatDate';

const NewsCard: React.FC<NewsItem> = ({ title, image, tags, date, description }) => {
  return (
    <div className="block p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="relative w-full sm:w-56 h-48 sm:h-32 flex-shrink-0">
          <Image
            src={image || '/placeholder.png'}
            alt={title || 'No Title'}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-600 flex-1 line-clamp-1">
              {title || 'Untitled'}
            </h2>
            <button className="hidden sm:block text-sm text-gray-700 font-semibold px-3 py-2 border rounded-md">
              Action
            </button>
          </div>

          {/* tag and time */}
          <div className="flex items-center text-sm my-1">
            <div className="flex gap-2">
              {tags?.map((tag, index) => (
                <span key={index} className="font-semibold text-blue-500 bg-blue-100 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Divider SVG to separate tags and date */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mx-2 text-gray-500"
            >
              <line x1="12" y1="0" x2="12" y2="24" />
            </svg>
            
            <span className="text-gray-600 font-medium">{formatToThaiDate(date)}</span>
          </div>
          <p className="text-sm text-gray-800 mt-2 line-clamp-2 leading-relaxed">
            {description || 'No description available.'}
          </p>
          <button className="block sm:hidden mt-4 text-sm text-gray-700 font-semibold px-3 py-2 border rounded-md self-end">
            Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
