"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[90%] px-6">
      <div className="relative w-full max-w-md h-60 mb-8">
        <Image
          src="/not-found.jpg"
          alt="404 Illustration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        Oops! The page you were looking for doesn&#39;t exist
      </h1>
      
      <p className="text-sm md:text-base text-gray-600 mb-6">
        You may have mistyped the address or the page may have moved
      </p>
      
      <Link
        href="/"
        className="text-blue-400 text-sm md:text-base font-medium hover:underline"
      >
        Take me back to the home page
      </Link>
    </div>
  );
}
