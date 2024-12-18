export interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  status: 'visible' | 'hidden';
  contentType: 'news' | 'article';
  title: string;
  description: string;
  tags: string[] | null;
  onSave: (data: {
    title: string;
    description: string;
    tags: string[];
    status: 'visible' | 'hidden';
    contentType: 'news' | 'article';
  }) => void;
}

export interface BusinessEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
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
    id: string;
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
