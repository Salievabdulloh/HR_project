'use client'
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useGetStore } from "@/src/store/store";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, getRegister, editUser } = useGetStore();

    const userInfo = user?.employeeInfo

    const [editUsername, setEditUsername] = useState("")
    const [editnumber, setEditnumber] = useState(0)
    const [editemail, setEditemail] = useState("")
    const [editname, setEditname] = useState("")
    const [editLastName, setEditLastName] = useState("")
    const [editPosition, setEditPosition] = useState("")
    const [editdate, setEditdate] = useState("")
    const [editsalary, setEditsalary] = useState(0)
    const [editDepartment, setEditDepartment] = useState("")

    useEffect(() => {
        if (user) {
            setEditUsername(user.username || "")
            setEditnumber(user.phoneNumber || 0)
            setEditdate(user?.employeeInfo.hireDate || "")
            setEditemail(user.email || "")
            setEditname(user?.employeeInfo.firstName || "")
            setEditLastName(user?.employeeInfo.lastName || "")
            setEditPosition(user?.employeeInfo.position || "")
            setEditsalary(user?.employeeInfo.baseSalary || 0)
            setEditDepartment(user?.employeeInfo.departmentName || "")
        }
    }, [user])

    async function saveProfile() {
        let edit = {
            employeeId: Number(userInfo?.id),
            username: editUsername,
            email: editemail,
            phoneNumber: Number(editnumber),
        }
        let res = await editUser(edit)
        // if (res) {
        //     toast.success("Your profile has been updated")
        // } else {
        //     toast.error("Please check your internet connection")
        // }
        toast.success("Your profile has been updated")
    }

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
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                value={editemail}
                                onChange={(e) => setEditemail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                            <Input
                                id="phone"
                                value={editnumber}
                                onChange={(e) => setEditnumber(Number(e.target.value))}
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                            <Input
                                id="first-name"
                                disabled
                                value={editname}
                                onChange={(e) => setEditname(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                            <Input
                                id="last-name"
                                disabled
                                value={editLastName}
                                onChange={(e) => setEditLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div><div className="flex flex-col gap-1">
                            <label htmlFor="position" className="text-sm font-medium text-gray-700">Position</label>
                            <Input
                                id="position"
                                disabled
                                value={editPosition}
                                onChange={(e) => setEditPosition(e.target.value)}
                                placeholder="Position"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="hire-date" className="text-sm font-medium text-gray-700">Hire Date</label>
                            <Input
                                id="hire-date"
                                disabled
                                value={editdate}
                                onChange={(e) => setEditdate(e.target.value)}
                                placeholder="Hire Date"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="base-salary" className="text-sm font-medium text-gray-700">Base Salary</label>
                            <Input
                                id="base-salary"
                                disabled
                                value={editsalary}
                                onChange={(e) => setEditsalary(Number(e.target.value))}
                                placeholder="Base Salary"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="department-name" className="text-sm font-medium text-gray-700">Department Name</label>
                            <Input
                                id="department-name"
                                disabled
                                value={editDepartment}
                                onChange={(e) => setEditDepartment(e.target.value)}
                                placeholder="Department Name"
                            />
                        </div>
                    </div>
                    <Button type="primary" onClick={saveProfile}>Upload Profile</Button>
                </section>
            </div>
        </div>
    );
}

export default Profile;