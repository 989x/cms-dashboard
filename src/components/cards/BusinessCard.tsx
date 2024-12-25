import React, { useState } from "react";
import Image from "next/image";
import { BusinessItem } from "@/types/shared.types";
import { formatToThaiDate } from "@/utils/formatDate";
import BusinessEditModal from "../modals/BusinessEditModal";
import {
  AiOutlineCalendar,
  AiOutlineEye,
} from "react-icons/ai";
import {
  FiEdit,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiShare2,
  FiGlobe,
} from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

interface BusinessCardProps extends BusinessItem {
  previewMode?: boolean;
  onRefresh?: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  _id,
  is_active,
  business_type,
  cover_images,
  embedded_images,
  title,
  link_url,
  contacts,
  created_at,
  updated_at,
  description,
  views,
  branches,
  previewMode = false,
  onRefresh,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<BusinessItem>({
    _id,
    is_active,
    business_type,
    title,
    cover_images,
    embedded_images,
    link_url,
    contacts,
    created_at,
    updated_at,
    description,
    views,
    branches,
  });

  const handleSave = (updatedData: BusinessItem) => {
    setCurrentData(updatedData);
    setEditModalOpen(false);
    if (onRefresh) onRefresh();
  };

  const handleRefresh = () => {
    if (onRefresh) onRefresh();
  };

  const TypeIcon = currentData.business_type === "franchise" ? FiShare2 : FiGlobe;

  return (
    <div className="block">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-full sm:w-[280px] aspect-video flex-shrink-0">
          <Image
            src={currentData.cover_images?.[0] || "/default-fallback-image.png"}
            alt={currentData.title || "No Title"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <h2 className="font-semibold line-clamp-1">{currentData.title || "Untitled"}</h2>
          <div className="flex items-center text-sm text-gray-500 gap-2.5">
            <span className="flex items-center gap-1.5">
              <TypeIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium">
                {currentData.business_type === "franchise" ? "Franchise" : "General"}
              </span>
            </span>
            <span className="h-4 w-[1.5px] bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <AiOutlineCalendar className="h-4 w-4" />
              {formatToThaiDate(currentData.created_at)}
            </span>
            <span className="h-4 w-[1.5px] bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <AiOutlineEye className="h-4 w-4" />
              {currentData.views ?? "0"}
            </span>
          </div>
          <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
            {currentData.description || "No description available."}
          </p>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <span className="font-semibold text-gray-800">Branches:</span>
            <span>{currentData.branches}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {currentData.contacts?.map((contact, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:gap-1"
              >
                <span className="font-semibold text-gray-800">{contact.name}:</span>
                <span>{contact.phone}</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-500 underline"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 my-3"></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="text-[13px] font-medium text-gray-600">Status:</span>
          <button className="flex items-center gap-1">
            {currentData.is_active ? (
              <>
                <FiEye className="h-4 w-4 text-green-500" />
                <span className="text-[13px] font-medium text-green-600">Active</span>
              </>
            ) : (
              <>
                <FiEyeOff className="h-4 w-4 text-gray-500" />
                <span className="text-[13px] font-medium text-gray-600">Inactive</span>
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
              <button className="flex items-center gap-2 px-3 py-2 border text-red-600 font-semibold rounded-md transition-colors duration-200 hover:bg-red-600 hover:text-white">
                <FiTrash2 className="h-4 w-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <BusinessEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        businessData={currentData}
        onSave={handleSave}
      />
    </div>
  );
};

export default BusinessCard;
