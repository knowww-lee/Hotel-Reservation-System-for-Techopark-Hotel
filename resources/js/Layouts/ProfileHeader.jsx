import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProfileHeader({ header, children }) {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {header}
                    <div>
                        <Link href="/dashboard" className="text-gray-800 hover:text-gray-600">
                            Dashboard
                        </Link>
                        <Link href="/logout" method="post" className="ml-4 text-gray-800 hover:text-gray-600">
                            Log Out
                        </Link>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}