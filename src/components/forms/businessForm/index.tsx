import ImageUrlManager from '../ImageUrlManager';
import { BusinessItem } from '@/types/shared.types';
import HTMLEditor from '@/components/forms/HTMLManage/HTMLEditor';
import { FiGlobe, FiShare2 } from 'react-icons/fi';

interface BusinessFormProps {
  formData: BusinessItem;
  onChange: (field: keyof BusinessItem, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  const handleInputChange = (field: keyof BusinessItem, value: any) => {
    onChange(field, value);
  };

  return (
    <form onSubmit={onSubmit} className='space-y-10'>
      {/* Business Type and Link URL */}
      <div className='mb-4 flex gap-8'>
        <div>
          <label className='block text-[15px] font-medium text-gray-700 mb-4'>
            Business Type
          </label>
          <div className='flex gap-3'>
            <button
              type='button'
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                formData.business_type === 'general'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 border'
              }`}
              onClick={() => handleInputChange('business_type', 'general')}
            >
              <FiShare2 className='h-[18px] w-[18px]' />
              General
            </button>
            <button
              type='button'
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                formData.business_type === 'franchise'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 border'
              }`}
              onClick={() => handleInputChange('business_type', 'franchise')}
            >
              <FiGlobe className='h-[18px] w-[18px]' />
              Franchise
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

      {/* Image Manager */}
      <div>
        <ImageUrlManager
          coverImages={formData.cover_images}
          embeddedImages={formData.embedded_images || []}
          onChange={(type, updatedImages) =>
            handleInputChange(
              type === 'cover' ? 'cover_images' : 'embedded_images',
              updatedImages
            )
          }
        />
      </div>

      {/* Title */}
      <div className='mb-4'>
        <label
          htmlFor='title'
          className='block text-[15px] font-medium text-gray-700 mb-4'
        >
          Business Title
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

      {/* Branches, Investment Start, Investment End */}
      <div className='mb-4 flex gap-4'>
        <div className='flex-1 max-w-[25%] md:max-w-[20%]'>
          <label
            htmlFor='branches'
            className='block text-[15px] font-medium text-gray-700 mb-2'
          >
            Branches
          </label>
          <input
            id='branches'
            type='text'
            placeholder='e.g., 10'
            value={formData.branches}
            onChange={(e) => handleInputChange('branches', e.target.value)}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          />
        </div>
        <div className='flex-1'>
          <label
            htmlFor='investment_start'
            className='block text-[15px] font-medium text-gray-700 mb-2'
          >
            Investment Start
          </label>
          <input
            id='investment_start'
            type='text'
            placeholder='e.g., 5000'
            value={formData.investment_start}
            onChange={(e) =>
              handleInputChange('investment_start', e.target.value)
            }
            className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          />
        </div>
        <div className='flex-1'>
          <label
            htmlFor='investment_end'
            className='block text-[15px] font-medium text-gray-700 mb-2'
          >
            Investment End
          </label>
          <input
            id='investment_end'
            type='text'
            placeholder='e.g., 20000'
            value={formData.investment_end}
            onChange={(e) =>
              handleInputChange('investment_end', e.target.value)
            }
            className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          />
        </div>
      </div>

      {/* Contacts */}
      {/* ... */}

      {/* Submit Button */}
      <button
        type='submit'
        className='w-full inline-flex justify-center items-center px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600'
      >
        Create Business
      </button>
    </form>
  );
};

export default BusinessForm;
