// cms-dashboard/src/app/content/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasAuthToken } from '@/utils/authStorage';
import { fetchAllContents } from '@/api/content';
import ContentCard from '@/components/cards/ContentCard';
import SearchSection from '@/components/forms/SearchSection';
import { ContentItem } from '@/types/shared.types';

const ContentPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]); // Explicitly typing the state

  useEffect(() => {
    if (!hasAuthToken()) {
      console.log('No auth token found, redirecting to login...');
      router.replace('/login');
    } else {
      console.log('Fetching data...');
      fetchAllContents()
        .then((data) => {
          console.log('Data fetched successfully:', data);
          setContent(data || []); // This will now work
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setContent([]); // This will now work
        });
    }
  }, [router]);

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6'>
      <h1 className='text-lg sm:text-xl font-bold mb-6 sm:mb-8'>Manage All Content</h1>

      {/* Search Section */}
      <SearchSection />

      {/* Render List */}
      <div className='grid gap-4'>
        {content.length > 0 ? (
          content.map((item) => <ContentCard key={item._id} {...item} />)
        ) : (
          <p className='text-gray-500 text-center'>
            No content available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentPage;
