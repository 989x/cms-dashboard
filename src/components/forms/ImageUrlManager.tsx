import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

interface ImageUrlManagerProps {
  coverImages: string[];
  embeddedImages: string[];
  onChange: (type: "cover" | "embedded", images: string[]) => void;
}

const ImageUrlManager: React.FC<ImageUrlManagerProps> = ({
  coverImages,
  embeddedImages,
  onChange,
}) => {
  const [localCoverImages, setLocalCoverImages] = useState<string[]>(
    coverImages.length > 0 ? coverImages : [""]
  );
  const [localEmbeddedImages, setLocalEmbeddedImages] = useState<string[]>(
    embeddedImages.length > 0 ? embeddedImages : [""]
  );

  useEffect(() => {
    if (localCoverImages.length === 0) {
      setLocalCoverImages([""]);
    }
    if (localEmbeddedImages.length === 0) {
      setLocalEmbeddedImages([""]);
    }
  }, [localCoverImages, localEmbeddedImages]);

  const handleAddImage = (type: "cover" | "embedded") => {
    const images = type === "cover" ? localCoverImages : localEmbeddedImages;
    if (images.length < 5) {
      const updatedImages = [...images, ""];
      if (type === "cover") {
        setLocalCoverImages(updatedImages);
      } else {
        setLocalEmbeddedImages(updatedImages);
      }
      onChange(type, updatedImages);
    }
  };

  const handleRemoveImage = (type: "cover" | "embedded", index: number) => {
    const images = type === "cover" ? localCoverImages : localEmbeddedImages;
    if (images.length > 1) {
      const updatedImages = images.filter((_, i) => i !== index);
      if (type === "cover") {
        setLocalCoverImages(updatedImages);
      } else {
        setLocalEmbeddedImages(updatedImages);
      }
      onChange(type, updatedImages);
    }
  };

  const handleUpdateImage = (type: "cover" | "embedded", index: number, url: string) => {
    const images = type === "cover" ? localCoverImages : localEmbeddedImages;
    const updatedImages = [...images];
    updatedImages[index] = url;
    if (type === "cover") {
      setLocalCoverImages(updatedImages);
    } else {
      setLocalEmbeddedImages(updatedImages);
    }
    onChange(type, updatedImages);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[15px] font-medium text-gray-700 mb-4">Cover Images</label>
        <div className="space-y-3">
          {localCoverImages.map((image, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="url"
                value={image}
                onChange={(e) => handleUpdateImage("cover", index, e.target.value)}
                placeholder={`Cover Image URL ${index + 1}`}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              {localCoverImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage("cover", index)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove cover image"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        {localCoverImages.length < 5 && (
          <button
            type="button"
            onClick={() => handleAddImage("cover")}
            className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Add Cover Image
          </button>
        )}
      </div>

      <div>
        <label className="block text-[15px] font-medium text-gray-700 mb-4">Embedded Images</label>
        <div className="space-y-3">
          {localEmbeddedImages.map((image, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="url"
                value={image}
                onChange={(e) => handleUpdateImage("embedded", index, e.target.value)}
                placeholder={`Embedded Image URL ${index + 1}`}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              {localEmbeddedImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage("embedded", index)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove embedded image"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        {localEmbeddedImages.length < 5 && (
          <button
            type="button"
            onClick={() => handleAddImage("embedded")}
            className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Add Embedded Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUrlManager;
