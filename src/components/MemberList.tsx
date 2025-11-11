"use client"
import React, { useEffect, useState } from "react";
import SeeAll from "@/src/components/SeaAll"
import { ArrowDownUp, Filter, MoreVertical, Download, Share2, Edit2, Trash2, Eye, Check, X } from "lucide-react";
import Button from "@/src/components/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetStore } from "../store/store";
import useDarkSide from "../shared/config/useDarkSide";
import { Input, Modal } from "antd";
import { CheckRounded } from "@mui/icons-material";

const MemberList: React.FC = ({ search }: any) => {

    const { getSalaryAnomoly, getSalaryAnomalyAll, salary, salaryAll, addCommentSalary, editSalaryAnomaly, salaryById, getSalaryAnomalyId } = useGetStore()

    const [view, setView] = useState<boolean>(false)
    const [id, setid] = useState<number>(0)
    const [input, setInput] = useState<boolean>(false)
    const [addinput, setaddInput] = useState<strign>('')

    const data = salary?.data
    console.log(data);

    const getEmployeeId = salaryAll?.data?.find(e => e.id == id)
    const getid = getEmployeeId?.employeeId


    async function edit() {
        try {
            let addComment = {
                id: id
            }
            await editSalaryAnomaly(addComment)
            setView(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function add() {
        try {
            let data = {
                id: id,
                reviewComment: addinput
            }
            await addCommentSalary(data)
            setaddInput('')
            setInput(false)
        } catch (error) {
            console.error(error);
        }
    }

    const [theme] = useDarkSide()

    useEffect(() => {
        getSalaryAnomoly()
        getSalaryAnomalyAll()
        getSalaryAnomalyId(getid)
    }, [getid])

    return (
        <div className={`rounded-[20px] my-5 ${theme === 'dark' ? "bg-[#0f172a]" : "bg-white"} p-6 shadow-sm border`}>
            <div className="flex items-center mb-6 justify-between">
                <h2 className={`font-semibold text-[22px] ${theme === 'dark' ? "text-gray-300" : " text-gray-800"}`}>Salary Anomoly</h2>
                <div className="flex items-center gap-2">
                    <Button icon={<ArrowDownUp size={16} />} text="Sort" />
                    <Button icon={<Filter size={16} />} text="Filter" />
                    <SeeAll />
                </div>
            </div>
            <Modal
                title={null}
                open={view}
                onOk={edit}
                okText="Mark as Reviewed"
                cancelText="Close"
                onCancel={() => setView(false)}
                centered
            // className="rounded-2xl"
            >
                {salaryById?.data?.map(e => (
                    <div
                        key={e.id}
                        className={`p-6 rounded-2xl border shadow-sm transition-all duration-300
        ${theme === 'dark'
                                ? 'bg-[#0f172a] border-gray-700 text-gray-100'
                                : 'bg-white border-gray-200 text-gray-800'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>💰</span>
                                {e.employeeName}
                            </h2>
                            <span
                                className={`text-xs font-medium px-3 py-1.5 rounded-full
            ${e.isViewed
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {e.isViewed ? 'Reviewed' : 'Pending'}
                            </span>
                        </div>

                        <div className="mb-5">
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Period:
                            </p>
                            <p className="font-medium">
                                {new Date(e.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-5">
                            <div
                                className={`rounded-xl p-4 border 
            ${theme === 'dark' ? 'border-gray-700 bg-[#1e293b]' : 'border-gray-100 bg-gray-50'}`}
                            >
                                <p className="text-sm text-gray-500">Expected Amount</p>
                                <h3 className="text-xl font-semibold text-green-500">
                                    ${e.expectedAmount.toLocaleString()}
                                </h3>
                            </div>

                            <div
                                className={`rounded-xl p-4 border 
            ${theme === 'dark' ? 'border-gray-700 bg-[#1e293b]' : 'border-gray-100 bg-gray-50'}`}
                            >
                                <p className="text-sm text-gray-500">Actual Amount</p>
                                <h3 className="text-xl font-semibold text-blue-500">
                                    ${e.actualAmount.toLocaleString()}
                                </h3>
                            </div>
                        </div>

                        <div
                            className={`p-4 rounded-xl text-center border
          ${e.deviationPercent >= 0
                                    ? theme === 'dark'
                                        ? 'bg-green-900/30 border-green-700 text-green-400'
                                        : 'bg-green-50 border-green-200 text-green-600'
                                    : theme === 'dark'
                                        ? 'bg-red-900/30 border-red-700 text-red-400'
                                        : 'bg-red-50 border-red-200 text-red-600'
                                }`}
                        >
                            <p className="text-sm font-medium">Deviation</p>
                            <h3 className="text-2xl font-bold">
                                {e.deviationPercent > 0 ? '+' : ''}
                                {e.deviationPercent.toFixed(2)}%
                            </h3>
                        </div>
                        {!input && (
                            <div className="mt-5" onClick={() => setInput(true)}>Add comment</div>
                        )}
                        {input && (
                            <div className="flex mt-5 items-center gap-3">
                                <Input value={addinput} onChange={(e) => setaddInput(e.target.value)} placeholder="Add comment" />
                                <button onClick={add}><CheckRounded /></button>
                                <button onClick={() => setInput(false)}><X /></button>
                            </div>
                        )}
                        {e.reviewComment && (
                            <div className="mt-5">
                                <p className="text-sm text-gray-500 mb-1">Review Comment:</p>
                                <p
                                    className={`p-3 rounded-lg border text-sm
              ${theme === 'dark'
                                            ? 'border-gray-700 bg-[#1e293b] text-gray-300'
                                            : 'border-gray-200 bg-gray-50 text-gray-700'}`}
                                >
                                    {e.reviewComment}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </Modal>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr
                            className={`text-sm font-medium${theme === 'dark'
                                ? 'bg-[#181f2b] text-gray-200 border-b border-gray-700'
                                : 'bg-gray-50 text-gray-700 border-b border-gray-200'
                                }`}>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Sale</th>
                            <th className="text-center py-3 px-4">Status</th>
                            <th className="text-center py-3 px-4">Action</th>
                        </tr>

                    </thead>
                    <tbody className={`${theme == 'dark' ? "text-gray-400" : "text-gray-700"} text-sm`}>
                        {data && data?.map((item, idx) => (
                            <tr
                                key={item?.id}
                                className={`
                                    ${idx % 2 === 0
                                        ? theme === 'dark'
                                            ? 'bg-[#0f172a]'
                                            : 'bg-white'
                                        : theme === 'dark'
                                            ? 'bg-[hsl(222,47%,21%)]'
                                            : 'bg-gray-50'
                                    }
                                    transition-colors duration-200
                                    ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
                                    `}>
                                <td className="py-3 px-4 font-medium" > {item?.fullName}</td>
                                <td className="py-3 px-4">{item?.month.toLocaleString("en-US", { month: "short" })}</td>
                                <td className="py-3 px-4">{item?.deviation.toFixed()}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full`}>
                                        {item?.isViewed ? "viewed" : "not viewed"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-150'} transition`}>
                                                <MoreVertical size={18} className="text-gray-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-36">
                                            <DropdownMenuItem onClick={() => {
                                                setView(true)
                                                setid(item?.id)
                                            }} className="flex items-center gap-2 cursor-pointer">
                                                <Eye size={14} /> View
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
            </div >
        </div >
    );
};

export default MemberList;