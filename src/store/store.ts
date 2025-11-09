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

interface EmployeeByid {
    id: number
    firstName: string
    lastName: string
    position: string
    hireDate: string
    baseSalary: number
    isActive: boolean
    departmentName: string
}

interface GetAllUsers {
    employeeId?: number
    username?: string
    email: string
    phoneNumber?: string
}

// interface payrollById {
//     id: number,
//     periodStart?: string
//     periodEnd?: string
//     grossPay?: number
//     deductions?: number
//     netPay?: number
//     createdAt?: string
//     employeeId?: number
//     employeeName?: string
// }

interface Department {
    id: number,
    name?: string,
    description?: string
}

interface PayrollRecord {
    id: number
    periodStart: string
    periodEnd: string
    grossPay: number
    deductions: number
    netPay: number
    createdAt: string
    employeeId: number
    employeeName: string
}

interface Month {
    month: string
    totalNetPay: number
    totalGrossPay: number
}

interface GetStore {
    user: RegisterData[]
    allUsers: GetAllUsers[]
    employee: EmployeeDate[]
    getId: EmployeeByid[]
    department: []
    vacation: []
    payroll: []
    salary: []
    payments: []
    payrollId: []
    payrollData: PayrollRecord[]
    payrollMonthId: Month[]
    allDepartment: []
    departmentEmployee: Department[]

    getRegister: () => Promise<void>
    getAllDepartments: () => Promise<void>
    getDepartmentEmployees: () => Promise<void>
    getSalaryAnomoly: () => Promise<void>
    getPayrollRecordTotal: () => Promise<void>
    getUsersAll: () => Promise<void>
    getVacationSummary: () => Promise<void>
    getEmployee: () => Promise<void>
    getDepartment: () => Promise<void>
    login: (data: LoginData) => Promise<string>
    registration: (data: RegisterData) => Promise<void>
    deleteEmployee: (data: EmployeeDate) => Promise<void>
    editEmployee: (data: EmployeeDate) => Promise<void>
    getEmployeeId: (data: EmployeeByid) => Promise<void>
    getPayrollRecordId: (data: PayrollRecord) => Promise<void>
    getPayrollRecord: () => Promise<void>
    editUsers: (data: GetAllUsers) => Promise<void>
    editUser: (data: RegisterData) => Promise<void>
    editDepartmentEmployees: (data: Department) => Promise<void>
    deleteDepartmentEmployees: (data: Department) => Promise<void>
    addDepartmentEmployees: (data: Department) => Promise<void>
    getPayrollmonth: (data: Month) => Promise<void>
    getPayments: () => Promise<void>
}

export const useGetStore = create<GetStore>((set, get) => ({
    user: [],
    employee: [],
    getId: [],
    allUsers: [],
    department: [],
    vacation: [],
    payroll: [],
    payrollId: [],
    payrollData: [],
    payrollMonthId: [],
    salary: [],
    payments: [],
    allDepartment: [],
    departmentEmployee: [],

    getRegister: async () => {
        try {
            let { data } = await api.get(`/users/me`)
            set(() => ({ user: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getDepartment: async () => {
        try {
            let { data } = await api.get(`/departments/summary`)
            set(() => ({ department: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getAllDepartments: async () => {
        try {
            let { data } = await api.get(`/departments`)
            set(() => ({ allDepartment: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getDepartmentEmployees: async () => {
        try {
            let { data } = await api.get(`/departments/with-employees`)
            set(() => ({ departmentEmployee: data }))
        } catch (error) {
            console.error(error)
        }
    },
    addDepartmentEmployees: async (data) => {
        try {
            await api.post(`/departments`, data)
            await get().getDepartmentEmployees()
        } catch (error) {
            console.error(error)
        }
    },
    editDepartmentEmployees: async (data) => {
        try {
            await api.put(`/departments/${data.id}`, data)
            await get().getDepartmentEmployees()
        } catch (error) {
            console.error(error)
        }
    },
    deleteDepartmentEmployees: async (id) => {
        try {
            await api.delete(`/departments/${id}`)
            await get().getDepartmentEmployees()
        } catch (error) {
            console.error(error)
        }
    },
    getSalaryAnomoly: async () => {
        try {
            let { data } = await api.get(`/salary_anomaly/get-list`)
            set(() => ({ salary: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollRecordId: async (id) => {
        try {
            let { data } = await api.get(`/payroll_record/get/${id}`)
            set(() => ({ payrollId: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayments: async () => {
        try {
            let { data } = await api.get(`/departments/payments`)
            set(() => ({ payments: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollRecord: async () => {
        try {
            let { data } = await api.get(`/payroll_record/get-all`)
            set(() => ({ payrollData: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollmonth: async (id) => {
        try {
            let { data } = await api.get(`/payroll_record/get-graph?monthsRange=${id}`)
            set(() => ({ payrollMonthId: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollRecordTotal: async () => {
        try {
            let { data } = await api.get(`/payroll_record/statistics/total-net-pay`)
            set(() => ({ payroll: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getVacationSummary: async () => {
        try {
            let { data } = await api.get(`/vacation_records/summary`)
            set(() => ({ vacation: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getUsersAll: async () => {
        try {
            let { data } = await api.get(`/users`)
            set(() => ({ allUsers: data }))
        } catch (error) {
            console.error(error)
        }
    },
    editUsers: async (data) => {
        try {
            await api.put(`/users`, data)
            await get().getUsersAll()
        } catch (error) {
            console.error(error)
        }
    },
    getEmployee: async () => {
        try {
            let { data } = await api.get(`/employees?PageSize=1000`)
            set(() => ({ employee: data }))
        } catch (error) {
            console.error(error)
        }
    },
    getEmployeeId: async (id) => {
        try {
            let { data } = await api.get(`/employees/${id}`)
            set(() => ({ getId: data }))
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
            await get().getEmployee()
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
