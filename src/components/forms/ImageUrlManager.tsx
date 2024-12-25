import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

interface ImageUrlManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const ImageUrlManager: React.FC<ImageUrlManagerProps> = ({ images, onChange }) => {
  const [localImages, setLocalImages] = useState<string[]>(images.length > 0 ? images : [""]);

  useEffect(() => {
    // Ensure at least one image is always present
    if (localImages.length === 0) {
      setLocalImages([""]);
    }
  }, [localImages]);

  const handleAddImage = () => {
    if (localImages.length < 5) {
      const updatedImages = [...localImages, ""];
      setLocalImages(updatedImages);
      onChange(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (localImages.length > 1) {
      const updatedImages = localImages.filter((_, i) => i !== index);
      setLocalImages(updatedImages);
      onChange(updatedImages);
    }
  };

  const handleUpdateImage = (index: number, url: string) => {
    const updatedImages = [...localImages];
    updatedImages[index] = url;
    setLocalImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-[15px] font-medium text-gray-700">
        Manage Images
      </label>
      {localImages.map((image, index) => (
        <div key={index} className="flex items-center gap-4">
          <input
            type="url"
            value={image}
            onChange={(e) => handleUpdateImage(index, e.target.value)}
            placeholder={`Image URL ${index + 1}`}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {localImages.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="text-red-600 hover:text-red-800"
              title="Remove image"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
      {localImages.length < 5 && (
        <button
          type="button"
          onClick={handleAddImage}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Add Image
        </button>
      )}
    </div>
  );
};

export default ImageUrlManager;
