import Image from 'next/image';
import { NewsItem } from '@/types';
import { formatToThaiDate } from '@/utils/formatDate';

const NewsCard: React.FC<NewsItem> = ({ title, image, tags, date, description }) => {
  return (
    <div className="block p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="relative w-full sm:w-48 h-48 sm:h-28 flex-shrink-0">
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
          <div className="flex items-center text-sm mt-2 sm:mt-0">
            <div className="flex gap-2 mr-3">
              {tags?.map((tag, index) => (
                <span key={index} className="font-semibold">
                  {tag}
                </span>
              ))}
            </div>
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
