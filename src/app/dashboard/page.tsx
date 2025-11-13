'use client'
import { Widgets } from '@mui/icons-material'
import { ArrowLeft, ArrowRight, SearchIcon, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SeeAll from "@/src/components/SeaAll"
import Card from "@/src/components/Card2"
import Button from "@/src/components/Button"
import AvgWorkHoursChart from '@/src/components/AvgWorkHoursChart'
import MemberTypeChart from '@/src/components/MemberTypeChart'
import MemberList from '@/src/components/MemberList'
import Card2 from '@/src/components/Card'
import useDarkSide from '@/src/shared/config/useDarkSide'
import { useGetStore } from '@/src/store/store'
import { useTheme } from 'next-themes'

const Dashboard = () => {

    const buttons = [
        { id: 1, buttonName: "Edit Widget", icon: <Widgets sx={{ width: "16px" }} className='text-[10px]' /> },
        { id: 2, buttonName: "Manage Dashboard", icon: <Settings size={16} /> }
    ]

    const [search, setSearch] = useState<string>("")
    const [status, setstatus] = useState<string>("")
    const { getAllVacations, vacationAll } = useGetStore()
    const { theme, setTheme } = useTheme()

    useEffect(() => { getAllVacations(status) }, [status])

    return (
        <div className={`p-5 px-[15px] ${theme === 'dark' ? 'bg-[#0b1121]' : 'bg-gray-50'} min-h-screen`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-5 relative">
                <div className="relative w-full md:w-[300px]">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        className={`pl-10 w-full py-2 rounded-md ${theme === 'dark' ? "bg-[#0f172a] border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"} border shadow`}
                    />
                    <SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                </div>

                <div className="flex flex-wrap gap-3">
                    {buttons.map(e => (
                        <button
                            key={e.id}
                            className={`px-3 py-2 rounded-md ${theme === 'dark' ? "bg-[#0f172a]" : "bg-white"} flex items-center gap-1.5 cursor-pointer border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} shadow`}
                        >
                            {e.icon}
                            {e.buttonName}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row gap-5">
                {/* Left column */}
                <div className="flex flex-col gap-5 w-full md:w-2/3">
                    <AvgWorkHoursChart />

                    <div className="flex flex-col md:flex-row gap-5 overflow-x-auto">
                        <Card2 />
                        <Card />
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-full">
                    <MemberTypeChart />

                    <div className={`rounded-[20px] overflow-y-auto overflow-hidden max-h-[500px] ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#ffffff]'} py-5`}>
                        <div className="px-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-medium text-[20px]">Schedule</h2>
                            </div>

                            <select
                                value={status}
                                onChange={(e) => setstatus(e.target.value)}
                                className={`border px-3 py-2 rounded-lg mb-4 w-full ${theme === 'dark' ? 'bg-[#1e293b] text-gray-200 border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                            >
                                <option value="">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Finished">Finished</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <div className="space-y-4">
                                {vacationAll.length === 0 ? (
                                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No vacations found.</p>
                                ) : (
                                    vacationAll.map((vacation) => (
                                        <div
                                            key={vacation.id}
                                            className={`p-4 rounded-lg shadow-sm border ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                        >
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
                                                <h3 className="font-semibold">
                                                    {vacation.employee.firstName} {vacation.employee.lastName} ({vacation.employee.position})
                                                </h3>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${vacation.status === 'Approved'
                                                        ? 'bg-green-100 text-green-600'
                                                        : vacation.status === 'Pending'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : vacation.status === 'Rejected'
                                                                ? 'bg-red-100 text-red-600'
                                                                : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {vacation.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">Department: {vacation.employee.departmentName}</p>
                                            <p className="text-sm text-gray-500 mb-1">
                                                Period: {new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation.endDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-1">Type: {vacation.type}</p>
                                            <p className="text-sm text-gray-500 mb-1">Days: {vacation.daysCount}</p>
                                            <p className="text-sm text-gray-500">Payment Amount: ${vacation.paymentAmount}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <MemberList />
            </div>
        </div>
    )
}

export default Dashboard
