'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { ApexOptions } from 'apexcharts';
import { useGetStore } from '../store/store';
import SeeAll from './SeaAll';
import { useTheme } from 'next-themes';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MemberTypeChart = () => {
    const { department, getDepartment } = useGetStore();
    const { theme } = useTheme();

    useEffect(() => {
        getDepartment();
    }, []);

    const data = department || [];

    const generateColors = (count: number) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360) / count;
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    const colors = generateColors(data.length);
    const series_7 = data.map(e => e?.employeeCount);

    const options_7: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        legend: {
            show: false, 
        },
        dataLabels: { enabled: true },
        colors,
        labels: data.map(e => e.name),
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                },
            },
        },
        responsive: [
            {
                breakpoint: 640,
                options: { chart: { width: 300 } },
            },
        ],
    };

    return (
        <div
            className={`rounded-[20px] md:h-[475px] p-6 shadow-md flex flex-col justify-start items-center 
      ${theme === 'dark' ? 'bg-[#0f172a] text-gray-200' : 'bg-white text-gray-800'}`}
        >
            <div className="flex justify-between items-center w-full mb-4">
                <h2 className="font-medium text-[20px]">Department</h2>
                <Link href="/dashboard/departments">
                    <SeeAll />
                </Link>
            </div>

            <div className="flex justify-center w-full mb-6">
                <Chart options={options_7} series={series_7} type="donut" height={280} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-auto w-full">
                {data.map((item, i) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2 text-sm"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[i] }}
                        />
                        <span className="truncate">{item.name}</span>
                        <span className="ml-auto font-semibold">{item.employeeCount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberTypeChart;
