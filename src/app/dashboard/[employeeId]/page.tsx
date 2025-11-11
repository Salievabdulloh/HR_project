"use client"
import { useGetStore } from "@/src/store/store";
import { Check, Pen, User2, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "antd";

const ProfileId = () => {
    const { employeeId } = useParams();
    const { allUsers, getUsersAll, editUsers, editSalary, getSalaryHistory } = useGetStore();


    const [editusername, setEditusername] = useState('')
    const [editemail, setEditemail] = useState('')
    const [editphoneNumber, setEditphoneNumber] = useState('')
    const [editbaseSalary, setEditbaseSalary] = useState('')
    const [openEdit, setopenEdit] = useState(false)
    const [openEditDialog, setopenEditDialog] = useState<boolean>(false)


    const getData = allUsers?.data?.find(
        (e) => e.employeeInfo?.id === Number(employeeId)
    )

    const user = getData?.employeeInfo;

    function editModal() {
        setopenEdit(true)
        setEditusername(getData?.username)
        setEditemail(getData?.email)
        setEditphoneNumber(getData?.phoneNumber)
    }

    async function edit() {
        try {
            let data = {
                employeeId: employeeId,
                username: editusername,
                email: editemail,
                phoneNumber: editphoneNumber,
            }
            await editUsers(data)
            setopenEdit(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function salary() {
        try {
            let editData = {
                employeeId: employeeId,
                baseSalary: editbaseSalary,
            }
            await editSalary(editData)
            setopenEditDialog(false)
        } catch (error) {
            console.error(error);
        }
    }


    // if (!getData) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen text-gray-500">
    //             Loading user info...
    //         </div>
    //     );
    // }

    useEffect(() => {
        getUsersAll()
        getSalaryHistory()
    }, [])

    return (
        <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-xl rounded-2xl p-10 flex gap-10 items-center w-[800px] border border-gray-100"
            >
                <div className="flex flex-col items-center gap-4 w-[40%]">
                    <div className="bg-gray-100 rounded-full p-6 border border-gray-200">
                        <User2 size={120} className="text-gray-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-gray-500 text-sm">{getData?.role}</p>
                </div>

                <div className="flex flex-col gap-5 flex-1">
                    <h1 className="text-2xl flex items-center gap-5 font-semibold text-gray-800 border-b pb-2">
                        Profile Information <Pen color="blue" onClick={editModal} className="cursor-pointer" />
                        {openEdit && (<X className="cursor-pointer" color="red" onClick={() => setopenEdit(false)} />)}
                    </h1>
                    {openEdit ? (
                        <div className="grid grid-cols-2 gap-y-3 text-[15px]">
                            <div className="text-gray-500">Username:</div>
                            <Input value={editusername} onChange={(e) => setEditusername(e.target.value)} />
                            <div className="text-gray-500">Email:</div>
                            <Input value={editemail} onChange={(e) => setEditemail(e.target.value)} />
                            <div className="text-gray-500">Phone Number:</div>
                            <Input value={editphoneNumber} onChange={(e) => setEditphoneNumber(e.target.value)} />

                            <div className="text-gray-500">Position:</div>
                            <Input value={user?.position} disabled />

                            <div className="text-gray-500">Hire Date:</div>
                            <Input value={user?.hireDate?.split("-").join("/")} disabled />

                            <div className="text-gray-500">Department:</div>
                            <Input value={user?.departmentName} disabled />

                            <div className="text-gray-500 flex items-center gap-2">Salary:
                                <Pen color="blue" size={20} onClick={() => setopenEditDialog(true)} />
                            </div>
                            <div className="flex items-center gap-3">
                                {openEditDialog && (
                                    <>
                                        <Input value={editbaseSalary || user?.baseSalary} onChange={(e) => setEditbaseSalary(e.target.value)} />
                                        <Check className="cursor-pointer" color="blue" size={30} onClick={salary} />
                                        <X className="cursor-pointer" color="red" size={30} onClick={() => setopenEditDialog(false)} />
                                    </>
                                )}
                            </div>
                            <button className="text-blue-500 hover:bg-[blue] rounded p-2 py-1 cursor-pointer w-fit hover:text-white flex items-center gap-2" onClick={edit}>Save<Check color="blue" className="hover:text-white" /></button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-y-3 text-[15px]">
                            <div className="text-gray-500">Username:</div>
                            <div className="font-medium text-gray-800">{getData?.username}</div>

                            <div className="text-gray-500">Email:</div>
                            <div className="font-medium text-gray-800">{getData?.email}</div>

                            <div className="text-gray-500">Position:</div>
                            <div className="font-medium text-gray-800">{user?.position}</div>

                            <div className="text-gray-500">Hire Date:</div>
                            <div className="font-medium text-gray-800">
                                {user?.hireDate?.split("-").join("/")}
                            </div>

                            <div className="text-gray-500">Department:</div>
                            <div className="font-medium text-gray-800">
                                {user?.departmentName}
                            </div>

                            <div className="text-gray-500">Salary:</div>
                            <div className="font-medium text-gray-800">
                                ${user?.baseSalary}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div >
        </div >
    );
};

export default ProfileId;
