import { useState } from "react";
import styles from "@/utils/HTMLPreview.module.css";

interface DescriptionFormProps {
  value: string;
  onChange: (value: string) => void;
}

const ContentDescForm: React.FC<DescriptionFormProps> = ({ value, onChange }) => {
  const [previewMode, setPreviewMode] = useState(false);

  const handleClearContent = () => {
    onChange("");
  };

  const handleSwitchToEditMode = () => {
    setPreviewMode(false);
  };

  const handleSwitchToPreviewMode = () => {
    setPreviewMode(true);
  };

  return (
    <div className="pt-2">
      <div className="mb-5 font-medium flex justify-between items-center">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSwitchToEditMode}
            className={`px-3 py-2 rounded-md ${
              !previewMode ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Edit HTML
          </button>
          <button
            type="button"
            onClick={handleSwitchToPreviewMode}
            className={`px-3 py-2 rounded-md ${
              previewMode ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Preview HTML
          </button>
        </div>
        <button
          type="button"
          onClick={handleClearContent}
          className="px-3 py-2 bg-red-500 text-white rounded-md"
        >
          Clear Content
        </button>
      </div>
      {previewMode ? (
        <div
          className={`${styles["entry-content"]} p-3 border rounded-lg bg-gray-50 overflow-auto`}
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
