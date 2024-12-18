import { useState } from "react";
import { BusinessEditModalProps } from "@/types/edit.types";
import { FiX, FiSave, FiXCircle } from "react-icons/fi";
import BusinessContactForm from "./BusinessContactForm";
import BusinessDescForm from "./BusinessDescForm";
import BusinessGeneralForm from "./BusinessGeneralForm";

const BusinessEditModal: React.FC<BusinessEditModalProps> = ({
  isOpen, onClose,
  id, title, link, description, branches, status, type, contacts,
  onSave,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editBranches, setEditBranches] = useState(branches);
  const [editLink, setEditLink] = useState(link);
  const [editStatus, setEditStatus] = useState(status);
  const [editType, setEditType] = useState(type);
  const [editContacts, setEditContacts] = useState(contacts || []);

  const handleAddContact = () => {
    setEditContacts([...editContacts, { name: "", phone: "", email: "" }]);
  };

  const handleRemoveContact = (index: number) => {
    setEditContacts(editContacts.filter((_, i) => i !== index));
  };

  const handleContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = [...editContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setEditContacts(updatedContacts);
  };

  const handleSave = () => {
    const payload = {
      id,
      title: editTitle,
      description: editDescription,
      branches: editBranches,
      status: editStatus,
      type: editType,
      contacts: editContacts,
      link: editLink,
    };
  
    console.log("Saving business data:", payload);
    onSave(payload);
  };  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3">
      <div className="bg-white rounded-xl p-5 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="overflow-y-auto h-full text-sm">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold flex items-center gap-3">
              Edit Business
              <span className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded">
                ID: {id}
              </span>
            </h2>
            <button onClick={onClose} className="text-gray-800" aria-label="Close">
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <BusinessGeneralForm
              title={editTitle}
              onTitleChange={setEditTitle}
              branches={editBranches}
              onBranchesChange={setEditBranches}
              link={editLink}
              onLinkChange={setEditLink}
              type={editType}
              onTypeChange={setEditType}
              status={editStatus}
              onStatusChange={setEditStatus}
            />
            <BusinessContactForm
              contacts={editContacts}
              onAddContact={handleAddContact}
              onRemoveContact={handleRemoveContact}
              onContactChange={handleContactChange}
            />
            <BusinessDescForm
              description={editDescription}
              onDescriptionChange={setEditDescription}
            />

            <div className="flex justify-end text-sm font-medium gap-3 mt-8">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg"
              >
                <FiSave className="h-5 w-5" />
                Save
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 bg-gray-200 rounded-lg text-gray-700"
                onClick={onClose}
              >
                <FiXCircle className="h-5 w-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessEditModal;
