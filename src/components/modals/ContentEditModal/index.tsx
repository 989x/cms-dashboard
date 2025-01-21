import { useState } from 'react';
import { ContentItem } from '@/types/shared.types';
import ContentDescForm from './ContentDescForm';
import ContentGeneralForm from './ContentGeneralForm';
import { FiX, FiSave, FiXCircle } from 'react-icons/fi';

interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentData: ContentItem;
  onSave: (updatedData: ContentItem) => void;
}

const ContentEditModal: React.FC<ContentEditModalProps> = ({
  isOpen,
  onClose,
  contentData,
  onSave,
}) => {
  const {
    _id,
    title,
    description,
    content_tags = [],
    is_active,
    content_type,
  } = contentData;

  const [editIsActive, setEditIsActive] = useState(is_active);
  const [editContentType, setEditContentType] = useState(content_type);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTags, setEditTags] = useState(content_tags.join(', '));

  const handleSave = () => {
    const updatedData: ContentItem = {
      ...contentData,
      is_active: editIsActive,
      content_type: editContentType,
      title: editTitle,
      description: editDescription,
      content_tags: editTags.split(',').map((tag) => tag.trim()),
    };

    console.log('Saving content:', updatedData);
    onSave(updatedData);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3'>
      <div className='bg-white rounded-xl p-5 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar'>
        <div className='overflow-y-auto h-full text-sm'>
          {/* Modal Header */}
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-lg font-semibold flex items-center gap-3'>
              Edit Content
              <span className='bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded'>
                ID: {_id}
              </span>
            </h2>
            <button
              onClick={onClose}
              className='text-gray-800'
              aria-label='Close'
            >
              <FiX className='h-6 w-6' />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <ContentGeneralForm
              contentType={editContentType}
              onContentTypeChange={setEditContentType}
              isActive={editIsActive}
              onIsActiveChange={setEditIsActive}
              title={editTitle}
              onTitleChange={setEditTitle}
              content_tags={editTags}
              onTagsChange={setEditTags}
            />
            <ContentDescForm
              description={editDescription}
              onDescriptionChange={setEditDescription}
            />

            <div className='flex justify-end text-sm font-medium gap-3 mt-8'>
              <button
                type='submit'
                className='flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg'
              >
                <FiSave className='h-5 w-5' />
                Save
              </button>
              <button
                type='button'
                className='flex items-center gap-2 px-4 py-3 bg-gray-200 rounded-lg text-gray-700'
                onClick={onClose}
              >
                <FiXCircle className='h-5 w-5' />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentEditModal;
