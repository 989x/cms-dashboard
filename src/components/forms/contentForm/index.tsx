// cms-dashboard/src/components/forms/contentForm/index.tsx

import { ContentItem } from '@/types/shared.types';
import ImageUrlManager from '../ImageUrlManager';
import HTMLEditor from '@/components/forms/HTMLManage/HTMLEditor';
import { FiBook, FiFileText } from 'react-icons/fi';

interface ContentFormProps {
  formData: ContentItem;
  onChange: (field: keyof ContentItem, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  const handleInputChange = (field: keyof ContentItem, value: any) => {
    onChange(field, value);
  };

  return (
    <form onSubmit={onSubmit} className='space-y-10'>
      {/* Link URL and Content Type */}
      <div className='mb-4 flex gap-8'>
        <div>
          <label className='block text-[15px] font-medium text-gray-700 mb-4'>
            Content Type
          </label>
          <div className='flex gap-3'>
            <button
              type='button'
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                formData.content_type === 'article'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 border'
              }`}
              onClick={() => handleInputChange('content_type', 'article')}
            >
              <FiBook className='h-[18px] w-[18px]' />
              Article
            </button>
            <button
              type='button'
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                formData.content_type === 'news'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 border'
              }`}
              onClick={() => handleInputChange('content_type', 'news')}
            >
              <FiFileText className='h-[18px] w-[18px]' />
              News
            </button>
          </div>
        </div>

        <div className='w-full'>
          <label
            htmlFor='link_url'
            className='block text-[15px] font-medium text-gray-700 mb-4'
          >
            Link URL
          </label>
          <input
            id='link_url'
            type='url'
            value={formData.link_url}
            onChange={(e) => handleInputChange('link_url', e.target.value)}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          />
        </div>
      </div>

      {/* Cover Images */}
      <div className='mb-4'>
        <ImageUrlManager
          coverImages={formData.cover_images}
          onChange={(updatedImages) =>
            handleInputChange('cover_images', updatedImages)
          }
        />
      </div>

      {/* Title */}
      <div className='mb-4'>
        <label
          htmlFor='title'
          className='block text-[15px] font-medium text-gray-700 mb-4'
        >
          Content Title
        </label>
        <input
          id='title'
          type='text'
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          required
        />
      </div>

      {/* Description */}
      <div className='mb-4'>
        <HTMLEditor
          value={formData.description}
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>

      {/* Tags */}
      <div className='mb-4'>
        <label className='block text-[15px] font-medium text-gray-700 mb-4'>
          Tags
        </label>
        <div className='flex gap-2 items-center'>
          <input
            type='text'
            placeholder='Add a tag'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const tag = e.currentTarget.value.trim();
                if (tag && !formData.content_tags.includes(tag)) {
                  handleInputChange('content_tags', [
                    ...formData.content_tags,
                    tag,
                  ]);
                  e.currentTarget.value = '';
                }
              }
            }}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          />
        </div>
        <div className='mt-2 flex gap-2 flex-wrap'>
          {formData.content_tags.map((content_tags) => (
            <span
              key={content_tags}
              className='inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm'
            >
              {content_tags}
              <button
                type='button'
                onClick={() =>
                  handleInputChange(
                    'content_tags',
                    formData.content_tags.filter((t) => t !== content_tags)
                  )
                }
                className='ml-2 text-red-500 hover:text-red-700'
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='w-full inline-flex justify-center items-center px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600'
      >
        Create New Post
      </button>
    </form>
  );
};

export default ContentForm;
