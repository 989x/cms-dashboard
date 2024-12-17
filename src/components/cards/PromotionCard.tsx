import React from "react";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

interface PromotionCardProps {
  title: string;
  imageUrl: string;
  linkUrl: string;
  activeFrom: string;
  activeUntil: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  imageUrl,
  linkUrl,
  activeFrom,
  activeUntil,
}) => {
  return (
    <div className="block border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-lg line-clamp-1">{title}</h2>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <div className="flex items-center gap-1">
            <AiOutlineCalendar className="h-4 w-4" />
            <span>From: {new Date(activeFrom).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineCalendar className="h-4 w-4" />
            <span>Until: {new Date(activeUntil).toLocaleDateString()}</span>
          </div>
        </div>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mt-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          Learn More <FiArrowRight />
        </a>
      </div>
    </div>
  );
};

export default PromotionCard;
