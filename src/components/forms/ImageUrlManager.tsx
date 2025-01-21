import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';

interface ImageUrlManagerProps {
  coverImages: string[];
  onChange: (type: 'cover', images: string[]) => void;
}

const ImageUrlManager: React.FC<ImageUrlManagerProps> = ({
  coverImages,
  onChange,
}) => {
  const [localCoverImages, setLocalCoverImages] = useState<string[]>(
    coverImages.length > 0 ? coverImages : ['']
  );

  useEffect(() => {
    if (localCoverImages.length === 0) {
      setLocalCoverImages(['']);
    }
  }, [localCoverImages]);

  const handleAddImage = () => {
    if (localCoverImages.length < 5) {
      const updatedImages = [...localCoverImages, ''];
      setLocalCoverImages(updatedImages);
      onChange('cover', updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (localCoverImages.length > 1) {
      const updatedImages = localCoverImages.filter((_, i) => i !== index);
      setLocalCoverImages(updatedImages);
      onChange('cover', updatedImages);
    }
  };

  const handleUpdateImage = (index: number, url: string) => {
    const updatedImages = [...localCoverImages];
    updatedImages[index] = url;
    setLocalCoverImages(updatedImages);
    onChange('cover', updatedImages);
  };

  return (
    <div className='space-y-6'>
      <div>
        <label className='block text-[15px] font-medium text-gray-700 mb-4'>
          Cover Images
        </label>
        <div className='space-y-3'>
          {localCoverImages.map((image, index) => (
            <div key={index} className='flex items-center gap-4'>
              <input
                type='url'
                value={image}
                onChange={(e) => handleUpdateImage(index, e.target.value)}
                placeholder={`Cover Image URL ${index + 1}`}
                className='block w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
              />
              {localCoverImages.length > 1 && (
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='text-red-600 hover:text-red-800'
                  title='Remove cover image'
                >
                  <FiTrash2 className='h-5 w-5' />
                </button>
              )}
            </div>
          ))}
        </div>
        {localCoverImages.length < 5 && (
          <button
            type='button'
            onClick={handleAddImage}
            className='mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100'
          >
            Add Cover Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUrlManager;
