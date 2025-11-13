"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Briefcase, Users, Building2 } from "lucide-react";
import { useGetStore } from "@/src/store/store";
import toast from "react-hot-toast";
import { Button, Input, Modal } from "antd";
import { useTheme } from "next-themes";

const Departments = () => {
  const {
    getDepartmentEmployees,
    departmentEmployee,
    editDepartmentEmployees,
    deleteDepartmentEmployees,
    addDepartmentEmployees,
  } = useGetStore();

  const departments = departmentEmployee || [];

  const [addDialog, setaddDialog] = useState(false);
  const [addName, setaddName] = useState("");
  const [addDescription, setaddDescription] = useState("");

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [el, setEl] = useState<any | null>(null);

  const { theme } = useTheme();

  function editModal() {
    setEditDialog(true);
    setOpen(false);
    setEditName(el.name);
    setEditId(el.id);
    setEditDescription(el.description);
  }

  async function edit() {
    try {
      const editData = {
        id: Number(editId),
        name: editName,
        description: editDescription,
      };
      await editDepartmentEmployees(editData);
      setEditDialog(false);
      toast.success("Department updated successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async function removeDep() {
    try {
      await deleteDepartmentEmployees(el.id);
      toast.success("Deleted successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewDep() {
    try {
      const add = {
        name: addName,
        description: addDescription,
      };
      await addDepartmentEmployees(add);
      toast.success("Department added successfully");
      setaddDialog(false);
      setaddName("");
      setaddDescription("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDepartmentEmployees();
  }, []);

  return (
    <div
      className={`min-h-screen w-full py-10 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden transition-all duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#172554] text-gray-100"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row mb-8 justify-between items-start sm:items-center gap-4">
          <div
            className={`text-3xl font-bold flex items-center gap-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <Building2
              className={`${
                theme === "dark" ? "text-blue-300" : "text-blue-600"
              }`}
              size={30}
            />
            <h2>Departments</h2>
          </div>
          <Button
            onClick={() => setaddDialog(true)}
            type="primary"
            className="rounded-lg"
          >
            + Add Department
          </Button>
        </div>

        {/* Departments */}
        <div className="flex flex-col gap-4">
          {departments.map((dept) => {
            const isHovered = hoveredId === dept.id;
            const isExpanded = expandedId === dept.id;
            return (
              <div
                key={dept.id}
                onDoubleClick={() => {
                  setOpen(true);
                  setEl(dept);
                }}
                onMouseEnter={() => !isExpanded && setHoveredId(dept.id)}
                onMouseLeave={() => !isExpanded && setHoveredId(null)}
              >
                <Accordion
                  expanded={isHovered || isExpanded}
                  onChange={() =>
                    setExpandedId(isExpanded ? null : dept.id)
                  }
                  className={`rounded-2xl overflow-hidden shadow-md border hover:shadow-lg transition-all duration-300 
                    ${
                      theme === "dark"
                        ? "bg-[#0f172a]! text-white! border-gray-700"
                        : "bg-white border-gray-100"
                    }`}
                  sx={{
                    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                    color: theme === "dark" ? "#f8fafc" : "#111827",
                    "& .MuiAccordionSummary-root": {
                      backgroundColor:
                        theme === "dark" ? "#1e293b" : "#f9fafb",
                      transition: "background-color 0.3s ease",
                    },
                    "& .MuiAccordionDetails-root": {
                      backgroundColor:
                        theme === "dark" ? "#1e293b" : "#ffffff",
                      color: theme === "dark" ? "#e2e8f0" : "#374151",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      color: theme === "dark" ? "#60a5fa" : "#2563eb",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        className={`text-blue-600 transition-transform duration-200 ${
                          isHovered || isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    }
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                      <Typography
                        className={`text-lg font-semibold flex items-center gap-2 ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        <Users
                          className="text-blue-600"
                          size={20}
                        />
                        {dept.name}
                      </Typography>
                      <Chip
                        label={`${dept.employees.length} Employee${
                          dept.employees.length !== 1 ? "s" : ""
                        }`}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </AccordionSummary>

                  <AccordionDetails
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-50"
                    }`}
                  >
                    <Typography
                      className={`mb-2 ${
                        theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      {dept.description}
                    </Typography>
                    <Divider className="my-3" />

                    {dept.employees.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dept.employees.map((emp) => (
                          <div
                            key={emp.id}
                            className={`p-4 border rounded-xl shadow-sm hover:shadow-md transition duration-300
                              ${
                                theme === "dark"
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">
                                {emp.firstName} {emp.lastName}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  emp.isActive
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {emp.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <p className="text-sm flex items-center gap-2">
                              <Briefcase size={14} /> {emp.position}
                            </p>
                            <p className="text-sm">
                              Salary: ${emp.baseSalary}
                            </p>
                            <p className="text-sm text-gray-500">
                              Hire Date:{" "}
                              <span className="font-medium text-gray-700">
                                {emp.hireDate.split("-").join("/")}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="italic text-sm opacity-70">
                        No employees in this department yet.
                      </p>
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}

          {/* Modals */}
          <Modal
            title="Manage Department"
            open={open}
            footer={null}
            centered
            onCancel={() => setOpen(false)}
          >
            <div className="flex justify-end gap-3">
              <Button onClick={removeDep} type="primary" danger>
                Delete
              </Button>
              <Button onClick={editModal} type="primary">
                Edit
              </Button>
            </div>
          </Modal>

          <Modal
            title="Add Department"
            open={addDialog}
            onOk={addNewDep}
            onCancel={() => setaddDialog(false)}
            centered
          >
            <Input
              placeholder="Department Name"
              value={addName}
              onChange={(e) => setaddName(e.target.value)}
              className="mb-3"
            />
            <Input.TextArea
              placeholder="Description"
              value={addDescription}
              onChange={(e) => setaddDescription(e.target.value)}
              rows={3}
            />
          </Modal>

          <Modal
            title="Edit Department"
            open={editDialog}
            onOk={edit}
            onCancel={() => setEditDialog(false)}
            centered
          >
            <Input
              placeholder="Edit Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mb-3"
            />
            <Input.TextArea
              placeholder="Edit Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Departments;
