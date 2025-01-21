import HTMLEditor from '../../forms/HTMLManage/HTMLEditor';

interface BusinessDescFormProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

const BusinessDescForm: React.FC<BusinessDescFormProps> = ({
  description,
  onDescriptionChange,
}) => {
  return <HTMLEditor value={description} onChange={onDescriptionChange} />;
};

export default BusinessDescForm;
