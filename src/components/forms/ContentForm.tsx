// components/forms/ContentForm.tsx

'use client';

import { useState, useEffect } from 'react';
import HTMLEditor from '@/components/forms/html/Editor';

interface ContentFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    admin_notice: '',
    is_active: '',
    slug_url: '',
    redirect_url: '',
    cover_images: [] as File[],
    content_type: '' as 'news' | 'article' | 'promotion',
    content_tags: '',
    title: '',
    description: '',
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        admin_notice: initialData.admin_notice || '',
        is_active: initialData.is_active || '',
        slug_url: initialData.slug_url || '',
        redirect_url: initialData.redirect_url || '',
        cover_images: initialData.cover_images || [],
        content_type: initialData.content_type || '',
        content_tags: initialData.content_tags || '',
        title: initialData.title || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // console.log('DEBUG_MODE: Submitting form data:', formData);
    await onSubmit(formData);
  };

  const fields = [
    { name: 'admin_notice', label: 'Admin Notice', type: 'text', placeholder: 'Notice for admins' },
    { name: 'content_type', label: 'Content Type', type: 'button' },
    { name: 'slug_url', label: 'Slug URL', type: 'text', placeholder: 'my-awesome-content' },
    { name: 'redirect_url', label: 'Redirect URL', type: 'text', placeholder: 'https://example.com' },
    { name: 'title', label: 'Title', type: 'text', placeholder: 'My Awesome Content' },
  ];

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {fields.map(({ name, label, type, placeholder }) => (
        <div key={name} className='flex flex-col text-sm'>
          <label htmlFor={name} className='mb-3 font-medium'>
            {label}
          </label>
          {type === 'text' ? (
            <input
              id={name}
              name={name}
              type='text'
              placeholder={placeholder}
              value={formData[name as keyof typeof formData] as string}
              onChange={(e) => handleChange(name, e.target.value)}
              className='border border-gray-300 rounded-md px-3 py-2'
            />
          ) : (
            <div className='flex gap-3'>
              {['news', 'article', 'promotion'].map((value) => (
                <button
                  key={value}
                  type='button'
                  onClick={() => handleChange(name, value)}
                  className={`px-4 py-2 rounded-lg ${
                    formData.content_type === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className='flex flex-col'>
        <label htmlFor='description' className='mb-3 text-sm font-medium'>
          Description (HTML)
        </label>
        <HTMLEditor
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
        />
      </div>
      <div className='flex flex-col text-sm'>
        <label htmlFor='cover_images' className='mb-3 font-medium'>
          Cover Images (Max: 8)
        </label>
        <input
          id='cover_images'
          name='cover_images'
          type='file'
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setFormData((prev) => {
                const updatedFiles = [
                  ...prev.cover_images,
                  ...Array.from(files),
                ].slice(0, 8);
                return { ...prev, cover_images: updatedFiles };
              });
            }
          }}
          className='border border-gray-300 rounded-md px-3 py-2'
          accept='image/*'
        />
        {formData.cover_images.length > 0 && (
          <ul className='mt-3 space-y-2'>
            {formData.cover_images.map((file, index) => (
              <li key={index} className='flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm'>
                <span className='text-sm text-gray-700'>{typeof file === 'string' ? file : file.name}</span>
                <button
                  type='button'
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      cover_images: prev.cover_images.filter((_, i) => i !== index),
                    }));
                  }}
                  className='text-red-500 text-sm font-medium'
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='flex flex-col text-sm'>
        <label htmlFor='content_tags' className='mb-3 font-medium'>Content Tags</label>
        <input
          id='content_tags'
          type='text'
          placeholder='tag1, tag2, tag3'
          value={formData.content_tags}
          onChange={(e) => handleChange('content_tags', e.target.value)}
          className='border border-gray-300 rounded-md px-3 py-2'
        />
      </div>

      <div className='pt-4'>
        <button
          type='submit'
          className='bg-blue-600 text-white font-medium px-4 py-2 rounded-lg'
        >
          {initialData ? 'Update Content' : 'Create Content'}
        </button>
      </div>
    </form>
  );
};

export default ContentForm;
