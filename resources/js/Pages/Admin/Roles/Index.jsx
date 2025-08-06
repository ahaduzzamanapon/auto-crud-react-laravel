import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiKey } from 'react-icons/fi';

export default function RoleManagement({ auth, roles, permissions }) {
    const [rolePermissions, setRolePermissions] = useState(() => {
        const initialPermissions = {};
        roles.forEach(role => {
            initialPermissions[role.id] = role.permissions.map(p => p.id);
        });
        return initialPermissions;
    });

    const handlePermissionChange = (roleId, permissionId) => {
        setRolePermissions(prev => {
            const currentPermissions = prev[roleId] || [];
            if (currentPermissions.includes(permissionId)) {
                return {
                    ...prev,
                    [roleId]: currentPermissions.filter(id => id !== permissionId)
                };
            } else {
                return {
                    ...prev,
                    [roleId]: [...currentPermissions, permissionId]
                };
            }
        });
    };

    const saveRolePermissions = (roleId) => {
        Inertia.post(route('admin.roles.syncPermissions'), {
            roleId,
            permissions: rolePermissions[roleId] || []
        });
    };

    const deleteRole = (role) => {
        if (confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
            Inertia.delete(route('admin.roles.destroy', role.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Role Management</h2>}
        >
            <Head title="Role Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-6">
                        <Link href={route('admin.roles.create')} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150 shadow-lg">
                            <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                            Add Role
                        </Link>
                    </div>
                    <div className="space-y-8">
                        {roles.map((role) => (
                            <div key={role.id} className="bg-white/60 backdrop-blur-lg border border-gray-200/70 overflow-hidden shadow-2xl sm:rounded-lg transform hover:-translate-y-2 transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <FiKey className="h-6 w-6 text-indigo-500 mr-3" />
                                            <h4 className="text-xl font-semibold text-gray-800">{role.name}</h4>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Link href={route('admin.roles.edit', role.id)} className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                                                <FiEdit className="h-5 w-5" />
                                            </Link>
                                            <button onClick={() => deleteRole(role)} className="text-gray-500 hover:text-red-600 transition-colors duration-200">
                                                <FiTrash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200/70 pt-4">
                                        <h5 className="text-md font-medium text-gray-700 mb-3">Permissions</h5>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                            {permissions.map((permission) => (
                                                <label key={permission.id} className="flex items-center space-x-3 bg-white/70 p-3 rounded-md hover:bg-white/90 transition-colors duration-200 cursor-pointer shadow-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={(rolePermissions[role.id] || []).includes(permission.id)}
                                                        onChange={() => handlePermissionChange(role.id, permission.id)}
                                                        className="rounded h-4 w-4 border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    />
                                                    <span className="text-sm font-medium text-gray-800">{permission.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 text-right">
                                        <button
                                            onClick={() => saveRolePermissions(role.id)}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150 shadow-lg"
                                        >
                                            <FiSave className="-ml-1 mr-2 h-4 w-4" />
                                            Save Permissions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
