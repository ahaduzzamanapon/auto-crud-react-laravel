import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FiHome, FiSettings, FiUsers, FiKey, FiTool, FiLogOut, FiChevronLeft, FiChevronRight,FiCircle } from 'react-icons/fi';

const Sidebar = ({ open, setOpen }) => {
    const { auth, settings } = usePage().props;
    const user = auth.user;
    const currentRoute = route().current();

    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const newOpenMenus = {};
        if (currentRoute.startsWith('admin.')) {
            newOpenMenus.admin = true;
        }
        setOpenMenus(newOpenMenus);
    }, [currentRoute]);

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const isActive = (href) => currentRoute.startsWith(href);
    const isParentActive = (prefix) => currentRoute.startsWith(prefix);

    const sidebarStyle = {
        background: settings.sidebar_color || '#111827',
        color: settings.sidebar_text_color || '#e5e7eb',
        fontFamily: settings.font_family || 'Inter, sans-serif',
    };

    const linkStyle = (href) => `flex items-center py-2 px-3 rounded-md transition-all duration-200 ${isActive(href) ? 'bg-indigo-600 text-white font-medium' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`;

    return (
        <div className={`fixed inset-y-0 left-0 flex flex-col h-full ${open ? 'w-56' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out z-40 shadow-xl`} style={sidebarStyle}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                <Link href="/" className={`flex items-center transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <span className="text-lg font-bold">{settings.app_name || 'Gemini CRUD'}</span>
                </Link>
                <button onClick={() => setOpen(!open)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 transition-colors duration-200">
                    {open ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
                </button>
            </div>

            <nav className="flex-1 space-y-1 px-2 py-4">
                <Link href={route('dashboard')} className={linkStyle('dashboard')}>
                    <FiHome className="h-5 w-5" />
                    <span className={`ml-3 transition-opacity duration-200 ${!open && 'hidden'}`}>Dashboard</span>
                </Link>

                {user.permissions?.includes('crud-builder-access') && (
                    <Link href={route('crud.builder')} className={linkStyle('crud.builder')}>
                        <FiTool className="h-5 w-5" />
                        <span className={`ml-3 transition-opacity duration-200 ${!open && 'hidden'}`}>CRUD Builder</span>
                    </Link>
                )}

                {(user.permissions?.includes('manage-users') || user.permissions?.includes('manage-roles') || user.permissions?.includes('manage-permissions')) && (
                    <div>
                        <button onClick={() => toggleMenu('admin')} className={`flex items-center justify-between w-full py-2 px-3 rounded-md transition-all duration-200 ${isParentActive('admin') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
                            <div className="flex items-center">
                                <FiSettings className="h-5 w-5" />
                                <span className={`ml-3 transition-opacity duration-200 ${!open && 'hidden'}`}>Admin Panel</span>
                            </div>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${openMenus.admin ? 'rotate-90' : ''} ${!open && 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        {open && openMenus.admin && (
                            <div className="mt-2 space-y-1 pl-5 border-l-2 border-gray-600">
                                {user.permissions?.includes('manage-users') && (
                                    <Link href={route('admin.users')} className={linkStyle('admin.users')}>
                                        <FiUsers className="h-5 w-5" />
                                        <span className={`ml-3 transition-opacity duration-200 ${!open && 'hidden'}`}>Users</span>
                                    </Link>
                                )}
                                {user.permissions?.includes('manage-roles') && (
                                    <Link href={route('admin.roles')} className={linkStyle('admin.roles')}>
                                        <FiKey className="h-5 w-5" />
                                        <span className={`ml-3 transition-opacity duration-200 ${!open && 'hidden'}`}>Roles</span>
                                    </Link>
                                )}
                                {user.permissions?.includes('manage-permissions') && (
                                    <Link href={route('admin.permissions')} className={linkStyle('admin.permissions')}>
                                        <FiKey className="h-5 w-5" />
                                        <span className={`ml-3 transition-opacity duration-200 ${!open && 'hidden'}`}>Permissions</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <div className={`px-2 pb-2 transition-opacity duration-200 ${!open && 'opacity-0 pointer-events-none'}`}>
                <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} alt={user.name} />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">Online</p>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center justify-center mt-4 py-2 px-3 rounded-md text-sm font-medium text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200">
                        <FiLogOut className="mr-2" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
