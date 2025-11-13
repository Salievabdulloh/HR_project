"use client";

import { useGetStore } from '@/src/store/store'
import React, { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, ArrowDownRight, DollarSign, Save, Check, X } from 'lucide-react'
import useDarkSide from '@/src/shared/config/useDarkSide'
import { Input, Modal } from 'antd';
import toast from 'react-hot-toast';

const Payment = () => {
    const { payments, getPayments, salaryHistory, editSalaryHistory, getSalaryHistory } = useGetStore()
    
    const data = payments || []
    const [theme] = useDarkSide()

    const [editDialog, setEditDialog] = useState(false)
    const [percent, setpercent] = useState<number>(0)
    const [id, setid] = useState<number>(0)
    

    function getElement(getId: number) {
        setEditDialog(true)
        setid(getId)
        // console.log(e.id);
    }



    async function edit() {
        try {
            let editPercent = {
                departmentId: id,
                bonusPercentage: percent,
            }
            await editSalaryHistory(editPercent)
            setEditDialog(false)
            toast.success("The percentage has been added")
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPayments()
        getSalaryHistory()
    }, [])

    const dataWithPercentage = useMemo(() => {
        if (!data || data.length === 0) return []
        return data?.map((item, i) => {
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
                <div className="grid gap-4 sm:grid-cols-1">
                    {dataWithPercentage.map((e) => (
                        <div
                            key={e.id}
                            onClick={() => getElement(e.id)}
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
                                    {editDialog && e.id === id && (
                                        <div className='flex gap-4 items-center'>
                                            <Input placeholder='Add percentage' type='text' min={0} maxLength={100} value={percent} onChange={(e) => setpercent(Number(e.target.value))} />
                                            <Check onClick={edit} size={20} />
                                            <X size={20} onClick={() => {
                                                setEditDialog(false)
                                                setpercent(0)
                                            }} />
                                        </div>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold">${e.totalAmount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    vs last record
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {dataWithPercentage.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        <p>No payment records found.</p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Payment
