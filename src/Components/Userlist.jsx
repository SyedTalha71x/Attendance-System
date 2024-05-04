import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../Context/Context';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    const context = useContext(Context);
    const { BASE_URL } = context;

    useEffect(() => {
        const fetchData = async () => {
            const url = `${BASE_URL}/api/user/fetchall`
            try {
                const response = await axios.get(url);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[5%]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Designation
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Working Days
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lineancy Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Arrival Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Working Hours
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.name}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.designation || '-'}
                            </td>
                            <td className="px-6 py-4">
                                {user.role || '-'}
                            </td>
                            <td className="px-6 py-4">
                                {user.days.join(',') || '-'}
                            </td>
                            <td className="px-6 py-4">
                                {user.lineancytime && user.lineancytime.minutes ? user.lineancytime.minutes : '-'}
                            </td>
                            <td className="px-6 py-4">
                                {user.arrivaltime ? `${user.arrivaltime.hours}:${user.arrivaltime.minutes}` : '-'}
                            </td>
                            <td className="px-6 py-4">
                                {user.workinghours ? `${user.workinghours}` : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
