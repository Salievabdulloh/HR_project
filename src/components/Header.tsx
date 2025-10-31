'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'


const Header = () => {
    // const router = useRouter()

    // const token = localStorage.getItem("access_token")

    // // if (!token) {
    // //     router.push("/login")
    // //     // alert("Please Log in first")
    // //     // return
    // // }

    return (
        <header className='flex items-center justify-between bg-[lightblue] p-5'>
            <div className='text-white text-[20px]  bg-[blue]'>HR Project</div>
            <div className='flex items-center gap-[25px]'>
                <Link href='/dashboard'>dashboard</Link>
                <Link href='/profile'>profile</Link>
                <Link href='/login'>Login</Link>
                <Link href='/Registration'>Sign up</Link>
            </div>
        </header>
    )
}

export default Header