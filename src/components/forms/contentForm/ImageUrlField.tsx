import { useState } from "react";

interface ImageUrlFieldProps {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
}

const ImageUrlField: React.FC<ImageUrlFieldProps> = ({ value, onChange, onApply }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleInputChange = (url: string) => {
    setLocalValue(url);
    onChange(url); // Update parent component's value for preview
  };

  return (
    <div className="space-y-4">
      <label htmlFor="imageUrl" className="block text-[15px] font-medium text-gray-700">
        Image URL
      </label>
      <div className="flex items-center gap-2">
        <input
          id="imageUrl"
          type="url"
          value={localValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="button"
          onClick={onApply}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ImageUrlField;
