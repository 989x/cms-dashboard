import React from "react";
import { BusinessItem } from "@/types/shared.types";
import { FiTrash2 } from "react-icons/fi";

interface ContactFieldsProps {
  contacts: BusinessItem["contacts"];
  onChange: (index: number, field: keyof BusinessItem["contacts"][number], value: string) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ contacts, onChange, onRemove, onAdd }) => {
  return (
    <div>
      {contacts.map((contact, index) => (
        <div key={index} className="mb-4 flex items-center gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <input
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => onChange(index, "email", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Name"
              value={contact.name}
              onChange={(e) => onChange(index, "name", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contact.phone}
              onChange={(e) => onChange(index, "phone", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          {contacts.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-800"
              title="Remove contact"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
      {contacts.length < 3 && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
        >
          Add Contact
        </button>
      )}
    </div>
  );
};

export default ContactFields;
