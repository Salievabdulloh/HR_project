'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useGetStore } from '../store/store'
import MenuAccount from '@/src/components/MenuAccount'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, UserPlus, LayoutDashboard, Menu, X } from 'lucide-react'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import useDarkSide from '@/src/shared/config/useDarkSide'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}))

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  const { user, getRegister } = useGetStore()
  const getRole = user?.data?.role
  const pathname = usePathname()
  const [theme, toggleTheme] = useDarkSide()
  
  useEffect(() => {
    getRegister()
  }, [])

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/login', label: 'Login', icon: <LogIn size={18} /> },
    { href: '/registration', label: 'Sign Up', icon: <UserPlus size={18} /> },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300
        ${theme === 'dark'
          ? 'bg-[#0f172a]/80 text-gray-100 border-gray-800'
          : 'bg-white/80 text-gray-900 border-gray-200 backdrop-blur-lg'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`font-bold text-xl tracking-wide cursor-pointer ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}
        >
          <Link href="/">HR<span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Project</span></Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1 text-[15px] transition-all duration-200 
                ${pathname === href
                  ? theme === 'dark'
                    ? 'text-blue-400 font-semibold'
                    : 'text-blue-700 font-semibold'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {token && getRole === 'Employee' ? (
            <MenuAccount />
          ) : (
            <Link
              href="/login"
              className={`hidden md:inline-block px-4 py-2 rounded-full transition-all text-sm shadow-sm 
                ${theme === 'dark'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              Get Started
            </Link>
          )}
          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden transition ${theme === 'dark' ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} />} onClick={toggleTheme} />
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`${theme === 'dark'
              ? 'bg-[#1e293b]/95 text-gray-100 border-gray-700'
              : 'bg-white/95 text-gray-800 border-gray-200'
              } md:hidden backdrop-blur-md border-t shadow-lg`}
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 text-[16px] transition-all duration-150 
                    ${pathname === href
                      ? theme === 'dark'
                        ? 'text-blue-400 font-semibold'
                        : 'text-blue-700 font-semibold'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  {icon}
                  {label}
                </Link>
              ))}

              <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} />} onClick={toggleTheme} />

              {token && getRole === 'Employee' ? (
                <MenuAccount />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full text-center py-2 rounded-lg transition-all
                    ${theme === 'dark'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
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