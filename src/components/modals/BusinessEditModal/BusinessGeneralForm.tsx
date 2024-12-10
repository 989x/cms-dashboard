import { FiBriefcase, FiMapPin } from "react-icons/fi";

interface BusinessGeneralFormProps {
  title: string;
  onTitleChange: (value: string) => void;
  branches: number;
  onBranchesChange: (value: number) => void;
  link: string;
  onLinkChange: (value: string) => void;
  type: "general" | "franchise";
  onTypeChange: (value: "general" | "franchise") => void;
  status: "visible" | "hidden";
  onStatusChange: (value: "visible" | "hidden") => void;
}

const BusinessGeneralForm: React.FC<BusinessGeneralFormProps> = ({
  title,
  onTitleChange,
  branches,
  onBranchesChange,
  link,
  onLinkChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center mb-5 gap-4">
        {/* Type Field */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-medium">
          <label className="block">Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
                type === "general" ? "bg-indigo-600 text-white" : "border-gray-300 text-gray-700"
              }`}
              onClick={() => onTypeChange("general")}
            >
              <FiBriefcase className="h-5 w-5" />
              General
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-[10px] bg-gray-100 rounded-lg ${
                type === "franchise" ? "bg-indigo-600 text-white" : "border-gray-300 text-gray-700"
              }`}
              onClick={() => onTypeChange("franchise")}
            >
              <FiMapPin className="h-5 w-5" />
              Franchise
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

      {/* Branch and Link Fields */}
      <div className="mb-5 flex items-start gap-4">
        {/* Branch Section */}
        <div className="flex-shrink-0" style={{ flexBasis: "20%" }}>
          <label className="block font-medium mb-2">Branch</label>
          <input
            type="number"
            value={branches}
            onChange={(e) => onBranchesChange(Number(e.target.value))}
            className="w-full p-2.5 border rounded-lg"
            placeholder="Enter number of branches"
          />
        </div>

        {/* Link Section */}
        <div className="flex-grow">
          <label className="block font-medium mb-2">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => onLinkChange(e.target.value)}
            className="w-full p-2.5 border rounded-lg"
            placeholder="Enter link"
          />
        </div>
      </div>
    </>
  );
};

export default BusinessGeneralForm;
