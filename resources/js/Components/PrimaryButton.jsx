export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-full shadow-md border border-transparent bg-[#F8B008] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-[#e8a207] focus:bg-[#e8a207] focus:outline-none focus:ring-2 focus:ring-[#d89506] focus:ring-offset-2 active:bg-[#cc8505] hover:scale-105 ${ 
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
