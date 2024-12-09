export type BusinessItem = {
  id: any;
  title: string;
  date: string;
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  description: string;
  image: string;
  link: string;
  views: number;
  status: 'visible' | 'hidden';
  type: 'general' | 'franchise';
  branches: number;
};

export interface BusinessEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  branches: number;
  status: "visible" | "hidden";
  type: "general" | "franchise";
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  image: string;
  date: string;
  onSave: (data: {
    id: string;
    title: string;
    description: string;
    branches: number;
    status: "visible" | "hidden";
    type: "general" | "franchise";
  }) => void;
}
