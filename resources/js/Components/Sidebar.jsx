import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Sidebar = () => {
    const { auth, crudModules } = usePage().props;
    console.log(crudModules);
    
    const user = auth.user;

    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const isActive = (href) => route().current(href);

    return (
        <div className="flex flex-col h-full bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out">
            <div className="flex items-center px-4">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-200" />
                </Link>
                <span className="ml-3 text-xl font-semibold">Gemini CRUD</span>
            </div>

            <nav>
                <Link
                    href={route('dashboard')}
                    className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('dashboard') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                    Dashboard
                </Link>

                {user.permissions && user.permissions.includes('crud-builder-access') && (
                    <Link
                        href={route('crud.builder')}
                        className={`flex items-center py-2 px-4 rounded-lg transition duration-200 mt-2 ${isActive('crud.builder') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        CRUD Builder
                    </Link>
                )}

                {user.permissions && (user.permissions.includes('manage-users') || user.permissions.includes('manage-roles') || user.permissions.includes('manage-permissions')) && (
                    <div className="mt-2">
                        <button
                            onClick={() => toggleMenu('admin')}
                            className={`flex items-center justify-between w-full py-2 px-4 rounded-lg transition duration-200 ${openMenus.admin ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        >
                            Admin Panel
                            <svg className={`w-4 h-4 transition-transform ${openMenus.admin ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {openMenus.admin && (
                            <div className="ml-4 mt-2 space-y-2">
                                <Link
                                    href={route('admin.users')}
                                    className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('admin.users') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                >
                                    Manage Users
                                </Link>
                                <Link
                                    href={route('admin.roles')}
                                    className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('admin.roles') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                >
                                    Manage Roles
                                </Link>
                                <Link
                                    href={route('admin.permissions')}
                                    className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('admin.permissions') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                >
                                    Manage Permissions
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {crudModules && crudModules.length > 0 && (
                    <div className="mt-2">
                        <button
                            onClick={() => toggleMenu('crud')}
                            className={`flex items-center justify-between w-full py-2 px-4 rounded-lg transition duration-200 ${openMenus.crud ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        >
                            CRUD Modules
                            <svg className={`w-4 h-4 transition-transform ${openMenus.crud ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {openMenus.crud && (
                            <div className="ml-4 mt-2 space-y-2">
                                {crudModules.map(module => (
                                    <Link
                                        key={module.routePrefix}
                                        href={route(`${module.routePrefix}.index`)}
                                        className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive(`${module.routePrefix}.index`) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                    >
                                        {module.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
