import React from 'react'
import SeeAll from "@/src/components/SeaAll"

const Card = ({ text, price, grade }: any) => {

    return (
        <div className="rounded-[20px] bg-white p-5">
            <div className="flex gap-20 items-center">
                <h2 className='font-medium text-[20px]'>{text}</h2>
                <SeeAll />
            </div>
            <h1 className='text-[28px] my-2.5 font-medium'>{price}</h1>
            <div className='flex items-center gap-1'>
                <p className={`${grade[0] === '+' ? "text-[hsl(120,100%,50%)]" : "text-[red]"}`}>{grade}%</p>
                <p className='text-gray-500'>Vs Last Week</p>
            </div>
        </div>
    )
}

export default Card