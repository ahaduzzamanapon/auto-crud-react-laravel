import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiUsers, FiUserPlus, FiKey, FiLock } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(79, 70, 229, 1)',
            },
        ],
    };

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'User' },
        { id: 4, name: 'Jessica Brown', email: 'jessica@example.com', role: 'Editor' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center space-x-4 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FiUsers className="text-2xl text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">1,234</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center space-x-4 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-green-100 p-3 rounded-full">
                                <FiUserPlus className="text-2xl text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">New Users (30 days)</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">56</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center space-x-4 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <FiKey className="text-2xl text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Roles</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">3</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center space-x-4 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-red-100 p-3 rounded-full">
                                <FiLock className="text-2xl text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Permissions</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900">User Registrations (Last 7 Months)</h3>
                            <div className="mt-4">
                                <Bar data={chartData} options={{ scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
                            <table className="mt-4 min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
