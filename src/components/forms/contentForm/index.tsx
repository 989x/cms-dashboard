import React, { useState } from "react";
import DescriptionField from "./DescriptionField";
import ImageUrlField from "./ImageUrlField";
import ContentCard from "@/components/cards/ContentCard";
import { FiBook, FiFileText } from "react-icons/fi";

interface ContentFormProps {
  formData: {
    _id: string;
    is_active: boolean;
    link_url: string;
    content_type: "news" | "article";
    title: string;
    description: string;
    tags: string[];
    image_url: string;
    views: number;
    created_at: string;
    updated_at: string;
  };
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  previewMode?: boolean;
}

const ContentForm: React.FC<ContentFormProps> = ({
  formData,
  onChange,
  onSubmit,
  previewMode = true,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [pendingImageUrl, setPendingImageUrl] = useState(formData.image_url);

  const handleInputChange = (field: string, value: any) => {
    onChange(field, value);
  };

  const handleImageApply = () => {
    onChange("image_url", pendingImageUrl); // Update the formData image_url
    handleRefresh();
  };

  const handleRefresh = () => {
    // ใช้วิธี "Key-based Component Re-rendering" หรือ "Triggering Re-render with Key Prop"
    // บังคับให้ React รู้จักการเปลี่ยนแปลงด้วยการเปลี่ยน key
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Post Preview */}
      <div className="mb-6">
        <ContentCard
          key={refreshKey} // ใช้ key เพื่อ trigger การ re-render
          {...formData}
          previewMode={previewMode}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Link URL and Content Type in a Single Row */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Link URL Field */}
        <div>
          <label htmlFor="link_url" className="block font-medium text-gray-700 mb-3">
            Link URL
          </label>
          <input
            id="link_url"
            type="url"
            value={formData.link_url}
            onChange={(e) => handleInputChange("link_url", e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Content Type Field */}
        <div>
          <label className="block font-medium text-gray-700 mb-3">Content Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${
                formData.content_type === "article"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleInputChange("content_type", "article")}
            >
              <FiBook className="h-5 w-5" />
              Article
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${
                formData.content_type === "news"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleInputChange("content_type", "news")}
            >
              <FiFileText className="h-5 w-5" />
              News
            </button>
          </div>
        </div>
      </div>

      {/* Image URL Field */}
      <ImageUrlField
        value={pendingImageUrl}
        onChange={(value) => setPendingImageUrl(value)} // Update pending image URL
        onApply={handleImageApply} // Apply changes and refresh ContentCard
      />

      {/* Title Field */}
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium text-gray-700 mb-3">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Description Field */}
      <DescriptionField
        value={formData.description}
        onChange={(value) => handleInputChange("description", value)}
      />

      {/* Tags Field */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-3">Tags</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Add a tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const tag = e.currentTarget.value.trim();
                if (tag && !formData.tags.includes(tag)) {
                  handleInputChange("tags", [...formData.tags, tag]);
                  e.currentTarget.value = "";
                }
              }
            }}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() =>
                  handleInputChange(
                    "tags",
                    formData.tags.filter((t) => t !== tag)
                  )
                }
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContentForm;
