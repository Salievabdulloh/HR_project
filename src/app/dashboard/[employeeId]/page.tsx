'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const ProfileId = () => {

    const { employeeId } = useParams()
    console.log(employeeId)

    return (
        <div>ProfileId {employeeId}</div>
    )
}

export default ProfileId