import HTMLEditor from '../HTMLEditor';

interface DescriptionFormProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

const ContentDescForm: React.FC<DescriptionFormProps> = ({
  description,
  onDescriptionChange,
}) => {
  return <HTMLEditor value={description} onChange={onDescriptionChange} />;
};

export default ContentDescForm;
