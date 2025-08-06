import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FiUserPlus, FiEdit, FiTrash2, FiKey } from 'react-icons/fi';

export default function UserManagement({ auth, users, roles }) {
    const assignRole = (userId, roleId) => {
        Inertia.post(route('admin.users.assignRole'), { userId, roleId });
    };

    const removeRole = (userId, roleId) => {
        Inertia.post(route('admin.users.removeRole'), { userId, roleId });
    };

    const deleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            Inertia.delete(route('admin.users.destroy', userId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-6">
                        <Link href={route('admin.users.create')} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150 shadow-lg">
                            <FiUserPlus className="-ml-1 mr-2 h-4 w-4" />
                            Add User
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {users.map((user) => (
                            <div key={user.id} className="bg-white/60 backdrop-blur-lg border border-gray-200/70 rounded-lg shadow-2xl p-6 transform hover:-translate-y-2 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                                    <div className="flex items-center space-x-3">
                                        <Link href={route('admin.users.edit', user.id)} className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                                            <FiEdit className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => deleteUser(user.id)} className="text-gray-500 hover:text-red-600 transition-colors duration-200">
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{user.email}</p>
                                <div className="border-t border-gray-200/70 pt-4">
                                    <h4 className="text-md font-medium text-gray-700 mb-3">Roles</h4>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {user.roles.map((role) => (
                                            <span key={role.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {role.name}
                                                <button onClick={() => removeRole(user.id, role.id)} className="ml-2 text-indigo-500 hover:text-indigo-700">x</button>
                                            </span>
                                        ))}
                                    </div>
                                    <select onChange={(e) => assignRole(user.id, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 bg-white/80">
                                        <option value="">Assign Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
