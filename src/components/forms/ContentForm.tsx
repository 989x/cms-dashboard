'use client';

import { useState } from 'react';
import HTMLEditor from '@/components/forms/html/Editor';
import TagsInput from './TagsInput';

interface ContentFormProps {
  onSubmit: (data: any) => Promise<void>;
}

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    admin_notice: '',
    slug_url: '',
    redirect_url: '',
    content_type: undefined as 'news' | 'article' | 'promotion' | undefined,
    content_tags: [] as string[],
    title: '',
    description: '',
  });

  const handleChange = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(({ name, label, type, placeholder }) => (
        <div key={name} className="flex flex-col text-sm">
          <label htmlFor={name} className="mb-3 font-medium">
            {label}
          </label>
          {type === 'text' ? (
            <input
              id={name}
              name={name}
              type="text"
              placeholder={placeholder}
              value={formData[name as keyof typeof formData] as string}
              onChange={(e) => handleChange(name, e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
          ) : (
            <div className="flex gap-3">
              {['news', 'article', 'promotion'].map((value) => (
                <button
                  key={value}
                  type="button"
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
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-3 text-sm font-medium">
          Description (HTML)
        </label>
        <HTMLEditor
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
        />
      </div>
      <TagsInput
        tags={formData.content_tags}
        onAddTag={(tag: any) => handleChange('content_tags', [...formData.content_tags, tag])}
        onRemoveTag={(tag: any) =>
          handleChange(
            'content_tags',
            formData.content_tags.filter((t) => t !== tag)
          )
        }
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default ContentForm;
