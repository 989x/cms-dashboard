// cms-dashboard/src/app/content/edit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ContentForm from '@/components/forms/ContentForm';

const EditContentPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [contentData, setContentData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Unauthorized: No token found');

        const response = await fetch(`http://128.199.202.159:8080/api/v1/contents/_id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch content data');
        }

        const result = await response.json();
        const data = result.data;

        setContentData({
          _id: data._id,
          public_id: data.public_id,
          slug_url: data.slug_url,
          is_active: data.is_active,
          redirect_url: data.redirect_url,
          cover_images: data.cover_images || [],
          content_type: data.content_type,
          title: data.title,
          description: data.description,
          content_tags: Array.isArray(data.content_tags) ? data.content_tags.join(',') : '',
          view_count: data.view_count,
          created_at: data.created_at,
          updated_at: data.updated_at,
        });
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An unknown error occurred.');
        router.push('/content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, router]);

  const updateContent = async (updatedContent: any) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Unauthorized: No token found');

      if (updatedContent.cover_images.length > 8) {
        throw new Error('You can upload a maximum of 8 images.');
      }

      const formData = new FormData();
      formData.append('title', updatedContent.title);
      formData.append('description', updatedContent.description);
      formData.append('content_type', updatedContent.content_type);
      formData.append('slug_url', updatedContent.slug_url);
      formData.append('redirect_url', updatedContent.redirect_url);
      formData.append('admin_notice', updatedContent.admin_notice);
      formData.append('public_id', updatedContent.public_id);
      formData.append('content_tags', updatedContent.content_tags); // Send as comma-separated string

      updatedContent.cover_images.forEach((file: File | string) => {
        if (typeof file !== 'string') {
          formData.append('cover_images', file);
        }
      });

      const response = await fetch(`http://128.199.202.159:8080/api/v1/contents/_id/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message || 'Failed to update content');
      }

      alert('Content updated successfully!');
      router.push('/content');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!contentData) {
    return <p className="text-center text-red-500">Failed to load content.</p>;
  }

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6'>
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
        Edit Content
        <p className="px-2 py-1 text-sm font-medium text-blue-500 bg-blue-100 rounded-md w-fit">
          {contentData.public_id}
        </p>
      </h1>
      <ContentForm initialData={contentData} onSubmit={updateContent} />
    </div>
  );
};

export default EditContentPage;
