'use client'
import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold text-blue-600">
            HR<span className="text-gray-800">Project</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Empowering teams. Simplifying HR.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-5 text-gray-600 text-sm">
          <Link href="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition">
            Privacy
          </Link>
        </div>

        {/* Right: Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-blue-100 transition text-gray-600 hover:text-blue-600"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-blue-100 transition text-gray-600 hover:text-blue-600"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-blue-100 transition text-gray-600 hover:text-blue-600"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:contact@hrproject.com"
            className="p-2 rounded-full hover:bg-blue-100 transition text-gray-600 hover:text-blue-600"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm bg-white/50">
        © {year} <span className="font-semibold text-blue-600">HR Project</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer