'use client'
import React, { useEffect, useState } from 'react'
import SeeAll from "@/src/components/SeaAll"
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetStore } from '../store/store';
import { DataArray } from '@mui/icons-material';

const Card = ({ text, price, grade }: any) => {

    const { payroll, getPayrollRecordTotal } = useGetStore()

    const data = payroll?.data

    const getMonth = data?.map(e => e?.month) || []
    const getTotal = data?.map(e => e?.totalNetPay) || []

    let str = []

    for (const el of getMonth) {
        console.log(str.push(el.slice(0, 3)));
    }

    console.log(getMonth)
    console.log(getTotal)

    // const getMonthRev = str.toReversed()
    // const getTotalRev = getTotal.toReversed()
    // console.log(str)
    // console.log(getMonthRev)


    useEffect(() => { getPayrollRecordTotal() }, [])

    return (
        <div className="rounded-[20px] bg-white p-5">
            <div className="flex justify-between items-center">
                <h2 className='font-medium text-[20px]'>{text}</h2>
                <SeeAll />
            </div>
            <h1 className='text-[28px] my-2.5 font-medium'>{price}</h1>
            <div className='flex items-center gap-1'>
                <p className={`${grade[0] === '+' ? "text-[hsl(120,100%,50%)]" : "text-[red]"}`}>{grade}%</p>
                <p className='text-gray-500'>Vs Last Six Months</p>
            </div>
            <div className="m-4 ml-[-25px]">
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: str || [0, 0, 0, 0],
                        },
                    ]}
                    series={[
                        {
                            label: 'Total Net Pay',
                            data: getTotal || [0, 0, 0, 0],
                            color: 'green',
                        }
                    ]}
                    width={300}
                    height={250}
                />
            </div>
        </div>
    )
}

export default Card