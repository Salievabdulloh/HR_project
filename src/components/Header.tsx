'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useGetStore } from '../store/store'
import MenuAccount from '@/src/components/MenuAccount'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, UserPlus, LayoutDashboard, Menu, X } from 'lucide-react'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  const { user, getRegister } = useGetStore()
  const getRole = user?.data?.role
  const pathname = usePathname()

  useEffect(() => {
    getRegister()
  }, [])

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/login', label: 'Login', icon: <LogIn size={18} /> },
    { href: '/registration', label: 'Sign Up', icon: <UserPlus size={18} /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-bold text-xl text-blue-600 tracking-wide cursor-pointer"
        >
          <Link href="/">HR<span className="text-gray-800">Project</span></Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1 text-[15px] transition-all duration-200 
                ${pathname === href ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'}
              `}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {token && getRole === 'Employee' ? (
            <MenuAccount />
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm shadow-sm"
            >
              Get Started
            </Link>
          )}
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 text-[16px] transition-all duration-150 
                    ${pathname === href ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'}
                  `}
                >
                  {icon}
                  {label}
                </Link>
              ))}
              {token && getRole === 'Employee' ? (
                <MenuAccount />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header