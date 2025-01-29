import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSignOutAlt, faUserPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ProfileHeader({ header, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <header className="bg-white shadow relative">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {header}
                    <button onClick={toggleMenu} className="text-gray-800 sm:hidden">
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                    <div className="hidden sm:flex space-x-6">
                        <Link href="/dashboard" className="text-yellow-800 hover:text-yellow-600 flex items-center">
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                            Dashboard
                        </Link>
                        <Link href="/register" className="text-green-800 hover:text-green-600 flex items-center">
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                            Register an Account
                        </Link>
                        <Link href="/logout" method="post" className="text-red-800 hover:text-red-600 flex items-center">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Log Out
                        </Link>
                    </div>
                </div>
                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute left-0 top-full w-full bg-white shadow-md sm:hidden flex flex-col">
                        <Link href="/dashboard" className="py-2 px-4 text-yellow-800 hover:bg-gray-100 text-center">
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                            Dashboard
                        </Link>
                        <Link href="/register" className="py-2 px-4 text-green-800 hover:bg-gray-100 text-center">
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                            Register an Account
                        </Link>
                        <Link href="/logout" method="post" className="py-2 px-4 text-red-800 hover:bg-gray-100 text-center">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Log Out
                        </Link>
                    </div>
                )}
            </header>
            <main>{children}</main>
        </div>
    );
}
