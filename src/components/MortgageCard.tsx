import React from 'react';
import { useModal } from './ModalContext';
import CustomSolutionsForm from './popup/CustomSolutions';
import {useRouter} from 'next/navigation';
interface CardProps {
  title: string;
  subtitle: string;
  content: React.ReactNode; // Summary content shown on the card
  subContent: React.ReactNode; // Detailed content shown in the modal popup
  image: React.ReactNode; // Image for the card
}

const Card: React.FC<CardProps> = ({ title, subtitle, content, subContent, image }) => {
  const { setModalTitle, setModalContent, openModal } = useModal();
  const router = useRouter(); // Initialize useRouter

  const handleLearnMoreClick = () => {
    router.push('/contact-form'); // Redirect to /contact-form
  };

  return (
    <div className="bg-[#F5F5F5] shadow-lg rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-start justify-center max-w-5xl mx-auto relative">
      
      {/* Left Side: Text Content */}
      <div className="flex flex-col w-full md:w-3/4 mb-6 md:mb-0 text-left items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">{title}</h2>
        <p className="text-md md:text-lg text-black mb-4">{subtitle}</p>
        <div className="text-sm md:text-md text-black mb-6">
          {content} {/* Display summary content on the card */}
        </div>
                {/* Learn More Button */}
          <button
          className="bg-black text-lg md:text-xl text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:bg-white hover:text-black hover:border-white border border-black duration-300"
          onClick={handleLearnMoreClick}
        >
          LEARN MORE
        </button>
      </div>
    </div>
  );
};

export default Card;
