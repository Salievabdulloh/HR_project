'use client'
import useDarkSide from '@/src/shared/config/useDarkSide'
import { Wallet } from '@mui/icons-material'
import { Briefcase, Calendar, CardSim, CircleSlash, Compass, File, FileSearch, FileText, HelpCircle, Layers, LucideBriefcaseBusiness, Settings, Users, WalletCards } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {

    const [selected, setSelected] = useState(1)

    const router = useRouter()

    const [theme] = useDarkSide()

    const items = [
        {
            id: 1,
            name: "Dashboard",
            icon: <Compass />,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Employees",
            icon: <Users />,
            path: "/dashboard/employee"
        },
        {
            id: 3,
            name: "Departments",
            icon: <LucideBriefcaseBusiness />,
            path: "/dashboard/departments"
        },
        {
            id: 4,
            name: "Payroll",
            icon: <WalletCards />,
            path: "/dashboard/payroll"
        },
        {
            id: 5,
            name: "Schedule",
            icon: <Calendar />,
            path: "/dashboard/Employee"
        },
    ]

    const items2 = [
        {
            id: 1,
            name: "Reports",
            icon: <FileText />,
            path: "/"
        },
        {
            id: 2,
            name: "Structure",
            icon: <Layers />,
            path: "/"
        },
        {
            id: 3,
            name: "Settings",
            icon: <Settings />,
            path: "/"
        },
        {
            id: 4,
            name: "Help",
            icon: <HelpCircle />,
            path: "/"
        },
    ]

    return (
        <div className='flex'>
            <div className="p-5 w-[300px] flex flex-col gap-[15px]">
                <div className='text-[14px] mb-3 text-[#b4b4b4]'>MAIN</div>
                <div className="">
                    {items.map(e => (
                        <div key={e.id} onClick={() => {
                            setSelected(e.id)
                            router.push(e.path)
                        }} className={`flex p-2 cursor-pointer rounded mb-2 items-center font-medium ${selected === e.id ? "bg-amber-100 font-bold text-amber-400" : ""} gap-2`}>
                            {e.icon}
                            <p>{e.name}</p>
                        </div>
                    ))}
                </div>
                <div className='text-[14px] mt-5 mb-3 text-[#b4b4b4]'>ORGANIZATION</div>
                <div className="">
                    {items2.map(e => (
                        <div key={e.id} onClick={() => router.push(e.path)} className={`flex p-2 cursor-pointer mb-2 items-center font-medium gap-2`}>
                            {e.icon}
                            <p>{e.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`w-full ${theme === 'dark'
                ? 'bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100'
                : 'bg-linear-to-t from-blue-50 via-white to-blue-100 text-gray-900'}`}>
                {children}
            </div>
        </div>
    )
}

export default layout