import React from "react";

interface ImageUrlFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUrlField: React.FC<ImageUrlFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label htmlFor="imageUrl" className="block text-[15px] font-medium text-gray-700">
        Image URL
      </label>
      <input
        id="imageUrl"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default ImageUrlField;
