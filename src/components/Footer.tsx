import { useState } from "react";
import Link from "next/link";
import CareerForm from './CareerForm'; // Import the CareerForm component
import ContactForm from './ContactForm'; // Import the ContactForm component
import Image from "next/image"; // For logos and image handling
import MortgageCentre from '../../public/images/mortgage-centre.png';
import AccreditedBusiness from '../../public/images/accredited-business.png';

const Footer = () => {
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false); // State to control Career form modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // State to control Contact form modal

  // Toggle Career Form Modal
  const toggleCareerModal = () => {
    setIsCareerModalOpen(!isCareerModalOpen);
  };

  // Toggle Contact Form Modal
  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  // Close modals
  const closeCareerModal = () => setIsCareerModalOpen(false);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <div>
    </div>
    // <section className="Footer w-full py-10 flex flex-col justify-center items-center border-t border-[#000000]">
    //   <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-start px-4 space-y-6 md:space-y-0">
        
    //     {/* Column 1: Business Info */}
    //     <div className="first-col flex flex-col w-full md:w-1/3 text-center md:text-left text-sm gap-2">
    //       <h2 className="font-bold text-xl">GET A BETTER MORTGAGE</h2>
    //       <p>642 The Queensway Main Floor</p>
    //       <p>Toronto, Ontario MBY 1K5</p>
    //       <p>Franchise Lic. # 10874</p>
    //       <p><strong>Phone:</strong> 416.252.9000</p>
    //       <p><strong>Fax:</strong> 647.352.9011</p>
    //       <p><strong>Email:</strong> <a href="mailto:info@getabettermortgage.com" className="hover:scale-105 transition duration-300 ease-in-out">info@getabettermortgage.com</a></p>
    //     </div>

    //     {/* Column 2: Links and Agent Login */}
    //     <div className="second-col w-full md:w-1/3 text-center">
    //       <div className="flex flex-col md:flex-row justify-center md:justify-between space-y-6 md:space-y-0 md:space-x-6">
    //         <div>
    //           <h3 className="font-bold">MORTGAGES</h3>
    //           <ul className="space-y-1 text-sm gap-2 cursor-pointer">
    //             <li>
    //               <Link href="/mortgages#new-homeowners" className="hover:scale-105 transition duration-300 ease-in-out">New Homebuyers</Link>
    //             </li>
    //             <li>
    //               <Link href="/mortgages#mortgage-refinance" className="hover:scale-105 transition duration-300 ease-in-out">Current Homeowners</Link>
    //             </li>
    //             <li>
    //               <Link href="/mortgages#custom-solutions" className="hover:scale-105 transition duration-300 ease-in-out">Custom Solutions</Link>
    //             </li>
    //             <li>
    //               <Link href="/tools" className="hover:scale-105 transition duration-300 ease-in-out">Calculators</Link>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h3 className="font-bold">ABOUT</h3>
    //           <ul className="space-y-1 text-sm gap-2 cursor-pointer">
    //             <li>
    //               <Link href="/about" className="hover:scale-105 transition duration-300 ease-in-out">Overview</Link>
    //             </li>
    //             <li>
    //               <Link href="/team" className="hover:scale-105 transition duration-300 ease-in-out">Team</Link>
    //             </li>
    //             <li>
    //             <Link href="/careers" className="hover:scale-105 transition duration-300 ease-in-out">Careers</Link>
    //             </li>
    //             <li>
    //               <a onClick={toggleContactModal} className="hover:scale-105 transition duration-300 cursor-pointer">Contact Us</a> {/* Open Contact Us form */}
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className="mt-8 w-full flex justify-center">
    //         <Link
    //           href="https://agent.getabettermortgage.com/login/"
    //           className="bg-black text-white text-lg font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition duration-300 ease-in-out"
    //         >
    //           AGENT LOGIN
    //         </Link>
    //       </div>
    //     </div>

    //     {/* Column 3: Logos */}
    //     <div className="third-col w-full md:w-1/3 flex flex-col items-center">
    //       <div className="mb-4 max-w-[200px]"> {/* Limit logo width */}
    //         <Image
    //           src={MortgageCentre}
    //           alt="The Mortgage Centre Logo"
    //           objectFit="contain"
    //           className="max-w-full max-h-full" // Ensure it doesn't overflow the column width
    //         />
    //       </div>
    //       <div className="max-w-[200px]"> {/* Limit logo width */}
    //         <Image
    //           src={AccreditedBusiness}
    //           alt="BBB Accredited Business Logo"
    //           objectFit="contain"
    //           className="max-w-full max-h-full" // Ensure it doesn't overflow the column width
    //         />
    //       </div>
    //     </div>
    //     {/* Digital Eclipse Watermark */}
    //     <div className="fourth-col  lg:pl-[10vh] pl-[12vh] w-[10vh] lg:h-[22vh] h-[10vh] flex justify-center items-center text-center lg:ml-[2vh] ml-[12vh]">
    //       <Link
    //         href="https://digitaleclipse.ca"
    //         className=" ml-[20vh] flex flex-row bg-black text-deyellow text-lg font-bold py-3 px-8 rounded-lg ml-[2vh] shadow-md hover:scale-105 transition duration-300 ease-in-out"
    //         target='_blank'
    //       >
    //         <div className='pt-[6vh] pr-[3vh] relative w-[5vh] h-[5vh] lg:w-[5vh] lg:h-[5vh]'>
    //                     <Image
    //                         src='/images/favicon.png'
    //                         alt='Digital Eclipse'
    //                         layout='fill'
    //                         objectFit='contain'
    //                     />
    //         </div>
    //         <div className="pl-[1vh]">
    //           Website By DigitalEclipse.ca
    //         </div>
    //       </Link>
    //     </div>

    //   </div>

    //   {/* Render the CareerForm modal conditionally */}
    //   {isCareerModalOpen && <CareerForm closeModal={closeCareerModal} />}

    //   {/* Render the ContactForm modal conditionally */}
    //   {isContactModalOpen && <ContactForm onClose={closeContactModal} />}
    // </section>
  );
};

export default Footer;
