import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/Sidebar';
import { FiUser, FiLogOut } from 'react-icons/fi';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, settings } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const headerStyle = {
        backgroundColor: settings.admin_header_color || '#ffffff',
        color: settings.admin_header_text_color || '#333333',
        fontFamily: settings.font_family || 'Inter',
    };

    return (
        <div className="min-h-screen bg-gray-100 flex text-sm" style={{ fontFamily: settings.font_family || 'Inter' }}>
            <Sidebar />

            <div className="flex-1 flex flex-col md:ml-48 min-w-0">
                <nav className="bg-white shadow-sm border-b border-gray-200 py-2 z-20">
                    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-end h-12">
                            <div className="hidden sm:flex sm:items-center sm:ms-3">
                                <div className="relative ms-1">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md shadow-sm">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-0.5 -me-0.5 h-2.5 w-2.5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>
                                                <FiUser className="inline-block mr-1" />
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                <FiLogOut className="inline-block mr-1" />
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-0.5 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-0.5 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-800 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-4 w-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-0.5 pb-0.5 space-y-0.5">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            {user.permissions && user.permissions.includes('crud-builder-access') && (
                                <ResponsiveNavLink href={route('crud.builder')} active={route().current('crud.builder')}>
                                    CRUD Builder
                                </ResponsiveNavLink>
                            )}
                            {user.permissions && (user.permissions.includes('manage-users') || user.permissions.includes('manage-roles') || user.permissions.includes('manage-permissions')) && (
                                <ResponsiveNavLink href={route('admin.index')} active={route().current('admin.index')}>
                                    Admin Panel
                                </ResponsiveNavLink>
                            )}
                        </div>

                        <div className="pt-2 pb-1 border-t border-gray-200">
                            <div className="px-2">
                                <div className="font-medium text-sm text-gray-800">{user.name}</div>
                                <div className="font-medium text-xs text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-2 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow-sm py-3" style={headerStyle}>
                        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 p-3">
                    {children}
                </main>
            </div>
        </div>
    );
}