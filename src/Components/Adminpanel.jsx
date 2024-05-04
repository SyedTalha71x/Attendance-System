import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Adminpanel = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/Login')
        }
    }, [])
    return (
        <div className='h-full w-[70%] mx-auto mt-[15%]'>
            <div className='grid grid-cols-2 gap-3'>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-20 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to={'/Create'}>Add a User</Link></button>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-20 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to={'/Attendance'}>Mark Attendance</Link></button>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-20 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to={'/Report'}>Generate a Report</Link></button>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-20 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to={'/Userlist'}>See all Users List</Link></button>
            </div>
        </div >
    )
}

export default Adminpanel