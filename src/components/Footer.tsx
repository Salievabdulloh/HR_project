'use client'
import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import useDarkSide from '@/src/shared/config/useDarkSide'

const Footer = () => {
  const year = new Date().getFullYear()
  const [theme] = useDarkSide()

  return (
    <footer className={`${theme === 'dark' ? 'bg-[#0f172a] text-gray-200' : 'bg-linear-to-r from-blue-50 via-white to-blue-50 text-gray-700'} border-t border-gray-300`}>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            HR<span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Project</span>
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>
            Empowering teams. Simplifying HR.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-sm">
          {['/dashboard', '/about', '/contact', '/privacy'].map((href) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
            >
              {href.split('/')[1].charAt(0).toUpperCase() + href.split('/')[1].slice(1)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {[{ icon: Twitter, link: 'https://twitter.com' },
          { icon: Linkedin, link: 'https://linkedin.com' },
          { icon: Github, link: 'https://github.com' },
          { icon: Mail, link: 'mailto:contact@hrproject.com' }].map(({ icon: Icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors
                ${theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                }`}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className={`border-t py-4 text-center text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-400 bg-[#0f172a]/90' : 'border-gray-200 text-gray-500 bg-white/50'}`}>
        © {year} <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-semibold`}>HR Project</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer