import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FiShield } from 'react-icons/fi';

export default function PermissionManagement({ auth, permissions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permission Management</h2>}
        >
            <Head title="Permission Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/60 backdrop-blur-lg border border-gray-200/70 overflow-hidden shadow-2xl sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Permissions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {permissions.map((permission) => (
                                    <div key={permission.id} className="bg-white/70 backdrop-blur-lg border border-gray-200/80 rounded-lg shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-center mb-4">
                                            <FiShield className="h-6 w-6 text-indigo-500 mr-3" />
                                            <h4 className="text-lg font-semibold text-gray-800">{permission.name}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600">Guard: {permission.guard_name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
