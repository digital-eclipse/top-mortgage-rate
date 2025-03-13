'use client';
import React from 'react';
import About from '../../../public/images/about.svg';

export default function AboutPage() {
  return (
    <>
      {/* Full page with background color */}
      <section className="bg-white py-8 md:py-16 flex flex-col items-center px-6 md:px-8 w-full">
        
        {/* About Section */}
        <div className=" text-center max-w-3xl">
          <About className="md:w-[500px] md:h-[400px] mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
            ABOUT US
          </h2>
          <p className="text-sm md:text-lg md:text-xl text-black text-left mb-4 leading-loose">
          At Top Mortgage Rate, we take pride in offering personalized, professional, and ethical mortgage services backed by over 35 years of combined experience in the Mortgage and Financial Services sector. Our founders have built a reputation for delivering expert advice and industry-leading solutions.
          </p>
          <p className="text-sm md:text-lg md:text-xl text-black text-left leading-loose">
          Our team is committed to ensuring that every client receives the personalized attention and expert guidance they deserve. With years of industry experience and a passion for helping you succeed, we’re with you every step of the way.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="py-16 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
            OUR MISSION
          </h2>

          {/* For Our Clients Section */}
          <p className="text-sm md:text-lg md:text-xl text-black text-left font-semibold mb-4 leading-loose">
            For Our Clients:
          </p>
          <p className="text-sm md:text-lg md:text-xl text-black text-left mb-4 leading-loose">
            We strive to make obtaining a mortgage an easy, efficient, and stress-free process. Our mission is to provide you with unmatched service that combines deep financial expertise with a comprehensive understanding of the mortgage industry.
          </p>
          <ul className="list-disc pl-5 text-left mb-4 leading-relaxed">
            <li><strong>Competitive Rates:</strong> We leverage our strong relationships with an expansive list of lender partners to secure the most competitive rates for you.</li>
            <li><strong>Tailored Mortgage Solutions:</strong> We offer a wide range of mortgage options, including variable rate, fixed rate, and split-level mortgages, ensuring you find the perfect fit for your financial goals.</li>
            <li><strong>Educating You:</strong> We take the time to educate you on your mortgage choices, helping you make confident, informed decisions.</li>
            <li><strong>Guidance on Credit & Qualifications:</strong> We counsel you on credit and mortgage qualifications, simplifying the process.</li>
            <li><strong>Strong Industry Connections:</strong> By working with all major banks and mortgage wholesalers, we can offer maximum flexibility and the best terms.</li>
            <li><strong>Supporting You at Every Step:</strong> From your first inquiry to the final closing, we’re here to guide and support you.</li>
          </ul>

          {/* For Our Agents Section */}
          <p className="text-sm md:text-lg md:text-xl text-black text-left font-semibold mb-4 leading-loose">
            For Our Agents:
          </p>
          <p className="text-sm md:text-lg md:text-xl text-black text-left mb-4 leading-loose">
            Our mission extends beyond our clients. We provide our mortgage agents with the education, support, and tools necessary to excel in the industry. Drawing on over 60 years of ownership experience, we offer access to a comprehensive network of lenders and ensure that our agents benefit from the most competitive rates available.
          </p>
          <p className="text-sm md:text-lg md:text-xl text-black text-left mb-4">
            At Top Mortgage Rate, we believe that the success of our agents directly translates to the success of our clients.
          </p>
        </div>

      </section>
    </>
  );
}
