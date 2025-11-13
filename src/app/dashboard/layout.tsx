'use client'
import SidebarDrawer from '@/src/components/SidebarDrawer'
import TemporaryDrawer from '@/src/components/SidebarDrawer'
import useDarkSide from '@/src/shared/config/useDarkSide'
import { useGetStore } from '@/src/store/store'
import { Report, Wallet } from '@mui/icons-material'
import { Button } from 'antd'
import { Briefcase, Calendar, CardSim, CircleSlash, Compass, DollarSign, File, FileSearch, FileText, HelpCircle, Layers, LucideBriefcaseBusiness, Settings, Users, WalletCards } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {

    const { user, getRegister } = useGetStore()

    const { theme, setTheme } = useTheme()

    const pathname = usePathname()

    const getUser = user

    console.log(getUser);

    return (
        <div className={`flex ${theme === 'dark' ? 'bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100' : "bg-white"}`} >
            <SidebarDrawer />
            <div className={`md:ml-[250px] w-full ${theme === 'dark'
                ? 'bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100'
                : 'bg-linear-to-t from-blue-50 via-white to-blue-100 text-gray-900'}`}>
                {children}
            </div>
        </div >
    )
}

export default layout