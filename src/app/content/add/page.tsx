// cms-dashboard/src/app/content/add/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import ContentForm from '@/components/forms/ContentForm';

const AddContentPage = () => {
  const router = useRouter();

  const createContent = async (content: any) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Unauthorized: No token found');

      const response = await fetch('http://128.199.202.159:8080/api/v1/contents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message || 'Failed to create content');
      }

      alert('Content created successfully!');
      router.push('/content');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Add New Content</h1>
      <ContentForm onSubmit={createContent} />
    </div>
  );
};

export default AddContentPage;
