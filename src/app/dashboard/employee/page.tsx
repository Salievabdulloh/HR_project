// export default Employee

"use client";
import { Bell, DollarSign, Filter, Info, Loader, UserCircle2, WifiOff, Grid, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import { useGetStore } from "@/src/store/store";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import BasicMenu from "@/src/components/BasicMenu";
import { Input, Modal, Select } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const Employee: React.FC = () => {
    const { employee, getEmployee, registration } = useGetStore();

    const [search, setSearch] = useState("");
    const [addDialog, setaddDialog] = useState(false);
    const [addusername, setaddusername] = useState("");
    const [addemail, setaddemail] = useState("");
    const [addphone, setaddphone] = useState("");
    const [addpassword, setaddpassword] = useState("");
    const [addconfirmPassword, setaddconfirmPassword] = useState("");
    const [adduserRole, setadduserRole] = useState("");
    const [addfirstName, setaddfirstName] = useState("");
    const [addLastName, setaddLastName] = useState("");
    const [addposition, setaddposition] = useState("");
    const [addbaseSalary, setaddbaseSalary] = useState<number>(0);
    const [adddepartment, setadddepartment] = useState<number>(1);

    // NEW: view mode - "cards" or "table"
    const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

    // loading / network fallback
    const user = employee?.data;
    const router = useRouter();

    const SkeletonRow = () => (
        <Stack direction="column" className="p-3">
            <Stack direction="row" spacing={2} alignItems="center" className="p-3">
                <Skeleton variant="circular" width={60} height={60} />
            </Stack>
            <Stack spacing={0.5} flex={1}>
                <Skeleton variant="text" width="40%" height={14} />
                <Skeleton variant="text" width="40%" height={12} />
            </Stack>
            <Stack spacing={0.5} flex={1}>
                <Skeleton variant="text" width="70%" height={100} />
            </Stack>
        </Stack>
    );

    // timeout fallback
    const [timeoutReached, setTimeoutReached] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => {
            if (!user || user.length === 0) setTimeoutReached(true);
        }, 15000);
        return () => clearTimeout(t);
    }, [user]);

    async function addEmployee() {
        try {
            const emails = (user || []).map((e: any) => e.email);
            const userNames = (user || []).map((e: any) => e.username);

            if (addpassword !== addconfirmPassword) {
                alert("Password do not match");
                return;
            }

            // simple uniqueness check
            if (emails.includes(addemail)) {
                alert("This email has already been used");
                return;
            }
            if (userNames.includes(addusername)) {
                alert("This username has already been used");
                return;
            }

            let addNewUser = {
                username: addusername,
                email: addemail,
                phone: addphone,
                password: addpassword,
                confirmPassword: addconfirmPassword,
                baseSalary: addbaseSalary,
                userRole: adduserRole,
                position: addposition,
                departmentId: adddepartment,
                firstName: addfirstName,
                lastName: addLastName,
            };

            await registration(addNewUser);
            setaddDialog(false);
            // success UX: you can show a toast here (react-hot-toast or antd message)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getEmployee();
    }, []);

    // derive filtered list
    const filtered = (user || []).filter((e: any) =>
        e.firstName.toLowerCase().includes(search.toLowerCase())
    );

    // Animation settings for list/grid
    const containerVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { staggerChildren: 0.02 } },
        exit: { opacity: 0 },
    };
    const itemTransition = { type: "spring", stiffness: 400, damping: 30 };

    return (
        <div className="p-5">
            {/* Header */}
            <div className="py-5 flex border-b justify-between border-gray-200 items-center">
                <Input
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mr-4 max-w-[50%]"
                />
                <div className="flex items-center gap-3">
                    <button className="rounded-full border border-gray-300 text-gray-600 p-2"><Info /></button>
                    <button className="rounded-full border border-gray-300 text-gray-600 p-2"><Bell /></button>

                    {/* VIEW TOGGLE - big visible button */}
                    <div className="flex items-center gap-2 ml-2">
                        <button
                            onClick={() => setViewMode("cards")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md ${viewMode === "cards" ? "bg-white shadow" : "bg-white/60 hover:bg-white"}`}
                            aria-pressed={viewMode === "cards"}
                            title="Card view"
                        >
                            <Grid size={16} /> Cards
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md ${viewMode === "table" ? "bg-white shadow" : "bg-white/60 hover:bg-white"}`}
                            aria-pressed={viewMode === "table"}
                            title="Table view"
                        >
                            <List size={16} /> Table
                        </button>
                    </div>

                    <Button icon={<Filter />} text="Filter" />
                    <button onClick={() => setaddDialog(true)} className="text-white px-6 py-2 rounded bg-[hsl(20,100%,50%)] hover:bg-[hsl(20,100%,45%)]">
                        Add Candidate
                    </button>
                </div>
            </div>

            {/* Subheader */}
            <div className="pt-8 flex items-center justify-between">
                <h1 className="font-semibold text-2xl">{filtered.length} Employees</h1>
                <div className="text-sm text-gray-500">Admin Dashboard</div>
            </div>

            {/* Content area - cards or table with framer-motion */}
            <div className="mt-8">
                <AnimatePresence mode="wait">
                    {viewMode === "cards" ? (
                        <motion.div
                            key="cards"
                            className="grid grid-cols-3 gap-5"
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            variants={containerVariants}
                        >
                            {filtered.length === 0 && !timeoutReached ? (
                                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : filtered.length === 0 && timeoutReached ? (
                                <div className="col-span-3 flex flex-col items-center justify-center py-20">
                                    <div className="relative">
                                        <Loader className="animate-spin text-gray-400" size={48} />
                                        <WifiOff size={22} className="absolute text-red-400 top-[13px] left-[13px] animate-pulse" />
                                    </div>
                                    <p className="text-lg font-semibold mt-4">Please check your internet connection</p>
                                    <p className="text-sm text-gray-500 mt-2">Still unable to fetch employee data after 15 seconds.</p>
                                    <Link href="/login" className="mt-3 text-[hsl(20,100%,50%)]">Go to login</Link>
                                </div>
                            ) : (
                                filtered.map((e: any) => (
                                    <motion.div
                                        layoutId={`employee-${e.id}`}
                                        key={e.id}
                                        className="rounded-[10px] p-5 bg-[#f7fbff] hover:shadow-lg cursor-pointer"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={itemTransition}
                                    // onClick={() => router.push(`/dashboard/employee/${e.id}`)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex flex-col items-start gap-3">

                                                <div className="relative group">
                                                    <div
                                                        className="flex cursor-pointer flex-col gap-2">
                                                        {/* <AccountCircleIcon sx={{ width: "80px", height: "80px" }} /> */}
                                                        <UserCircle2 size={60} />
                                                        <span
                                                            className={`absolute rounded-full top-10 left-11 w-3 h-3 ${e.isActive ? "bg-[hsl(120,100%,40%)]" : "bg-[red]"
                                                                }`}
                                                        ></span>
                                                        <div className="absolute left-14 top-8 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                                                            <div className="bg-gray-900 text-white text-xs px-2.5 w-[85px] py-1 rounded-md shadow-lg">
                                                                {e.isActive ? "🟢 Active" : "🔴 Inactive"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h2 className='font-semibold'>{e.firstName} {e.lastName}</h2>
                                                    <h2 className='text-[gray]'>{e.position}</h2>
                                                </div>
                                                <div>
                                                    <h2 className="font-semibold text-lg">{e.firstName} {e.lastName}</h2>
                                                    <p className="text-sm text-gray-500">{e.position}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <BasicMenu name={e.firstName} employeeId={e.id} el={e} />
                                            </div>
                                        </div>

                                        <div className="bg-white mt-5 text-sm p-3 rounded-xl">
                                            <div className="flex text-gray-500 font-medium justify-between">
                                                <h3>Department</h3>
                                                <h3>Hired Date</h3>
                                            </div>
                                            <div className="flex text-[hsl(240,100%,19%)] mb-4 mt-3 font-semibold justify-between">
                                                <h3>{e.departmentName}</h3>
                                                <h3>{String(e.hireDate).split("-").join("/")}</h3>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <DollarSign />
                                                <h3>{e.baseSalary}</h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="table"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}>
                            <div className="overflow-x-auto rounded-md border border-gray-100 bg-white shadow-sm">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left px-4 py-3">Name</th>
                                            <th className="text-left px-4 py-3">Position</th>
                                            <th className="text-left px-4 py-3">Department</th>
                                            <th className="text-left px-4 py-3">Hire Date</th>
                                            <th className="text-left px-4 py-3">Salary</th>
                                            <th className="text-center px-4 py-3">Status</th>
                                            <th className="text-center px-4 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <motion.tbody layout initial={false} animate={{}}>
                                        {filtered.map((e: any, idx: number) => (
                                            <motion.tr
                                                layoutId={`employee-${e.id}`} // same id as card item => framer will animate between layouts
                                                key={e.id}
                                                transition={itemTransition}
                                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <UserCircle2 size={36} />
                                                        <div>
                                                            <div className="font-semibold">{e.firstName} {e.lastName}</div>
                                                            <div className="text-xs text-gray-500">{e.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">{e.position}</td>
                                                <td className="px-4 py-3">{e.departmentName}</td>
                                                <td className="px-4 py-3">{String(e.hireDate).split("-").join("/")}</td>
                                                <td className="px-4 py-3">{e.baseSalary}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${e.isActive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                                                        {e.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <BasicMenu name={e.firstName} employeeId={e.id} el={e} />
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </motion.tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Modal title="add Modal" onCancel={() => setaddDialog(false)} onOk={addEmployee} open={addDialog}>
                <div className="flex gap-2 flex-col">
                    <Input placeholder="Add username" value={addusername} onChange={(e) => setaddusername(e.target.value)} />
                    <Input placeholder="Add email" value={addemail} onChange={(e) => setaddemail(e.target.value)} />
                    <Input placeholder="Add phone number" value={addphone} onChange={(e) => setaddphone(e.target.value)} />
                    <Input placeholder="Add First Name" value={addfirstName} onChange={(e) => setaddfirstName(e.target.value)} />
                    <Input placeholder="Add Last Name" value={addLastName} onChange={(e) => setaddLastName(e.target.value)} />
                    <Select value={addposition} onChange={(value) => setaddposition(value)}>
                        <Select.Option value={`Intern`}>Intern</Select.Option>
                        <Select.Option value="Junior">Junior</Select.Option>
                        <Select.Option value="Middle">Middle</Select.Option>
                        <Select.Option value="Senior">Senior</Select.Option>
                    </Select>
                    <Select value={adduserRole} onChange={(value) => setadduserRole(value)}>
                        <Select.Option value="Employee">Employee</Select.Option>
                        <Select.Option value="HR">HR (Human Resource)</Select.Option>
                        <Select.Option value="Admin">Admin</Select.Option>
                    </Select>
                    <Input placeholder="Add baseSalary" type="number" value={addbaseSalary} onChange={(e) => setaddbaseSalary(Number(e.target.value))} />
                    <Select value={adddepartment} onChange={(value) => setadddepartment(Number(value))}>
                        <Select.Option value={1}>IT Department</Select.Option>
                        <Select.Option value={2}>Sales Department</Select.Option>
                    </Select>
                    <Input.Password placeholder="Add password" value={addpassword} onChange={(e) => setaddpassword(e.target.value)} />
                    <Input.Password placeholder="Add confirmPassword" value={addconfirmPassword} onChange={(e) => setaddconfirmPassword(e.target.value)} />
                </div>
            </Modal>
        </div>
    );
};

export default Employee;
