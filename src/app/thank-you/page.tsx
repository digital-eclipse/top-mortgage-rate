'use client'

import Image from 'next/image';
import ThankYou from '../../../public/images/thank-you.png'

export default function ThankYouPage() {
    return (
      <div className="max-h-screen flex flex-col justify-center flex items-center">
                      {/* Left Side: Image */}
                      <div className="w-full md:w-1/3 flex items-center justify-center relative lg:h-[25vw] lg:w-[25vw] h-[80vw] w-[80vw]">
                        <Image
                          src={ThankYou}
                          alt="House with a plus sign"
                          fill
                        />
                      </div>

        <h1 className="text-center text-2xl font-bold">Thank you for submitting the form we will be in touch shortly!</h1>
    
      </div>
    );
  }