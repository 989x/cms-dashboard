import React, { useState } from 'react';
import { BusinessEditModalProps } from '@/types/businessTypes';
import { FiX, FiSave } from 'react-icons/fi';

const BusinessEditModal: React.FC<BusinessEditModalProps> = ({
  isOpen, onClose, id, title, description, branches, status, type, contacts, image,  onSave,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editBranches, setEditBranches] = useState(branches);
  const [editStatus, setEditStatus] = useState(status);
  const [editType, setEditType] = useState(type);

  const handleSave = () => {
    onSave({
      id,
      title: editTitle,
      description: editDescription,
      branches: editBranches,
      status: editStatus,
      type: editType,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Edit Business</h2>
          <button onClick={onClose} className="text-gray-500">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full border p-2 rounded"
              rows={5}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Branches</label>
            <input
              type="number"
              value={editBranches}
              onChange={(e) => setEditBranches(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Status</label>
            <select
              value={editStatus}
              onChange={(e) =>
                setEditStatus(e.target.value as "visible" | "hidden")
              }
              className="w-full border p-2 rounded"
            >
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Type</label>
            <select
              value={editType}
              onChange={(e) =>
                setEditType(e.target.value as "general" | "franchise")
              }
              className="w-full border p-2 rounded"
            >
              <option value="general">General</option>
              <option value="franchise">Franchise</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              <FiSave className="inline-block mr-1" />
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessEditModal;
