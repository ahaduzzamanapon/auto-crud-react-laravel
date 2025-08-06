import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
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
                        <div className="rounded-2xl bg-white p-4 shadow-neumorphic-light">
                            <h3 className="text-base font-medium text-gray-600">Total Users</h3>
                            <p className="mt-2 text-2xl font-bold text-black">1,234</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-neumorphic-light">
                            <h3 className="text-base font-medium text-gray-600">New Users (30 days)</h3>
                            <p className="mt-2 text-2xl font-bold text-black">56</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-neumorphic-light">
                            <h3 className="text-base font-medium text-gray-600">Total Roles</h3>
                            <p className="mt-2 text-2xl font-bold text-black">3</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-neumorphic-light">
                            <h3 className="text-base font-medium text-gray-600">Total Permissions</h3>
                            <p className="mt-2 text-2xl font-bold text-black">12</p>
                        </div>
                    </div>

                    <div className="mt-8 overflow-hidden bg-white/80 shadow-lg backdrop-blur-lg sm:rounded-2xl">
                        <div className="p-4">
                            <h3 className="text-base font-medium text-gray-800">User Registrations (Last 7 Months)</h3>
                            <div className="mt-4">
                                <Bar data={chartData} options={{ scales: { y: { ticks: { color: 'black' } }, x: { ticks: { color: 'black' } } } }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 overflow-hidden bg-white/80 shadow-lg backdrop-blur-lg sm:rounded-2xl">
                        <div className="p-4">
                            <h3 className="text-base font-medium text-gray-800">Recent Users</h3>
                            <table className="mt-4 min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-800">
                                            Name
                                        </th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-800">
                                            Email
                                        </th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-800">
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white/50">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-black">{user.name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-600">{user.email}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-600">{user.role}</td>
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
