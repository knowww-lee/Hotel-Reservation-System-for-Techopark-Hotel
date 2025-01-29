import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Sidebar({ children }) {
    const page = usePage();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log('Current route:', route().current());
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <aside className={`w-full md:w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4 md:p-6 text-center">
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <div className="flex items-center"> 
                                <ApplicationLogo className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                        </Link>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Technopark Hotel</h2>
                </div>
                <nav className="mt-6 md:mt-8">
                    <ul>
                        <li className="mb-3 md:mb-4 px-2 md:px-10">
                            <Link
                                href={route('dashboard')}
                                className={`flex items-center p-3 md:p-4 rounded-xl md:rounded-2xl ${
                                    route().current('dashboard') ? 'bg-[#024635]' : 'hover:bg-gray-100'
                                }`}
                            >
                                <img
                                    className="w-6 h-6 md:w-8 md:h-8"
                                    src={
                                        route().current('dashboard')
                                            ? '/dashboard-resources/active-dashboard-icon.svg'
                                            : '/dashboard-resources/dashboard-icon.svg'
                                    }
                                    alt="Dashboard Icon"
                                />
                                <span
                                    className={`ml-2 md:ml-3 text-center text-lg md:text-xl font-semibold ${
                                        route().current('dashboard') ? 'text-[#F8B008]' : 'text-[#024635]'
                                    }`}
                                >
                                    Dashboard
                                </span>
                            </Link>
                        </li>

                        <li className="mb-3 md:mb-4 px-2 md:px-10">
                            <Link
                                href={route('guest')}
                                className={`flex items-center p-3 md:p-4 rounded-xl md:rounded-2xl ${
                                    route().current('guest') ? 'bg-[#024635]' : 'hover:bg-gray-100'
                                }`}
                            >
                                <img
                                    className="w-6 h-6 md:w-8 md:h-8"
                                    src={
                                        route().current('guest')
                                            ? '/dashboard-resources/active-guest-icon.svg'
                                            : '/dashboard-resources/guest-icon.svg'
                                    }
                                    alt="Guest Icon"
                                />
                                <span
                                    className={`ml-2 md:ml-3 text-center text-lg md:text-xl font-semibold ${
                                        route().current('guest') ? 'text-[#F8B008]' : 'text-[#024635]'
                                    }`}
                                >
                                    Guest
                                </span>
                            </Link>
                        </li>

                        <li className="mb-3 md:mb-4 px-2 md:px-10">
                            <Link
                                href={route('rooms')}
                                className={`flex items-center p-3 md:p-4 rounded-xl md:rounded-2xl ${
                                    route().current('rooms') ? 'bg-[#024635]' : 'hover:bg-gray-100'
                                }`}
                            >
                                <img
                                    className="w-6 h-6 md:w-8 md:h-8"
                                    src={
                                        route().current('rooms')
                                            ? '/dashboard-resources/active-rooms-icon.svg'
                                            : '/dashboard-resources/rooms-icon.svg'
                                    }
                                    alt="Rooms Icon"
                                />
                                <span
                                    className={`ml-2 md:ml-3 text-center text-lg md:text-xl font-semibold ${
                                        route().current('rooms') ? 'text-[#F8B008]' : 'text-[#024635]'
                                    }`}
                                >
                                    Rooms
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <button
                className="md:hidden p-1"
                onClick={toggleSidebar}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </button>

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}