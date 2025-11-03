import { create } from 'zustand'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import api from '../lib/api'

interface RegisterData {
    username?: string
    email: string
    phone?: string
    password: string
    confirmPassword?: string
    baseSalary?: number
    position?: string
    departmentId?: number
    userRole?: string
    firstName?: string
    lastName?: string
}

interface LoginData {
    username: string
    password: string
}

interface EmployeeDate {
    id: number
    firstName: string
    lastName: string
    position: string
    hireDate: string
    baseSalary: number
    isActive: boolean
    departmentName: string
}

interface add {
}

interface GetStore {
    user: RegisterData[]
    employee: EmployeeDate[]

    addDialog: boolean,
    setaddDialog: (value: boolean) => void

    getRegister: () => Promise<void>
    getEmployee: () => Promise<void>
    registration: (data: RegisterData) => Promise<void>
    login: (data: LoginData) => Promise<string>
    deleteEmployee: (data: EmployeeDate) => Promise<void>
    editEmployee: (data: EmployeeDate) => Promise<void>
}

export const useGetStore = create<GetStore>((set, get) => ({
    user: [],
    employee: [],
    addDialog: false,
    setaddDialog: (value) => set({ addDialog: value }),
    getRegister: async () => {
        try {
            let { data } = await api.get(`/users/me`)
            set(() => ({ user: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getEmployee: async () => {
        try {
            let { data } = await api.get(`/employees`)
            set(() => ({ employee: data }))
        } catch (error) {
            console.error(error)
        }
    },
    deleteEmployee: async (id) => {
        try {
            await api.delete(`/employees/${id}`)
            await get().getEmployee()
        } catch (error) {
            console.error(error)
        }
    },
    editEmployee: async (data: any) => {
        try {
            await api.put(`/employees/${data.id}`, data)
            // log  
            await get().getEmployee()
        } catch (error) {
            console.error(error)
        }
    },
    registration: async (data) => {
        try {
            const res = await api.post(`/auth/register`, {
                Username: data.username,
                Email: data.email,
                Phone: data.phone,
                Password: data.password,
                ConfirmPassword: data.confirmPassword,
                BaseSalary: data.baseSalary,
                Position: data.position,
                DepartmentId: data.departmentId,
                UserRole: data.userRole,
                FirstName: data.firstName,
                LastName: data.lastName
            })
            await get().getRegister()
            return res.data
        } catch (error) {
            console.error(error)
        }
    },
    login: async (formData) => {
        let { data } = await api.post(`/auth/login`, formData)
        console.log(data);

        const token = data.data.token

        const decoded = jwtDecode(token)

        console.log("Decode JWT", decoded)

        localStorage.setItem("access_token", token)
        localStorage.setItem("user_Info", JSON.stringify(decoded))

        return token
    },
    editUser: async (data: any) => {
        try {
            await api.put('/users/me', data)
            await get().getRegister()
        } catch (error) {
            console.error(error);
        }
    },

}))
