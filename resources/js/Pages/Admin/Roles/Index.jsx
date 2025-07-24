import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function RoleManagement({ auth, roles, permissions }) {
    const { post } = useForm();

    const givePermission = (roleId, permissionId) => {
        post(route('admin.roles.givePermission'), { roleId, permissionId });
    };

    const revokePermission = (roleId, permissionId) => {
        post(route('admin.roles.revokePermission'), { roleId, permissionId });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Role Management</h2>}
        >
            <Head title="Role Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Roles</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {role.permissions.map((permission) => (
                                                    <span key={permission.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                                        {permission.name}
                                                        <button onClick={() => revokePermission(role.id, permission.id)} className="ml-1 text-green-500 hover:text-green-700">x</button>
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select onChange={(e) => givePermission(role.id, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                                    <option value="">Give Permission</option>
                                                    {permissions.map((permission) => (
                                                        <option key={permission.id} value={permission.id}>{permission.name}</option>
                                                    ))}
                                                </select>
                                            </td>
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
