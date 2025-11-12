'use client'
import useDarkSide from '@/src/shared/config/useDarkSide'
import { useGetStore } from '@/src/store/store'
import { Report, Wallet } from '@mui/icons-material'
import { Briefcase, Calendar, CardSim, CircleSlash, Compass, DollarSign, File, FileSearch, FileText, HelpCircle, Layers, LucideBriefcaseBusiness, Settings, Users, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {

    const { user, getRegister } = useGetStore()

    const [theme] = useDarkSide()

    const pathname = usePathname()

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
    ]

    const getUser = user

    console.log(getUser);

    const getName = items2.find(e => e.name === "My Vacations")

    console.log(getName);


    return (
        <div className='flex'>
            <div className={`p-5 z-10 w-[18%] fixed h-screen ${theme === 'dark' ? "bg-[black]" : "bg-white"} flex flex-col gap-[15px]`}>
                <div className='text-[14px] mb-3 text-[#b4b4b4]'>MAIN</div>
                <div className="">
                    {items.map(e => (
                        <Link
                            key={e.id}
                            href={e.path}
                            className={`flex p-2 cursor-pointer rounded mb-2 items-center font-medium 
                            ${pathname === e.path ? "bg-amber-100 font-bold text-amber-400" : ""} gap-2`}>
                            {e.icon}
                            <p>{e.name}</p>
                        </Link>
                    ))}
                </div>
                <div className='text-[14px] mt-5 mb-3 text-[#b4b4b4]'>ORGANIZATION</div>
                <div className="">
                    {items2.map(e => (
                        <Link
                            key={e.id}
                            href={e.path}
                            className={`flex p-2 cursor-pointer rounded mb-2 items-center font-medium 
                            ${pathname === e.path ? "bg-amber-100 font-bold text-amber-400" : ""} gap-2`}>
                            {e.icon}
                            <p>{e.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={`ml-[18%] w-full ${theme === 'dark'
                ? 'bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100'
                : 'bg-linear-to-t from-blue-50 via-white to-blue-100 text-gray-900'}`}>
                {children}
            </div>
        </div>
    )
}

export default layout