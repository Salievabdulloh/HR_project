// export default Employee

"use client";
import { Bell, DollarSign, Filter, Info, Loader, UserCircle2, WifiOff, Grid, List, EyeOff, Eye } from "lucide-react";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { error } from "console";

const Employee: React.FC = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            phone: "909090909",
            password: "pleaseLetmein.7",
            confirmPassword: "pleaseLetmein.7",
            baseSalary: '2000',
            position: 'Junior',
            departmentId: 0,
            userRole: 'Employee',
            firstName: '',
            lastName: '',
        }
    })

    const { employee, getEmployee, registration, getRegister, user: getUser, getUsers, allUsers } = useGetStore();

    const [search, setSearch] = useState("");
    const [addDialog, setaddDialog] = useState(false);
    const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

    const [openEye, setopenEye] = useState(false)
    const [openEye2, setopenEye2] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const password = watch("password")
    const password2 = watch("confirmPassword")

    const user = employee?.data;
    const router = useRouter()
    console.log(allUsers);


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

    async function addEmployee(data: any) {
        try {
            const emails = (user || []).map((e: any) => e.email);
            const userNames = (user || []).map((e: any) => e.username);

            if (data.password !== data.confirmPassword) {
                alert("Password do not match");
                return;
            }

            if (emails === data.email) {
                alert("This email has already been used");
                return;
            }
            if (userNames === data.username) {
                alert("This username has already been used");
                return;
            }

            let res = await registration(data)
            console.log(res);

            if (res) {
                setaddDialog(false)
                toast.success(`${data.username} has been added`)
            } else {
                toast.error(`${data.username} has not been added`)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const [timeoutReached, setTimeoutReached] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    const filtered = (user || []).filter((e: any) =>
        e.firstName.toLowerCase().includes(search.toLowerCase())
    );

    const containerVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { staggerChildren: 0.02 } },
        exit: { opacity: 0 },
    }

    const itemTransition = { type: "spring", stiffness: 400, damping: 30 }

    console.log();


    useEffect(() => {
        const load = async () => {
            setisLoading(true)
            try {
                await getEmployee()
            } catch (error) {
                console.error(error);
            } finally {
                setisLoading(false)
            }
        }
        load()

    }, [])


    useEffect(() => {
        const t = setTimeout(() => {
            if (!user || user.length === 0) setTimeoutReached(true);
        }, 15000);
        return () => clearTimeout(t);
    }, [user])

    useEffect(() => {
        getEmployee();
        getRegister();
    }, []);

    return (
        <div className="p-5">
            <div className="fixed w-[80%] bg-[white] z-10">
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
            </div>
            <div className="pt-8 flex items-center justify-between">
                <h1 className="font-semibold text-2xl">{filtered.length} Employees</h1>
                <div className="text-sm text-gray-500">Admin Dashboard</div>
            </div>
            <div className="mt-8">
                <AnimatePresence mode="wait">
                    {viewMode === "cards" ? (
                        <motion.div
                            key="cards"
                            className="grid grid-cols-3 gap-5"
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            variants={containerVariants}>
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : filtered?.length === 0 && timeoutReached ? (
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
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex flex-col items-start gap-3">

                                                <div className="relative group">
                                                    <div
                                                        className="flex cursor-pointer flex-col gap-2">
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
                                                    <h2 className='font-semibold'>{e.username ?? e.firstName}</h2>
                                                    <h2 className='text-[gray]'>{e.position}</h2>
                                                </div>
                                                <div>
                                                    <h2 className="font-semibold text-lg">{e.firstName} {e.lastName}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                {getUser?.length == 0 && (
                                                    <BasicMenu name={e.firstName} employeeId={e.id} el={e} />
                                                )}
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
                <form onSubmit={handleSubmit(addEmployee)} className="">
                    <div>
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            placeholder="Username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {errors.username && <p className="text-red-500 text-sm">First username is required</p>}
                    </div>
                    <div className="grid grid-cols-2 mt-4 gap-4">
                        <div>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>
                        <div>
                            <input
                                type="number"
                                {...register("phone", {
                                    required: true
                                })}
                                placeholder="Phone +992"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                        </div>
                        <div>
                            <input
                                type="number"
                                {...register("baseSalary", {
                                    required: true
                                })}
                                placeholder="BaseSalary"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            {errors.baseSalary && <p className="text-red-500 text-sm">BaseSalary is required</p>}
                        </div>
                        <div>
                            <select
                                {...register("departmentId", {
                                    required: true
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
                                {/* <option value="">None</option> */}
                                <option value="1">IT Department</option>
                                <option value="2">Sales Department</option>
                            </select>
                            {errors.departmentId && <p className="text-red-500 text-sm">DepartmentId is required</p>}
                        </div>
                        <div>
                            <select
                                {...register("userRole", {
                                    required: true
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
                                <option value="Employee">Employee</option>
                                <option value="HR">HR</option>
                            </select>
                            {errors.userRole && <p className="text-red-500 text-sm">UserRole is required</p>}
                        </div>
                        <div>
                            <select
                                {...register("position", {
                                    required: true
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
                                <option value="Intern">Intern</option>
                                <option value="Junior">Junior</option>
                                <option value="Middle">Middle</option>
                                <option value="Senior">Senior</option>
                            </select>
                            {errors.position && <p className="text-red-500 text-sm">Position is required</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register("firstName", {
                                    required: true
                                })}
                                placeholder="FirstName"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">FirstName is required</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register("lastName", {
                                    required: true
                                })}
                                placeholder="LastName"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">LastName is required</p>}
                        </div>
                        <div className="relative">
                            <input
                                type={openEye ? "text" : "password"}
                                {...register("password", {
                                    validate: (value: string) => {
                                        if (!value || value.trim() === "") {
                                            return (
                                                "Password is required. Requirements: " +
                                                "at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol."
                                            );
                                        }

                                        const missing: string[] = [];
                                        if (value.length < 8) missing.push("at least 8 characters");
                                        if (!/[A-Z]/.test(value)) missing.push("an uppercase letter (A–Z)");
                                        if (!/[a-z]/.test(value)) missing.push("a lowercase letter (a–z)");
                                        if (!/\d/.test(value)) missing.push("a number (0–9)");
                                        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value))
                                            missing.push("a symbol (e.g. !@#$%)");

                                        if (missing.length === 0) return true;

                                        if (missing.length === 1) {
                                            return `Please include ${missing[0]} in your password.`;
                                        }

                                        return `Missing: ${missing.join(", ")}.`;
                                    },
                                })}
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <span
                                className="top-2 right-3 absolute cursor-pointer"
                                onClick={() => setopenEye(!openEye)}
                            >
                                {watch("password") ? (!openEye ? <EyeOff /> : <Eye />) : null}
                            </span>
                            {/* Error UI: show a single friendly message or a bullet list if multiple */}
                            {errors.password && (
                                <div className="mt-2 text-sm text-red-600">
                                    {/* If the message contains commas (multiple missing), split nicely */}
                                    {typeof errors.password.message === "string" &&
                                        errors.password.message.startsWith("Missing:") ? (
                                        <div className="bg-red-50 border border-red-100 rounded-md p-2">
                                            <p className="font-medium">Please fix the following:</p>
                                            <ul className="ml-4 list-disc mt-1">
                                                {errors.password.message
                                                    .replace(/^Missing:\s*/, "")
                                                    .split(",")
                                                    .map((m, i) => (
                                                        <li key={i}>{m.trim()}</li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="bg-red-50 border border-red-100 rounded-md p-2">
                                            <p>{errors.password.message}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="relative mt-4">
                            <input
                                type={openEye2 ? "text" : "password"}
                                {...register("confirmPassword", {
                                    validate: (value: string) => {
                                        const pw = watch("password") || "";
                                        if (!value || value.trim() === "") return "Please confirm your password.";
                                        if (value !== pw) return "Passwords do not match.";
                                        return true;
                                    },
                                })}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <span
                                className="top-2 right-3 absolute cursor-pointer"
                                onClick={() => setopenEye2(!openEye2)}
                            >
                                {watch("confirmPassword") ? (!openEye2 ? <EyeOff /> : <Eye />) : null}
                            </span>

                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                    </div>
                    <button type="submit"></button>
                </form>
            </Modal>
        </div>
    );
};

export default Employee;
