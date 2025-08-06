import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FiUsers, FiKey, FiShield } from 'react-icons/fi';

export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href={route('admin.users')} className="bg-white/60 backdrop-blur-lg border border-gray-200/70 overflow-hidden shadow-2xl sm:rounded-lg p-8 text-center hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                            <FiUsers className="text-5xl text-indigo-500 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900">Manage Users</h3>
                        </Link>
                        <Link href={route('admin.roles')} className="bg-white/60 backdrop-blur-lg border border-gray-200/70 overflow-hidden shadow-2xl sm:rounded-lg p-8 text-center hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                            <FiKey className="text-5xl text-indigo-500 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900">Manage Roles</h3>
                        </Link>
                        <Link href={route('admin.permissions')} className="bg-white/60 backdrop-blur-lg border border-gray-200/70 overflow-hidden shadow-2xl sm:rounded-lg p-8 text-center hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                            <FiShield className="text-5xl text-indigo-500 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900">Manage Permissions</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
