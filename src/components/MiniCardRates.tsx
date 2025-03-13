import React from 'react';
import { useModal } from './ModalContext';
interface MiniCardProps {
  title: string;
  title2: string;
  description: string;
  description2: string; 
  content: React.ReactNode;
  content2: React.ReactNode
}

const MiniCardRate: React.FC<MiniCardProps> = ({ title, description, content, title2, description2, content2 }) => {
  const { setModalTitle, setModalContent, openModal } = useModal();

  const handleLearnMoreClick = () => {
    setModalTitle(title);
    setModalContent(content);
    openModal();
  };

  return (
    <div
      className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto mb-4 flex flex-col md:flex-row items-start md:items-center justify-between"
    >
      <div className="flex flex-col text-center space-y-2 flex-1">
        <div className="flex flex-row justify-center items-center space-x-4">
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <h3 className="text-xl font-bold text-black">{title2}</h3>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
  
};

export default MiniCardRate;