import React from 'react'

const Button = ({ icon, text }: any) => {
    return (
        <div className='px-2 py-1 rounded-md bg-white flex items-center gap-1.5 cursor-pointer border-[#c2c0c0] font-medium shadow border'>{icon}{text}</div>
    )
}

export default Button