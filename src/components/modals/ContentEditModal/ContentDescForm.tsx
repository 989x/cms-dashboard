interface DescriptionFormProps {
  value: string;
  onChange: (value: string) => void;
}

const ContentDescForm: React.FC<DescriptionFormProps> = ({ value, onChange }) => {
  return (
    <div className="mb-5">
      <label className="block font-medium mb-3">Description</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 border rounded-lg"
        rows={16}
        placeholder="Enter HTML content here"
      ></textarea>
    </div>
  );
};

export default ContentDescForm;
