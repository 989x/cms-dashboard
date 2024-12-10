import React, { useState } from 'react';
import { ContentEditModalProps } from '@/types/contentTypes';
import { FiX, FiSave, FiXCircle, FiBook, FiFileText } from 'react-icons/fi';

const ContentEditModal: React.FC<ContentEditModalProps> = ({
  isOpen, onClose, 
  id, title, description, tags = [], status, contentType, 
  onSave,
}) => {
  const [editStatus, setEditStatus] = useState(status);
  const [editContentType, setEditContentType] = useState(contentType);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTags, setEditTags] = useState((tags ?? []).join(", "));

  const handleSave = () => {
    onSave({
      title: editTitle,
      description: editDescription,
      tags: editTags.split(",").map((tag) => tag.trim()),
      status: editStatus,
      contentType: editContentType,
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
              Edit Content
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
              {/* Content Type Field */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-medium">
                <label className="block">Content Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
                      editContentType === "article"
                        ? "bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setEditContentType("article")}
                  >
                    <FiBook className="h-5 w-5" />
                    Article
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
                      editContentType === "news"
                        ? "bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setEditContentType("news")}
                  >
                    <FiFileText className="h-5 w-5" />
                    News
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
                placeholder="Enter HTML content here"
              ></textarea>
            </div>

            {/* Tags Field */}
            <div className="mb-5">
              <label className="block font-medium mb-3">Tags</label>
              <input
                type="text"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="Enter tags separated by commas (e.g., Cloud, Service, Technology)"
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

export default ContentEditModal;
