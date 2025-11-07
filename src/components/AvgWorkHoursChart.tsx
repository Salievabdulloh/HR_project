'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Calendar, ArrowDown } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AvgWorkHoursChart = () => {
  const options_2 = {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00"
      ],
    },
    tooltip: {
      x: { format: 'dd/MM/yy HH:mm' },
    },
    colors: ['#4F46E5', '#22C55E'], // nice contrast
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] },
    },
  };

  const series_2 = [
    { name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] },
    { name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] },
  ]

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="font-medium text-[20px]">Avg. Work Hours</h2>
        <button className="flex items-center gap-3 p-2 px-3 border shadow-sm rounded-md border-[#dedede] text-[14px]">
          <Calendar className="text-gray-600" size={18} />
          <p>8 Nov 2024 - 14 Nov 2024</p>
          <p className="flex items-center text-gray-600">
            Last 7 days <ArrowDown size={16} className="ml-1" />
          </p>
        </button>
      </div>

      <Chart options={options_2 as any} series={series_2} type="area" height={350} />
    </div>
  );
};

export default AvgWorkHoursChart;