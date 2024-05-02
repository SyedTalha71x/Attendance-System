import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Context from '../Context/Context';

const ReportGenerator = () => {

    const context = useContext(Context);
    const { BASE_URL } = context;
    const [days, setDays] = useState(0);
    const [email, setEmail] = useState('');
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [chartKey, setChartKey] = useState(0);

    const generateReport = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/user/generatereport/${days}`, { email, days }, { headers: { 'Content-Type': 'application/json' } });
            setReport(response.data.report);
            setError(null);
            setChartKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error('Error generating report:', error.response.data.message);
            setReport(null);
            setError('Error generating report. Please try again.');
        }
    };

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }
    }, []);

    useEffect(() => {
        if (report) {
            const ctx = document.getElementById('myChart');
            const newChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Present Days', 'Absent Days'],
                    datasets: [{
                        data: [report.presentDays, report.absentDays],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    // Add any custom options here
                }
            });

            setChartInstance(newChartInstance);
        }
    }, [report]);

    return (
        <div className='mt-[4%] w-[70%] mx-auto'>
            <h2 className='text-3xl font-bold mb-4'>Generate Report</h2>
            <section className='grid grid-cols-2 gap-7'>
                <div className='bg-slate-100 p-6'>
                    <div className='m-3'>
                        <label>
                            Days
                            <input className='py-2 px-12 ml-2 bg-gray-200 outline-none mt-2' type="number" value={days} onChange={(e) => setDays(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className='m-2'>
                            Email
                            <input className='py-2 px-12 ml-2 bg-gray-200 outline-none mt-2' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <button onClick={generateReport} className='bg-purple-700 text-white py-2 px-[85px] mt-6 m-[54px]'>Generate Report</button>
                    {error && <p>{error}</p>}
                </div>
                <div>
                    <div>
                        <canvas key={chartKey} id="myChart" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReportGenerator;
