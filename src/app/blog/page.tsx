import Link from 'next/link';
import Image from 'next/image';
import blogs from '@/lib/blog'; // Assuming your blog data is stored in /lib/blog.ts

export default function BlogList() {
  const formatBlogContent = (content: string) => {
    // Function to detect and replace bold text enclosed in ** **
    const applyBold = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g); // Split by **bold text**
  
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index}>
              {part.slice(2, -2)} {/* Remove the ** and keep the content */}
            </strong>
          );
        }
        return part;
      });
    };

    return applyBold(content); // Apply bold formatting to the content
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#083784] w-full py-20 px-4 md:px-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-2 md:mb-6 max-w-4xl">
          Your Go-To Resource for All Things Mortgage
        </h1>
        <p className="text-md md:text-xl font-semibold text-white mb-4">
          Expert Advice, Insights, and Updates on the Mortgage World
        </p>
        <p className="text-sm md:text-lg text-white mb-8 max-w-5xl">
        Welcome to our mortgage blog, where we break down the complexities of home financing and offer expert advice tailored to your needs. Whether you&apos;re a first-time buyer, considering refinancing, or curious about how the market is evolving, we&apos;ve got you covered. Explore our latest articles, tips, and industry insights to help you make informed decisions about your mortgage journey.
        </p>
        <Link
          href="/contact-form"
          target="_blank"
          className="bg-black text-lg md:text-xl text-white font-bold py-3 px-10 rounded-lg shadow-md hover:scale-110 border border-black transition duration-300 ease-in-out"
        >
          APPLY NOW
        </Link>
      </section>

      {/* Blog List Section */}
      <section className="py-10 px-4 md:px-8 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {blogs.map((blog) => (
            <div key={blog.id} className=" bg-[#F5F5F5] rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-full flex flex-col items-center justify-center">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
              <p className="text-md mb-4">
                {/* Limit the excerpt to 150 characters */}
                {formatBlogContent(blog.content.substring(0, 150))}...
              </p>
              <div className='w-full text-right'>
                <Link href={`/blog/${blog.slug}`} className="text-black font-bold text-md hover:underline right">
                  Read More &raquo;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
