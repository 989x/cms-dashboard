// cms-dashboard/src/components/cards/ContentCard.tsx

import { useState } from "react";
import Image from "next/image";
import { ContentItem } from "@/types/shared.types";
import { formatToThaiDate } from "@/utils/formatDate";
import ContentEditModal from "../modals/ContentEditModal";
import { AiOutlineCalendar, AiOutlineEye } from "react-icons/ai";
import { FiEdit, FiEye, FiEyeOff, FiTrash2, FiBook, FiFileText } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

interface ContentCardProps extends ContentItem {
  previewMode?: boolean;
  onRefresh?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  _id,
  is_active,
  content_type,
  title,
  cover_images,
  content_tags,
  created_at,
  description,
  view_count,
  previewMode = false,
  onRefresh,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentIsActive, setCurrentIsActive] = useState(is_active);
  const [currentContentType, setCurrentContentType] = useState(content_type);
  const [currentTitle, setCurrentTitle] = useState(title || "");
  const [currentDescription, setCurrentDescription] = useState(description || "");
  const [currentTags, setCurrentTags] = useState(content_tags || []);
  const [currentCoverImages, setCurrentCoverImages] = useState(
    cover_images.length > 0 ? cover_images : ["/default-fallback-image.png"]
  );
  const [hasImageError, setImageError] = useState(false);

  const handleSave = (updatedData: ContentItem) => {
    setCurrentIsActive(updatedData.is_active);
    setCurrentContentType(updatedData.content_type);
    setCurrentTitle(updatedData.title);
    setCurrentDescription(updatedData.description);
    setCurrentTags(updatedData.content_tags);
    setEditModalOpen(false);
  };

  const handleRefresh = () => {
    setImageError(false); // Reset image error state
    if (onRefresh) onRefresh(); // Call parent refresh if provided
  };

  const TypeIcon = currentContentType === "article" ? FiBook : FiFileText;

  return (
    <div className="block">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-full sm:w-[280px] aspect-video flex-shrink-0">
          <Image
            src={!hasImageError ? currentCoverImages[0] : "/default-fallback-image.png"}
            alt={currentTitle || "No Title"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            onError={() => setImageError(true)} // Handle image error
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <h2 className="font-semibold line-clamp-1">{currentTitle || "Untitled"}</h2>
          <div className="flex items-center text-sm text-gray-500 gap-2.5">
            <span className="flex items-center gap-1.5">
              <TypeIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium">
                {currentContentType === "article" ? "Article" : "News"}
              </span>
            </span>
            <span className="h-4 w-[1.5px] bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <AiOutlineCalendar className="h-4 w-4" />
              {formatToThaiDate(created_at)}
            </span>
            <span className="h-4 w-[1.5px] bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <AiOutlineEye className="h-4 w-4" />
              {view_count ?? "0"}
            </span>
          </div>
          <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
            {currentDescription || "No description available."}
          </p>
          <div className="flex gap-2.5">
            {currentTags?.map((tag, index) => (
              <span key={index} className="font-semibold text-sm text-blue-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 my-3"></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-[13px] font-medium">
          <span className="text-gray-600">Status:</span>
          <button className="flex items-center gap-1">
            {currentIsActive ? (
              <>
                <FiEye className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Active</span>
              </>
            ) : (
              <>
                <FiEyeOff className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Inactive</span>
              </>
            )}
          </button>
        </div>
        <div className="flex gap-3 text-xs">
          {previewMode ? (
            <button
              className="flex items-center gap-2 px-3 py-2 border text-gray-600 font-semibold rounded-md transition-colors duration-200 hover:bg-gray-300 hover:text-gray-900"
              onClick={handleRefresh}
            >
              <MdRefresh className="h-5 w-5" />
              Refresh
            </button>
          ) : (
            <>
              <button
                className="flex items-center gap-2 px-3 py-2 border text-blue-600 font-semibold rounded-md transition-colors duration-200 hover:bg-blue-600 hover:text-white"
                onClick={() => setEditModalOpen(true)}
              >
                <FiEdit className="h-4 w-4" />
                Edit
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 border text-red-600 font-semibold rounded-md transition-colors duration-200 hover:bg-red-600 hover:text-white"
              >
                <FiTrash2 className="h-4 w-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {/* <ContentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        contentData={{
          _id,
          is_active: currentIsActive,
          link_url: "",
          content_type: currentContentType,
          title: currentTitle,
          description: currentDescription,
          tags: currentTags,
          image_url: currentImageUrl,
          created_at,
          views,
          updated_at: new Date().toISOString(),
        }}
        onSave={handleSave}
      /> */}
    </div>
  );
};

export default ContentCard;