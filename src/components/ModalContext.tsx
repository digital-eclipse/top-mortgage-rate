import React, { createContext, useContext, useState } from 'react';
import { X } from 'lucide-react';

// Extend ModalContext to include modalTitle and modalContent
const ModalContext = createContext({
  setModalContent: (content: React.ReactNode) => {},
  setModalTitle: (title: string) => {},
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: false,
  modalContent: null as React.ReactNode | null, // Added modalContent
  modalTitle: null as string | null, // Added modalTitle
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setModalTitle(null);
  };

  return (
    <ModalContext.Provider value={{ setModalContent, setModalTitle, openModal, closeModal, isModalOpen, modalContent, modalTitle }}>
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 md:p-8 w-11/12 max-w-3xl mx-auto relative overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-black">{modalTitle}</h2>
              <button className="text-black" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            {/* Modal Content */}
            <div className="text-left space-y-4 text-sm">{modalContent}</div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
