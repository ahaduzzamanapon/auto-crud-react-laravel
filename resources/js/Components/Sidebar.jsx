import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FiHome, FiSettings, FiUsers, FiKey, FiTool, FiLogOut, FiChevronLeft } from 'react-icons/fi';

const Sidebar = ({ open, setOpen }) => {
    const { auth, settings } = usePage().props;
    const user = auth.user;
    const currentRoute = route().current();

    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const newOpenMenus = { ...openMenus };
        if (currentRoute.startsWith('admin.')) {
            newOpenMenus.admin = true;
        }
        setOpenMenus(newOpenMenus);
    }, [currentRoute]);

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const isActive = (href) => {
        return currentRoute.startsWith(href);
    };

    const isParentActive = (prefix) => {
        return currentRoute.startsWith(prefix);
    };

    const sidebarStyle = {
        background: `linear-gradient(180deg, ${settings.sidebar_color_start || '#111827'} 0%, ${settings.sidebar_color_end || '#1f2937'} 100%)`,
        color: settings.sidebar_text_color || '#f9fafb',
        fontFamily: settings.font_family || 'Inter',
    };

    const linkStyle = (href) => `flex items-center py-2.5 px-4 rounded-lg transition-all duration-300 ${isActive(href) ? 'bg-white/10 text-white shadow-lg backdrop-blur-lg border border-white/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`;

    return (
        <div className={`flex flex-col h-full ${open ? 'w-60' : 'w-20'} space-y-4 py-4 px-3 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out z-40`} style={sidebarStyle}>
            <div className="flex items-center justify-between px-4">
                <Link href="/" className={`flex items-center ${!open && 'hidden'}`}>
                    <span className={`ml-3 text-xl font-bold ${!open && 'hidden'}`} style={{ color: settings.sidebar_text_color || '#f9fafb' }}>{settings.app_name || 'Gemini CRUD'}</span>
                </Link>
                <button onClick={() => setOpen(!open)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
                    <FiChevronLeft className={`h-6 w-6 transition-transform duration-300 ${!open && 'rotate-180'}`} />
                </button>
            </div>

            <nav className="flex-1 space-y-2 px-1">
                <Link href={route('dashboard')} className={linkStyle('dashboard')}>
                    <FiHome className="mr-3 h-6 w-6" />
                    <span className={!open && 'hidden'}>Dashboard</span>
                </Link>

                {user.permissions?.includes('crud-builder-access') && (
                    <Link href={route('crud.builder')} className={linkStyle('crud.builder')}>
                        <FiTool className="mr-3 h-6 w-6" />
                        <span className={!open && 'hidden'}>CRUD Builder</span>
                    </Link>
                )}

                {(user.permissions?.includes('manage-users') || user.permissions?.includes('manage-roles') || user.permissions?.includes('manage-permissions')) && (
                    <div>
                        <button onClick={() => toggleMenu('admin')} className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg transition-all duration-300 ${isParentActive('admin') ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                            <div className="flex items-center">
                                <FiSettings className="mr-3 h-6 w-6" />
                                <span className={!open && 'hidden'}>Admin Panel</span>
                            </div>
                            <svg className={`w-3 h-3 transition-transform ${openMenus.admin ? 'rotate-90' : ''} ${!open && 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {open && openMenus.admin && (
                            <div className="ml-4 mt-2 space-y-2 border-l-2 border-white/10 pl-4">
                                {user.permissions?.includes('manage-users') && (
                                    <Link href={route('admin.users')} className={linkStyle('admin.users')}>
                                        <FiUsers className="mr-3 h-6 w-6" />
                                        <span className={!open && 'hidden'}>Manage Users</span>
                                    </Link>
                                )}
                                {user.permissions?.includes('manage-roles') && (
                                    <Link href={route('admin.roles')} className={linkStyle('admin.roles')}>
                                        <FiKey className="mr-3 h-6 w-6" />
                                        <span className={!open && 'hidden'}>Manage Roles</span>
                                    </Link>
                                )}
                                {user.permissions?.includes('manage-permissions') && (
                                    <Link href={route('admin.permissions')} className={linkStyle('admin.permissions')}>
                                        <FiKey className="mr-3 h-6 w-6" />
                                        <span className={!open && 'hidden'}>Manage Permissions</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <div className={`px-1 ${!open && 'hidden'}`}>
                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center justify-center mt-4 py-2 px-4 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <FiLogOut className="mr-2" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
