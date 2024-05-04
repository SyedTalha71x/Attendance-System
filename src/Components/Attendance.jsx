import React, { useState, useContext } from 'react'
import axios from 'axios'
import Context from '../Context/Context'

const Attendance = () => {
    const [email, setemail] = useState('')
    const [data, setdata] = useState([])
    const context = useContext(Context);
    const { BASE_URL } = context;


    const handleSubmit = async () => {
        try {
            const url = `${BASE_URL}/api/user/Markattendance`
            const response = await axios.post(url, { email });
            setdata(response.data.attendanceRecord);
            console.log(response.data);
            alert('Your Attendance has been Marked')
        }
        catch (error) {
            console.log("Error while Marking Attendance")
            alert('Failed to Mark Attendance')
        }
    }



    return (
        <div className='flex justify-center items-center mt-[10%] flex-col gap-2'>
            <div>
                <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Enter your Email' className='py-3 outline-none px-20 p-2 bg-slate-100' />
            </div>
            <button onClick={handleSubmit} className='mt-2 bg-purple-600 text-white text-center py-2 px-10'>
                Mark Attendance
            </button>
            <section className='flex justify-center items-center bg-gray-200 p-10 mt-[4%]'>
                {data && (
                    <div>
                        <p>User ID: {data.userId}</p>
                        <p>Arrival Time: {data.arrivetime}</p>
                        <p>Leave Time: {data.leavetime}</p>
                        <p>Arrival Message: {data.ArriveMessage}</p>
                        <p>Leave Message: {data.LeaveMessage}</p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Attendance