"use client"
import { useGetStore } from '@/src/store/store'
import { Button, DatePicker, Input, Select, message } from 'antd'
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import useDarkSide from '@/src/shared/config/useDarkSide'
import dayjs from 'dayjs'
import { useTheme } from 'next-themes'

const { RangePicker } = DatePicker

const Report = () => {
    const {
        getReportsEmployees,
        getReportsPayroll,
        getReportsSalaries,
        getReportsAnomalies,
        getReportsDepartment,
    } = useGetStore()

    const { theme, setTheme } = useTheme()
    const [messageApi, contextHolder] = message.useMessage()
    const [messageApi2, contextHolder2] = message.useMessage()

    const success = () => messageApi2.success('✅ File downloaded successfully!')
    const info = () => messageApi.warning('⚠️ Please select a valid date range.')

    const handleDownload = async (res: any, fallbackName: string) => {
        const blob = new Blob([res?.data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        const disposition = res?.headers['content-disposition']
        const filenameMatch = disposition?.match(/filename="?([^"]+)"?/)
        link.download = filenameMatch ? filenameMatch[1] : fallbackName
        link.href = url
        link.click()
        window.URL.revokeObjectURL(url)
        success()
    }

    const [format1, setFormat1] = useState('csv')
    const [dateRange1, setDateRange1] = useState<[any, any] | null>(null)
    const [loading1, setLoading1] = useState(false)

    async function getFirstReports() {
        if (!dateRange1) return info()
        try {
            setLoading1(true)
            const [after, before] = dateRange1
            const params = {
                Format: format1,
                HiredAfter: dayjs(after).format('YYYY-MM-DD'),
                HiredBefore: dayjs(before).format('YYYY-MM-DD'),
            }
            const res = await getReportsEmployees(params)
            await handleDownload(res, 'employees.csv')
        } catch {
            message.error('Failed to download Employees report.')
        } finally {
            setLoading1(false)
        }
    }

    const [format2, setFormat2] = useState('csv')
    const [dateRange2, setDateRange2] = useState<[any, any] | null>(null)
    const [loading2, setLoading2] = useState(false)
    const [employeeId2, setEmployeeId2] = useState('')
    const [departmentId2, setDepartmentId2] = useState('')

    async function getSecondReports() {
        if (!dateRange2) return info()
        try {
            setLoading2(true)
            const [start, end] = dateRange2
            const params = {
                Format: format2,
                EmployeeId: employeeId2 ? Number(employeeId2) : undefined,
                DepartmentId: departmentId2 ? Number(departmentId2) : undefined,
                StartPeriod: dayjs(start).format('YYYY-MM-DD'),
                EndPeriod: dayjs(end).format('YYYY-MM-DD'),
            }
            const res = await getReportsPayroll(params)
            await handleDownload(res, 'payroll.csv')
        } catch {
            message.error('Failed to download Payroll report.')
        } finally {
            setLoading2(false)
        }
    }

    const [format3, setFormat3] = useState('csv')
    const [dateRange3, setDateRange3] = useState<[any, any] | null>(null)
    const [loading3, setLoading3] = useState(false)
    const [employeeId3, setEmployeeId3] = useState('')
    const [departmentId3, setDepartmentId3] = useState('')

    async function getThirdReports() {
        if (!dateRange3) return info()
        try {
            setLoading3(true)
            const [from, to] = dateRange3
            const params = {
                Format: format3,
                EmployeeId: employeeId3 ? Number(employeeId3) : undefined,
                DepartmentId: departmentId3 ? Number(departmentId3) : undefined,
                FromMonth: dayjs(from).format('YYYY-MM'),
                ToMonth: dayjs(to).format('YYYY-MM'),
            }
            const res = await getReportsSalaries(params)
            await handleDownload(res, 'salaries.csv')
        } catch {
            message.error('Failed to download Salaries report.')
        } finally {
            setLoading3(false)
        }
    }

    const [format4, setFormat4] = useState('csv')
    const [dateRange4, setDateRange4] = useState<[any, any] | null>(null)
    const [loading4, setLoading4] = useState(false)
    const [employeeId4, setEmployeeId4] = useState('')
    const [departmentId4, setDepartmentId4] = useState('')
    const [isReviewed4, setIsReviewed4] = useState<boolean | undefined>(undefined)

    async function getFourthReports() {
        if (!dateRange4) return info()
        try {
            setLoading4(true)
            const [from, to] = dateRange4
            const params = {
                Format: format4,
                EmployeeId: employeeId4 ? Number(employeeId4) : undefined,
                DepartmentId: departmentId4 ? Number(departmentId4) : undefined,
                FromMonth: dayjs(from).format('YYYY-MM'),
                ToMonth: dayjs(to).format('YYYY-MM'),
                IsReviewed: isReviewed4,
            }
            const res = await getReportsAnomalies(params)
            await handleDownload(res, 'anomalies.csv')
        } catch {
            message.error('Failed to download Anomalies report.')
        } finally {
            setLoading4(false)
        }
    }

    const [format5, setFormat5] = useState('csv')
    const [loading5, setLoading5] = useState(false)
    const [employeeId5, setEmployeeId5] = useState('')
    const [minEmployeeCount5, setMinEmployeeCount5] = useState('')

    async function getFifthReports() {
        try {
            setLoading5(true)
            const params = {
                Format: format5,
                EmployeeId: employeeId5,
                MinEmployeeCount: minEmployeeCount5 ? Number(minEmployeeCount5) : undefined,
            }
            const res = await getReportsDepartment(params)
            await handleDownload(res, 'department.csv')
        } catch {
            message.error('Failed to download Department report.')
        } finally {
            setLoading5(false)
        }
    }

    const sectionStyle = `rounded-2xl shadow-lg border p-6 md:p-8 ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'
        }`

    const reportSections = [
        { title: 'Employee Reports', download: getFirstReports, loading: loading1 },
        { title: 'Payroll Reports', download: getSecondReports, loading: loading2 },
        { title: 'Salaries Reports', download: getThirdReports, loading: loading3 },
        { title: 'Anomalies Reports', download: getFourthReports, loading: loading4 },
        { title: 'Department Reports', download: getFifthReports, loading: loading5 },
    ]

    return (
        <div
            className={`min-h-screen px-6 py-10 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f172a] text-white' : 'bg-[#f9fafb] text-gray-800'
                }`}
        >
            <div className="max-w-6xl mx-auto space-y-10">
                {contextHolder}
                {contextHolder2}
                {/* 🧾 EMPLOYEE REPORTS SECTION */}
                <div>
                    <div className="flex flex-col mb-7 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold flex items-center gap-3">
                            <FileTextOutlined className="text-blue-500" /> Employee Reports
                        </h1>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DownloadOutlined />}
                            onClick={getFirstReports}
                            loading={loading1}
                            className="rounded-full! bg-blue-600! hover:bg-blue-700!"
                        >
                            Download
                        </Button>
                    </div>

                    <div className={sectionStyle}>
                        <h2 className="text-xl font-semibold mb-6">Filter Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Report Format</label>
                                <Select
                                    value={format1}
                                    onChange={setFormat1}
                                    size="large"
                                    options={[
                                        { value: 'csv', label: 'CSV (.csv)' },
                                        { value: 'json', label: 'JSON (.json)' },
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
                                <label className="font-medium text-sm">Hired Date Range</label>
                                <RangePicker
                                    className="w-full"
                                    size="large"
                                    value={dateRange1 as any}
                                    onChange={(dates) => setDateRange1(dates)}
                                    format="YYYY-MM-DD"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 💰 PAYROLL REPORTS SECTION */}
                <div>
                    <div className="flex flex-col mb-7 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold flex items-center gap-3">
                            <FileTextOutlined className="text-blue-500" /> Payroll Reports
                        </h1>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DownloadOutlined />}
                            onClick={getSecondReports}
                            loading={loading2}
                            className="rounded-full! bg-blue-600! hover:bg-blue-700!"
                        >
                            Download
                        </Button>
                    </div>

                    <div className={sectionStyle}>
                        <h2 className="text-xl font-semibold mb-6">Filter Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Report Format</label>
                                <Select
                                    value={format2}
                                    onChange={setFormat2}
                                    size="large"
                                    options={[
                                        { value: 'csv', label: 'CSV (.csv)' },
                                        { value: 'json', label: 'JSON (.json)' },
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
                                <label className="font-medium text-sm">Date Range</label>
                                <RangePicker
                                    className="w-full"
                                    size="large"
                                    value={dateRange2 as any}
                                    onChange={(dates) => setDateRange2(dates)}
                                    format="YYYY-MM-DD"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Employee ID</label>
                                <Input
                                    value={employeeId2}
                                    onChange={(e) => setEmployeeId2(e.target.value)}
                                    size="large"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Department ID</label>
                                <Input
                                    value={departmentId2}
                                    onChange={(e) => setDepartmentId2(e.target.value)}
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🧮 SALARIES REPORTS SECTION */}
                <div>
                    <div className="flex flex-col mb-7 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold flex items-center gap-3">
                            <FileTextOutlined className="text-blue-500" /> Salaries Reports
                        </h1>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DownloadOutlined />}
                            onClick={getThirdReports}
                            loading={loading3}
                            className="rounded-full! bg-blue-600! hover:bg-blue-700!"
                        >
                            Download
                        </Button>
                    </div>

                    <div className={sectionStyle}>
                        <h2 className="text-xl font-semibold mb-6">Filter Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Report Format</label>
                                <Select
                                    value={format3}
                                    onChange={setFormat3}
                                    size="large"
                                    options={[
                                        { value: 'csv', label: 'CSV (.csv)' },
                                        { value: 'json', label: 'JSON (.json)' },
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">From - To Month</label>
                                <RangePicker
                                    picker="month"
                                    className="w-full"
                                    size="large"
                                    value={dateRange3 as any}
                                    onChange={(dates) => setDateRange3(dates)}
                                    format="YYYY-MM"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Employee ID</label>
                                <Input
                                    value={employeeId3}
                                    onChange={(e) => setEmployeeId3(e.target.value)}
                                    size="large"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Department ID</label>
                                <Input
                                    value={departmentId3}
                                    onChange={(e) => setDepartmentId3(e.target.value)}
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ⚙️ ANOMALIES REPORTS SECTION */}
                <div>
                    <div className="flex flex-col mb-7 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold flex items-center gap-3">
                            <FileTextOutlined className="text-blue-500" /> Anomalies Reports
                        </h1>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DownloadOutlined />}
                            onClick={getFourthReports}
                            loading={loading4}
                            className="rounded-full! bg-blue-600! hover:bg-blue-700!"
                        >
                            Download
                        </Button>
                    </div>

                    <div className={sectionStyle}>
                        <h2 className="text-xl font-semibold mb-6">Filter Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Report Format</label>
                                <Select
                                    value={format4}
                                    onChange={setFormat4}
                                    size="large"
                                    options={[
                                        { value: 'csv', label: 'CSV (.csv)' },
                                        { value: 'json', label: 'JSON (.json)' },
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">From - To Month</label>
                                <RangePicker
                                    picker="month"
                                    className="w-full"
                                    size="large"
                                    value={dateRange4 as any}
                                    onChange={(dates) => setDateRange4(dates)}
                                    format="YYYY-MM"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Employee ID</label>
                                <Input
                                    value={employeeId4}
                                    onChange={(e) => setEmployeeId4(e.target.value)}
                                    size="large"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Department ID</label>
                                <Input
                                    value={departmentId4}
                                    onChange={(e) => setDepartmentId4(e.target.value)}
                                    size="large"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Is Reviewed</label>
                                <Select
                                    value={isReviewed4}
                                    onChange={setIsReviewed4}
                                    size="large"
                                    options={[
                                        { value: true, label: 'Reviewed' },
                                        { value: false, label: 'Not Reviewed' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🏢 DEPARTMENT REPORTS SECTION */}
                <div>
                    <div className="flex flex-col mb-7 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold flex items-center gap-3">
                            <FileTextOutlined className="text-blue-500" /> Department Reports
                        </h1>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DownloadOutlined />}
                            onClick={getFifthReports}
                            loading={loading5}
                            className="rounded-full! bg-blue-600! hover:bg-blue-700!"
                        >
                            Download
                        </Button>
                    </div>

                    <div className={sectionStyle}>
                        <h2 className="text-xl font-semibold mb-6">Filter Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Report Format</label>
                                <Select
                                    value={format5}
                                    onChange={setFormat5}
                                    size="large"
                                    options={[
                                        { value: 'csv', label: 'CSV (.csv)' },
                                        { value: 'json', label: 'JSON (.json)' },
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Employee ID</label>
                                <Input
                                    value={employeeId5}
                                    onChange={(e) => setEmployeeId5(e.target.value)}
                                    size="large"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Min Employee Count</label>
                                <Input
                                    type="number"
                                    value={minEmployeeCount5}
                                    onChange={(e) => setMinEmployeeCount5(e.target.value)}
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report
