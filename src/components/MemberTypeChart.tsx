'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MoreHorizontal } from 'lucide-react';
import type { ApexOptions } from 'apexcharts';
import SeeAll from './SeaAll'; // fixed filename typo
import { useGetStore } from '../store/store';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MemberTypeChart = () => {
    const { department, getDepartment } = useGetStore()

    const data = Array.isArray(department?.data) ? department.data : [];

    const options_7: ApexOptions = {
        chart: {
            toolbar: { show: false },
            width: 600, // ✅ wider chart
        },
        legend: {
            position: 'right',
            fontSize: '14px',
            labels: { colors: '#6B7280' },
        },
        dataLabels: { enabled: true },
        colors: ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444'],
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
        // labels: ['Admin', 'Staff', 'Members', 'Guests'],
        labels: data?.map(e => e.name),
        plotOptions: {
            pie: {
                donut: {
                    size: '60%', // ✅ makes the donut thicker and more visible
                },
            },
        },
    };

    const series_7 = data?.map(e => e?.employeeCount)

    useEffect(() => { getDepartment() }, [])

    return (
        <div className="rounded-[20px] w-[475px] bg-white p-6 shadow-md flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-4">
                <h2 className="font-medium text-[20px]">Department</h2>
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
                    <MoreHorizontal size={20} />
                    <SeeAll />
                </button>
            </div>

            <div className="w-full flex justify-center">
                <Chart options={options_7} series={series_7} type="donut" height={400} width={500} />
            </div>
        </div>
    );
};

export default MemberTypeChart;