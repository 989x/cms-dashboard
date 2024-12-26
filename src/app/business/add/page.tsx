// cms-dashboard/src/app/business/add/page.tsx

"use client";

import { useState } from "react";
import { BusinessItem } from "@/types/shared.types";
import BusinessForm from "@/components/forms/businessForm";

const AddBusiness = () => {
  const [formData, setFormData] = useState<BusinessItem>({
    _id: "",
    is_active: true,
    link_url: "",
    business_type: "general",
    cover_images: [], // Updated to align with shared.types.ts
    embedded_images: [], // Optional field
    title: "",
    description: "",
    contacts: [{ email: "", name: "", phone: "" }],
    views: 0,
    branches: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleInputChange = (field: keyof BusinessItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Created Business Item:", formData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Add New Business</h1>
      <BusinessForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default AddBusiness;
