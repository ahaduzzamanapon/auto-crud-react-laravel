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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)',
        color: settings.sidebar_text_color || '#000000',
        fontFamily: settings.font_family || 'Inter',
    };

    const linkStyle = (href) => `flex items-center py-2 px-3 rounded-lg transition duration-200 ${isActive(href) ? 'bg-gray-200 text-gray-900 shadow-inner' : 'text-gray-700 hover:bg-gray-100'}`;

    return (
        <div className="flex flex-col h-full w-48 space-y-2 py-3 px-1.5 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out border-r border-gray-200 z-30" style={sidebarStyle}>
            <div className="flex items-center px-1.5">
                <Link href="/">
                    <ApplicationLogo className="block h-7 w-auto fill-current text-gray-800" />
                </Link>
                <span className="ml-1 text-sm font-bold" style={{ color: settings.sidebar_text_color || '#000000' }}>{settings.app_name || 'Gemini CRUD'}</span>
            </div>

            <nav>
                <Link
                    href={route('dashboard')}
                    className={linkStyle('dashboard')}
                >
                    <FiHome className="mr-2" />
                    Dashboard
                </Link>

                {user.permissions && user.permissions.includes('crud-builder-access') && (
                    <Link
                        href={route('crud.builder')}
                        className={linkStyle('crud.builder')}
                    >
                        <FiTool className="mr-2" />
                        CRUD Builder
                    </Link>
                )}

                {user.permissions && (user.permissions.includes('manage-users') || user.permissions.includes('manage-roles') || user.permissions.includes('manage-permissions')) && (
                    <div className="mt-0.5">
                        <button
                            onClick={() => toggleMenu('admin')}
                            className={`flex items-center justify-between w-full py-1.5 px-2 rounded-lg transition duration-200 ${openMenus.admin || isParentActive('admin') ? 'bg-gray-200 text-gray-900 shadow-inner' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <FiSettings className="mr-2" />
                            Admin Panel
                            <svg className={`w-2.5 h-2.5 transition-transform ${openMenus.admin || isParentActive('admin') ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {openMenus.admin && (
                            <div className="ml-1 mt-0.5 space-y-0.5">
                                {user.permissions && user.permissions.includes('manage-users') && (
                                    <Link
                                        href={route('admin.users')}
                                        className={linkStyle('admin.users')}
                                    >
                                        <FiUsers className="mr-2" />
                                        Manage Users
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-roles') && (
                                    <Link
                                        href={route('admin.roles')}
                                        className={linkStyle('admin.roles')}
                                    >
                                        <FiKey className="mr-2" />
                                        Manage Roles
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-permissions') && (
                                    <Link
                                        href={route('admin.permissions')}
                                        className={linkStyle('admin.permissions')}
                                    >
                                        <FiKey className="mr-2" />
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