'use client';
import React, { useEffect } from 'react';
import SeeAll from "@/src/components/SeaAll";
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetStore } from '../store/store';
import useDarkSide from '../shared/config/useDarkSide';

const Card = () => {
    const { payroll, getPayrollRecordTotal } = useGetStore();
    const [theme] = useDarkSide();

    let cnt = 0

    const data = payroll || [];
    const months = data.map((e: any) => e.month?.slice(0, 3)) || [];
    const totals = data.map((e: any) => e.totalNetPay) || [];
    const totalsPrice = data.map((e: any) => cnt += e.totalNetPay) || [];

    useEffect(() => { getPayrollRecordTotal(); }, []);

    return (
        <div
            className={`rounded-[20px] p-5 transition-all duration-500 shadow-md 
        ${theme === 'dark'
                    ? 'bg-linear-to-br from-[#0f172a] to-[#1e293b] text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'}`}
        >
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-[20px]">Total payroll</h2>
                <SeeAll />
            </div>

            <h1 className="text-[28px] my-2.5 font-semibold">${cnt}</h1>
            <div className="flex items-center gap-1">
                {/* <p
                    className={`font-medium ${grade[0] === '+' ? 'text-green-400' : 'text-red-400'
                        }`}
                >
                    {grade}%
                </p> */}
                <p
                    className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        } text-sm`}
                >
                    Vs Last Six Months
                </p>
            </div>

            {/* Chart */}
            <div className="m-4 ml-[-25px]">
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: months.length ? months : ['---', '---', '---'],
                            labelStyle: {
                                fill: theme === 'dark' ? '#cbd5e1' : '#475569', // light blue-gray text
                            },
                            tickLabelStyle: {
                                fill: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        },
                    ]}
                    series={[
                        {
                            label: 'Total Net Pay',
                            data: totals.length ? totals : [0, 0, 0],
                            color: theme === 'dark' ? '#38bdf8' : '#22c55e',
                        },
                    ]}
                    yAxis={[
                        {
                            tickLabelStyle: {
                                fill: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        },
                    ]}
                    sx={{
                        '& .MuiChartsAxis-tickLabel': {
                            fill: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                        },
                        '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                            stroke: theme === 'dark' ? '#334155' : '#cbd5e1',
                        },
                    }}
                    width={300}
                    height={250}
                />
            </div>
        </div>
    );
};

export default Card;
