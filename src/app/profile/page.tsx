'use client'
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useGetStore } from "@/src/store/store";
import { Loader } from "lucide-react";

const Profile = () => {
    const { user, getRegister } = useGetStore();
    console.log();

    const users = user.data
    const userInfo = users?.employeeInfo
    console.log(user)

    if (!user) {
        return <div className="flex items-center">Loading <Loader className="animate-spin" /></div>;
    }

    useEffect(() => { getRegister() }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-8">
            <header className="w-full bg-white shadow-md py-4 px-8 text-2xl font-bold text-gray-800">
                My Profile
            </header>

            <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
                <section className="bg-white p-6 rounded-lg shadow flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                            <Input
                                id="username"
                                value={users?.username}
                                disabled
                                placeholder="Username"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                value={users?.email}
                                disabled
                                placeholder="Email"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                            <Input
                                id="phone"
                                value={users?.phoneNumber}
                                disabled
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                            <Input
                                id="first-name"
                                value={users?.firstName}
                                disabled
                                placeholder="First Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                            <Input
                                id="last-name"
                                value={userInfo?.lastName}
                                disabled
                                placeholder="Last Name"
                            />
                        </div><div className="flex flex-col gap-1">
                            <label htmlFor="position" className="text-sm font-medium text-gray-700">Position</label>
                            <Input
                                id="position"
                                value={userInfo?.position}
                                disabled
                                placeholder="Position"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="hire-date" className="text-sm font-medium text-gray-700">Hire Date</label>
                            <Input
                                id="hire-date"
                                value={userInfo?.hireDate}
                                disabled
                                placeholder="Hire Date"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="base-salary" className="text-sm font-medium text-gray-700">Base Salary</label>
                            <Input
                                id="base-salary"
                                value={userInfo?.baseSalary}
                                disabled
                                placeholder="Base Salary"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="department-name" className="text-sm font-medium text-gray-700">Department Name</label>
                            <Input
                                id="department-name"
                                value={userInfo?.departmentName}
                                disabled
                                placeholder="Department Name"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;