import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-full border-gray-300 shadow-md px-6 py-3 hover:border-[#F8B008] hover:ring-[#F8B008] focus:border-[#F8B008] focus:ring-[#F8B008] ' +
                className
            }
            ref={localRef}
        />
    );
});
