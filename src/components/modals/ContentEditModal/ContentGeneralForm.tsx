import { FiBook, FiFileText } from "react-icons/fi";

interface GeneralFormProps {
  contentType: "news" | "article";
  onContentTypeChange: (value: "news" | "article") => void;
  isActive: boolean;
  onIsActiveChange: (value: boolean) => void;
  title: string;
  onTitleChange: (value: string) => void;
  tags: string;
  onTagsChange: (value: string) => void;
}

const ContentGeneralForm: React.FC<GeneralFormProps> = ({
  contentType,
  onContentTypeChange,
  isActive,
  onIsActiveChange,
  title,
  onTitleChange,
  tags,
  onTagsChange,
}) => {
  const handleContentTypeChange = (type: "news" | "article") => {
    onContentTypeChange(type);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center mb-5 gap-4">
        {/* Content Type */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-medium">
          <label className="block">Content Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-[10px] rounded-lg transition ${
                contentType === "article"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
              }`}
              onClick={() => handleContentTypeChange("article")}
            >
              <FiBook className="h-5 w-5" />
              Article
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-[10px] rounded-lg transition ${
                contentType === "news"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
              }`}
              onClick={() => handleContentTypeChange("news")}
            >
              <FiFileText className="h-5 w-5" />
              News
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-end gap-4">
          <label className="block font-medium">Active Status</label>
          <div className="flex bg-gray-100 rounded-full p-1 gap-1">
            <button
              type="button"
              className={`flex-1 px-4 py-2 font-medium text-center rounded-full transition ${
                isActive ? "bg-green-500 text-white" : "bg-transparent text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onIsActiveChange(true)}
            >
              Active
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2 font-medium text-center rounded-full transition ${
                !isActive ? "bg-red-500 text-white" : "bg-transparent text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onIsActiveChange(false)}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Title Field */}
      <div className="mb-5">
        <label className="block font-medium mb-3">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full p-2.5 border rounded-lg focus:ring focus:ring-indigo-300"
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
          className="w-full p-2.5 border rounded-lg focus:ring focus:ring-indigo-300"
        />
      </div>
    </>
  );
};

export default ContentGeneralForm;
