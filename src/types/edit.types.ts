export interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  _id: string;
  is_active: boolean;
  content_type: "news" | "article";
  title: string;
  description: string;
  tags: string[];
  onSave: (data: {
    title: string;
    description: string;
    tags: string[];
    is_active: boolean;
    content_type: "news" | "article";
  }) => void;
}

export interface BusinessEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  _id: string;
  title: string;
  description: string;
  branches: number;
  status: 'visible' | 'hidden';
  type: 'general' | 'franchise';
  contacts: {
    email: string;
    name: string;
    phone: string;
  }[];
  image: string;
  date: string;
  link: string;
  onSave: (data: {
    _id: string;
    title: string;
    description: string;
    branches: number;
    status: 'visible' | 'hidden';
    type: 'general' | 'franchise';
    contacts: {
      email: string;
      name: string;
      phone: string;
    }[];
    link: string;
  }) => void;
}
