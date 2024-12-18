import { useState, useEffect, useRef } from "react";
import { ContentItem } from "@/types/shared.types";
import ContentDescForm from "./ContentDescForm";
import ContentGeneralForm from "./ContentGeneralForm";
import { FiX, FiSave, FiXCircle } from "react-icons/fi";

// Props Type
interface ContentEditModalProps extends Omit<ContentItem, "views" | "created_at" | "updated_at"> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<ContentItem, "_id" | "views" | "created_at" | "updated_at">) => void;
}

const ContentEditModal: React.FC<ContentEditModalProps> = ({
  isOpen,
  onClose,
  _id,
  title,
  description,
  tags = [],
  is_active,
  content_type,
  onSave,
}) => {
  const [editIsActive, setEditIsActive] = useState(is_active);
  const [editContentType, setEditContentType] = useState(content_type);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTags, setEditTags] = useState((tags ?? []).join(", "));
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal on "Escape" key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleSave = () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert("Title and Description are required.");
      return;
    }

    const payload = {
      title: editTitle.trim(),
      description: editDescription.trim(),
      tags: editTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      is_active: editIsActive,
      content_type: editContentType,
    };

    console.log("Saving content:", payload);
    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white rounded-xl p-5 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar"
        ref={modalRef}
        role="dialog"
        aria-labelledby="edit-content-modal"
        aria-describedby="edit-content-description"
      >
        <div className="overflow-y-auto h-full text-sm">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 id="edit-content-modal" className="text-lg font-semibold flex items-center gap-3">
              Edit Content
              <span className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded">
                ID: {_id}
              </span>
            </h2>
            <button onClick={onClose} className="text-gray-800" aria-label="Close modal">
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
              isActive={editIsActive}
              onIsActiveChange={setEditIsActive}
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
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg"
                aria-label="Save content"
              >
                <FiSave className="h-5 w-5" />
                Save
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 bg-gray-200 rounded-lg text-gray-700"
                onClick={onClose}
                aria-label="Cancel and close modal"
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
