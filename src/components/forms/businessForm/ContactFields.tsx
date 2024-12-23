import React from "react";
import { BusinessItem } from "@/types/shared.types";

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
        <div key={index} className="mb-4">
          <label className="block text-[15px] font-medium text-gray-700 mb-3">
            Contact {index + 1}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {contacts.length < 3 && (
        <button
          type="button"
          onClick={onAdd}
          className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 border rounded-md"
        >
          Add Contact
        </button>
      )}
    </div>
  );
};

export default ContactFields;
