'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MoreHorizontal } from 'lucide-react';
import type { ApexOptions } from 'apexcharts';
import SeeAll from './SeaAll';
import { useGetStore } from '../store/store';
import useDarkSide from '../shared/config/useDarkSide';
import Link from 'next/link';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MemberTypeChart = () => {
    const { department, getDepartment } = useGetStore()

    const data = department;

    const generateColors = (count: number) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360) / count;
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    }

    const options_7: ApexOptions = {
        chart: {
            toolbar: { show: false },
            width: 600,
        },
        legend: {
            position: 'right',
            fontSize: '14px',
            labels: { colors: '#6B7280' },
        },
        dataLabels: { enabled: true },
        colors: generateColors(data?.length || 0), // ✅ dynamic color palette
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: { width: 500 },
                    legend: { position: 'bottom' },
                },
            },
            {
                breakpoint: 640,
                options: {
                    chart: { width: 350 },
                    legend: { position: 'bottom' },
                },
            },
        ],
        labels: data?.map(e => e.name),
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                },
            },
        },
    }


    const series_7 = data?.map(e => e?.employeeCount)

    const [theme] = useDarkSide()

    useEffect(() => { getDepartment() }, [])

    return (
        <div className={`rounded-[20px] w-[475px] ${theme === 'dark' ? "bg-[#0f172a]" : "bg-white"} p-6 shadow-md flex flex-col items-center`}>
            <div className="flex justify-between items-center w-full mb-4">
                <h2 className="font-medium text-[20px]">Department</h2>
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
                    <MoreHorizontal size={20} />
                    <Link href="/dashboard/departments">
                        <SeeAll />
                    </Link>
                </button>
            </div>
            <div className="w-full flex justify-center">
                <Chart options={options_7} series={series_7} type="donut" height={400} width={500} />
            </div>
        </div>
    );
};

export default MemberTypeChart;