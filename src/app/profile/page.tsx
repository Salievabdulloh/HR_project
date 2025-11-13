'use client'
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useGetStore } from "@/src/store/store";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

const Profile = () => {
    const { user, getRegister, editUser } = useGetStore();
    const { theme } = useTheme(); // hook to get current theme

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
        toast.success("Your profile has been updated")
    }

    if (!user) {
        return <div className="flex items-center">Loading <Loader className="animate-spin" /></div>;
    }

    useEffect(() => { getRegister() }, []);

    // Dark mode classes
    const bgClass = theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800';
    const sectionClass = theme === 'dark'
        ? 'bg-gray-800 text-gray-100 shadow-md'
        : 'bg-white text-gray-800 shadow-md';
    const inputClass = theme === 'dark'
        ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
        : 'bg-white text-gray-800 placeholder-gray-500';

    return (
        <div className={`min-h-screen p-6 flex flex-col gap-8 ${bgClass}`}>
            <header className={`w-full shadow-md py-4 px-8 text-2xl font-bold ${bgClass}`}>
                My Profile
            </header>

            <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
                <section className={`p-6 rounded-lg flex flex-col gap-6 ${sectionClass}`}>
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-sm font-medium">Username</label>
                            <Input
                                id="username"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                placeholder="Username"
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input
                                id="email"
                                value={editemail}
                                onChange={(e) => setEditemail(e.target.value)}
                                placeholder="Email"
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                            <Input
                                id="phone"
                                value={editnumber}
                                onChange={(e) => setEditnumber(Number(e.target.value))}
                                placeholder="Phone Number"
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                            <Input
                                id="first-name"
                                disabled
                                value={editname}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                            <Input
                                id="last-name"
                                disabled
                                value={editLastName}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="position" className="text-sm font-medium">Position</label>
                            <Input
                                id="position"
                                disabled
                                value={editPosition}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="hire-date" className="text-sm font-medium">Hire Date</label>
                            <Input
                                id="hire-date"
                                disabled
                                value={editdate}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="base-salary" className="text-sm font-medium">Base Salary</label>
                            <Input
                                id="base-salary"
                                disabled
                                value={editsalary}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="department-name" className="text-sm font-medium">Department Name</label>
                            <Input
                                id="department-name"
                                disabled
                                value={editDepartment}
                                className={inputClass}
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
