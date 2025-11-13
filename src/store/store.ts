import { create } from 'zustand'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import api from '../lib/api'
import { StringDecoder } from 'node:string_decoder'

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

interface PutData {
    employeeId: number;
    username: string;
    email: string;
    phoneNumber: number;
}

interface MyRegisterData {
    username: string
    email: string
    phoneNumber: number
    role: string
    registrationDate: string
    employeeInfo: {
        id: number
        firstName: string
        lastName: string
        position: string
        hireDate: string
        baseSalary: number
        isActive: boolean
        departmentName: string
    }
    length: number
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
    // baseSalary: number
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
    employeeId: number
    username: string
    email: string
    phoneNumber?: number
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

interface EmployeeDepartment {
    id: number,
    name: string,
    description: string
    employees: [{
        id: number,
        length: number
        firstName: string,
        lastName: string,
        position: string,
        hireDate: string,
        baseSalary: number,
        isActive: boolean,
        departmentName: string
    }]
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
    id: number
    month: string
    totalNetPay: number
    totalGrossPay: number
}

interface SalaryHistoryUpdate {
    employeeId: number,
    baseSalary: number,
    bonus: number
}

interface MarkViewed {
    id: number
}

interface Salary {
    departmentId: number
    bonusPercentage: number

}

interface SalaryId {
    id: number,
    month: string,
    expectedAmount: string,
    actualAmount: string,
    deviationPercent: number,
    isViewed: boolean,
    reviewComment: string,
    employeeId: number,
    employeeName: string
}

interface addComment {
    id: number,
    reviewComment: string
}

interface EditOneSalary {
    employeeId: number
    baseSalary: number
}

interface FirstReport {
    Format: string
    HiredAfter: string
    HiredBefore: string
    DepartmentId?: number
}

interface SecondReport {
    Format: string
    EmployeeId?: number
    StartPeriod?: string
    EndPeriod?: string
    DepartmentId?: number
}

interface ThirdReport {
    Format: string
    EmployeeId?: number
    DepartmentId?: number
    FromMonth?: string
    ToMonth?: string
}

interface FourthReport {
    Format: string
    EmployeeId?: number
    DepartmentId?: number
    FromMonth?: string
    ToMonth?: string
    IsReviewed?: boolean
}

interface FifthReport {
    Format: string
    EmployeeId?: string
    MinEmployeeCount?: number
}

interface editMyVacationRecord {
    id: number
}

interface VacationRecordData {
    id: number
    employeeId: number
    employee: {
        id: number
        firstName: string
        lastName: string
        position: string
        hireDate: string
        baseSalary: number
        isActive: true
        departmentName: string
    }
    startDate: string,
    endDate: string,
    type: string,
    status: string,
    daysCount: number,
    paymentAmount: number
}

interface Send {
    employeeId: number,
    startDate: string,
    endDate: string,
    type: string,
}

interface GetPayrollUsersId {
    id: number,
    periodStart: string,
    periodEnd: string,
    grossPay: number,
    deductions: number,
    netPay: number,
    createdAt: string,
    employeeId: number,
    employeeName: string,
    baseSalary: number,
    bonus: number
}

interface showAllDepartment {
    id: number,
    name: string,
    description: string
    employeeCount: number
}

interface VacationAllData {
    id: number
    employeeId: number
    employee: {
        id: number
        firstName: string
        lastName: string
        position: string
        hireDate: string
        baseSalary: number
        isActive: boolean
        departmentName: string
    }
    startDate: string
    endDate: string
    type: string
    status: string
    daysCount: number
    paymentAmount: any
}

interface AllEmployeesUser {
    employeeId: number
    username: string
    email: string
    phoneNumber: number
    role: string
    registrationDate: string
    employeeInfo: {
        id: number
        firstName: string
        lastName: string
        position: string
        hireDate: string
        baseSalary: number
        isActive: boolean
        departmentName: string
    }
}

interface paymentsData {
    id: number,
    name: string,
    totalAmount: number
}

interface Dep {
    id: number,
    name: string,
    description: string
}

interface RegistrationResponse {
    statusCode: number;
    message: string;
    errors: any;
    data: string;
}
interface DeleteEmployeeResponse {
    statusCode: number,
    message: string,
    errors: any,
    data: string
}

interface VacationSummaryData {
    month: string,
    totalVacationDays: number,
    employeesOnVacation: number
}

interface MyVacationData {
    id: number
    totalDaysPerYear: number
    usedDays: number
    remainingDays: number
    year: number
    byExperienceBonusDays: number
    periodStart: string
    periodEnd: string
    employeeId: number
    employee: {
        id: number
        firstName: string
        lastName: string
        position: string
        hireDate: string
        baseSalary: number
        isActive: boolean
        departmentName: string
    }
}

interface SalaryAllData {
    id: number,
    month: string,
    expectedAmount: number,
    actualAmount: number,
    deviationPercent: string,
    isViewed: boolean,
    reviewComment: string,
    employeeId: number,
    employeeName: string
}

interface Statistics {
    month: string,
    totalNetPay: number
}

interface SalaryData {
    id: number,
    fullName: string,
    month: string,
    deviation: number,
    isViewed: boolean
}

interface GetStore {
    user: MyRegisterData | null
    setUser: (user: MyRegisterData) => void
    allUsers: AllEmployeesUser[]
    employee: EmployeeDate[]
    getId: EmployeeByid[]
    payrollData: PayrollRecord[]
    payrollMonthId: Month[]
    salaryById: SalaryId[]
    salaryHistory: Salary[]
    departmentEmployee: EmployeeDepartment[]
    allDepartment: Dep[]
    department: showAllDepartment[]
    vacation: VacationSummaryData[]
    payroll: Statistics[]
    myVacation: MyVacationData | null
    setMyVacation: (myVacation: MyVacationData) => void
    salary: SalaryData[]
    payments: paymentsData[]
    payrollId: []
    myVacationRecord: VacationRecordData[]
    vacationAll: VacationAllData[]
    salaryAll: SalaryAllData[]
    payrollDataId: GetPayrollUsersId[]

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
    registration: (data: RegisterData) => Promise<RegistrationResponse>
    deleteEmployee: (id: number) => Promise<DeleteEmployeeResponse>
    editEmployee: (data: EmployeeDate) => Promise<void>
    getEmployeeId: (data: EmployeeByid) => Promise<void>
    getPayrollRecordId: (data: PayrollRecord) => Promise<void>
    getPayrollRecord: () => Promise<void>
    editUsers: (data: GetAllUsers) => Promise<void>
    editUser: (data: PutData) => Promise<void>
    editDepartmentEmployees: (data: Department) => Promise<void>
    deleteDepartmentEmployees: (data: Department) => Promise<void>
    addDepartmentEmployees: (data: Department) => Promise<void>
    getPayrollmonth: (id: number) => Promise<void>
    getPayments: () => Promise<void>
    getSalaryHistory: () => Promise<void>
    editSalaryHistory: (data: Salary) => Promise<void>
    editSalaryAnomaly: (data: MarkViewed) => Promise<void>
    getSalaryAnomalyId: (id: number | undefined) => Promise<void>
    getSalaryAnomalyAll: () => Promise<void>
    getMyVacation: () => Promise<void>
    getReportsEmployees: (data: FirstReport) => Promise<void>
    getReportsPayroll: (data: SecondReport) => Promise<void>
    getReportsSalaries: (data: ThirdReport) => Promise<void>
    getReportsAnomalies: (data: FourthReport) => Promise<void>
    getReportsDepartment: (data: FifthReport) => Promise<void>
    getMyVacationRecord: () => Promise<void>
    addCommentSalary: (data: addComment) => Promise<void>
    editSalary: (data: EditOneSalary) => Promise<void>
    getAllVacations: (status: string) => Promise<void>
    cancelMyVacation: (data: editMyVacationRecord) => Promise<void>
    sendRequest: (data: Send) => Promise<void>
    getPayrollRecordById: (id: number) => Promise<void>
}


export const useGetStore = create<GetStore>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
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
    salaryHistory: [],
    salaryById: [],
    salaryAll: [],
    myVacation: null,
    setMyVacation: (myVacation) => set({ myVacation }),
    myVacationRecord: [],
    vacationAll: [],
    payrollDataId: [],

