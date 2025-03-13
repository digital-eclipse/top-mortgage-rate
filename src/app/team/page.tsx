'use client';
import { useState } from 'react';
import Image from 'next/image'; // Importing Next.js Image component
import Boat from '../../../public/images/team.svg'
import Link from "next/link";
interface TeamMember {
  name: string;
  title: string;
  image: string; // Path to the image or a public URL
  bio: string;
}

const teamMembers: TeamMember[] = [
    {
      name: 'Robert DiStefano',
      title: 'Broker Partner',
      image: '/images/team/robert.png', // Fixed image path
      bio: 'Robert began his training in the mortgage industry by working at several finance and trust companies. He soon recognized that he would rather be on the other side of the negotiation, working for borrowers instead of the lender. Many years and thousands of serviced clients later, Robert has achieved his dream of building a business that services the needs of people in financing their own dream: the dream of owning a home. Robert preaches the benefits of customer service and credits constant communication and follow-up as the cornerstone to a successful mortgage brokerage.',
    },
    {
      name: 'Mark Tamburro',
      title: 'Broker Partner',
      image: '/images/team/mark.png', // Fixed image path
      bio: 'After Mark graduated from The University of Western Ontario with a degree in Actuarial Science, he landed a job with a local insurance company working in his field of study. After a year in a job he did not truly enjoy, a family friend introduced Mark to the mortgage industry. Mortgage brokering was a field in its infancy in Canada at this time and he found the business intriguing. Mark decided to continue his studies at York University earning an MBA in Real Estate finance that he believed would be a nice complement to the mortgage brokerage field. Over the last 20 years he has help thousands realize their dreams of homeownership. Markʼs client base has expanded on the principle of “always doing whatʼs best for the client”; provide help in any way you can and the referrals will follow. His mission is to ensure that his clients are so completely satisfied with his level of service that they will be eager to refer their family, friends, and colleagues. Mark enjoys time away from the office on the golf course whenever he can!',
    },
    {
      name: 'Matt Nishimura',
      title: 'General Manager',
      image: '/images/team/matt.png', // Fixed image path
      bio: 'Matt is a dedicated and highly motivated individual with a diverse background in academia, customer service, mortgage underwriting, and training. He holds a Bachelor of Science degree (HBSc) from the University of Toronto, where he cultivated a passion for learning and a commitment to excellence. With over 25 years of experience in customer service, Matt has honed his interpersonal skills and developed a keen understanding of client needs. Throughout his career, he has been known for his exceptional ability to connect with people, listen actively, and provide tailored solutions to ensure customer satisfaction. In addition to his customer service expertise, he has a strong background in mortgage underwriting, where he has developed a comprehensive understanding of the intricacies of the lending industry. As a mortgage underwriter, he has diligently assessed loan applications, analyzed financial data, and ensured compliance with lending guidelines, ultimately helping countless individuals and families achieve their dreams of homeownership. His passion for both customer service and mortgage underwriting extends beyond his own role, as he has also gained experience in training and mentoring others in these fields. As a trainer, he has been committed to sharing his knowledge and expertise with colleagues, fostering a culture of continuous improvement and professional growth that has helped thousands. Outside of work, Matt enjoys engaging in community activities and giving back. Whether it’s volunteering at local events or participating in charity initiatives, he finds great fulfillment in contributing positively to the world around him.',
    },
    {
      name: 'Ada Carillo',
      title: 'Executive Assistant',
      image: '/images/team/ada.png', // Fixed image path
      bio: 'Following the completion of her Industrial Engineering degree, Ada Carillo relocated to Dubai, UAE. There, she joined a multinational company specializing in automotive and insurance industries, where she served as the Personal and Executive Assistant to the Chief Executive Officer for a remarkable 18-year tenure. Throughout this period, she gained extensive experience in executive administration support and event management. After her successful career in Dubai, Ada made the decision to move to Canada with her family, seeking a permanent settlement. With aspirations to elevate her professional journey, she is now eager to embrace new challenges in the ever-changing dynamics of the mortgage industry. During her leisure time, Ada finds joy in listening to audio books and watching movies alongside her husband and son.',
    },
    {
      name: 'Nikolina Stojanova',
      title: 'Client Relations Manager',
      image: '/images/team/nikolina.png', // Fixed image path
      bio: 'Meet Nikolina Stojanova, a dedicated and driven mortgage agent committed to providing the best possible solutions for her valued clients. A graduate of St. Clement of Ohrid University in Macedonia, Nikolina brings a strong educational background in finance to her role. She also honed her leadership skills by attending the Embracing Leadership Excellence course at Rollins College in Florida. Nikolina’s success is built on a foundation of meticulous attention to detail and an unwavering commitment to service excellence. With her experience and leadership skills, she aims to create outstanding mortgage experience for every client she partners with. Outside her professional life, Nikolina cherishes time with her loving family – a home she shares with her husband and two children.',
    },
    {
      name: 'Lisa Alphonso',
      title: 'Senior Manager of Underwriting',
      image: '/images/team/lisa.png', // Fixed image path
      bio: 'In the dynamic world of finance and banking, few professionals possess the combination of expertise, experience, and leadership required to excel as a Senior Manager of Underwriting. This is where our Lisa emerges as a shining star. With an extensive background in the banking industry, specifically with TD Bank and Scotia Bank, she has played a pivotal role in shaping the mortgage underwriting landscape. Beyond her professional accomplishments, she is a dedicated mother of three sons, a fitness enthusiast, and an avid nature lover.',
    },
    {
      name: 'Allan Micolino',
      title: 'Senior Manager of Underwriting',
      image: '/images/team/allan.png', // Fixed image path
      bio: 'Allan Micolino brings his 25+ years of mortgage industry experience to Get A Better Mortgage. In previous roles, Allan has worked at a Finance Company, Trust Company and Bank during his career. Through these experiences he has gained the necessary expertise in dealing with the public and in satisfying their various mortgage and financial needs. His most recent position before coming to The Mortgage Centre was as the Underwriting Manager for Eastern Canada for Resmor Trust. Allan’s past roles have provided extensive industry knowledge and the ability to assist clients with any mortgage issues and Allan knows that customer service is what clients are looking for. Allan strives to ensure that his clients are satisfied and will “go the extra mile” to make sure this is achieved.',
    },
    {
      name: 'Michelle Newton',
      title: 'Brokerage Relationship Manager',
      image: '/images/team/michelle.png', // Fixed image path
      bio: `Michelle has been a part of the Mortgage Industry for over 20 years as an A Lender, B Lender and a default insurer. Throughout her time in the industry, Michelle’s broad background has allowed her to develop strong relationships and partnerships.

In her roles as an Underwriter, Business Development Manager, Branch Manager and Account Executive, Michelle was able to gain a broad knowledge of the Mortgage Industry from many angles. It is this knowledge that she is excited to use in her role as our new BRM at Get a Better Mortgage.

Growth is always a focus and Michelle’s main goal will be to work with our agents to help them grow their businesses. Michelle will work closely with GABM agents as well as with GABM’s lender partners. As a former lender, Michelle is aware of the knowledge and value provided by lender partners, and she is passionate about helping the lenders develop and strengthen their relationships with seasoned agents and new hires.

Welcome to the team Michelle!`,
    },
    {
      name: 'Lovella Villadares',
      title: 'Head of Accounting & Payroll',
      image: '/images/team/lovella.png', // Fixed image path
      bio: 'Lovella is a seasoned finance professional with a passion for precision and a proven track record in managing financial processes. With over 7 years of expertise in accounts receivable, payroll administration, and financial reporting, she leads our dedicated team toward financial excellence. Her commitment to accuracy, strong attention to detail, and adept problem-solving skills ensure the seamless functioning of our accounting and payroll operations. Beyond the numbers, Lovella brings a personal touch to our workplace. She loves to travel, seeks inspiration from diverse cultures, and finds joy in mentoring youth in her local church. These experiences fuel her creativity, resilience, and ability to connect with people on a deeper level. Together, we are dedicated to maintaining the highest standards of financial excellence, providing reliable and efficient accounting and payroll services that contribute to the overall success of our company. She looks forward to bringing her passion for people and finance to our dynamic team.',
    },
    {
      name: 'Carolina Medrano',
      title: 'Director of Wow',
      image: '/images/team/carolina.png', // Fixed image path
      bio: 'After studying film production, Carolina started working as an Executive Assistant to the CEO of a real estate brokerage and quickly worked her way up to Chief of Staff. Throughout this time, she gained experience in leadership, customer service, and team building. She developed a passion for helping clients and nurturing relationships. Carolina then took those skills to be Director of Operations at a tech and media company where she continued to build strong team dynamics and explored her skills in event management, and project management. She is now eager to use her acquired skills to bring some ‘Wow’ into the mortgage world and to learn about a new industry. In her free time, Carolina enjoys taking long walks with her dog, reading mystery books, and painting large murals.',
    },
    {
      name: 'Antonette Morrison',
      title: 'Senior Manager of Underwriting',
      image: '/images/team/antonette.png', // Fixed image path
      bio: `With an impressive career spanning 8 years in Mortgage Brokering, coupled with a proven track record of training agents and brokers, Antonette’s expertise shines brightly. Notably, her outstanding dedication and proficiency were recognized with the prestigious 2021 Equitable Bank Top Mortgage Broker award. Antonette’s passion for guiding clients towards securing the perfect mortgage aligns seamlessly with our values, making her an exceptional addition to our team.
Antonette is excited to contribute her wealth of knowledge and experience to GABM, committed to empowering our team with the tools and support needed for success. Her enthusiasm for collaboration and her unwavering dedication to excellence are certain to elevate our underwriting processes and enhance our client experiences. We are thrilled to have Antonette on board, and we look forward to the impactful contributions she will make as we continue to strive for excellence in the mortgage industry.`,
    },
  ];

  const BioModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Check if the click is outside the modal content by comparing target and currentTarget
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50"
        onClick={handleBackgroundClick} // Close modal when clicking outside the content
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 font-bold"
          >
            X
          </button>
          <div className="flex items-center">
            <div className="w-1/3 p-4">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="w-2/3 p-4">
              <p className="font-semibold text-gray-600 text-left">{member.title}</p>
              <h2 className="text-3xl font-bold mb-4 text-left">{member.name}</h2>
              <p className='text-left'>{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default function Team() {
    const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  const handleBioToggle = (member: TeamMember) => {
    setActiveMember(member); // Open modal with the clicked member's bio
  };

  const handleCloseModal = () => {
    setActiveMember(null); // Close modal
  };
  return (
    <section className="bg-[#E1C692] py-16 text-center px-4 w-full">
      <Boat className="w-[300px] mx-auto mb-8" />
      <h1 className="text-3xl md:text-6xl font-extrabold mb-4">OUR TEAM</h1>
      <p className="text-md md:text-lg font-semibold mb-10">Experienced Experts, Dedicated to Your Success</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pb-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-md"
          >
            {/* Using next/image for optimized loading */}
            <Image
              src={member.image}
              alt={member.name}
              width={290}
              height={290}
              className="rounded-lg mb-4 w-full object-cover"
            />
            <p className="text-sm text-left leading-none">{member.title}</p>
            <h2 className="text-xl font-bold text-left">{member.name}</h2>
            <div className="w-full flex justify-end">
              <button
                onClick={() => handleBioToggle(member)}
                className="text-[#E1C692] font-bold mt-4 text-right transform hover:scale-110 duration-300"
              >
                See Bio →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the BioModal when activeMember is not null */}
      {activeMember && (
        <BioModal member={activeMember} onClose={handleCloseModal} />
      )}
        <div className="mg-6">
          <Link
              href="/careers"
              className="bg-black text-white text-lg font-bold py-5 px-8 rounded-lg shadow-md hover:scale-200 transition duration-300 ease-in-out">
                JOIN THE TEAM
            </Link>
        </div>
    </section>
  );
}