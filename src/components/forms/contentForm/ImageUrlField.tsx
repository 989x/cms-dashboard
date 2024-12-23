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
      <div className="flex items-center gap-4">
        <input
          id="imageUrl"
          type="url"
          value={localValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          type="button"
          onClick={onApply}
          className="px-5 py-2 bg-white text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ImageUrlField;
