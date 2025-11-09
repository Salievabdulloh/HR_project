'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Calendar, ArrowDown } from 'lucide-react';
import { Select } from 'antd';
import { useGetStore } from '../store/store';
import useDarkSide from '../shared/config/useDarkSide';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AvgWorkHoursChart = () => {

  const { getPayrollmonth, payrollMonthId } = useGetStore()

  const [getMonth, setGetMonth] = useState<number | null>(3)

  console.log(payrollMonthId);

  const data = payrollMonthId?.data

  const [theme] = useDarkSide()

  const options_2 = {
    chart: {
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
    foreColor: theme === 'dark' ? '#fff' : '#333',
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: data?.map(e => e.month),
      labels: {
        style: {
          colors: theme === 'dark' ? '#fff' : '#333',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === 'dark' ? '#fff' : '#333',
        },
      },
    },
    grid: {
      borderColor: theme === 'dark' ? '#334155' : '#e5e7eb',
    },
    colors: ['#4F46E5', '#22C55E'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      theme: theme === 'dark' ? 'dark' : 'light',
    },
  };

  const series_2 = [
    { name: 'Total Gross Pay', data: data?.map(e => e.totalGrossPay) },
    { name: 'Total Net Pay', data: data?.map(e => e.totalNetPay) },
  ]

  useEffect(() => { getPayrollmonth(getMonth) }, [getMonth])

  return (
    <div className={`p-6 ${theme === 'dark'
      ? 'bg-[#0f172a] text-gray-100'
      : 'bg-linear-to-br bg-white text-gray-900'
      }
   rounded-2xl shadow-md`}>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="font-medium text-[20px]">Average Payouts</h2>
        <select
          value={getMonth}
          onChange={(e) => setGetMonth(Number(e.target.value))}
          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200
    focus:ring-2 focus:outline-none
    ${theme === 'dark'
              ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500 hover:bg-gray-700'
              : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400 hover:bg-gray-50'
            }`}
        >
          <option value={3}>Last 3 months</option>
          <option value={6}>Last 6 months</option>
          <option value={12}>Last 12 months</option>
        </select>

      </div>

      <Chart options={options_2 as any} series={series_2} type="area" height={350} />
    </div>
  );
};

export default AvgWorkHoursChart;