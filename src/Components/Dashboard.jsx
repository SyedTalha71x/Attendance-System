import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/Context'
import CountUp from 'react-countup';
import ApexCharts from 'apexcharts';
import axios from 'axios';


const Dashboard = () => {
    const [count, setCount] = useState(0);
    const [days, setdays] = useState(0);
    const [report, setReport] = useState([]);
    const [chartKey, setChartKey] = useState(0);
    const context = useContext(Context);
    const { BASE_URL } = context;
    const chartRef = useRef(null);
    const MAX_COUNT = count;
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'
    }

    const fetchreports = async () => {
        const url = `${BASE_URL}/api/user/weeklyReport/${days}`
        try {
            const response = await axios.get(url, { days });
            setReport(response.data.dailyReports);
            console.log(response.data)
            setChartKey((prev) => prev + 1);
        }
        catch (error) {
            console.log("Error while fetching Reports")
        }
    }

    useEffect(() => {
        const options = {
            colors: ["#1A56DB", "#FDBA8C"],
            chart: {
                type: "bar",
                height: "320px",
                fontFamily: "Inter, sans-serif",
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "70%",
                    borderRadiusApplication: "end",
                    borderRadius: 8,
                },
            },
            tooltip: {
                shared: true,
                intersect: false,
                style: {
                    fontFamily: "Inter, sans-serif",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: "darken",
                        value: 1,
                    },
                },
            },
            stroke: {
                show: true,
                width: 0,
                colors: ["transparent"],
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -14
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            xaxis: {
                floating: false,
                labels: {
                    show: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                    }
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
        };

        if (report.length > 0 && chartRef.current) {
            options.series = [
                {
                    name: 'Present Users',
                    data: report.map((item) => ({ x: item.date, y: item.presentUsers })),
                },
                {
                    name: 'Absent Users',
                    data: report.map((item) => ({ x: item.date, y: item.absentUsers })),
                },
            ];

            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [report, chartKey]);


    useEffect(() => {
        const fetchCount = async () => {
            try {
                const url = `${BASE_URL}/api/user/getallUsers`
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch count data');
                }
                const data = await response.json();
                setCount(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCount();

        const interval = setInterval(fetchCount, 1000); // Update count every second
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-purple-950 shadow-xl border-b border-slate-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 sm:hidden hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/" className="flex ms-2 md:me-24 text-yellow-400">
                                <img src="https://cdn-icons-png.flaticon.com/512/8999/8999099.png" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Attendance System</span>
                            </Link>
                        </div>
                        <div>
                            {localStorage.getItem('token') ?
                                <button onClick={logout} className='bg-blue-900 text-white py-2 px-8 text-center rounded-md'>Logout</button>
                                : <Link to={"/Login"}>
                                    <button className='bg-blue-900 text-white py-2 px-8 text-center rounded-md'>Login</button>
                                </Link>}
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full text-white bg-purple-950 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto text-white bg-purple-950 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/" className="flex items-center p-2 text-white dark:text-white hover:bg-yellow-400  group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Create" className="flex items-center p-2 text-white dark:text-white hover:bg-yellow-400  group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Add a User</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Userlist" className="flex items-center p-2 text-white dark:text-white hover:bg-yellow-400  group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Report" className="flex items-center p-2 text-white dark:text-white hover:bg-yellow-400  group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Report</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Attendance" className="flex items-center p-2 text-white dark:text-white hover:bg-yellow-400  group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Attendance</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-6 sm:ml-64 bg-slate-400">
                <div className="p-4 border-2 border-gray-200 border-dashed dark:border-gray-700 mt-14">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center font-bold justify-center flex-col h-36 rounded bg-blue-900">
                            <p className="text-2xl text-white">
                                Total Employees
                            </p>
                            <div className='mt-2 text-2xl text-yellow-400'>
                                <CountUp end={count} duration={1} />
                            </div>
                        </div>
                        <div className="flex items-center font-bold justify-center flex-col h-36 rounded bg-blue-900">
                            <p className="text-2xl text-white">
                                Total Clients
                            </p>
                            <div className='mt-2 text-2xl text-yellow-400'>
                                <CountUp end={20} duration={1} />
                            </div>
                        </div>
                        <div className="flex items-center font-bold justify-center flex-col h-36 rounded bg-blue-900">
                            <p className="text-2xl text-white">
                                Total Income
                            </p>
                            <div className='mt-2 text-2xl text-yellow-400'>
                                <CountUp end={2000} duration={1} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-center mb-2 mt-2'>
                        <div>
                            <input type="text" value={days} onChange={(e) => { setdays(e.target.value) }} placeholder='Enter Days' className='bg-slate-100 py-3 px-10 p-2 outline-none' />
                            <div className='mt-2'>
                                <button onClick={fetchreports} className='bg-purple-600 w-full text-white py-2 px-10'>Report</button>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-full w-full bg-white shadow dark:bg-gray-800 p-4 md:p-6">
                        <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                                        <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                                        <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="leading-none text-2xl font-bold text-black  pb-1">Overall Report</h5>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Leads generated per week</p>
                                </div>
                            </div>
                            <div>
                                <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                    </svg>
                                    42.5%
                                </span>
                            </div>
                        </div>

                        <div id="column-chart" ref={chartRef}></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
