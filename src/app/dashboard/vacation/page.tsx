"use client";
import { useGetStore } from "@/src/store/store";
import React, { useEffect, useState } from "react";
import { CalendarDays, Briefcase, Sun, Clock, Pen } from "lucide-react";
import useDarkSide from "@/src/shared/config/useDarkSide";
import { Button, } from "antd";
import { useRouter } from "next/navigation";
import { TableBody, Modal, Box } from "@mui/material";
import BasicRangeShortcuts from "@/src/components/BasicRangeShortcuts";
import { useTheme } from 'next-themes'


const Vacations = () => {
    const { myVacation, myVacationRecord, getMyVacationRecord, getMyVacation, cancelMyVacation, user, getRegister } = useGetStore();
    const { theme, setTheme } = useTheme()

    const data = myVacation;
    const myData = myVacationRecord;

    const [open, setOpen] = useState<boolean>(false)

    console.log(myData);

    async function editStatus(id: number) {
        try {
            let data = {
                id: id
            }
            let res = await cancelMyVacation(data)
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMyVacation();
        getMyVacationRecord();
        getRegister();
    }, [])

    return (
        <div
            className={`rounded-[20px] p-6 shadow-sm border m-6 ${theme === "dark"
                ? "bg-[#0f172a] border-gray-700 text-gray-100"
                : "bg-white border-gray-200 text-gray-800"
                }`}
        >
            <h1 className="text-[28px] font-semibold text-center mb-8">
                My Vacation Overview 🌴
            </h1>

            <div
                className={`p-5 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${theme === "dark"
                    ? "bg-[#1e293b] border border-gray-700"
                    : "bg-gray-50 border border-gray-200"
                    }`}
            >
                <div>
                    <h2 className="text-xl font-semibold">
                        {data?.employee.firstName} {data?.employee.lastName}
                    </h2>
                    <p
                        className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        {data?.employee.position} – {data?.employee.departmentName}
                    </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Briefcase
                        size={18}
                        className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
                    />
                    <span>
                        Hired on{" "}
                        {new Date(String(data?.employee.hireDate)).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                <div
                    className={`rounded-2xl p-5 text-center ${theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        }`}
                >
                    <p className="text-sm text-gray-500">Total Days / Year</p>
                    <h3 className="text-3xl font-bold text-blue-500">
                        {data?.totalDaysPerYear}
                    </h3>
                </div>
                <div
                    className={`rounded-2xl p-5 text-center ${theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        }`}
                >
                    <p className="text-sm text-gray-500">Used Days</p>
                    <h3 className="text-3xl font-bold text-red-500">{data?.usedDays}</h3>
                </div>
                <div
                    className={`rounded-2xl p-5 text-center ${theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        }`}
                >
                    <p className="text-sm text-gray-500">Remaining Days</p>
                    <h3 className="text-3xl font-bold text-green-500">
                        {data?.remainingDays}
                    </h3>
                </div>
            </div>

            <div
                className={`p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between ${theme === "dark"
                    ? "bg-[#1e293b] border border-gray-700"
                    : "bg-gray-50 border border-gray-200"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <CalendarDays
                        size={20}
                        className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
                    />
                    <div>
                        <p className="text-sm text-gray-500">Vacation Period</p>
                        <h3 className="font-medium">
                            {new Date(String(data?.periodStart)).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}{" "}
                            →{" "}
                            {new Date(String(data?.periodEnd)).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Sun
                        size={20}
                        className={theme === "dark" ? "text-yellow-400" : "text-yellow-500"}
                    />
                    <p className="text-sm font-medium">
                        Bonus Days:{" "}
                        <span className="text-yellow-500">
                            +{data?.byExperienceBonusDays}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-6 flex justify-end text-sm text-gray-500 gap-2 items-center">
                <Clock size={16} />
                <span>Year: {data?.year}</span>
            </div>
            <BasicRangeShortcuts open={open} setOpen={setOpen} />
            <Button onClick={() => setOpen(true)}>Request Vacation</Button>
            <div
                className={`mt-10 rounded-xl border ${theme === "dark"
                    ? "border-gray-700 bg-[#0f172a]"
                    : "border-gray-200 bg-white"
                    }`}
            >
                <div className="p-4 border-b border-gray-600/30 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Vacation History
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table
                        className={`w-full text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
                        <thead
                            className={`text-xs uppercase ${theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            <tr>
                                <th className="px-4 py-3 text-left">Period</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Days</th>
                                <th className="px-4 py-3 text-left">Payment</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData?.length > 0 ? (
                                myData.map((e) => (
                                    <tr
                                        key={e.id}
                                        className={`transition-colors ${theme === "dark"
                                            ? "hover:bg-gray-800/70"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <td className="px-4 py-3 border-t border-gray-700/30">
                                            {e.startDate} – {e.endDate}
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-700/30 capitalize">
                                            {e.type}
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-700/30">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${e.status === "Approved"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : e.status === "Pending"
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-700/30">{e.daysCount}</td>
                                        <td className="px-4 py-3 border-t border-gray-700/30 font-semibold">
                                            ${e.paymentAmount?.toLocaleString()}
                                        </td>
                                        {e.status === "Pending" && (
                                            <td className="px-4 py-3 border-t border-gray-700/30">
                                                <Button onClick={() => editStatus(e.id)}><Pen size={20} /></Button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center italic text-gray-400 border-t border-gray-700/30"
                                    >
                                        No vacation records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    );
};

export default Vacations;
