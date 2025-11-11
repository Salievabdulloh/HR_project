"use client"
import { useGetStore } from '@/src/store/store'
import { Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useDarkSide from '@/src/shared/config/useDarkSide';

const Report = () => {
    const { getReportsEmployees } = useGetStore()

    const [format, setFormat] = useState('')
    const [hiredAfter, sethiredAfter] = useState('10-10-2024')
    const [hiredBefore, sethiredBefore] = useState('12-12-2025')

    const [theme] = useDarkSide()

    async function getReports() {
        try {
            const params = {
                Format: format,
                HiredAfter: hiredAfter,
                HiredBefore: hiredBefore,
            };

            const res = await getReportsEmployees(params);
            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            const disposition = res.headers["content-disposition"];
            const filenameMatch = disposition?.match(/filename="?([^"]+)"?/);
            link.download = filenameMatch ? filenameMatch[1] : "employees.csv";

            link.href = url;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1 className='text-[33px] font-semibold my-3 text-center'>Employees Reports</h1>
            <div className="m-10 mb-30 ">
                <Accordion sx={{ bgcolor: "black", color: "white" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Employees Reports</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={`rounded-[10px] p-4 flex gap-3 flex-col ${theme == 'dark' ? "bg-[blue]" : "bg-[skyblue]"}`}>
                            <select value={format} onChange={(e) => setFormat(e.target?.value)}>
                                <option value="csv">Csv</option>
                                <option value="json">json</option>
                            </select>
                            <input type='date' value={hiredAfter} onChange={(e) => sethiredAfter(e.target.value)} />
                            <input type='date' value={hiredBefore} onChange={(e) => sethiredBefore(e.target.value)} />
                            <Button onClick={getReports}>Get Reports</Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div >
    )
}

export default Report