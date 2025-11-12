import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { Checkbox, Select } from 'antd';
import { ArrowRight, X } from 'lucide-react';
import { useGetStore } from '../store/store';
import toast from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
    {
        label: 'Next 7 Days',
        getValue: () => {
            const today = dayjs();
            return [today, today.add(6, "day")];
        },
    },
    { label: 'Reset', getValue: () => [null, null] },
];

export default function BasicRangeShortcuts({ open, setOpen }: any) {

    const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([null, null])

    const { sendRequest, getMyVacationRecord, user, getRegister } = useGetStore()

    const [isChecked, setIsChecked] = useState(false)
    const [type, settype] = useState('Paid')


    const startDate = value[0] ? value[0]?.format("YYYY-MM-DD") : ""
    const endDate = value[1] ? value[1]?.format("YYYY-MM-DD") : ""

    function handleChange(newValue: [Dayjs | null, Dayjs | null]) {
        const [start, end] = newValue
        const today = dayjs()

        if (start && end) {
            const diff = end.diff(start, 'day') + 1

            if (diff > 24) {
                alert("You can only select up to 24 days!");
                return
            }

            if (start.isBefore(today, 'day')) {
                alert("You cannot start a vacation in the past!");
                return
            }
        }

        setValue(newValue)
    }

    const myId = user?.employeeInfo?.id

    console.log(myId);

    async function postMessage() {
        try {
            let data = {
                employeeId: Number(myId),
                startDate: String(startDate),
                endDate: String(endDate),
                type: type,
            }
            console.log(data);

            let res = await sendRequest(data)
            toast.success("Your message has been sent to your manager. PLease wait his response")
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMyVacationRecord()
        getRegister()
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="flex relative gap-3">
                    <button onClick={() => setOpen(false)} className='cursor-pointer text-[red] absolute right-2 top-1'><X /></button>
                    <div className="rounded-[12px] bg-white shadow-md p-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateRangePicker
                                value={value}
                                onChange={handleChange}
                                calendars={2}
                                slotProps={{
                                    shortcuts: {
                                        items: shortcutsItems,
                                    },
                                    actionBar: { actions: [] }
                                }}
                                sx={{
                                    '& .MuiPickersCalendarHeader-root': {
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                        borderRadius: '8px 8px 0 0',
                                        mb: 1,
                                    },
                                    '& .MuiDayCalendar-weekDayLabel': {
                                        color: '#2563eb',
                                        fontWeight: 600,
                                    },
                                    '& .MuiPickersDay-root': {
                                        fontWeight: 500,
                                        borderRadius: '8px',
                                    },
                                    '& .MuiPickersDay-root.Mui-selected': {
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                    },
                                    '& .MuiPickersDay-root:hover': {
                                        backgroundColor: '#93c5fd',
                                    },
                                    '& .MuiPickersCalendarHeader-label': {
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="text-[black] p-10">
                        <h1 className='font-semibold  mb-4 text-[26px]'>Let's Build with Clarity <br />& Momentum</h1>
                        <h3>Need strategic creative support? From brand positioning to high converting digital experience - let's talk!</h3>
                        <div className="gap-3 mt-4 flex-col flex">
                            <select value={type} onChange={(e) => settype(e.target.value)}>
                                <option value='Paid'>Paid</option>
                                <option value='Unpaid'>Unpaid</option>
                            </select>
                        </div>
                        <div onClick={() => setIsChecked(!isChecked)} className='flex cursor-pointer mt-10 mb-4 items-center gap-4'>
                            <Checkbox checked={isChecked ? true : false} />
                            <div>I have read and accepted Terms & Conditions</div>
                        </div>
                        {isChecked ? (
                            <button onClick={postMessage} className='w-full rounded-full cursor-pointer transition-all hover:bg-[hsl(240,100%,60%)] active:bg-[hsl(240,100%,70%)] bg-[blue] flex items-center gap-2 justify-center text-white p-4'>Submit <ArrowRight size={20} /></button>
                        ) : (
                            <button disabled className='w-full rounded-full gap-2 cursor-not-allowed bg-[hsl(240,100%,70%)] flex items-center justify-center text-white p-4'>Submit <ArrowRight size={18} /></button>
                        )}
                    </div>
                </div>
            </Box>
        </Modal>
    )
}
