import React from 'react'

const Logout = () => {
    function LogoutBtn() {
        localStorage.removeItem('access_token')
        window.location.href = '/login'
    }
    return (
        <button className='cursor-pointer' onClick={LogoutBtn}>Logout</button>
    )
}

export default Logout