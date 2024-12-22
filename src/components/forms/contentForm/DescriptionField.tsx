import HTMLEditor from "@/components/modals/HTMLEditor";

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ value, onChange }) => {
  return <HTMLEditor value={value} onChange={onChange} />;
};

export default DescriptionField;
