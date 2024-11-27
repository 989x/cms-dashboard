import Image from 'next/image';
import { NewsItem } from '@/types';
import { formatToThaiDate } from '@/utils/formatDate';

const DividerIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mx-1.5 text-gray-400">
    <line x1="12" y1="0" x2="12" y2="24" />
  </svg>
);

const NewsCard: React.FC<NewsItem> = ({ title, image, tags, date, description, status, type, views }) => (
  <div className="block">
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="relative w-full sm:w-[280px] aspect-video flex-shrink-0">
        <Image
          src={image || '/loading-image.jpg'}
          alt={title || 'No Title'}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <h2 className="text-lg font-semibold text-blue-600 line-clamp-1">{title || 'Untitled'}</h2>
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <span>{type === 'article' ? 'บทความ' : 'ข่าวสาร'}</span>
          <DividerIcon />
          <span>{formatToThaiDate(date)}</span>
          <DividerIcon />
          <span>ยอดวิว {views ?? '0'}</span>
        </div>
        <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">{description || 'No description available.'}</p>
        <div className="flex gap-2.5">
          {tags?.map((tag, index) => (
            <span key={index} className="font-semibold text-sm text-blue-500">{tag}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-gray-200 my-3"></div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        <button className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-full ${status === 'visible' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          <span className={`text-sm font-medium ${status === 'visible' ? 'text-green-600' : 'text-gray-600'}`}>
            {status === 'visible' ? 'Visible' : 'Hidden'}
          </span>
        </button>
      </div>
      <div className="flex gap-5">
        <button className="text-blue-600 font-semibold hover:underline">Edit</button>
        <button className="text-red-600 font-semibold hover:underline">Delete</button>
      </div>
    </div>
  </div>
);

export default NewsCard;
