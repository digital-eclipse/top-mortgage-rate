import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Top Mortgage Rate',
  description: 'Find the best mortgage rates. Our experts help you secure competitive rates and personalized solutions. Start your home journey today!',
  icons: {
    icon: '/icons/logo.png',
  },
  alternates: {
    canonical: 'https://topmortgagerate.org/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <head>

      <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-full w-full">
             <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
              <Layout>

                {children}
              <Analytics />
              </Layout>
            </ReCaptchaProvider>

      </body>
    </html>
  );
}
