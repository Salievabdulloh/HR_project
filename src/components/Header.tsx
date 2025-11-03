'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import MenuAccount from '@/src/components/MenuAccount'
import { useGetStore } from '../store/store'

const Header = () => {
    // const router = useRouter()

    const token = localStorage.getItem("access_token")

    const { user, getRegister } = useGetStore()

    const getRole = user?.data?.role

    console.log(getRole);

    useEffect(() => { getRegister() }, [])

    return (
        <header className='flex items-center justify-between bg-[lightblue] p-5'>
            <div className='text-white text-[20px]  bg-[blue]'>HR Project</div>
            <div className='flex items-center gap-[25px]'>
                <Link href='/dashboard'>dashboard</Link>
                <Link href='/login'>Login</Link>
                <Link href='/registration'>Sign up</Link>
                {token && getRole === 'Employee' && (
                    <MenuAccount />
                )}
            </div>
        </header>
    )
}

export default Header