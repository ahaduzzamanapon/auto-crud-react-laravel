import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FiHome, FiSettings, FiUsers, FiKey, FiTool, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
        background: `linear-gradient(180deg, ${settings.sidebar_color_start || '#0c0f1a'} 0%, ${settings.sidebar_color_end || '#131a2e'} 100%)`,
        color: settings.sidebar_text_color || '#e5e7eb',
        fontFamily: settings.font_family || 'Inter, sans-serif',
    };

    const linkStyle = (href) => `flex items-center py-3 px-4 rounded-xl transition-all duration-300 ${isActive(href) ? 'bg-indigo-600 text-white font-semibold shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`;

    return (
        <div className={`fixed inset-y-0 left-0 flex flex-col h-full ${open ? 'w-64' : 'w-20'} space-y-4 py-4 px-3 bg-gray-900 text-white transition-all duration-300 ease-in-out z-40 shadow-2xl`} style={sidebarStyle}>
            <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
                <Link href="/" className={`flex items-center transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={`ml-2 text-2xl font-bold`}>{settings.app_name || 'Gemini CRUD'}</span>
                </Link>
                <button onClick={() => setOpen(!open)} className="p-2 rounded-full text-gray-400 hover:bg-white/10 transition-all duration-300">
                    {open ? <FiChevronLeft className="h-6 w-6" /> : <FiChevronRight className="h-6 w-6" />}
                </button>
            </div>

            <nav className="flex-1 space-y-2 px-2">
                <Link href={route('dashboard')} className={linkStyle('dashboard')}>
                    <FiHome className="h-6 w-6" />
                    <span className={`ml-4 transition-opacity duration-300 ${!open && 'hidden'}`}>Dashboard</span>
                </Link>

                {user.permissions?.includes('crud-builder-access') && (
                    <Link href={route('crud.builder')} className={linkStyle('crud.builder')}>
                        <FiTool className="h-6 w-6" />
                        <span className={`ml-4 transition-opacity duration-300 ${!open && 'hidden'}`}>CRUD Builder</span>
                    </Link>
                )}

                {(user.permissions?.includes('manage-users') || user.permissions?.includes('manage-roles') || user.permissions?.includes('manage-permissions')) && (
                    <div>
                        <button onClick={() => toggleMenu('admin')} className={`flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300 ${isParentActive('admin') ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                            <div className="flex items-center">
                                <FiSettings className="h-6 w-6" />
                                <span className={`ml-4 transition-opacity duration-300 ${!open && 'hidden'}`}>Admin Panel</span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${openMenus.admin ? 'rotate-90' : ''} ${!open && 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {open && openMenus.admin && (
                            <div className="ml-6 mt-2 space-y-2 border-l-2 border-white/10 pl-4">
                                {user.permissions?.includes('manage-users') && (
                                    <Link href={route('admin.users')} className={linkStyle('admin.users')}>
                                        <FiUsers className="h-5 w-5" />
                                        <span className={`ml-3 transition-opacity duration-300 ${!open && 'hidden'}`}>Manage Users</span>
                                    </Link>
                                )}
                                {user.permissions?.includes('manage-roles') && (
                                    <Link href={route('admin.roles')} className={linkStyle('admin.roles')}>
                                        <FiKey className="h-5 w-5" />
                                        <span className={`ml-3 transition-opacity duration-300 ${!open && 'hidden'}`}>Manage Roles</span>
                                    </Link>
                                )}
                                {user.permissions?.includes('manage-permissions') && (
                                    <Link href={route('admin.permissions')} className={linkStyle('admin.permissions')}>
                                        <FiKey className="h-5 w-5" />
                                        <span className={`ml-3 transition-opacity duration-300 ${!open && 'hidden'}`}>Manage Permissions</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <div className={`px-2 transition-opacity duration-300 ${!open && 'opacity-0'}`}>
                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center">
                        <img className="h-12 w-12 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} alt={user.name} />
                        <div className={`ml-4 transition-opacity duration-300 ${!open && 'hidden'}`}>
                            <p className="text-base font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center justify-center mt-4 py-2.5 px-4 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <FiLogOut className="mr-3" />
                        <span className={`transition-opacity duration-300 ${!open && 'hidden'}`}>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
