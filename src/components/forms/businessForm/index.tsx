import React, { useState } from "react";
import BusinessCard from "@/components/cards/BusinessCard";
import ImageUrlManager from "./ImageUrlManager";
import ContactFields from "./ContactFields";
import { BusinessItem } from "@/types/shared.types";
import HTMLEditor from "@/components/forms/HTMLManage/HTMLEditor";

interface BusinessFormProps {
  formData: BusinessItem;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  previewMode?: boolean;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  onChange,
  onSubmit,
  previewMode = true,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleInputChange = (field: string, value: any) => {
    onChange(field, value);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* Business Preview */}
      <div className="mb-6">
        <BusinessCard
          key={refreshKey}
          {...formData}
          previewMode={previewMode}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Business Type and Link URL */}
      <div className="mb-4 flex gap-8">
        <div>
          <label className="block text-[15px] font-medium text-gray-700 mb-4">Business Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                formData.business_type === "general"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-transparent text-gray-700 border"
              }`}
              onClick={() => handleInputChange("business_type", "general")}
            >
              General
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                formData.business_type === "franchise"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-transparent text-gray-700 border"
              }`}
              onClick={() => handleInputChange("business_type", "franchise")}
            >
              Franchise
            </button>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="link_url" className="block text-[15px] font-medium text-gray-700 mb-4">
            Link URL
          </label>
          <input
            id="link_url"
            type="url"
            value={formData.link_url}
            onChange={(e) => handleInputChange("link_url", e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Image Manager */}
      <ImageUrlManager
        images={formData.images}
        onChange={(updatedImages) => handleInputChange("images", updatedImages)}
      />

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-[15px] font-medium text-gray-700 mb-4">
          Business Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <HTMLEditor
          value={formData.description}
          onChange={(value) => handleInputChange("description", value)}
        />
      </div>

      {/* Contacts */}
      <ContactFields
        contacts={formData.contacts}
        onChange={(index, field, value) => {
          const updatedContacts = [...formData.contacts];
          updatedContacts[index] = { ...updatedContacts[index], [field]: value };
          handleInputChange("contacts", updatedContacts);
        }}
        onAdd={() => {
          if (formData.contacts.length < 3) {
            handleInputChange("contacts", [
              ...formData.contacts,
              { email: "", name: "", phone: "" },
            ]);
          }
        }}
        onRemove={(index) => {
          const updatedContacts = formData.contacts.filter((_, i) => i !== index);
          handleInputChange("contacts", updatedContacts);
        }}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full inline-flex justify-center items-center px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600"
      >
        Create Business
      </button>
    </form>
  );
};

export default BusinessForm;
