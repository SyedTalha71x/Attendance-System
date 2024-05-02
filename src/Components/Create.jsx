import React, { useState, useContext, useEffect } from 'react';
import Context from '../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const context = useContext(Context);
    const { BASE_URL } = context;


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        designation: '',
        lineancytimeMinutes: '',
        role: '',
        days: [],
        arrivaltimeHours: '',
        arrivaltimeMinutes: '',
        workinghours: ''
    });

    const addUser = async () => {
        const url = `${BASE_URL}/api/user/adduser`;
        try {
            const response = await axios.post(url, {
                name: user.name,
                email: user.email,
                password: user.password,
                designation: user.designation,
                lineancytime: {
                    minutes: parseInt(user.lineancytimeMinutes)
                },
                role: user.role,
                days: user.days,
                arrivaltime: {
                    hours: parseInt(user.arrivaltimeHours),
                    minutes: parseInt(user.arrivaltimeMinutes)
                },
                workinghours: parseInt(user.workinghours)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userWithNumbers = {
            ...user,
            lineancytimeMinutes: parseInt(user.lineancytimeMinutes),
            arrivaltimeHours: parseInt(user.arrivaltimeHours),
            arrivaltimeMinutes: parseInt(user.arrivaltimeMinutes),
            workinghours: parseInt(user.workinghours)
        };

        try {
            await addUser(userWithNumbers);
            alert('User has been added');
        } catch (error) {
            console.error('Error while adding a user:', error);
            alert('Failed to add a user');
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <section className='bg-red-200'>
            <div className=" mx-auto w-[80%] p-10 mt-[2%]">
                <h1 className="text-2xl font-bold mb-4">Add User</h1>
                <form onSubmit={handleSubmit} className=''>
                    {/* Input fields for user details */}
                    <div className='grid grid-cols-2 gap-4 '>


                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input type="text" id="name" name="name" value={user.name} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="designation" className="block text-gray-700">Designation</label>
                            <input type="text" id="designation" name="designation" value={user.designation} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lineancytimeMinutes" className="block text-gray-700">Lineancy Time (Minutes)</label>
                            <input type="number" id="lineancytimeMinutes" name="lineancytimeMinutes" value={user.lineancytimeMinutes} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700">Role</label>
                            <input type="text" id="role" name="role" value={user.role} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="days" className="block text-gray-700">Days</label>
                            <input type="text" id="days" name="days" value={Array.isArray(user.days) ? user.days.join(',') : user.days} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="arrivaltimeHours" className="block text-gray-700">Arrival Time (Hours)</label>
                            <input type="number" id="arrivaltimeHours" name="arrivaltimeHours" value={user.arrivaltimeHours} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="arrivaltimeMinutes" className="block text-gray-700">Arrival Time (Minutes)</label>
                            <input type="number" id="arrivaltimeMinutes" name="arrivaltimeMinutes" value={user.arrivaltimeMinutes} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="workinghours" className="block text-gray-700">Working Hours</label>
                            <input type="number" id="workinghours" name="workinghours" value={user.workinghours} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300  shadow-sm outline-none bg-slate-100 py-3" />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center items-center">
                        <button type="submit" className="text-center bg-purple-700 text-white py-3 px-20 hover:bg-purple-600">Add</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Create