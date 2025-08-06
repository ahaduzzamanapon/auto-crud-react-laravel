import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiUsers, FiUserPlus, FiKey, FiLock } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: '#4f46e5',
                borderColor: '#4f46e5',
                borderWidth: 1,
                borderRadius: 5,
                barThickness: 15,
            },
        ],
    };

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'User' },
        { id: 4, name: 'Jessica Brown', email: 'jessica@example.com', role: 'Editor' },
        { id: 5, name: 'Michael Johnson', email: 'michael@example.com', role: 'User' },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-lg p-5 shadow-md flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">1,234</p>
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FiUsers className="text-xl text-indigo-600" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-md flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">New Users</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">56</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FiUserPlus className="text-xl text-green-600" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-md flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Roles</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">3</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <FiKey className="text-xl text-yellow-600" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-md flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Permissions</h3>
                                <p className="mt-1 text-2xl font-bold text-gray-900">12</p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-full">
                                <FiLock className="text-xl text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-5">
                            <h3 className="text-md font-semibold text-gray-800 mb-4">User Registrations</h3>
                            <div style={{ height: '280px' }}>
                                <Bar data={chartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { drawBorder: false } }, x: { grid: { display: false } } }, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-5">
                            <h3 className="text-md font-semibold text-gray-800 mb-4">Recent Users</h3>
                            <ul className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <li key={user.id} className="py-3 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img className="h-9 w-9 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} alt={user.name} />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.role}</p>
                                            </div>
                                        </div>
                                        <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