    getRegister: async () => {
        try {
            let { data } = await api.get(`/users/me`)
            set(() => ({ user: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getDepartment: async () => {
        try {
            let { data } = await api.get(`/departments/summary`)
            set(() => ({ department: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getSalaryHistory: async () => {
        try {
            let { data } = await api.get(`/salary_history/get`)
            set(() => ({ salaryHistory: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    editSalaryAnomaly: async (data: any) => {
        try {
            await api.put(`/salary_anomaly/mark-viewed`, data)
            await get().getSalaryAnomoly()
        } catch (error) {
            console.error(error)
        }
    },
    getSalaryAnomalyId: async (id) => {
        try {
            let { data } = await api.get(`/salary_anomaly/get?employeeId=${id}`)
            set(() => ({ salaryById: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getSalaryAnomalyAll: async () => {
        try {
            let { data } = await api.get(`/salary_anomaly/get-all`)
            set(() => ({ salaryAll: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    addCommentSalary: async (data) => {
        try {
            await api.put(`/salary_anomaly/add-comment`, data)
            // await get().getSalaryAnomalyId()
            await get().getSalaryAnomalyAll()
        } catch (error) {
            console.error(error)
        }
    },
    editSalaryHistory: async (data) => {
        try {
            await api.put(`/salary_history/set-bonuses?departmentId=${data.departmentId}&bonusPercentage=${data.bonusPercentage}`, data)
            await get().getSalaryHistory()
        } catch (error) {
            console.error(error)
        }
    },
    getAllDepartments: async () => {
        try {
            let { data } = await api.get(`/departments`)
            set(() => ({ allDepartment: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getDepartmentEmployees: async () => {
        try {
            let { data } = await api.get(`/departments/with-employees`)
            set(() => ({ departmentEmployee: data.data }))
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
    editSalary: async (data) => {
        try {
            await api.put(`/salary_history/update/${data.employeeId}`, data)
            await get().getSalaryHistory()
        } catch (error) {
            console.error(error)
        }
    },
    getSalaryAnomoly: async () => {
        try {
            let res = await api.get(`/salary_anomaly/get-list`)
            set(() => ({ salary: res.data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getMyVacation: async () => {
        try {
            let { data } = await api.get(`/vacation_balances/me`)
            set(() => ({ myVacation: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getMyVacationRecord: async () => {
        try {
            let { data } = await api.get(`/vacation/my_records`)
            set(() => ({ myVacationRecord: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    sendRequest: async (data) => {
        try {
            await api.post(`/vacation/send-request`, data)
            await get().getMyVacationRecord()
        } catch (error) {
            console.error(error)
        }
    },
    cancelMyVacation: async (data) => {
        try {
            await api.get(`/vacation/cancel/${data.id}`, { data })
            await get().getMyVacationRecord()
        } catch (error) {
            console.error(error)
        }
    },
    getReportsEmployees: async (params: Record<string, any>) => {
        try {
            let res = await api.get(`/reports/employees`, {
                params,
                responseType: 'blob',
            })

            console.log("Params type:", params, typeof params, params instanceof Promise);

            const blob = new Blob([res.data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob);

            const contentDisposition = res.headers['content-disposition'];
            const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
            const filename = filenameMatch ? filenameMatch[1] : 'employees.csv';

            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.click()

            window.URL.revokeObjectURL(url)

        } catch (error) {
            console.error(error)
        }
    },
    getReportsPayroll: async (params: Record<string, any>) => {
        try {
            let res = await api.get(`/reports/payrolls`, {
                params,
                responseType: 'blob',
            })

            const blob = new Blob([res.data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob);

            const contentDisposition = res.headers['content-disposition'];
            const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
            const filename = filenameMatch ? filenameMatch[1] : 'employees.csv';

            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.click()

            window.URL.revokeObjectURL(url)

        } catch (error) {
            console.error(error)
        }
    },
    getReportsSalaries: async (params: Record<string, any>) => {
        try {
            let res = await api.get(`/reports/salaries`, {
                params,
                responseType: 'blob',
            })

            console.log("Params type:", params, typeof params, params instanceof Promise);

            const blob = new Blob([res.data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob);

            const contentDisposition = res.headers['content-disposition'];
            const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
            const filename = filenameMatch ? filenameMatch[1] : 'employees.csv';

            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.click()

            window.URL.revokeObjectURL(url)

        } catch (error) {
            console.error(error)
        }
    },
    getReportsAnomalies: async (params: Record<string, any>) => {
        try {
            let res = await api.get(`/reports/anomalies`, {
                params,
                responseType: 'blob',
            })

            const blob = new Blob([res.data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob);

            const contentDisposition = res.headers['content-disposition'];
            const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
            const filename = filenameMatch ? filenameMatch[1] : 'employees.csv';

            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.click()

            window.URL.revokeObjectURL(url)

        } catch (error) {
            console.error(error)
        }
    },
    getReportsDepartment: async (params: Record<string, any>) => {
        try {
            let res = await api.get(`/reports/anomalies`, {
                params,
                responseType: 'blob',
            })

            const blob = new Blob([res.data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob);

            const contentDisposition = res.headers['content-disposition'];
            const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
            const filename = filenameMatch ? filenameMatch[1] : 'employees.csv';

            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.click()

            window.URL.revokeObjectURL(url)

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
            set(() => ({ payments: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollRecord: async () => {
        try {
            let { data } = await api.get(`/payroll_record/get-all`)
            set(() => ({ payrollData: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollRecordById: async (id) => {
        try {
            let { data } = await api.get(`/payroll_record/get/${id}`)
            set(() => ({ payrollDataId: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollmonth: async (id) => {
        try {
            let { data } = await api.get(`/payroll_record/get-graph?monthsRange=${id}`)
            set(() => ({ payrollMonthId: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getPayrollRecordTotal: async () => {
        try {
            let { data } = await api.get(`/payroll_record/statistics/total-net-pay`)
            set(() => ({ payroll: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getVacationSummary: async () => {
        try {
            let { data } = await api.get(`/vacation/summary`)
            set(() => ({ vacation: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getAllVacations: async (status) => {
        try {
            let { data } = await api.get(`/vacation/get_all`, {
                params: status ? { vacationStatus: status } : {}
            })
            set(() => ({ vacationAll: data.data }))
        } catch (error) {
            console.error(error)
        }
    },
    getUsersAll: async () => {
        try {
            let { data } = await api.get(`/users`)
            set(() => ({ allUsers: data.data }))
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
            set(() => ({ employee: data.data }))
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
            let res = await api.delete(`/employees/${id}`)
            await get().getEmployee()
            return res.data
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
