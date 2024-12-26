import React from "react";
import Image from "next/image";
import { AiOutlineCalendar, AiOutlineEye, AiOutlineClockCircle } from "react-icons/ai";
import { FiEdit, FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { formatToThaiDate, calculateDuration, calculateRemainingDays } from "@/utils/formatDate";
import { PromotionItem } from "@/types/shared.types";

const PromotionCard: React.FC<PromotionItem> = ({
  _id,
  is_active,
  title,
  description,
  image_url,
  link_url,
  view_count,
  active_from,
  active_until,
}) => {
  const duration = calculateDuration(active_from, active_until);
  const remainingDays = calculateRemainingDays(active_until);

  return (
    <div className="block">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Promotion Image */}
        <div className="relative w-full sm:w-[280px] aspect-video flex-shrink-0">
          <Image
            src={image_url || "/default-fallback-image.png"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Promotion Details */}
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <h2 className="font-semibold line-clamp-1">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{description}</p>

          <div className="flex flex-col text-sm text-gray-500 gap-2">
            {/* Row 1 */}
            <div className="flex items-center gap-x-2.5">
              <div className="flex items-center gap-x-1.5">
                <AiOutlineCalendar className="h-4 w-4" />
                <span>
                  {formatToThaiDate(active_from)} - {formatToThaiDate(active_until)}
                </span>
              </div>
              <span className="h-4 w-[1.5px] bg-gray-300"></span>
              <div className="flex items-center gap-x-1.5">
                <AiOutlineEye className="h-4 w-4" />
                <span>{view_count} views</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center gap-x-2.5">
              <div className="flex items-center gap-x-1.5">
                <AiOutlineClockCircle className="h-4 w-4" />
                <span>Duration: {duration} days</span>
              </div>
              <span className="h-4 w-[1.5px] bg-gray-300"></span>
              <div className="flex items-center gap-x-1.5">
                <span>Remaining: {remainingDays} days</span>
              </div>
            </div>
          </div>

          {/* Show Link */}
          <div className="text-sm font-medium">
            <span className="text-gray-600">Go to:</span>{" "}
            <a
              href={link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {link_url}
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Status and Actions */}
      <div className="flex items-center justify-between">
        {/* Status */}
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <span className="text-gray-600">Status:</span>
          {is_active ? (
            <span className="flex items-center gap-1 text-green-600">
              <FiEye className="h-4 w-4" /> Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-600">
              <FiEyeOff className="h-4 w-4" /> Inactive
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 text-xs">
          <button
            className="flex items-center gap-2 px-3 py-2 border text-blue-600 font-semibold rounded-md transition-colors duration-200 hover:bg-blue-600 hover:text-white"
          >
            <FiEdit className="h-4 w-4" /> Edit
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 border text-red-600 font-semibold rounded-md transition-colors duration-200 hover:bg-red-600 hover:text-white"
          >
            <FiTrash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
