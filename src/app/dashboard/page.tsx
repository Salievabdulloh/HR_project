'use client'
import { Widgets } from '@mui/icons-material'
import { ArrowDown, ArrowDownUp, ArrowLeft, ArrowRight, Calendar, Filter, SearchIcon, Settings } from 'lucide-react'
import React, { useState } from 'react'
import SeeAll from "@/src/components/SeaAll"
import Card from "@/src/components/Card2"
import Button from "@/src/components/Button"
import AvgWorkHoursChart from '@/src/components/AvgWorkHoursChart'
import MemberTypeChart from '@/src/components/MemberTypeChart'
import MemberList from '@/src/components/MemberList'
import Card2 from '@/src/components/Card'
import useDarkSide from '@/src/shared/config/useDarkSide'

const Dashboard = () => {

    const buttons = [
        {
            id: 1,
            buttonName: "Edit Widget",
            icon: <Widgets sx={{ width: "16px" }} className='text-[10px]' />
        },
        {
            id: 2,
            buttonName: "Manage Dashboard",
            icon: <Settings size={16} />
        }
    ]

    const [event, setEvent] = useState(1)

    const items = [
        {
            id: 1,
            name: "Events"
        },
        {
            id: 2,
            name: "Celebrations"
        },
        {
            id: 3,
            name: "Holiday"
        }
    ]

    const [search, setSearch] = useState("")

    const [theme] = useDarkSide()

    return (
        <div className='p-5 px-[25px]'>
            <div className="flex justify-between relative items-center">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className={`pl-10 w-[300px] py-2 rounded-md ${theme === 'dark' ? "bg-[#0f172a]" : "bg-white"} flex items-center gap-1.5 border-[#c2c0c0] shadow border`} />
                <SearchIcon className='left-2 absolute' size={20} />
                <div className="flex items-center gap-5">
                    {buttons.map(e => (
                        <button key={e.id} className={`px-3 py-2 rounded-md ${theme === 'dark' ? "bg-[#0f172a]" : "bg-white"} flex items-center gap-1.5 cursor-pointer border-[#c2c0c0] shadow border`}>
                            {e.icon}
                            {e.buttonName}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex mt-5 gap-5">
                <div className="flex gap-5 flex-col">
                    <AvgWorkHoursChart />
                    <div className="">
                        <div className="flex gap-5">
                            <Card2 text='Total payroll' price='$34.4322' grade={'+24'} />
                            <Card text='Job Applicant' price='$12.845' grade={'-15'} />
                        </div>
                        <MemberList search={search} />
                    </div>
                </div>
                <div className="flex gap-5 items-stretch flex-col">
                    <MemberTypeChart />
                    <div className={`rounded-[20px] ${theme === 'dark' ? "bg-[#0f172a]" : "bg-[#ffffff]"} py-5`}>
                        <div className="px-5">
                            <div className="flex items-center mb-4 justify-between">
                                <h2 className='font-medium text-[20px]'>Schedule</h2>
                                <SeeAll />
                            </div>
                            <div className={`flex items-center ${theme === 'dark' ? "bg-[#171d2b]" : "bg-[hsl(0,0%,95%)]"} rounded-lg  p-1 m-4 justify-between`}>
                                <Button icon={<ArrowLeft size={16} />} />
                                <p>10 Nov 2025</p>
                                <Button icon={<ArrowRight size={16} />} />
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className={`flex text-[gray] border-b-[1] items-center gap-4`}>
                                {items.map(e => (
                                    <div
                                        key={e.id}
                                        className={`${event === e.id ? "text-[black ] font-semibold border-b-[2] border-[#ff5e00]" : ""} cursor-pointer leading-10 ml-4`}
                                        onClick={() => setEvent(e.id)}>{e.name}</div>
                                ))}
                            </div>
                            <div className="m-4">
                                {event === 1 ? (
                                    <div>
                                        Event
                                    </div>
                                ) : event === 2 ? (
                                    <div>
                                        Celebration
                                    </div>
                                ) : (
                                    <div>
                                        Holiday
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard