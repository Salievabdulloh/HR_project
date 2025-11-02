'use client'
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useGetStore } from "@/src/store/store";
import { Loader } from "lucide-react";

const Profile = () => {
    const { user, getRegister, editUser } = useGetStore();
    console.log();

    const users = user.data
    const userInfo = users?.employeeInfo
    console.log(users)

    const [editUsername, setEditUsername] = useState("")
    const [editnumber, setEditnumber] = useState("")
    const [editemail, setEditemail] = useState("")
    const [editname, setEditname] = useState("")
    const [editLastName, setEditLastName] = useState("")
    const [editPosition, setEditPosition] = useState("")
    const [editdate, setEditdate] = useState("")
    const [editsalary, setEditsalary] = useState("")
    const [editDepartment, setEditDepartment] = useState("")

    useEffect(() => {
        if (users) {
            setEditUsername(users.username || "")
            setEditnumber(users.phoneNumber || "")
            setEditnumber(users.phoneNumber || "")
            setEditdate(userInfo.hireDate || "")
            setEditemail(users.email || "")
            setEditname(userInfo.firstName || "")
            setEditLastName(userInfo.lastName || "")
            setEditPosition(userInfo.position || "")
            setEditsalary(userInfo.baseSalary || "")
            setEditDepartment(userInfo.departmentName || "")
        }
    }, [users])

    async function saveProfile() {
        let edit = {
            username: editUsername,
            email: editemail,
            phoneNumber: editnumber,
        }
        await editUser(edit)
    }

    const [load, setLoad] = useState(false)

    // async function upload() {
    //     try {
    //         setLoad(true)
    //         await saveProfile()
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setTimeout(() => {
    //             setLoad(false)
    //         }, 2000)
    //     }
    // }

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
                                onChange={(e) => setEditnumber(e.target.value)}
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                            <Input
                                id="first-name"
                                value={editname}
                                onChange={(e) => setEditname(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                            <Input
                                id="last-name"
                                value={editLastName}
                                onChange={(e) => setEditLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div><div className="flex flex-col gap-1">
                            <label htmlFor="position" className="text-sm font-medium text-gray-700">Position</label>
                            <Input
                                id="position"
                                value={editPosition}
                                onChange={(e) => setEditPosition(e.target.value)}
                                placeholder="Position"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="hire-date" className="text-sm font-medium text-gray-700">Hire Date</label>
                            <Input
                                id="hire-date"
                                value={editdate}
                                onChange={(e) => setEditdate(e.target.value)}
                                placeholder="Hire Date"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="base-salary" className="text-sm font-medium text-gray-700">Base Salary</label>
                            <Input
                                id="base-salary"
                                value={editsalary}
                                onChange={(e) => setEditsalary(e.target.value)}
                                placeholder="Base Salary"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="department-name" className="text-sm font-medium text-gray-700">Department Name</label>
                            <Input
                                id="department-name"
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