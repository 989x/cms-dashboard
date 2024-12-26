// cms-dashboard/src/app/content/add/page.tsx

"use client";

import { useState } from "react";
import ContentForm from "@/components/forms/contentForm";
import { ContentItem } from "@/types/shared.types";

const AddContentPage = () => {
  const [formData, setFormData] = useState<ContentItem>({
    _id: "",
    is_active: true,
    link_url: "",
    content_type: "news", // Default to "news"
    cover_images: [], // Array of URLs for cover images
    embedded_images: [], // Optional field for additional images
    title: "",
    description: "",
    content_tags: [],
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleChange = (field: keyof ContentItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Form data logged to console!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Add New Content</h1>
      <ContentForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddContentPage;
