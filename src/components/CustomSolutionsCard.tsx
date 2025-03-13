import React from 'react';
import { useModal } from './ModalContext';
import Mortgage9 from '../../public/images/mortgages/mortgages-9.svg';
import CustomSolutionsForm from './popup/CustomSolutions';
import {useRouter} from 'next/navigation'

const customSolutions = [
  
    {
      title: 'Buying an Investment Property',
      content: (
        <>
          <p>
            Investing in real estate is a profitable way to generate rental income and benefit from capital gains. Whether you’re interested in a house, condo, or land, now is the perfect time to make your move.
          </p>
          <p className="font-semibold mt-4">Why Trust Us?</p>
          <p>
            Investment property mortgages require specialized knowledge. At Get A Better Mortgage, we provide tailored loan options and expert advice to help you make informed decisions that align with your financial goals.
          </p>
        </>
      ),
    },
    {
      title: 'Buying a Second Home',
      content: (
        <>
          <p>
            With lower interest rates, now may be the ideal time to invest in a second home. Whether it’s for vacation, an investment property, or a place for your children, we can help make the process easier.
          </p>
          <p className="font-semibold mt-4">Why Buy a Second Home?</p>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>Investment Property:</strong> Generate rental income or grow your wealth through capital gains.</li>
            <li><strong>Vacation Home or Cottage:</strong> Enjoy your own getaway whenever you want.</li>
            <li><strong>Home for Your Children:</strong> Provide a safe and reliable place for them to live while attending university.</li>
          </ul>
          <p className="font-semibold">The Process is Different</p>
          <p>
            Buying a second home is different from a traditional mortgage. It requires a minimum of 20% down payment, and rental property income may only count for 50% in your application. Our brokers guide you through the process to ensure you get the right product.
          </p>
        </>
      ),
    },
    {
      title: 'Self-Employed Mortgages',
      content: (
        <>
          <p>
            Being self-employed shouldn’t make it harder to secure a mortgage. While qualifying can be challenging due to lower taxable income, we’re here to help you get the mortgage you deserve.
          </p>
          <p className="font-semibold mt-4">Improve Your Chances</p>
          <p>
            Providing financial documents, including your Notice of Assessment, improves your chances of approval.
          </p>
          <p className="font-semibold">We Have Access</p>
          <p>
            We specialize in helping self-employed Canadians secure financing through multiple lenders, offering mortgage solutions tailored to your business and financial situation.
          </p>
        </>
      ),
    },
    {
      title: 'Debt Consolidation Loans',
      content: (
        <>
          <p>
            Take control of your finances by consolidating your debts into a single, manageable payment with a lower interest rate. A debt consolidation loan allows you to use your home equity to settle multiple debts, potentially saving you money on high-interest charges.
          </p>
          <p className="font-semibold mt-4">Streamline Your Finances</p>
          <p>
            Consolidate your debts into one payment, reducing the hassle of multiple bills and potentially securing a lower interest rate than your existing debts.
          </p>
          <p className="font-semibold">Eligible Debts</p>
          <p>
            Suitable for credit cards, utilities, and consumer loans. Note that some debts, such as mortgages, cannot be included.
          </p>
        </>
      ),
    },
    {
      title: 'Commercial Construction Loans',
      content: (
        <>
          <p>
            Whether you&apos;re building homes on a large scale, crafting custom designs, or just starting out, our flexible construction loans are designed to meet your needs and grow with your business.
          </p>
          <p className="font-semibold mt-4">Construction Loans to Suit Your Needs</p>
          <p>
            From big-scale developments to small builders, we provide specialized financing solutions tailored to the unique needs of every construction company.
          </p>
          <p className="font-semibold">Access to Specialist-Only Lenders</p>
          <p>
            We connect you with exclusive lenders that offer flexible options and competitive rates, helping you fund your next big project.
          </p>
        </>
      ),
    },
    {
      title: 'Explore Private Mortgage Solutions',
      content: (
        <>
          <p>
            If traditional mortgages are not an option, explore our private mortgage solutions designed to provide financial flexibility.
          </p>
          <p className="font-semibold mt-4">Tailored Financing for Unique Situations</p>
          <p>
            Whether your credit score isn’t perfect, your income has changed, or a recent life event has impacted your finances, a private mortgage could be the right solution.
          </p>
          <p className="font-semibold">Flexible Options Just for You</p>
          <p>
            We’ll take the time to understand your financial situation and explore flexible financing options tailored to your needs, giving you a second chance at homeownership.
          </p>
        </>
      ),
    },
  ];

const CustomSolutionsCard = () => {
  const { setModalTitle, setModalContent, openModal } = useModal();

  const router = useRouter()

  const handleLearnMoreClick = () => {
    router.push('/contact-form');
  };


  return (
    <div className="bg-[#F5F5F5] shadow-lg rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-start justify-center max-w-5xl mx-auto relative">
    
    {/* Left Side: Text Content */}
    <div className="flex flex-col items-center justify-center  w-full md:w-3/4 mb-6 md:mb-0 text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Explore Our Custom Mortgage Solutions</h2>
      <p className="text-md md:text-lg text-black mb-4">
        Our custom mortgage solutions are designed to meet your unique needs, whether you’re buying an investment property, refinancing, or looking for a self-employed mortgage.
      </p>
      <div className="text-sm md:text-md text-black mb-6">
        <ul className="list-disc pl-5 space-y-4">
          {customSolutions.map((solution, index) => (
            <li
              key={index}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleLearnMoreClick()}
            >
              {solution.title}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-black text-lg md:text-xl text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:bg-white hover:text-black hover:border-white border border-black duration-300"
        onClick={() => 
          handleLearnMoreClick()
        }
      >
        LEARN MORE
      </button>
    </div>
    
  </div>

  );
};

export default CustomSolutionsCard;
