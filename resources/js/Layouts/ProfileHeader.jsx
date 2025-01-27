import React from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function ProfileHeader({ header, children }) {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {header}
                    <div>
                        <Link href="/dashboard" className="mx-4 text-yellow-800 hover:text-yellow-600">
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                            Dashboard
                        </Link>
                        <Link href="/register" className="mx-4 text-green-800 hover:text-green-600">
                            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                            Register an Account
                        </Link>
                        <Link href="/logout" method="post" className="ml-4 text-red-800 hover:text-red-600">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Log Out
                        </Link>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}