import React, { useState } from 'react';
import Image from 'next/image';
import { BusinessItem } from '@/types/businessTypes';
import { formatToThaiDate } from '@/utils/formatDate';
import BusinessEditModal from '../modals/BusinessEditModal';
import { AiOutlineCalendar, AiOutlineEye } from 'react-icons/ai';
import { FiEdit, FiEye, FiEyeOff, FiTrash2, FiShare2, FiGlobe } from 'react-icons/fi';

const BusinessCard: React.FC<BusinessItem> = ({
  id, status, type, title, image, link, contacts, date, description, views, branches,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentBranches, setCurrentBranches] = useState(branches);
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleSave = (data: {
    id: string;
    title: string;
    description: string;
    branches: number;
    status: "visible" | "hidden";
    type: "general" | "franchise";
  }) => {
    setCurrentTitle(data.title);
    setCurrentDescription(data.description);
    setCurrentBranches(data.branches);
    setCurrentStatus(data.status);
    setEditModalOpen(false);
  };

  const TypeIcon = type === "franchise" ? FiShare2 : FiGlobe;

  return (
    <div className="block">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-full sm:w-[280px] aspect-video flex-shrink-0">
          <Image
            src={image || '/loading-image.jpg'}
            alt={currentTitle || 'No Title'}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <h2 className="font-semibold line-clamp-1">{currentTitle || 'Untitled'}</h2>
          <div className="flex items-center text-sm text-gray-500 gap-2.5">
            <span className="flex items-center gap-1.5">
              <TypeIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{type === 'franchise' ? 'Franchise' : 'General'}</span>
            </span>
            <span className="h-4 w-[1.5px] bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <AiOutlineCalendar className="h-4 w-4" />
              {formatToThaiDate(date)}
            </span>
            <span className="h-4 w-[1.5px] bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <AiOutlineEye className="h-4 w-4" />
              {views ?? '0'}
            </span>
          </div>
          <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
            {currentDescription || 'No description available.'}
          </p>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <span className="font-semibold text-gray-800">Branches:</span>
            <span>{currentBranches}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {contacts?.map((contact, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:gap-1"
              >
                <span className="font-semibold text-gray-800">{contact.name}:</span>
                <span>{contact.phone}</span>
                <a href={`mailto:${contact.email}`} className="text-blue-500 underline">
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
            {currentStatus === 'visible' ? (
              <>
                <FiEye className="h-4 w-4 text-green-500" />
                <span className="text-[13px] font-medium text-green-600">Visible</span>
              </>
            ) : (
              <>
                <FiEyeOff className="h-4 w-4 text-gray-500" />
                <span className="text-[13px] font-medium text-gray-600">Hidden</span>
              </>
            )}
          </button>
        </div>
        <div className="flex gap-3 text-xs">
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
        </div>
      </div>

      {/* Modal */}
      <BusinessEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        id={String(id)} // Convert id to string
        title={currentTitle}
        description={currentDescription}
        branches={currentBranches}
        status={currentStatus}
        type={type}
        contacts={contacts}
        image={image}
        link={link}
        date={date}
        onSave={handleSave}
      />
    </div>
  );
};

export default BusinessCard;
