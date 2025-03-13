'use client';
import { Phone, Mail, MapPin, Facebook, House, HousePlus, Drill, RefreshCw   } from 'lucide-react';
import Logo from '../../public/images/logo.svg';
import { useState } from 'react';
import Image from 'next/image';
import LendersCarousel from '@/components/LenderSection';
import ReviewsSection from '@/components/Testimonials';
import Why1 from '../../public/images/landing/why/why-1.svg';
import Why2 from '../../public/images/landing/why/why-2.svg';
import Why3 from '../../public/images/landing/why/why-3.svg';
import Why4 from '../../public/images/landing/why/why-4.svg';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function LandingPage() {
  const [openForm, setOpenForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const router = useRouter();

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openContactForm = () => {
    setOpenForm(true);  // Opens the contact form modal
  };

  const sendEmail = () => {
    window.location.href = 'mailto:info@getabettermortgage.com';  // Opens email client
  };

  const handleButtonClick = () => {
    router.push('/contact-form');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Top Mortgage Rates",
            "description": "Find the best mortgage rates in the GTA. Our experts help you secure competitive rates and personalized solutions. Start your home journey today!",
            "url": "https://getabettermortgage.com/",
            "logo": "https://getabettermortgage.com/icons/logo.png",
          })
        }}
      />

      <div className="bg-[#FFFFFF] text-[#000000] min-h-screen w-full">

        <div className="mx-auto w-full flex flex-col items-center justify-center">
         {/* First Section with Navbar */}
          <section className="relative w-full flex flex-col justify-center items-center">
            {/* Hero Section */}
            <div className="w-full bg-white relative py-[2vw] px-2 md:px-8 flex flex-col items-center text-center justify-center relative z-0"> {/* Lower z-index */}
      

    {/* Landing Page Content */}
    <div className="bg-white text-black lg:p-[2vw] w-full h-full font-helvetica">
      <div className="flex justify-center items-center flex-col gap-[1vw]">
        <div className="text-6xl font-bold max-md:py-[8vw]">Find The Best Mortgage Rates Around</div>
        <div className="text-4xl font-bold max-md:py-[4vw]">Schedule A Free Consultation Today!</div>
        
        {/* Buttons Div */}
        <div className="flex lg:flex-row flex-col gap-[3vw] pt-[2vw]">
          {/* Button 1 */}
          <div
            className="flex flex-col items-center justify-center bg-[#083784] text-white text-4xl px-[2vw] lg:py-[2vw] py-[8vw] rounded-3xl border-2 border-[#083784] hover:bg-white hover:text-[#083784] hover:border-2 hover:border-[#083784] transform-gpu origin-center transition-all duration-300 hover:cursor-pointer"
            onClick={handleButtonClick}
          >
            <HousePlus size={40} className="text-2xl mb-2" />
            I&apos;m Buying A Home
          </div>

          {/* Button 2 */}
          <div
            className="flex flex-col items-center justify-center bg-[#083784] text-white lg:text-4xl text-3xl px-[2vw] lg:py-[2vw] py-[9.5vw] rounded-3xl hover:bg-white hover:text-[#083784] hover:border-2 hover:border-[#083784] transform-gpu origin-center transition-all duration-300 hover:cursor-pointer"
            onClick={handleButtonClick}
          >
            <RefreshCw size={40} className="text-2xl mb-2" />
            I&apos;m Renewing/Refinancing
          </div>
        </div>
      </div>
    </div>
            </div>
          </section>

          <div className='review-section w-full flex flex-col justify-center items-center'>
            <ReviewsSection />
              {/* Hero Section */}
          </div>
          <div className='w-full bg-white py-16 text-black px-4 md:px-8 flex flex-col items-center text-center justify-center'>
            <h2 className="text-sm md:text-lg mb-2">
              Unlock the Best Mortgage Deals Tailored Just for You
            </h2>
            <p className="text-lg md:text-2xl font-bold mb-8 max-w-[1200px]">
              With over 35 years of industry experience, we specialize in creating mortgage solutions that fit you perfectly. Save more, stress less.
            </p>
            
            <section className="services-section flex flex-col md:flex-row gap-4 max-w-[1280px] w-full text-black mb-8">
              {/* First Box */}
              <Link
               href="/mortgages#first-time-homebuyer"
                className="bg-[#083784] text-white p-8 rounded-lg flex-1 flex flex-col items-start justify-between text-left shadow-lg transform hover:scale-105 duration-300 cursor-pointer"
              >
                <div>
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold">First Time Homebuyers</h3>
                  <p className="text-md mb-4">
                    Step-by-step guidance to secure your first home with the best mortgage solutions available.
                  </p>
                </div>
                <div className="text-white font-bold text-md flex items-center justify-end w-full">READ MORE →</div>
              </Link>

              {/* Second Box */}
              <Link
                href='/mortgages#mortgage-refinance'
                className="bg-[#083784] p-8 rounded-lg flex-1 flex flex-col items-start justify-between text-left shadow-lg transform hover:scale-105 duration-300 cursor-pointer"
              >
                <div>
                  <div className="text-4xl mb-4">🏡</div>
                  <h3 className="text-xl font-bold text-white">Current Homeowners</h3>
                  <p className="text-md mb-4 text-white">
                    Refinance or upgrade your mortgage to achieve better savings and financial flexibility.
                  </p>
                </div>
                <div className="text-white font-bold text-md flex items-center justify-end w-full">READ MORE →</div>
              </Link>

              {/* Third Box */}
              <Link
                href='/mortgages#custom-solutions'
                className="bg-[#083784] text-white p-8 rounded-lg flex-1 flex flex-col items-start justify-between text-left shadow-lg transform hover:scale-105 duration-300 cursor-pointer"
              >
                <div>
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-bold">Custom Solutions</h3>
                  <p className="text-md mb-4">
                    Tailored mortgage plans designed to fit your unique financial situation and goals.
                  </p>
                </div>
                <div className="text-white font-bold text-md flex items-center justify-end w-full">READ MORE →</div>
              </Link>
            </section>
          </div>

          <section className="py-16 text-center">
            <div className="max-w-[1280px] w-full mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Lenders</h2>
              <p className="text-md md:text-lg mb-10 text-gray-600 px-6">
                We partner with the most trusted lenders to offer you the best mortgage solutions.
              </p>

              {/* Integrating the Lenders Carousel */}
              <LendersCarousel />
            </div>
          </section>
          <section className="bg-white w-full text-white py-16">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between px-4">
              {/* Left Side: Image */}
              <div className="hidden lg:block flex-shrink-0 w-full md:w-1/3 flex items-center justify-center relative lg:h-[25vw] lg:w-[25vw] mb-4 md:mb-0 md:h-[300px]">
                <Image
                  src={require("../../public/images/logo.png") } // Use a relative path from the 'public' directory
                  alt="House with a plus sign"
                  fill
                />
              </div>

              {/* Right Side: Text and Button */}
              <div className="md:w-2/3 md:ml-8 text-center md:text-left text-black">
                <h2 className="text-2xl md:text-3xl md:text-4xl font-bold mb-1 md:mb-4">
                  Top Mortgage Rates Inc.
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Your Goals, Our Priority.</h3>
                <p className="mb-6 text-md md:text-lg">
                  As your dedicated source for the BEST mortage rates, our sole mission is to prioritize your interests.
                  We don&apos;t believe in a one-size-fits-all approach. Instead, we take the time to understand
                  your unique needs and financial goals, ensuring you get a mortgage that&apos;s tailor-made for you.
                  <br />
                  <br />
                  With access to North America&apos;s top lenders, we&apos;ll have them compete for your mortgage, delivering 
                  competitive rates and personalized solutions. Our unbiased advice ensures you make the best decision—every time.
                  Let us help you secure the perfect mortgage for your future!
                </p>

                {/* Apply Now Button */}
                <div className="flex justify-center md:justify-end">
                  <a
                    href="/contact-form"
                    target="_blank"
                    className="bg-black text-lg md:text-xl text-white font-bold py-3 px-10 rounded-lg shadow-md hover:scale-110 border border-black transition duration-300 ease-in-out"
                  >
                    APPLY NOW
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

    </>
  );
}
