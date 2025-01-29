import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        <header className="flex items-center justify-between mb-6 sticky top-0 bg-[#D9D9D9] p-4 lg:p-6">
            <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Welcome</h1>
                <p className="text-sm lg:text-base">Always stay calm, serve kindly</p>
            </div>

            <form className="hidden lg:block">
                <input type="text" placeholder="Search menu..." className="px-4 lg:px-6 py-2 lg:py-3 text-sm border border-gray-300 rounded-2xl"/>
            </form>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                <div className="relative ms-3">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <img src="/services-resources/services-cover.png" alt="" className="rounded-full w-8 h-8 lg:w-10 lg:h-10"/>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium leading-4 text-[#024635] transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    <div>
                                        {user.name}
                                        <p className="text-xs lg:text-sm mt-1 lg:mt-2">Manager</p>
                                    </div>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route('register')}>
                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                Register an Account
                            </Dropdown.Link>
                            <button
                                className="w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Log Out
                            </button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

           

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
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
                        <ResponsiveNavLink href={route('register')}>
                            Register
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

            <div className="-me-2 flex items-center sm:hidden absolute top-0 right-0 mt-1 mr-1">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(
                            (previousState) => !previousState,
                        )
                    }
                    className="inline-flex items-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
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
        </header>
    );
}