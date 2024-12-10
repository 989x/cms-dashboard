import { FiBook, FiFileText } from "react-icons/fi";

interface GeneralFormProps {
  contentType: string;
  onContentTypeChange: (value: "news" | "article") => void;
  status: string;
  onStatusChange: (value: "visible" | "hidden") => void;
  title: string;
  onTitleChange: (value: string) => void;
  tags: string;
  onTagsChange: (value: string) => void;
}

const ContentGeneralForm: React.FC<GeneralFormProps> = ({
  contentType,
  onContentTypeChange,
  status,
  onStatusChange,
  title,
  onTitleChange,
  tags,
  onTagsChange,
}) => {
  return (
    <>
      {/* Content Type Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-medium">
        <label className="block">Content Type</label>
        <div className="flex gap-3">
          <button
            type="button"
            className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
              contentType === "article" ? "bg-indigo-600 text-white" : "border-gray-300 text-gray-700"
            }`}
            onClick={() => onContentTypeChange("article")}
          >
            <FiBook className="h-5 w-5" />
            Article
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
              contentType === "news" ? "bg-indigo-600 text-white" : "border-gray-300 text-gray-700"
            }`}
            onClick={() => onContentTypeChange("news")}
          >
            <FiFileText className="h-5 w-5" />
            News
          </button>
        </div>
      </div>

      {/* Status Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-end gap-4">
        <label className="block font-medium">Status</label>
        <div className="flex bg-gray-100 rounded-full p-1 gap-1">
          <button
            type="button"
            className={`flex-1 px-4 py-2 font-medium text-center rounded-full ${
              status === "visible" ? "bg-green-500 text-white" : "bg-transparent text-gray-700"
            }`}
            onClick={() => onStatusChange("visible")}
          >
            Visible
          </button>
          <button
            type="button"
            className={`flex-1 px-4 py-2 font-medium text-center rounded-full ${
              status === "hidden" ? "bg-red-500 text-white" : "bg-transparent text-gray-700"
            }`}
            onClick={() => onStatusChange("hidden")}
          >
            Hidden
          </button>
        </div>
      </div>

      {/* Title Field */}
      <div className="mb-5">
        <label className="block font-medium mb-3">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full p-2.5 border rounded-lg"
        />
      </div>

      {/* Tags Field */}
      <div className="mb-5">
        <label className="block font-medium mb-3">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="Enter tags separated by commas (e.g., Cloud, Service, Technology)"
          className="w-full p-2.5 border rounded-lg"
        />
      </div>
    </>
  );
};

export default ContentGeneralForm;
