import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    loading = false,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'relative inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 group ' +
                (loading
                    ? 'pointer-events-none opacity-50 text-white' 
                    : active
                    ? 'text-white border-[#FFD700] focus:border-[#FFD700]'
                    : 'text-white hover:text-[#FFD700] focus:text-[#FFD700]') +
                className
            }
        >
            {children}
            <span
                className={`absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD700] ${active ? 'w-full' : 'group-hover:w-full'}`}
                aria-hidden="true"
            ></span>
        </Link>
    );
}
 