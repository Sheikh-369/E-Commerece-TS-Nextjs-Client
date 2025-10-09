'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Footer() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 text-gray-800 py-10">
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
  )
}

export default Footer
