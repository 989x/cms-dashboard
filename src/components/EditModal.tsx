import React, { useState } from 'react';
import { FiX, FiSave, FiXCircle, FiEdit } from 'react-icons/fi';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "visible" | "hidden";
  contentType: "news" | "article";
  title: string;
  description: string;
  tags: string[] | null;
  onSave: (data: {
    title: string;
    description: string;
    tags: string[];
    status: "visible" | "hidden";
    contentType: "news" | "article";
  }) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, title, description, tags = [], status, contentType, onSave }) => {
  const [editStatus, setEditStatus] = useState(status);
  const [editContentType, setEditContentType] = useState(contentType);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTags, setEditTags] = useState((tags ?? []).join(", "));

  const handleSave = () => {
    onSave({
      title: editTitle,
      description: editDescription,
      tags: editTags.split(",").map(tag => tag.trim()),
      status: editStatus,
      contentType: editContentType,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="overflow-y-auto h-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-3">
              <FiEdit className="h-5 w-5 sm:h-6 sm:w-6" />
              Edit Content
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close"
            >
              <FiX className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="flex flex-wrap items-center gap-6 mb-5">
              {/* Content Type Field */}
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-3">Content Type</label>
                <select
                  value={editContentType}
                  onChange={(e) => setEditContentType(e.target.value as "news" | "article")}
                  className="w-full sm:w-[220px] px-[13px] py-[9px] border rounded-lg"
                >
                  <option value="news">News</option>
                  <option value="article">Article</option>
                </select>
              </div>

              {/* Status Field */}
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-3">Status</label>
                <div className="ml-1 flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={editStatus === "visible"}
                      onChange={() => setEditStatus(editStatus === "visible" ? "hidden" : "visible")}
                    />
                    <div className="w-12 h-7 bg-gray-200 ring-2 ring-gray-300 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white"></div>
                    <span className="ml-4 font-medium text-gray-700">
                      {editStatus === "visible" ? "Visible" : "Hidden"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Title Field */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-4">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-4">Description (HTML)</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={16}
                placeholder="Enter HTML content here"
              ></textarea>
            </div>

            {/* Tags Field */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-4">Tags</label>
              <input
                type="text"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="Enter tags separated by commas (e.g., Cloud, Service, Technology)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end font-semibold gap-4 mt-8">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-3 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                onClick={onClose}
              >
                <FiXCircle className="h-5 w-5" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiSave className="h-5 w-5" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
