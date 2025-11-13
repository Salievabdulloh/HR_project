"use client"
import React from 'react'
import useDarkSide from '../shared/config/useDarkSide'
import { useTheme } from 'next-themes'

const SeaAll = () => {
    const { theme, setTheme } = useTheme()
    return (
        <div className="">
            <div className={`px-2 py-1 rounded-md ${theme === 'dark' ? "bg-inherit" : "bg-white"} flex items-center gap-1.5 cursor-pointer border-[#c2c0c0] font-medium shadow border`}>See All</div>
        </div>
    )
}

export default SeaAll