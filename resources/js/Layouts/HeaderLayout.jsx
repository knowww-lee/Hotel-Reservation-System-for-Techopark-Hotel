import NavLink from '@/Components/NavLink';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const HeaderLayout = ({ children, activeLink }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = usePage().props;

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleNavLinkClick = () => {
        setLoading(true);
    };

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
                router.post(route('logout'), {}, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'You have been logged out successfully.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                });
            }
        });
    };

    return (
        <>
            <nav className="relative z-30 flex items-center justify-between w-full p-4 bg-black bg-opacity-50">
                
                <img src="/logo-and-icons/logo2.png" alt="Logo" className="h-11" />
                

                <div className={`absolute top-full left-0 w-full bg-black bg-opacity-90 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-90' : 'max-h-0 opacity-0 overflow-hidden'} lg:relative lg:flex lg:max-h-full lg:opacity-100 lg:bg-transparent lg:w-auto lg:space-x-8 lg:items-center lg:overflow-visible`}>
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
                    <NavLink
                        href="/"
                        active={activeLink === 'home'}
                        onClick={handleNavLinkClick}
                        loading={loading}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        href="/about"
                        active={activeLink === 'about'}
                        onClick={handleNavLinkClick}
                        loading={loading}
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        href="/services"
                        active={activeLink === 'services'}
                        onClick={handleNavLinkClick}
                        loading={loading}
                    >
                        Services
                    </NavLink>
                    <NavLink
                        href="/services#bottom-section"
                        active={activeLink === 'contact'}
                        onClick={handleNavLinkClick}
                        loading={loading}
                    >
                        Contact Us
                    </NavLink>

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex items-center p-1 text-white hover:text-[#FFD700] text-xl"
                        >
                            <i className="fas fa-user mr-2"></i>
                            {auth.user && <span className="mr-2 text-sm">{auth.user.name}</span>}
                            <i className="fas fa-chevron-down text-sm"></i>
                        </button>
                    
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black bg-opacity-90 ring-1 ring-[#FFD700] ring-opacity-10 z-50 lg:block">
                                    <div className="py-1">
                                        {auth.user ? (
                                            <>
                                                <Link
                                                    href={route('dashboard')}
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#F8B008] hover:bg-opacity-90"
                                                >
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#F8B008] hover:bg-opacity-90"
                                                >
                                                    Log Out
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/login"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#F8B008] hover:bg-opacity-90"
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    href="/register"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#F8B008] hover:bg-opacity-90"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                         </div>
                    </div>
                </div>

                <div className="ml-auto flex items-center space-x-8 lg:hidden">
                    <button
                        className="text-white"
                        onClick={toggleMenu}
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </nav>

            <main>{children}</main>
        </>
    );
};

export default HeaderLayout;
