// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#E1C692] p-8 w-full">
      <h1 className="text-5xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black border-black border transition duration-300">
        Go Home
      </Link>
    </div>
  );
}
