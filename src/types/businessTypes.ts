export interface BusinessItem {
  id: string | number;
  title: string;
  image: string;
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  date: string;
  description: string;
  link: string;
  views: number;
  status: "visible" | "hidden";
  type: "general" | "franchise";
  branches: number;
}

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
  link: string;
  onSave: (data: {
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
    link: string;
  }) => void;
}
