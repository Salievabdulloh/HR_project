"use client"
import React from 'react'
import useDarkSide from '../shared/config/useDarkSide'

const Button = ({ icon, text }: any) => {
    const [theme] = useDarkSide()
    return (
        <div className={`px-2 py-1 rounded-md ${theme === 'dark' ? "bg-[#0f172a]" : "bg-white"} flex items-center gap-1.5 cursor-pointer border-[#c2c0c0] font-medium shadow border`}>{icon}{text}</div>
    )
}

export default Button