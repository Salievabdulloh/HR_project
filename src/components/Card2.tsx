'use client';
import React, { useEffect } from 'react';
import SeeAll from "@/src/components/SeaAll";
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetStore } from '../store/store';
import useDarkSide from '../shared/config/useDarkSide';

const Card2 = () => {
    const { getVacationSummary, vacation } = useGetStore();
    const [theme] = useDarkSide();

    const data = vacation?.data || [];
    let cnt = 0
    const vac = data.map((e: any) => e.totalVacationDays);
    data.map((e: any) => cnt += e.totalVacationDays);
    const employee = data.map((e: any) => e.employeesOnVacation);
    const getMonth = data.map((e: any) =>
        new Date(`${e?.month}-01`).toLocaleString("en-US", { month: "short" })
    );

    useEffect(() => {
        getVacationSummary();
    }, []);

    return (
        <div
            className={`rounded-[20px] p-5 transition-all duration-500 shadow-md
        ${theme === 'dark'
                    ? 'bg-linear-to-br from-[#0f172a] to-[#1e293b] text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'}
      `}
        >
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-[20px]">Vacation Info</h2>
                <SeeAll />
            </div>

            <h1 className="text-[28px] my-2.5 font-semibold">{cnt} Days</h1>
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
                    Vs Last Week
                </p>
            </div>

            {/* Chart */}
            <div className="m-4 -ml-5">
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: getMonth.length ? getMonth : ['---', '---', '---'],
                            labelStyle: {
                                fill: theme === 'dark' ? '#cbd5e1' : '#475569',
                            },
                            tickLabelStyle: {
                                fill: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        },
                    ]}
                    yAxis={[
                        {
                            tickLabelStyle: {
                                fill: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        },
                    ]}
                    series={[
                        {
                            label: 'Total Vacation Days',
                            data: vac.length ? vac : [0, 0, 0],
                            color: theme === 'dark' ? '#f87171' : '#ef4444',
                        },
                        {
                            label: 'Employees on Vacation',
                            data: employee.length ? employee : [0, 0, 0],
                            color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
                        },
                    ]}
                    sx={{
                        '& .MuiChartsAxis-tickLabel': {
                            fill: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                        },
                        '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                            stroke: theme === 'dark' ? '#334155' : '#cbd5e1',
                        },
                        '& .MuiChartsLegend-series text': {
                            fill: theme === 'dark' ? '#cbd5e1' : '#1e293b',
                        },
                    }}
                    width={300}
                    height={250}
                />
            </div>
        </div>
    );
};

export default Card2;
