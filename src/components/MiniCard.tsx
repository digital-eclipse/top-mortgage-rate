import React from 'react';
import { useModal } from './ModalContext';
import {useRouter} from 'next/navigation';
interface MiniCardProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

const MiniCard: React.FC<MiniCardProps> = ({ title, description, content }) => {
  const { setModalTitle, setModalContent, openModal } = useModal();
  const router = useRouter(); // Initialize useRouter

  const handleLearnMoreClick = () => {
    router.push('/contact-form'); // Redirect to /contact-form
  };

  return (
    <div
      className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto mb-4 flex flex-col md:flex-row items-start md:items-center justify-between"
    >
      <div className="flex flex-col text-left space-y-2 flex-1">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <button
        className="bg-black text-white text-sm font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition-all ml-auto md:ml-6 mt-4 md:mt-0"
        onClick={handleLearnMoreClick}
        style={{ minWidth: '120px' }} // Ensure consistent button width
      >
        LEARN MORE
      </button>
    </div>
  );
};

export default MiniCard;
