"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DollarSign, User } from "lucide-react";
import { useGetStore } from "@/src/store/store";
import useDarkSide from "@/src/shared/config/useDarkSide";

const Payroll = () => {
  const { payrollData, getPayrollRecord, employee, getEmployee } = useGetStore();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [theme] = useDarkSide();

  const data = payrollData?.data || [];

  useEffect(() => {
    getPayrollRecord();
    getEmployee();
  }, []);

  const handleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`min-h-screen py-10 px-5 md:px-20 transition-all duration-500 ${
        theme === "dark"
          ? "bg-linear-to-t from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100"
          : "bg-linear-to-t from-blue-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex mb-8 justify-between items-center">
          <div
            className={`text-3xl font-bold flex items-center gap-3 ${
              theme === "dark" ? "text-gray-400" : "text-gray-800"
            }`}
          >
            <DollarSign
              className={`${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}
            />
            <h2>Payroll</h2>
          </div>
        </div>

        {/* Employee Payroll Accordions */}
        <div className="flex flex-col gap-4">
          {employee?.data?.map((emp: any) => {
            const payrolls = data.filter((p) => p.employeeId === emp.id);

            return (
              <Accordion
                key={emp.id}
                expanded={expandedId === emp.id}
                onChange={() => handleExpand(emp.id)}
                sx={{
                  backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                  color: theme === "dark" ? "#f8fafc" : "#111827",
                  borderRadius: "12px",
                  boxShadow: theme === "dark" ? "0 0 8px #1e293b" : "0 0 6px #e5e7eb",
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
                    transition: "background-color 0.3s ease",
                  },
                  "& .MuiAccordionDetails-root": {
                    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div className="flex justify-between w-full items-center">
                    <Typography
                      className={`flex items-center gap-2 text-lg font-semibold ${
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      <User size={20} className="text-blue-500" />
                      {emp.firstName} {emp.lastName}
                    </Typography>

                    <Chip
                      label={
                        payrolls.length > 0
                          ? `${payrolls.length} Record${payrolls.length > 1 ? "s" : ""}`
                          : "No Records"
                      }
                      color={payrolls.length > 0 ? "primary" : "default"}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  {payrolls.length > 0 ? (
                    payrolls.map((p) => (
                      <div
                        key={p.id}
                        className={`rounded-xl p-4 mb-3 border ${
                          theme === "dark"
                            ? "border-gray-700 bg-[#1e293b]"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <p className="font-medium">Period Start:</p>
                          <p>{new Date(p.periodStart).toLocaleDateString()}</p>
                          <p className="font-medium">Period End:</p>
                          <p>{new Date(p.periodEnd).toLocaleDateString()}</p>
                          <p className="font-medium">Gross Pay:</p>
                          <p>${p.grossPay}</p>
                          <p className="font-medium">Deductions:</p>
                          <p>${p.deductions}</p>
                          <p className="font-medium text-green-600">Net Pay:</p>
                          <p className="text-green-600 font-semibold">${p.netPay}</p>
                          <p className="font-medium">Created At:</p>
                          <p>{new Date(p.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography
                      className={`italic text-center ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No payroll record found for this employee.
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Payroll;
