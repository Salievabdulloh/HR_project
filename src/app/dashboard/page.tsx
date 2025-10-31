'use client'
import { Widgets } from '@mui/icons-material'
import { ArrowDown, ArrowDownUp, ArrowUpDown, Calendar, Filter, SearchIcon, Settings } from 'lucide-react'
import React from 'react'
import SeeAll from "@/src/components/SeaAll"
import Card from "@/src/components/Card"
import Button from "@/src/components/Button"

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

    return (
        <div className='bg-[hsl(199,90%,97%)] p-5 px-[25px]'>
            <div className="flex justify-between relative items-center">
                <input placeholder="Search" className='pl-10 w-[300px] py-2 rounded-md bg-white flex items-center gap-1.5 border-[#c2c0c0] shadow border' />
                <SearchIcon className='left-2 absolute' size={20} />
                <div className="flex items-center gap-5">
                    {buttons.map(e => (
                        <button key={e.id} className='px-3 py-2 rounded-md bg-white flex items-center gap-1.5 cursor-pointer border-[#c2c0c0] shadow border'>
                            {e.icon}
                            {e.buttonName}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex my-5 gap-5">
                <div className="rounded-[20px] bg-white p-5">
                    <div className="flex gap-20 items-center">
                        <h2 className='font-medium text-[20px]'>Avg. Work Hours</h2>
                        <button className='flex p-2 px-3 border shadow rounded-md border-[#dedede] items-center gap-3 text-[14px]'>
                            <Calendar />
                            <p>8 Nov 2024 - 14 Nov 2024</p>
                            <p className='flex items-center'>Last 7 days <ArrowDown size={16} /></p>
                        </button>
                    </div>
                </div>
                <div className="rounded-[20px] bg-white p-5">
                    <div className="flex gap-20 items-center">
                        <h2 className='font-medium text-[20px]'>Member Type</h2>
                        <SeeAll />
                    </div>
                </div>
            </div>
            <div className="flex mb-5 gap-5">
                <div className="">
                    <div className="flex gap-5">
                        <Card text='Total payroll' price='$34.4322' grade={'+24'} />
                        <Card text='Job Applicant' price='$12.845' grade={'-15'} />
                    </div>
                    <div className="rounded-[20px] my-5 bg-white p-5">
                        <div className="flex items-center mb-4 justify-between">
                            <h2 className='font-medium text-[20px]'>List of Member</h2>
                            <div className="flex items-center gap-2">
                                <Button icon={<ArrowDownUp size={16} />} text="Sort" />
                                <Button icon={<Filter size={16} />} text="Filter" />
                                <SeeAll />
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard