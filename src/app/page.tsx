import { mockNews } from '@/api/news';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='mt-14 w-full max-w-4xl mx-auto px-4'>
      <h1 className='text-xl sm:text-2xl font-bold mb-8 sm:mb-10'>
        Found {mockNews.length} Latest News Articles
      </h1>
      <div className='grid gap-5'>
        {mockNews.map((news) => (
          <div
            key={news.id}
            className='block p-4 rounded-lg border border-gray-200'
          >
            <div className='flex flex-col sm:flex-row items-start gap-4'>
              <div className='relative w-full sm:w-48 h-48 sm:h-28 flex-shrink-0'>
                <Image
                  src={news.image}
                  alt={news.title}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-md'
                />
              </div>
              <div className='flex-1 flex flex-col'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold text-blue-600 flex-1 line-clamp-1'>
                    {news.title}
                  </h2>
                  <button className='hidden sm:block text-sm text-gray-700 font-semibold px-3 py-2 border rounded-md'>
                    Action
                  </button>
                </div>
                <div className='flex items-center text-sm mt-2 sm:mt-0'>
                  <div className='flex gap-2 mr-3'>
                    {news.tags.map((tag, index) => (
                      <span key={index} className='font-semibold'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className='text-gray-600 font-medium'>{news.date}</span>
                </div>
                <p className='text-sm text-gray-800 mt-2 line-clamp-2 leading-relaxed'>
                  {news.description}
                </p>
                <button className='block sm:hidden mt-4 text-sm text-gray-700 font-semibold px-3 py-2 border rounded-md self-end'>
                  Action
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
