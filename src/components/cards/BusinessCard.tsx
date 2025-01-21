import Image from 'next/image';
import { useState } from 'react';
import { BusinessItem } from '@/types/shared.types';
import { formatToThaiDate } from '@/utils/formatDate';
import BusinessEditModal from '../modals/BusinessEditModal';
import { AiOutlineCalendar, AiOutlineEye } from 'react-icons/ai';
import { FiEdit, FiEye, FiEyeOff, FiTrash2, FiShare2, FiGlobe, } from 'react-icons/fi';

const BusinessCard: React.FC<BusinessItem> = ({
  _id,
  is_active,
  business_type,
  cover_images,
  title,
  link_url,
  contacts,
  created_at,
  updated_at,
  description,
  view_count,
  branches,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<BusinessItem>({
    _id,
    is_active,
    business_type,
    title,
    cover_images,
    link_url,
    contacts,
    created_at,
    updated_at,
    description,
    branches,
    view_count,
  });

  const handleSave = (updatedData: BusinessItem) => {
    setCurrentData(updatedData);
    setEditModalOpen(false);
  };

  const TypeIcon =
    currentData.business_type === 'franchise' ? FiShare2 : FiGlobe;

  return (
    <div className='block'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
        <div className='relative w-full sm:w-[280px] aspect-video flex-shrink-0'>
          <Image
            src={currentData.cover_images?.[0] || '/default-fallback-image.png'}
            alt={currentData.title || 'No Title'}
            layout='fill'
            objectFit='cover'
            className='rounded-md'
          />
        </div>
        <div className='flex-1 flex flex-col gap-2 justify-center'>
          <h2 className='font-semibold line-clamp-1'>
            {currentData.title || 'Untitled'}
          </h2>
          <div className='flex items-center text-sm text-gray-500 gap-2.5'>
            <span className='flex items-center gap-1.5'>
              <TypeIcon className='h-4 w-4 text-blue-500' />
              <span className='font-medium'>
                {currentData.business_type === 'franchise'
                  ? 'Franchise'
                  : 'General'}
              </span>
            </span>
            <span className='h-4 w-[1.5px] bg-gray-300'></span>
            <span className='flex items-center gap-1.5'>
              <AiOutlineCalendar className='h-4 w-4' />
              {formatToThaiDate(currentData.created_at)}
            </span>
            <span className='h-4 w-[1.5px] bg-gray-300'></span>
            <span className='flex items-center gap-1.5'>
              <AiOutlineEye className='h-4 w-4' />
              {currentData.view_count ?? '0'}
            </span>
          </div>
          <p className='text-sm text-gray-800 line-clamp-2 leading-relaxed'>
            {currentData.description || 'No description available.'}
          </p>
          <div className='flex flex-wrap text-sm text-gray-600'>
            {currentData.contacts && (
              <div className='flex flex-wrap gap-y-2 gap-x-8'>
                <div className='flex flex-col'>
                  <span className='font-semibold text-gray-800'>Name</span>
                  <span>{currentData.contacts.name}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-semibold text-gray-800'>Phone</span>
                  <span>{currentData.contacts.phone}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-semibold text-gray-800'>Email</span>
                  <a
                    href={`mailto:${currentData.contacts.email}`}
                    className='text-blue-500 underline'
                  >
                    {currentData.contacts.email}
                  </a>
                </div>
                {currentData.contacts.facebook && (
                  <div className='flex flex-col'>
                    <span className='font-semibold text-gray-800'>
                      Facebook
                    </span>
                    <a
                      href={currentData.contacts.facebook}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {currentData.contacts.facebook}
                    </a>
                  </div>
                )}
                {currentData.contacts.line && (
                  <div className='flex flex-col'>
                    <span className='font-semibold text-gray-800'>LINE</span>
                    <span>{currentData.contacts.line}</span>
                  </div>
                )}
                {currentData.contacts.Website && (
                  <div className='flex flex-col'>
                    <span className='font-semibold text-gray-800'>Website</span>
                    <a
                      href={currentData.contacts.Website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {currentData.contacts.Website}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='border-t border-gray-200 my-3'></div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <span className='text-[13px] font-medium text-gray-600'>Status:</span>
          <button className='flex items-center gap-1'>
            {currentData.is_active ? (
              <>
                <FiEye className='h-4 w-4 text-green-500' />
                <span className='text-[13px] font-medium text-green-600'>
                  Active
                </span>
              </>
            ) : (
              <>
                <FiEyeOff className='h-4 w-4 text-gray-500' />
                <span className='text-[13px] font-medium text-gray-600'>
                  Inactive
                </span>
              </>
            )}
          </button>
        </div>
        <div className='flex gap-3 text-xs'>
          <button
            className='flex items-center gap-2 px-3 py-2 border text-blue-600 font-semibold rounded-md transition-colors duration-200 hover:bg-blue-600 hover:text-white'
            onClick={() => setEditModalOpen(true)}
          >
            <FiEdit className='h-4 w-4' />
            Edit
          </button>
          <button className='flex items-center gap-2 px-3 py-2 border text-red-600 font-semibold rounded-md transition-colors duration-200 hover:bg-red-600 hover:text-white'>
            <FiTrash2 className='h-4 w-4' />
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      <BusinessEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        businessData={currentData}
        onSave={handleSave}
      />
    </div>
  );
};

export default BusinessCard;
