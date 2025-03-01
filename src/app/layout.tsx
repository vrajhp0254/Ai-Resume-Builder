import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Loader from "./components/Loader"
import Navbar from "./components/Navbar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'AI Resume Builder - Create Professional Resumes',
  description: 'Create professional resumes with AI-powered suggestions for summaries and skills',
  openGraph: {
    title: 'AI Resume Builder',
    description: 'Create professional resumes with AI-powered suggestions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Builder',
    description: 'Create professional resumes with AI-powered suggestions',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>AI Resume Builder - Create Professional Resumes</title>
          <meta name="description" content="Create professional resumes with AI-powered suggestions for summaries and skills" />
          <meta property="og:title" content="AI Resume Builder" />
          <meta property="og:description" content="Create professional resumes with AI-powered suggestions" />
          <meta property="og:image" content="https://yourdomain.com/og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <main className="flex-grow ">{children}</main> */}

          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">
              <Loader />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow ">{children}</main>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
