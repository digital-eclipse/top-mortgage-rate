import React from 'react';
import Link from 'next/link';
interface ApplyButtonProps {
  text: string;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ text }) => {
  return (
    <Link
      href="https://velocity-client.newton.ca/en/client/journey/home?shortCode=mpfnccqdtgp8"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black text-lg md:text-xl text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:bg-white hover:text-black hover:border-white border border-black duration-300"
    >
      {text}
    </Link>
  );
};

export default ApplyButton;
