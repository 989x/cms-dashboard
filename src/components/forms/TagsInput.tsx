'use client';

import { useState } from 'react';

interface TagsInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, onAddTag, onRemoveTag }) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      onAddTag(tagInput.trim());
      setTagInput('');
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="tags" className="mb-3 text-sm font-medium">
        Tags
      </label>
      <div className="flex gap-4 items-center">
        <input
          id="tags"
          type="text"
          placeholder="technology"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 flex-1"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-gray-200 text-black px-3 py-1 rounded-lg flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-red-600"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
