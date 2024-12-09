import React, { useState } from 'react';
import { BusinessEditModalProps } from '@/types/businessTypes';
import { FiX, FiSave, FiXCircle, FiShare2, FiGlobe } from 'react-icons/fi';

const BusinessEditModal: React.FC<BusinessEditModalProps> = ({
  isOpen, onClose, 
  id, title, description, branches, status, type, 
  onSave,
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3">
      <div className="bg-white rounded-xl p-5 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="overflow-y-auto h-full text-sm">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold flex items-center gap-3">
              Edit Business
              <span className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded">
                ID: {id}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-800"
              aria-label="Close"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center mb-5 gap-4">
              {/* Type Field */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-medium">
                <label className="block">Business Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
                      editType === "general"
                        ? "bg-green-500 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setEditType("general")}
                  >
                    <FiShare2 className="h-5 w-5" />
                    General
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
                      editType === "franchise"
                        ? "bg-green-500 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setEditType("franchise")}
                  >
                    <FiGlobe className="h-5 w-5" />
                    Franchise
                  </button>
                </div>
              </div>

              {/* Status Field */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-end gap-4">
                <label className="block font-medium">Status</label>
                <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 font-medium text-center rounded-full ${
                      editStatus === "visible"
                        ? "bg-green-500 text-white"
                        : "bg-transparent text-gray-700"
                    }`}
                    onClick={() => setEditStatus("visible")}
                  >
                    Visible
                  </button>
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 font-medium text-center rounded-full ${
                      editStatus === "hidden"
                        ? "bg-red-500 text-white"
                        : "bg-transparent text-gray-700"
                    }`}
                    onClick={() => setEditStatus("hidden")}
                  >
                    Hidden
                  </button>
                </div>
              </div>
            </div>

            {/* Title Field */}
            <div className="mb-5">
              <label className="block font-medium mb-3">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>

            {/* Description Field */}
            <div className="mb-5">
              <label className="block font-medium mb-3">Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
                rows={16}
                placeholder="Enter description here"
              ></textarea>
            </div>

            {/* Branches Field */}
            <div className="mb-5">
              <label className="block font-medium mb-3">Branches</label>
              <input
                type="number"
                value={editBranches}
                onChange={(e) => setEditBranches(Number(e.target.value))}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end text-sm font-medium gap-3 mt-8">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg"
              >
                <FiSave className="h-5 w-5" />
                Save
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 bg-gray-200 rounded-lg text-gray-700"
                onClick={onClose}
              >
                <FiXCircle className="h-5 w-5" />
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
