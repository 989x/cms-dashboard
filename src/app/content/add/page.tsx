// cms-dashboard/src/app/content/add/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createContent } from '@/api/content';
import { hasAuthToken } from '@/utils/authStorage';
import HTMLEditor from '@/components/forms/html/Editor';

const AddContentPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    slug_url: '',
    redirect_url: '',
    title: '',
    description: '',
    admin_notice: '', // Field for admin notice
    content_tags: [] as string[], // Field for tags
    content_type: undefined as 'news' | 'article' | 'promotion' | undefined, // Added "promotion" option
  });

  const [tagInput, setTagInput] = useState(''); // For handling tag input

  useEffect(() => {
    if (!hasAuthToken()) {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !formData.content_tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        content_tags: [...prev.content_tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      content_tags: prev.content_tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContent(formData);
      alert('Content created successfully!');
    } catch (error) {
      if (error instanceof Error) {
        alert('Failed to create content: ' + error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const fields = [
    { name: 'admin_notice', label: 'Admin Notice', type: 'text', placeholder: 'Notice for admins' },
    { name: 'content_type', label: 'Content Type', type: 'button' },
    { name: 'slug_url', label: 'Slug URL', type: 'text', placeholder: 'my-awesome-content' },
    { name: 'redirect_url', label: 'Redirect URL', type: 'text', placeholder: 'https://example.com' },
    { name: 'title', label: 'Title', type: 'text', placeholder: 'My Awesome Content' },
  ];

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6'>
      <h1 className='text-lg sm:text-xl font-bold mb-6 sm:mb-8'>
        Add New Content
      </h1>
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
                required
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
        <div className='flex flex-col'>
          <label htmlFor='tags' className='mb-3 text-sm font-medium'>
            Tags
          </label>
          <div className='flex gap-2 items-center'>
            <input
              id='tags'
              type='text'
              placeholder='Add a tag'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className='border border-gray-300 rounded-md px-3 py-2 flex-1'
            />
            <button
              type='button'
              onClick={handleAddTag}
              className='bg-blue-600 text-white font-medium px-4 py-2 rounded-lg'
            >
              Add
            </button>
          </div>
          <div className='flex gap-2 mt-3'>
            {formData.content_tags.map((tag) => (
              <div
                key={tag}
                className='bg-gray-200 text-black px-3 py-1 rounded-lg flex items-center gap-2'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => handleRemoveTag(tag)}
                  className='text-red-600'
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white font-medium px-4 py-2 rounded-lg'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddContentPage;
