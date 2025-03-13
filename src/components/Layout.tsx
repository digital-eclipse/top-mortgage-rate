"use client";  // Marks the component as a Client Component

import React, { useState, ReactNode } from 'react';
import {useRouter} from 'next/navigation'
import Image from 'next/image';
import Footer from '@/components/Footer';
import Logo from '../../public/images/logo.svg';
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';
import ContactForm from '@/components/ContactForm';  // Import ContactForm component
import Script from 'next/script'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const [openForm, setOpenForm] = useState(false); // For showing contact form
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const router = useRouter()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closePhoneModal = () => {
    setIsPhoneModalOpen(false);
  }

  const sendEmail = () => {
    window.location.href = 'mailto:info@getabettermortgage.com';  // Opens email client
  };

  const togglePhoneModal = () => {
    setIsPhoneModalOpen(!isPhoneModalOpen);
  };

  const openContactForm = () => {
    router.push('/contact-form');
  };

  const closeContactForm = () => {
    setOpenForm(false);  // Closes the contact form modal
  };

  return (
    
    <div className="flex-grow flex flex-col w-full">
          <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-16928080676"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16928080676');
          `,
        }}
      />
    </>
      {/* Upper Navbar */}
      {/* <nav className="w-full bg-[#E1C692] py-1 contact-bar flex items-center justify-center">
        <div className="px-8 flex max-w-[1280px] mx-auto w-full flex-row items-center justify-center">
          <div className="flex flex-row justify-between w-full items-center h-full">
            <div className="space-x-2 items-center flex">
              <Link href="https://maps.app.goo.gl/tcn16U5CycArx6Rt5" target="_blank">
                <MapPin size={20} strokeWidth={2} className="w-5 h-5 text-white cursor-pointer" />
              </Link>
              <button onClick={togglePhoneModal}>
                <Phone size={20} strokeWidth={2} className="w-5 h-5 text-white cursor-pointer" />
              </button>
              <button onClick={sendEmail}>
                <Mail size={20} strokeWidth={2} className="w-5 h-5 text-white cursor-pointer" />
              </button>
              <Link href="https://www.facebook.com/GetABetterMortgage" target="_blank">
                <Facebook size={20} strokeWidth={2} className="w-5 h-5 text-white cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </nav> */}

      <nav className="py-5 px-4 md:px-8 flex items-center justify-between z-100 w-full max-w-[1280px] mx-auto">
        {/* Left Section: Logo and Links */}
        <div className="flex items-center">
          <Link href={"/"} className="flex">
            <Image 
              src={require("../../public/images/logo.png")} 
              alt="Top Mortgage Rates " 
              width={50} 
              height={50} 
              className="cursor-pointer transform hover:scale-110 duration-300"
            />
            <h1 className='text-[#083784] text-5xl font-helvetica font-bold'>
              TMR
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 ml-6 items-center text-md">
            <Link href="/mortgages" className="cursor-pointer transform hover:scale-110 duration-300">
              Mortgages
            </Link>
            <Link href="/tools" className="cursor-pointer transform hover:scale-110 duration-300">
              Tools
            </Link>
            <Link href="/about" className="cursor-pointer transform hover:scale-110 duration-300">
              About
            </Link>
            <Link href="/blog" className="cursor-pointer transform hover:scale-110 duration-300">
              Blog
            </Link>
          </div>
        </div>

        {/* Right Section: Contact, Apply Now, and App Buttons */}
        <div className="flex space-x-4 items-center justify-end flex-1">
          {/* Contact Us Button (Visible only on large screens) */}
          <button
            onClick={openContactForm}  
            className="bg-black text-[#FFFFFF] py-2 px-4 rounded-lg border border-black transition duration-300 ease-in-out hidden lg:flex items-center hover:bg-[#FFFFFF] hover:text-black hover:border-black"
          >
            <p className="inline-block text-md font-semibold">CONTACT US</p>
          </button>


          {/* Get Our App Button (Always visible) */}
          {/* <Link href="https://www.mccapp.ca/app/mccrobert-distefano#showTextInput" target='_blank' passHref>
            <button
              className="bg-[#E1C692] text-white py-2 px-4 rounded-lg border border-white transition duration-300 ease-in-out flex items-center hover:bg-white hover:border-[#E1C692] hover:text-[#E1C692]"
            >
              <p className="inline-block text-sm md:text-md font-semibold">GET OUR APP</p>
            </button>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-4">
          <button onClick={toggleMenu} className="text-xl">
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-24 right-0 bg-white shadow-lg flex flex-col items-start p-4 space-y-2 mr-4 z-50"> {/* Higher z-index */}
            <Link href="/mortgages" className="cursor-pointer text-md w-full" onClick={() => setMenuOpen(false)}>
              Mortgages
            </Link>
            <Link href="/tools" className="cursor-pointer text-md w-full" onClick={() => setMenuOpen(false)}>
              Tools
            </Link>
            <Link href="/about" className="cursor-pointer text-md w-full" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/blog" className="cursor-pointer text-md w-full" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </div>
        )}
      </nav>

      
      {/* Contact Form Modal */}
      {openForm && (
        <ContactForm onClose={closeContactForm} />
      )}

      {/* Content */}
      <main className="w-full flex flex-col items-center justify-center font-montserrat flex-1">
        {children}
      </main>

      {/* Footer */}

      {isPhoneModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4 relative">
            
            {/* Close Button */}
            <button onClick={closePhoneModal} className="absolute top-2 right-4 text-gray-700 hover:text-black">
              <span className="text-2xl font-semibold">&times;</span>
            </button>

            <h2 className="text-xl font-bold text-center mb-4">Get In Touch</h2>

            {/* Phone Icon and Phone Number */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Phone size={28} className="text-black" />
              <a href="tel:+14162529000" className="text-gray-800 text-2xl font-bold underline">
                (416) 252-9000
              </a>
            </div>

            {/* Call Button */}
            <div className="w-full flex justify-center">
              <a href="tel:+14162529000" className="bg-black text-white py-2 px-10 rounded-lg hover:bg-blue-700 transition-all">
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
