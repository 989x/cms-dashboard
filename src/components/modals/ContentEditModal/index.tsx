import { useState } from "react";
import { ContentEditModalProps } from "@/types/edit.types";
import ContentDescForm from "./ContentDescForm";
import ContentGeneralForm from "./ContentGeneralForm";
import { FiX, FiSave, FiXCircle } from "react-icons/fi";

const ContentEditModal: React.FC<ContentEditModalProps> = ({
  isOpen, onClose,
  _id, title, description, tags = [], status, contentType,
  onSave,
}) => {
  const [editStatus, setEditStatus] = useState(status);
  const [editContentType, setEditContentType] = useState(contentType);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTags, setEditTags] = useState((tags ?? []).join(", "));

  const handleSave = () => {
    const payload = {
      title: editTitle,
      description: editDescription,
      tags: editTags.split(",").map((tag) => tag.trim()),
      status: editStatus,
      contentType: editContentType,
    };
    console.log("Saving content:", payload);
    onSave(payload);
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
                ID: {_id}
              </span>
            </h2>
            <button onClick={onClose} className="text-gray-800" aria-label="Close">
              <FiX className="h-6 w-6" />
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
              status={editStatus}
              onStatusChange={setEditStatus}
              title={editTitle}
              onTitleChange={setEditTitle}
              tags={editTags}
              onTagsChange={setEditTags}
            />
            <ContentDescForm 
              description={editDescription} 
              onDescriptionChange={setEditDescription}
            />

            <div className="flex justify-end text-sm font-medium gap-3 mt-8">
              <button type="submit" className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg">
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
