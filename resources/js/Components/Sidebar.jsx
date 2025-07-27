import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

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
        backgroundColor: settings.sidebar_color || '#333333',
        color: settings.sidebar_text_color || '#ffffff',
        fontFamily: settings.font_family || 'Inter',
    };

    const linkStyle = (href) => `flex items-center py-2 px-4 rounded-lg transition duration-200 ${isActive(href) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

    return (
        <div className="flex flex-col h-full w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out" style={sidebarStyle}>
            <div className="flex items-center px-4">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-200" />
                </Link>
                <span className="ml-3 text-xl font-semibold" style={{ color: settings.sidebar_text_color || '#ffffff' }}>{settings.app_name || 'Gemini CRUD'}</span>
            </div>

            <nav>
                <Link
                    href={route('dashboard')}
                    className={linkStyle('dashboard')}
                >
                    Dashboard
                </Link>

                {user.permissions && user.permissions.includes('crud-builder-access') && (
                    <Link
                        href={route('crud.builder')}
                        className={linkStyle('crud.builder')}
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
                                        className={linkStyle('admin.users')}
                                    >
                                        Manage Users
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-roles') && (
                                    <Link
                                        href={route('admin.roles')}
                                        className={linkStyle('admin.roles')}
                                    >
                                        Manage Roles
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-permissions') && (
                                    <Link
                                        href={route('admin.permissions')}
                                        className={linkStyle('admin.permissions')}
                                    >
                                        Manage Permissions
                                    </Link>
                                )}
                                {user.permissions && user.permissions.includes('manage-settings') && (
                                    <Link
                                        href={route('admin.settings.index')}
                                        className={linkStyle('admin.settings.index')}
                                    >
                                        Settings
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