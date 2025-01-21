import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface Contact {
  name: string;
  phone: string;
  email: string;
}

interface BusinessContactFormProps {
  contacts: Contact[];
  onAddContact: () => void;
  onRemoveContact: (index: number) => void;
  onContactChange: (index: number, field: string, value: string) => void;
}

const BusinessContactForm: React.FC<BusinessContactFormProps> = ({
  contacts,
  onAddContact,
  onRemoveContact,
  onContactChange,
}) => {
  return (
    <div className='mb-5'>
      <label className='block font-medium mb-3'>Contacts</label>
      {contacts.map((contact, index) => (
        <div
          key={index}
          className='grid grid-cols-[1fr_1fr_1fr_auto] gap-3 mb-3'
        >
          <input
            type='text'
            value={contact.name}
            placeholder='Name'
            onChange={(e) => onContactChange(index, 'name', e.target.value)}
            className='w-full p-2 border rounded-lg'
          />
          <input
            type='text'
            value={contact.phone}
            placeholder='Phone'
            onChange={(e) => onContactChange(index, 'phone', e.target.value)}
            className='w-full p-2 border rounded-lg'
          />
          <input
            type='email'
            value={contact.email}
            placeholder='Email'
            onChange={(e) => onContactChange(index, 'email', e.target.value)}
            className='w-full p-2 border rounded-lg'
          />
          <button
            type='button'
            onClick={() => onRemoveContact(index)}
            className='text-red-500 hover:text-red-700 ml-1'
          >
            <FiTrash2 className='h-5 w-5' />
          </button>
        </div>
      ))}
      <button
        type='button'
        onClick={onAddContact}
        className='flex items-center gap-1.5 px-3 py-2 text-blue-600 font-medium border rounded-lg'
      >
        <FiPlus className='h-4 w-4' />
        Add Contact
      </button>
    </div>
  );
};

export default BusinessContactForm;
