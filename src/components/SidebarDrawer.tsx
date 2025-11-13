'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useDarkSide from '@/src/shared/config/useDarkSide';
import { Briefcase, Calendar, CardSim, CircleSlash, Compass, DollarSign, File, FileSearch, FileText, HelpCircle, Layers, LucideBriefcaseBusiness, Settings, User, Users, WalletCards } from 'lucide-react'
import { Report, Wallet } from '@mui/icons-material'
import { useGetStore } from '../store/store';
import { useTheme } from 'next-themes';

const items = [
    { id: 1, name: "Dashboard", icon: <Compass />, path: "/dashboard" },
    { id: 2, name: "Employees", icon: <Users />, path: "/dashboard/employee" },
    { id: 3, name: "Departments", icon: <LucideBriefcaseBusiness />, path: "/dashboard/departments" },
    { id: 4, name: "Payroll", icon: <WalletCards />, path: "/dashboard/payroll" },
    { id: 5, name: "Payments", icon: <Wallet />, path: "/dashboard/payment" },
]

const items2 = [
    { id: 1, name: "My Vacations", icon: <FileText />, path: "/dashboard/vacation" },
    { id: 2, name: "Reports", icon: <Report />, path: "/dashboard/report" },
    { id: 3, name: "Settings", icon: <Settings />, path: "/" },
    { id: 4, name: "Help", icon: <HelpCircle />, path: "/" },
    // { id: 5, name: "Login", icon: <User />, path: "/login" },
]

export default function SidebarDrawer() {
    const { openModal, setOpenModal } = useGetStore()
    const { theme, setTheme } = useTheme()
    const pathname = usePathname();


    const toggleDrawer = (newOpen: boolean) => () => setOpenModal(newOpen);

    const SidebarContent = (
        <Box
            sx={{
                // width: 250,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: theme === 'dark' ? '#0f172a' : '#ffffff',
                color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                p: 2,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <div className='text-[14px] mb-3 text-[#b4b4b4]'>MAIN</div>
            <div>
                {items.map(e => (
                    <Link
                        key={e.id}
                        href={e.path}
                        className={`flex p-2 cursor-pointer rounded mb-2 items-center font-medium transition-all duration-150 
            ${pathname === e.path
                                ? "bg-amber-100 text-amber-600 font-semibold"
                                : "hover:bg-gray-100 hover:text-black"} gap-2`}
                    >
                        {e.icon}
                        <p>{e.name}</p>
                    </Link>
                ))}
            </div>

            <div className='text-[14px] mt-5 mb-3 text-[#b4b4b4]'>ORGANIZATION</div>
            <div>
                {items2.map(e => (
                    <Link
                        key={e.id}
                        href={e.path}
                        className={`flex p-2 cursor-pointer rounded mb-2 items-center font-medium transition-all duration-150
            ${pathname === e.path
                                ? "bg-amber-100 text-amber-600 font-semibold"
                                : "hover:bg-gray-100"} gap-2`}
                    >
                        {e.icon}
                        <p>{e.name}</p>
                    </Link>
                ))}
            </div>
        </Box>
    );

    return (
        <div>
            {/* <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    color: theme === 'dark' ? 'white' : 'black',
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    zIndex: 1201,
                }}
            >
                <MenuIcon />
            </IconButton> */}

            <Drawer
                open={openModal}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: 250,
                        bgcolor: theme === 'dark' ? '#0f172a' : '#ffffff',
                        color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                    },
                }}
            >
                {SidebarContent}
            </Drawer>
            <div
                className={`hidden md:flex flex-col p-5 w-[250px] h-screen fixed top-0 left-0 z-50 
          ${theme === 'dark' ? "bg-[#0f172a] text-gray-200" : "bg-white text-gray-800"} 
          overflow-y-auto shadow-sm`}
            >
                {SidebarContent}
            </div>
        </div>
    );
}