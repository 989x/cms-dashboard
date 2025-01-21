import { useState } from 'react';
import { BusinessItem } from '@/types/shared.types';
import { FiX, FiSave, FiXCircle } from 'react-icons/fi';
import BusinessContactForm from './BusinessContactForm';
import BusinessDescForm from './BusinessDescForm';
import BusinessGeneralForm from './BusinessGeneralForm';

interface BusinessEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessData: BusinessItem;
  onSave: (data: BusinessItem) => void;
}

const BusinessEditModal: React.FC<BusinessEditModalProps> = ({
  isOpen,
  onClose,
  businessData,
  onSave,
}) => {
  const [editData, setEditData] = useState<BusinessItem>(businessData);

  const handleFieldChange = (field: keyof BusinessItem, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = [...editData.contacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    handleFieldChange('contacts', updatedContacts);
  };

  const handleAddContact = () => {
    handleFieldChange('contacts', [
      ...editData.contacts,
      { name: '', phone: '', email: '' },
    ]);
  };

  const handleRemoveContact = (index: number) => {
    handleFieldChange(
      'contacts',
      editData.contacts.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    console.log('Saving business data:', editData);
    onSave(editData);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3'>
      <div className='bg-white rounded-xl p-5 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar'>
        <div className='overflow-y-auto h-full text-sm'>
          {/* Modal Header */}
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-lg font-semibold flex items-center gap-3'>
              Edit Business
              <span className='bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded'>
                ID: {editData._id}
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

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <BusinessGeneralForm
              title={editData.title}
              onTitleChange={(value) => handleFieldChange('title', value)}
              branches={editData.branches}
              onBranchesChange={(value) => handleFieldChange('branches', value)}
              link={editData.link_url}
              onLinkChange={(value) => handleFieldChange('link_url', value)}
              type={editData.business_type}
              onTypeChange={(value) =>
                handleFieldChange('business_type', value)
              }
              isActive={editData.is_active}
              onIsActiveChange={(value) =>
                handleFieldChange('is_active', value)
              }
            />
            <BusinessContactForm
              contacts={editData.contacts}
              onAddContact={handleAddContact}
              onRemoveContact={handleRemoveContact}
              onContactChange={handleContactChange}
            />
            <BusinessDescForm
              description={editData.description}
              onDescriptionChange={(value) =>
                handleFieldChange('description', value)
              }
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

export default BusinessEditModal;
