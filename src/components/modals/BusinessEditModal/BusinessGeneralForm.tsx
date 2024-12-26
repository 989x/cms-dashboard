import { FiGlobe, FiShare2 } from "react-icons/fi";

interface BusinessGeneralFormProps {
  title: string;
  onTitleChange: (value: string) => void;
  branches: number;
  onBranchesChange: (value: number) => void;
  link: string;
  onLinkChange: (value: string) => void;
  type: "general" | "franchise";
  onTypeChange: (value: "general" | "franchise") => void;
  isActive: boolean;
  onIsActiveChange: (value: boolean) => void;
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
  isActive,
  onIsActiveChange,
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
              className={`flex items-center gap-2.5 px-3 py-[10px] bg-gray-100 rounded-lg ${
                type === "general" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700"
              }`}
              onClick={() => onTypeChange("general")}
            >
              <FiGlobe className="h-[18px] w-[18px]" />
              General
            </button>
            <button
              type="button"
              className={`flex items-center gap-2.5 px-3 py-[10px] bg-gray-100 rounded-lg ${
                type === "franchise" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700"
              }`}
              onClick={() => onTypeChange("franchise")}
            >
              <FiShare2 className="h-[18px] w-[18px]" />
              Franchise
            </button>
          </div>
        </div>

        {/* Active Status Field */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-end gap-4">
          <label className="block font-medium">Status</label>
          <div className="flex bg-gray-100 rounded-full p-1 gap-1">
            <button
              type="button"
              className={`flex-1 px-4 py-2 font-medium text-center rounded-full ${
                isActive ? "bg-green-500 text-white" : "bg-transparent text-gray-700"
              }`}
              onClick={() => onIsActiveChange(true)}
            >
              Active
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2 font-medium text-center rounded-full ${
                !isActive ? "bg-red-500 text-white" : "bg-transparent text-gray-700"
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
          className="w-full p-2.5 border rounded-lg"
        />
      </div>

      {/* Branch and Link Fields */}
      <div className="mb-5 flex items-start gap-4">
        {/* Branch Section */}
        <div className="flex-shrink-0" style={{ flexBasis: "20%" }}>
          <label className="block font-medium mb-2">Branches</label>
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
