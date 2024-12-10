import { useState } from "react";

interface DescriptionFormProps {
  value: string;
  onChange: (value: string) => void;
}

const ContentDescForm: React.FC<DescriptionFormProps> = ({ value, onChange }) => {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="mb-5">
      <label className="block font-medium mb-3">Description</label>
      <div className="mb-3 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          {previewMode ? "Edit HTML" : "Preview HTML"}
        </button>
      </div>
      {previewMode ? (
        <div
          className="p-3 border rounded-lg bg-gray-50 overflow-auto"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2.5 border rounded-lg"
          rows={16}
          placeholder="Enter HTML content here"
        ></textarea>
      )}
    </div>
  );
};

export default ContentDescForm;
