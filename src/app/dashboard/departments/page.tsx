"use client"
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Briefcase, Users, Building2 } from 'lucide-react'
import { useGetStore } from '@/src/store/store'
import { Description } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { Button, Input, Modal } from 'antd'
import useDarkSide from '@/src/shared/config/useDarkSide'

const Departments = () => {
    const { getDepartmentEmployees, departmentEmployee, editDepartmentEmployees, deleteDepartmentEmployees, addDepartmentEmployees } = useGetStore()

    const departments = departmentEmployee?.data || []

    const [addDialog, setaddDialog] = useState<boolean>(false)
    const [addName, setaddName] = useState('')
    const [addDescription, setaddDescription] = useState('')

    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editDialog, setEditDialog] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false)
    const [el, setEl] = useState<any | null>(null)


    function editModal() {
        setEditDialog(true)
        setOpen(false)
        setEditName(el.name)
        setEditId(el.id)
        setEditDescription(el.description)
    }

    async function edit() {
        try {
            let editData = {
                id: editId,
                name: editName,
                description: editDescription,
            }
            await editDepartmentEmployees(editData)
            setEditDialog(false)
            toast.success("The Department updated successfully")
            // if(res) {
            // }
        } catch (error) {
            console.error(error)
        }
    }

    async function removeDep() {
        try {
            await deleteDepartmentEmployees(el.id)
            toast.error("Deleted successfully")
            setOpen(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function addNewDep() {
        try {
            let add: any = {
                name: addName,
                description: addDescription,
            }
            let res = await addDepartmentEmployees(add)
            if (res.ok) {
                toast.success("Department added successfully")
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const [theme, toggleTheme] = useDarkSide()

    useEffect(() => {
        getDepartmentEmployees()
    }, [])


    return (
        <div
            className={`min-h-screen py-10 px-5 md:px-20 transition-all duration-500
    ${theme === 'dark'
                    ? 'bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100'
                    : 'bg-linear-to-t from-blue-50 via-white to-blue-100 text-gray-900'}`}>
            <div className="max-w-5xl mx-auto">
                <div className="flex mb-8 justify-between items-center">
                    <div className={`text-3xl font-bold ${theme == "dark" ? "text-gray-400" : "text-gray-800"} flex items-center gap-3`}>
                        <Building2 className={`${theme == "dark" ? "text-blue-300" : "text-blue-600"}`} />
                        <h2>Departments</h2>
                    </div>
                    <Button onClick={() => setaddDialog(true)}>Add new Department</Button>
                </div>

                <div className="flex  flex-col gap-4">
                    {departments.map((dept) => {
                        const isHovered = hoveredId === dept.id;
                        const isExpanded = expandedId === dept.id;
                        return (
                            <div
                                key={dept.id}
                                onDoubleClick={() => {
                                    setOpen(true)
                                    setEl(dept)
                                }}
                                onMouseEnter={() => !isExpanded && setHoveredId(dept.id)}
                                onMouseLeave={() => !isExpanded && setHoveredId(null)}
                            >
                                <Accordion
                                    expanded={isHovered || isExpanded}
                                    onChange={() => setExpandedId(isExpanded ? null : dept.id)}
                                    className={`rounded-2xl overflow-hidden shadow-md border hover:shadow-lg transition-all ${theme === 'dark' ? 'bg-[#0f172a]! text-white! border-gray-700' : 'bg-white border-gray-100'}`}
                                    sx={{
                                        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                                        color: theme === 'dark' ? '#f8fafc' : '#111827',
                                        '& .MuiAccordionSummary-root': {
                                            backgroundColor: theme === 'dark' ? '#1e293b' : '#f9fafb',
                                            color: theme === 'dark' ? '#f8fafc' : '#111827',
                                            transition: 'background-color 0.3s ease',
                                        },
                                        '& .MuiAccordionDetails-root': {
                                            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                                            color: theme === 'dark' ? '#e2e8f0' : '#374151',
                                        },
                                        '& .MuiAccordionSummary-expandIconWrapper': {
                                            color: theme === 'dark' ? '#60a5fa' : '#2563eb',
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <ExpandMoreIcon
                                                className={`text-blue-600 transition-transform duration-200 ${isHovered || isExpanded ? 'rotate-180' : ''
                                                    }`} />
                                        }
                                        aria-controls={`panel-${dept.id}-content`}
                                        id={`panel-${dept.id}-header`}
                                        className={`
                                        `}>
                                        <div className={`flex flex-col 
                                            md:flex-row md:items-center 
                                            
                                             md:justify-between w-full`}>
                                            <Typography className={`text-lg font-semibold
                                                ${theme == "dark" ? "text-white" : "text-gray-800"}
                                                 flex items-center gap-2`}>
                                                <Users className="text-blue-600" size={20} />
                                                {dept.name}
                                            </Typography>
                                            <Chip
                                                label={`${dept.employees.length} Employee${dept.employees.length !== 1 ? 's' : ''
                                                    }`}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </AccordionSummary>

                                    <AccordionDetails className={`${theme == "dark" ? "bg-gray-700 text-white" : "bg-gray-50"}`}>
                                        <Typography className={`${theme == "dark" ? "text-gray-200" : "text-gray-600"} mb-2`}>
                                            {dept.description}
                                        </Typography>
                                        <Divider className="my-3" />

                                        {dept.employees.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {dept.employees.map((emp) => (
                                                    <div
                                                        key={emp.id}
                                                        className={`p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50"}`}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className={`${theme === 'dark' ? "text-white" : "text-gray-800"} font-semibold`}>
                                                                {emp.firstName} {emp.lastName}
                                                            </h3>
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium ${emp.isActive
                                                                    ? 'bg-green-100 text-green-600'
                                                                    : 'bg-red-100 text-red-600'
                                                                    }`}
                                                            >
                                                                {emp.isActive ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </div>
                                                        <p className={`text-sm ${theme === 'dark' ? "text-white" : "text-gray-600"} flex items-center gap-2`}>
                                                            <Briefcase size={14} /> {emp.position}
                                                        </p>
                                                        <p className={`text-sm  ${theme === 'dark' ? "text-white" : "text-gray-600"}`}>
                                                            Salary: ${emp.baseSalary}
                                                        </p>
                                                        <p className={`text-sm  ${theme === 'dark' ? "text-white" : "text-gray-500"}`}>
                                                            Hire Date:{' '}
                                                            <span className="font-medium text-gray-700">
                                                                {emp.hireDate.split('-').join('/')}
                                                            </span>
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className={`${theme === 'dark' ? "text-white" : "text-gray-400"} italic text-sm`}>
                                                No employees in this department yet.
                                            </p>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        );
                    })}
                    <Modal
                        title="Modal"
                        open={open}
                        footer={null}
                        onCancel={() => setOpen(false)}
                    // className={`${theme == 'dark' ? "bg-black text-white" : "bg-white"}`}
                    >
                        <Button onClick={removeDep} type='primary' danger>Delete</Button>
                        <Button onClick={editModal} type='primary'>Edit</Button>
                    </Modal>
                    <Modal
                        title="add Modal"
                        open={addDialog}
                        onOk={addNewDep}
                        onCancel={() => setaddDialog(false)}
                    >
                        <Input placeholder='add Name' value={addName} onChange={(e) => setaddName(e.target.value)} />
                        <Input placeholder='add Description' value={addDescription} onChange={(e) => setaddDescription(e.target.value)} />
                    </Modal>
                    <Modal
                        title="Edit Modal"
                        open={editDialog}
                        onOk={edit}
                        onCancel={() => setEditDialog(false)}
                    >
                        <Input placeholder='Edit Name' value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <Input placeholder='Edit Description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Departments
