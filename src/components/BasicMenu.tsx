"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Ellipsis, PenBox, Trash2, User2 } from 'lucide-react';
import { Input, Modal, Select } from 'antd';
import { useGetStore } from '../store/store';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

export default function BasicMenu({ employeeId, name, el }: any) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const router = useRouter()

    const { user, registration, getRegister, getEmployee, deleteEmployee, editEmployee } = useGetStore()
    const [openModal, setopenModal] = React.useState(false)
    const [isDeleted, setIsDeleted] = React.useState(false)

    const [editDialog, setEditDialog] = React.useState(false)
    const [editfirstName, setEditfirstName] = React.useState('')
    const [editLastName, setEditLastName] = React.useState('')
    const [editposition, setEditposition] = React.useState('')
    const [edithireDate, setEdithireDate] = React.useState('')
    const [editbaseSalary, setEditbaseSalary] = React.useState<number>(0)
    const [editisActive, setEditisActive] = React.useState<boolean>(false)
    const [editdepartmentName, setEditdepartmentName] = React.useState<number>(1);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    // console.log(employeeId);

    async function deleteUser() {
        try {
            await deleteEmployee(employeeId)
            setopenModal(false)
            setIsDeleted(true)
            toast.success(`${name} deleted successfully`);
        } catch (error) {
            console.error(error)
        }
    }

    async function editUser() {
        try {
            let edit = {
                id: employeeId,
                firstName: editfirstName,
                lastName: editLastName,
                position: editposition,
                hireDate: edithireDate,
                baseSalary: Number(editbaseSalary),
                isActive: editisActive,
                departmentId: Number(editdepartmentName),
            }
            await editEmployee(edit)
            setEditDialog(false)
            getEmployee()
            toast.success(`${name} updated successfully`);
        } catch (error) {
            console.error(error)
        }
    }

    function editModal() {
        setEditDialog(true)
        handleClose()
        setEditfirstName(el.firstName)
        setEditLastName(el.lastName)
        setEditposition(el.position)
        setEdithireDate(el.hireDate)
        setEditbaseSalary(el.baseSalary)
        setEditisActive(el.isActive ?? false)
        setEditdepartmentName(el.departmentName)
    }

    function deleteModal() {
        setopenModal(true)
        handleClose()
    }


    React.useEffect(() => { getEmployee(), getRegister() }, [])

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Ellipsis />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem onClick={deleteModal}>
                    <div className="flex items-center gap-2">
                        <Trash2 />
                        <p>Delete</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={editModal}>
                    <div className="flex items-center gap-2">
                        <PenBox />
                        <p>Edit</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => router.push(`/dashboard/${employeeId}`)}>
                    <div className="flex items-center gap-2">
                        <User2 />
                        <p>Profile</p>
                    </div>
                </MenuItem>
            </Menu>
            <Modal
                title={`Are u sure you want to delete ${name}?`}
                onCancel={() => setopenModal(false)}
                onOk={deleteUser}
                open={openModal}
            />
            <Modal
                title='Edit Modal'
                onCancel={() => setEditDialog(false)}
                onOk={editUser}
                open={editDialog}
            >
                <div className="flex gap-2 flex-col">
                    <Input placeholder='Edit First Name' value={editfirstName} onChange={(e) => setEditfirstName(e.target.value)} />
                    <Input placeholder='Edit Last Name' value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                    {/* <Input placeholder='Edit position' /> */}
                    <Select value={editposition} onChange={(value) => setEditposition(value)}>
                        <Select.Option value="Intern">Intern</Select.Option>
                        <Select.Option value="Junior">Junior</Select.Option>
                        <Select.Option value="Middle">Middle</Select.Option>
                        <Select.Option value="Senior">Senior</Select.Option>
                    </Select>
                    <Input placeholder='Edit hire Date' type="date" value={edithireDate} onChange={(e) => setEdithireDate(e.target.value)} />
                    <Input placeholder='Edit baseSalary' type='number' value={editbaseSalary} onChange={(e) => setEditbaseSalary(Number(e.target.value))} />
                    <Select value={editisActive} onChange={(value: boolean) => setEditisActive(value)}>
                        <Select.Option value={true}>Active</Select.Option>
                        <Select.Option value={false}>Incative</Select.Option>
                    </Select>
                    <Select value={editdepartmentName} onChange={(value) => setEditdepartmentName(Number(value))}>
                        <Select.Option value={1}>IT Department</Select.Option>
                        <Select.Option value={2}>Sales Department</Select.Option>
                    </Select>
                </div>
            </Modal>
        </div >
    );
}