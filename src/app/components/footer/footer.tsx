'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="text-gray-800 py-10shadow-inner"
      style={{
        boxShadow: 'inset 0 6px 10px -8px rgba(0,0,0,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {year ?? '...'} MyStore. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/privacy-policy" className="hover:underline text-sm">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline text-sm">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:underline text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
