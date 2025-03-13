// app/blogs/[slug]/page.tsx
import blogs from '@/lib/blog'; // Import blog data
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find((post) => post.slug === params.slug);

  // If no blog content is found, trigger the 404 page
  if (!blog) {
    notFound(); // Triggers the 404 page if the blog post is not found
  }

  // Helper function to format content
  const formatBlogContent = (content: string) => {
    const applyFormatting = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index}>
              {part.slice(2, -2)} {/* Remove the ** and keep the content */}
            </strong>
          );
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index}>
              {part.slice(1, -1)} {/* Remove the * and keep the content */}
            </em>
          );
        }
        return part;
      });
    };

    return content.split('\n').map((paragraph, index) => {
      const cleanParagraph = paragraph.replace(/^#+\s*/, ''); // Removes leading #
      if (cleanParagraph.startsWith('- ')) {
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            <li>{applyFormatting(cleanParagraph.slice(2))}</li>
          </ul>
        );
      } else if (cleanParagraph.match(/^\d+\./)) {
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            <li>{applyFormatting(cleanParagraph.slice(3))}</li>
          </ol>
        );
      }
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {applyFormatting(cleanParagraph)}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Full-Width Yellow Banner */}
      <section className="bg-[#083784] w-full py-8 px-4 md:px-8 text-center flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col items-start px-4 md:items-start">
          <h1 className="text-4xl font-extrabold text-white mb-2 text-left md:text-center">{blog.title}</h1>
          <div className="text-sm md:text-lg font-medium text-gray-700 space-x-4 text-left md:text-center">
            <span className='text-white'>By {blog.author}</span>
            <span className='text-white'>| {new Date(blog.publishDate).toLocaleDateString()}</span>
            <span className='text-white'>| {blog.readTime}</span>
          </div>
          <div className="text-sm text-gray-600 mt-2 text-left md:text-center">
            <span className='text-white'> Tags: {blog.tags?.join(', ')} </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0 max-w-[1200px]">
        {/* Blog Content Section */}
        <div className="lg:col-span-2">
          <div className="blog-content text-base md:text-lg">
            {formatBlogContent(blog.content)}
          </div>
        </div>

        {/* Sidebar with Other Blogs */}
        <aside className="p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Other Blogs</h2>
          <ul className="space-y-4">
            {blogs.map((post) => (
              <li key={post.id} className="bg-white p-4 shadow-md rounded-md">
                <Link href={`/blog/${post.slug}`} className="block text-lg md:text-xl font-bold text-black hover:underline">
                  {post.title}
                </Link>
                <p className="text-sm text-gray-600">
                  {new Date(post.publishDate).toLocaleDateString()} • {post.readTime}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
