import React, { useState } from 'react';
import { useModal } from './ModalContext';
import ApplyButton from '@/components/ApplyButton';

interface MortgagePopupProps {
  title: string;
  description: string;
  details: React.ReactNode;
}

const MortgagePopup: React.FC<MortgagePopupProps> = ({ title, description, details }) => {
  const { closeModal } = useModal(); // Get the close modal function
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-6 md:p-12 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      {/* Popup Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <button onClick={closeModal} className="text-black">
          Close
        </button>
      </div>

      {/* Popup Content */}
      <p className="text-md md:text-lg text-gray-700 mb-4">{description}</p>
      <div className="text-sm md:text-md mb-6">{details}</div>

      {/* Dropdown Section */}
      <div className="mb-4">
        <label className="block text-md font-semibold mb-2">
          What stage are you in?
        </label>
        <select
          onChange={handleDropdownChange}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Select an option</option>
          <option value="researching">I&apos;m still researching</option>
          <option value="considering">I&apos;m considering my options</option>
          <option value="ready">I am ready now</option>
        </select>
      </div>

      {/* Apply Now Prompt */}
      {selectedOption === 'ready' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
          <p className="text-sm md:text-md">
            If you are ready to move forward, it would be beneficial to submit an
            application now, as it will help our team to get the ball rolling quicker.
            All your information is strictly confidential, and no credit checks will be run
            without your consent. Click the “Apply Now” button below to be taken to our
            secure application site.
          </p>
          <div className="flex justify-end mt-4">
            <ApplyButton text="APPLY NOW" />
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form className="mt-6">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Your Name</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Email Address</label>
          <input
            type="email"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Message</label>
          <textarea
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Enter your message"
            rows={4}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-black text-white py-2 px-6 rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MortgagePopup;
