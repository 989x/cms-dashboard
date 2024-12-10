interface BusinessDescFormProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

const BusinessDescForm: React.FC<BusinessDescFormProps> = ({
  description,
  onDescriptionChange,
}) => {
  return (
    <div className="mb-5">
      <label className="block font-medium mb-3">Description</label>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full p-2.5 border rounded-lg"
        rows={16}
        placeholder="Enter description here"
      ></textarea>
    </div>
  );
};

export default BusinessDescForm;
