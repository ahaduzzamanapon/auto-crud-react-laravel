import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FiHome, FiSettings, FiUsers, FiKey, FiBarChart2, FiTool } from 'react-icons/fi';

const Sidebar = () => {
    const { auth, settings } = usePage().props;
    const user = auth.user;
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

    const sidebarStyle = {
        backgroundColor: settings.sidebar_color || '#111827',
        color: settings.sidebar_text_color || '#f9fafb',
        fontFamily: settings.font_family || 'Inter',
    };

    const linkStyle = (href) => `flex items-center py-2.5 px-4 rounded-lg transition duration-200 ${isActive(href) ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

    return (
        <div className="flex flex-col h-full w-52 space-y-3 py-4 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-300 ease-in-out border-r border-gray-800 z-30" style={sidebarStyle}>
            <div className="flex items-center px-4">
                <Link href="/">
                    <ApplicationLogo className="block h-8 w-auto fill-current text-white" />
                </Link>
                <span className="ml-2 text-lg font-bold" style={{ color: settings.sidebar_text_color || '#f9fafb' }}>{settings.app_name || 'Gemini CRUD'}</span>
            </div>

            <nav className="flex-1 space-y-2">
                <Link
                    href={route('dashboard')}
                    className={linkStyle('dashboard')}
                >
                    <FiHome className="mr-3" />
                    Dashboard
                </Link>

                {user.permissions && user.permissions.includes('crud-builder-access') && (
                    <Link
                        href={route('crud.builder')}
                        className={linkStyle('crud.builder')}
                    >
                        <FiTool className="mr-3" />
                        CRUD Builder
                    </Link>
                )}

                {user.permissions && (user.permissions.includes('manage-users') || user.permissions.includes('manage-roles') || user.permissions.includes('manage-permissions')) && (
                    <div className="mt-1">
                        <button
                            onClick={() => toggleMenu('admin')}
                            className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg transition duration-200 ${openMenus.admin || isParentActive('admin') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        >
                            <div className="flex items-center">
                                <FiSettings className="mr-3" />
                                Admin Panel
                            </div>
                            <svg className={`w-3 h-3 transition-transform ${openMenus.admin || isParentActive('admin') ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {openMenus.admin && (
                            <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-600 pl-4">
                                {user.permissions && user.permissions.includes('manage-users') && (
                                    <Link
                                        href={route('admin.users')}
                                        className={linkStyle('admin.users')}
                                    >
                                        <FiUsers className="mr-3" />
                                        Manage Users
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-roles') && (
                                    <Link
                                        href={route('admin.roles')}
                                        className={linkStyle('admin.roles')}
                                    >
                                        <FiKey className="mr-3" />
                                        Manage Roles
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-permissions') && (
                                    <Link
                                        href={route('admin.permissions')}
                                        className={linkStyle('admin.permissions')}
                                    >
                                        <FiKey className="mr-3" />
                                        Manage Permissions
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                     )}

    </nav>
        </div>
    );
};

export default Sidebar;