import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function DashboardHeader() {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#024635',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('logout'));
            }
        });
    };

    return (
        <header className="flex items-center justify-between mb-6 sticky top-0 bg-[#D9D9D9]">
            <div>
                <h1 className="text-3xl font-semibold text-gray-800">Welcome</h1>
                <p>Always stay calm, serve kindly</p>
            </div>

            <form action="">
                <input type="text" placeholder="Search menu..." className="px-20 py-6 text-sm border border-gray-300 rounded-2xl"/>
            </form>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                <div className="relative ms-3">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <img src="/services-resources/services-cover.png" alt="" className="rounded-full size-20"/>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent px-20 py-6 text-2xl font-medium leading-4 text-[#024635] transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    <div>
                                        {user.name}
                                        <p className="text-sm mt-2">Manager</p>
                                    </div>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <button
                                className="w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(
                            (previousState) => !previousState,
                        )
                    }
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className={
                                !showingNavigationDropdown
                                    ? 'inline-flex'
                                    : 'hidden'
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={
                                showingNavigationDropdown
                                    ? 'inline-flex'
                                    : 'hidden'
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="border-t border-gray-200 pb-1 pt-4">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>
                        <button
                            className="w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}