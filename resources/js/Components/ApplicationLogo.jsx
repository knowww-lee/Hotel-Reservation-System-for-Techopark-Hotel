export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logo-and-icons/logo.png"  
            alt="Logo"
            className="block h-9 w-auto fill-current text-gray-800"
        />
    );
}
