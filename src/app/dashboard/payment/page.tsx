"use client";

import { useGetStore } from '@/src/store/store'
import React, { useEffect, useMemo } from 'react'
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react'
import useDarkSide from '@/src/shared/config/useDarkSide'

const Payment = () => {
    const { payments, getPayments } = useGetStore()
    const data = payments?.data || []
    const [theme] = useDarkSide()

    useEffect(() => { getPayments() }, [])

    // ✅ Example percentage change calculation:
    // (currentMonth - previousMonth) / previousMonth * 100
    const dataWithPercentage = useMemo(() => {
        if (!data || data.length === 0) return []
        return data.map((item, i) => {
            const prev = data[i - 1]?.totalAmount || item.totalAmount
            const percentChange = ((item.totalAmount - prev) / prev) * 100
            return { ...item, percentChange: Math.round(percentChange) }
        })
    }, [data])

    return (
        <div
            className={`min-h-screen py-10 px-5 md:px-20 transition-all duration-500
                ${theme === 'dark'
                    ? 'bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100'
                    : 'bg-linear-to-t from-blue-50 via-white to-blue-100 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <DollarSign
                            className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}
                            size={26}
                        />
                        <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                            Payments
                        </h2>
                    </div>
                </div>

                {/* Payment cards */}
                <div className="grid gap-4 sm:grid-cols-1">
                    {dataWithPercentage.map((e) => (
                        <div
                            key={e.id}
                            className={`rounded-2xl p-5 shadow-md border
                                transition-all duration-300
                                ${theme === 'dark'
                                    ? 'bg-[#0f172a] border-gray-700 hover:bg-[#1e293b]'
                                    : 'bg-white border-gray-100 hover:shadow-lg'}`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        #{e.id}
                                    </span>
                                    <h3 className="text-lg font-semibold">{e.name}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold">${e.totalAmount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1">
                                    {e.totalAmount > 0 ? (
                                        <ArrowUpRight size={16} className="text-green-500" />
                                    ) : (
                                        <ArrowDownRight size={16} className="text-red-500" />
                                    )}
                                    <span
                                        className={`font-medium ${e.totalAmount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {e.totalAmount > 0 ? '+' : ''}
                                        {e.totalAmount}%
                                    </span>
                                </div>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    vs last record
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {dataWithPercentage.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        <p>No payment records found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Payment
