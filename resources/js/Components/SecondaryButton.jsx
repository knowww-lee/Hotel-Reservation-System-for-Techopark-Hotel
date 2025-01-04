export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-full border-2 border-white bg-[#3A5A52] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition duration-150 ease-in-out hover:bg-[#2c4a42] focus:outline-none focus:ring-2 focus:ring-[#d89506] focus:ring-offset-2 disabled:opacity-25 hover:scale-105 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
