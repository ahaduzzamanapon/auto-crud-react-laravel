import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Sidebar = () => {
    const { auth } = usePage().props;
    const user = auth.user;
    console.log(user.permissions);
    
    const currentRoute = route().current();

    const [openMenus, setOpenMenus] = useState({});

    // Effect to open parent menus if a child is active
    useEffect(() => {
        const newOpenMenus = { ...openMenus };

        // Check Admin Panel children
        if (currentRoute.startsWith('admin.')) {
            newOpenMenus.admin = true;
        }

        setOpenMenus(newOpenMenus);
    }, [currentRoute]); // Re-run when route changes

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const isActive = (href) => {
        if (currentRoute === href) {
            return true;
        }
        return currentRoute.startsWith(href + '.');
    };

    const isParentActive = (prefix) => {
        return currentRoute.startsWith(prefix + '.');
    };

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
                            className={`flex items-center justify-between w-full py-2 px-4 rounded-lg transition duration-200 ${openMenus.admin || isParentActive('admin') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        >
                            Admin Panel
                            <svg className={`w-4 h-4 transition-transform ${openMenus.admin || isParentActive('admin') ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {openMenus.admin && (
                            <div className="ml-4 mt-2 space-y-2">
                                {user.permissions && user.permissions.includes('manage-users') && (
                                    <Link
                                        href={route('admin.users')}
                                        className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('admin.users') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                    >
                                        Manage Users
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-roles') && (
                                    <Link
                                        href={route('admin.roles')}
                                        className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('admin.roles') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                    >
                                        Manage Roles
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-permissions') && (
                                    <Link
                                        href={route('admin.permissions')}
                                        className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive('admin.permissions') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                    >
                                        Manage Permissions
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                     )}

{user.permissions && user.permissions.includes('category_view') && (
                    <Link
                        href={route('category.index')}
                        className={`flex items-center py-2 px-4 rounded-lg transition duration-200 mt-2 ${isActive('category.index') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        Category
                    </Link>
                )}
               
            </nav>
        </div>
    );
};

export default Sidebar;