"use client"
import React, { useEffect, useState } from "react";
import SeeAll from "@/src/components/SeaAll"
import { ArrowDownUp, Filter, MoreVertical, Download, Share2, Edit2, Trash2 } from "lucide-react";
import Button from "@/src/components/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetStore } from "../store/store";

// interface TableItem {
//     name: string;
//     date: string;
//     sale: string;
//     status: string;
//     status_class: "success" | "warning" | "danger" | "info";
// }

// const tableData: TableItem[] = [
//     {
//         name: "John Doe",
//         date: "2025-10-15",
//         sale: "$1,200",
//         status: "Completed",
//         status_class: "success",
//     },
//     {
//         name: "Jane Smith",
//         date: "2025-10-20",
//         sale: "$980",
//         status: "Pending",
//         status_class: "warning",
//     },
//     {
//         name: "Samuel Green",
//         date: "2025-10-25",
//         sale: "$1,560",
//         status: "Cancelled",
//         status_class: "danger",
//     },
// ];

// const getStatusStyles = (status: TableItem["status_class"]) => {
//     switch (status) {
//         case "success":
//             return "bg-emerald-100 text-emerald-700";
//         case "warning":
//             return "bg-amber-100 text-amber-700";
//         case "danger":
//             return "bg-rose-100 text-rose-700";
//         default:
//             return "bg-blue-100 text-blue-700";
//     }
// };

const MemberList: React.FC = ({ search }: any) => {

    const { getSalaryAnomoly, salary } = useGetStore()

    console.log(salary)

    const data = salary?.data

    useEffect(() => { getSalaryAnomoly() }, [])

    return (
        <div className="rounded-[20px] my-5 bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6 justify-between">
                <h2 className="font-semibold text-[22px] text-gray-800">List of Member</h2>
                <div className="flex items-center gap-2">
                    <Button icon={<ArrowDownUp size={16} />} text="Sort" />
                    <Button icon={<Filter size={16} />} text="Filter" />
                    <SeeAll />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm">
                            <th className="text-left py-3 px-4 font-medium">Name</th>
                            <th className="text-left py-3 px-4 font-medium">Date</th>
                            <th className="text-left py-3 px-4 font-medium">Sale</th>
                            <th className="text-center py-3 px-4 font-medium">Status</th>
                            <th className="text-center py-3 px-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {data
                            // .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
                            // .sort((a, b) => a.name.localeCompare(b.name))
                            ?.map((item, idx) => (
                                <tr
                                    key={item.name}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
                                    <td className="py-3 px-4 font-medium">{item.fullName}</td>
                                    <td className="py-3 px-4">{item.month.toLocaleString("en-US", { month: "short" })}</td>
                                    <td className="py-3 px-4">{item.deviation.toFixed()}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span
                                            className={`text-xs font-medium px-3 py-1.5 rounded-full`}>
                                            {item.isViewed ? "viewed" : "not viewed"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                                                    <MoreVertical size={18} className="text-gray-500" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-36">
                                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                                    <Download size={14} /> Download
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                                    <Share2 size={14} /> Share
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                                    <Edit2 size={14} /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
                                                    <Trash2 size={14} /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberList;