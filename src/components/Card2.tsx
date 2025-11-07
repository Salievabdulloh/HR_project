'use client'
import React, { useEffect, useState } from 'react'
import SeeAll from "@/src/components/SeaAll"
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetStore } from '../store/store';
import { DataArray } from '@mui/icons-material';

const Card2 = ({ text, price, grade }: any) => {

    const { getVacationSummary, vacation } = useGetStore()

    const data = vacation?.data

    // console.log(data);

    // let str = []
    // let cnt = 0
    // let cnt2 = 0
    // for (let i = 0; i <= data?.length; i++) {
    //     str.push(0 + ', ')
    // }

    const vac = data?.map(e => e.totalVacationDays)
    const employee = data?.map(e => e.employeesOnVacation)

    const month = ['January', 'February', 'March', 'April', 'May', "Juny", "July", "August", "Sep", 'September', 'October', 'November', 'December']

    const sixMonth = month.slice(0, 6)

    const getMonth = data?.map(e => new Date(`${e?.month}-01`).toLocaleString("En-US", { month: "short" }));

    let shortMonth = []

    for (const e of sixMonth) {
        shortMonth.push(e.slice(0, 3))
    }

    useEffect(() => { getVacationSummary() }, [])

    return (
        <div className="rounded-[20px] bg-white p-5">
            <div className="flex justify-between items-center">
                <h2 className='font-medium text-[20px]'>{text}</h2>
                <SeeAll />
            </div>
            <h1 className='text-[28px] my-2.5 font-medium'>{price}</h1>
            <div className='flex items-center gap-1'>
                <p className={`${grade[0] === '+' ? "text-[hsl(120,100%,50%)]" : "text-[red]"}`}>{grade}%</p>
                <p className='text-gray-500'>Vs Last Week</p>
            </div>
            <div className="m-4 -ml-5">
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: getMonth || [],
                        },
                    ]}
                    series={[
                        {
                            label: 'Total Vacation Days',
                            data: vac || [0, 0, 0],
                            color: '#EF4444',
                        },
                        {
                            label: 'Employees on Vacation',
                            data: employee || [0, 0, 0],
                            color: '#3B82F6',
                        },
                    ]}
                    width={300}
                    height={250}
                />
            </div>
        </div>
    )
}

export default Card2