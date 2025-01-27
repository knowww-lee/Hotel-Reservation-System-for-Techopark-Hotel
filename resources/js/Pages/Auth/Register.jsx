import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [formDirty, setFormDirty] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (formDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        const handleUnload = async (e) => {
            if (formDirty) {
                e.preventDefault();
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will lose all entered data if you reload the page.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#024635',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, reload',
                    cancelButtonText: 'Cancel'
                });

                if (!result.isConfirmed) {
                    e.preventDefault();
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
        };
    }, [formDirty]);

    // Update formDirty when any field changes
    useEffect(() => {
        const hasInput = Boolean(
            data.name.trim() || 
            data.email.trim() || 
            data.password || 
            data.password_confirmation
        );
        setFormDirty(hasInput);
    }, [data]);

    const [passwordRequirements, setPasswordRequirements] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        length: false
    });

    const handleInputChange = (field, value) => {
        // Remove spaces from email and password fields
        if (field === 'email' || field === 'password' || field === 'password_confirmation') {
            value = value.replace(/\s/g, '');
        }
        setData(field, value);
    };

    const validateEmail = (email) => {
        if (email.includes(' ')) {
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        if (password.includes(' ')) {
            return {
                isValid: false,
                errors: {
                    space: 'Password cannot contain spaces'
                }
            };
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        setPasswordRequirements({
            uppercase: hasUpperCase,
            lowercase: hasLowerCase,
            number: hasNumbers,
            special: hasSpecialChar,
            length: isLongEnough
        });

        return {
            isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough,
            errors: {
                uppercase: !hasUpperCase ? 'Missing uppercase letter' : '',
                lowercase: !hasLowerCase ? 'Missing lowercase letter' : '',
                number: !hasNumbers ? 'Missing number' : '',
                special: !hasSpecialChar ? 'Missing special character' : '',
                length: !isLongEnough ? 'Password must be at least 8 characters' : ''
            }
        };
    };

    useEffect(() => {
        validatePassword(data.password);
    }, [data.password]);

    const submit = (e) => {
        e.preventDefault();

        // Validate email
        if (!validateEmail(data.email)) {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        // Validate password
        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
            const errorMessages = Object.values(passwordValidation.errors)
                .filter(error => error !== '')
                .join('\n');
            
            Swal.fire({
                title: 'Invalid Password',
                html: errorMessages.replace(/\n/g, '<br>'),
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        // Validate password confirmation
        if (data.password !== data.password_confirmation) {
            Swal.fire({
                title: 'Password Mismatch',
                text: 'Password and confirmation do not match',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        post(route('register'), {
            onSuccess: () => {
                setFormDirty(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successful!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                reset('password', 'password_confirmation');
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors)[0];
                Swal.fire({
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonColor: '#024635'
                });
            }
        });
    };

    return (
        <>
            <Head title="Register" />

            {/*Sign Up form */}
            <div className="flex h-screen bg-gradient-to-l from-[#FFFFFF] to-[#84AAAC]">
                <div className="w-1/2 flex flex-col items-center justify-center p-8">
                    <h2 className="text-3xl font-bold text-[#024635] text-center mb-2">
                        Sign Up
                    </h2>
                    <form 
                    onSubmit={submit}
                    className="w-full max-w-md p-6 rounded-lg">
                        <div>
                           <InputLabel htmlFor="email">
                                Email<span className="p-1 text-red-600">*</span>
                            </InputLabel>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                className="mt-1 block w-full placeholder-small"
                                autoComplete="username"
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                            <p className="text-xs text-gray-500 mt-1">Please enter a valid email address (e.g., user@example.com)</p>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name">
                                Name<span className="p-1 text-red-600">*</span>
                            </InputLabel>

                            <TextInput
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={data.name}
                                className="mt-1 block w-full placeholder-small"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password">
                                Password<span className="p-1 text-red-600">*</span>
                            </InputLabel>

                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    className="mt-1 block w-full placeholder-small"
                                    autoComplete="new-password"
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    required
                                />
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                            <div className="text-xs text-gray-700 mt-2 bg-white p-3 rounded-lg shadow-sm">
                                Password requirements:
                                <ul className="mt-1 space-y-1">
                                    <li className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-red-600'}`}>
                                        {passwordRequirements.length ? '✓' : '✗'} At least 8 characters
                                    </li>
                                    <li className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                                        {passwordRequirements.uppercase ? '✓' : '✗'} At least one uppercase letter
                                    </li>
                                    <li className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                                        {passwordRequirements.lowercase ? '✓' : '✗'} At least one lowercase letter
                                    </li>
                                    <li className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : 'text-red-600'}`}>
                                        {passwordRequirements.number ? '✓' : '✗'} At least one number
                                    </li>
                                    <li className={`flex items-center ${passwordRequirements.special ? 'text-green-600' : 'text-red-600'}`}>
                                        {passwordRequirements.special ? '✓' : '✗'} At least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation">
                                Confirm Password<span className="p-1 text-red-600">*</span>
                            </InputLabel>

                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full placeholder-small"
                                    autoComplete="new-password"
                                    onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full flex justify-center">
                            <PrimaryButton className="mt-4 w-full max-w-xs text-center" 
                            disabled={processing}>
                                    Sign Up
                            </PrimaryButton>
                        </div>

                        <div className="mt-4 flex flex-col items-center justify-center">
                            <span className="text-sm text-gray-600">
                                Already got an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-red-600 font-bold hover:text-red-900"
                                >
                                    Sign In
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
                
                {/*Image */}
                <div className="w-1/2 flex justify-center items-center relative">
                    <img src="/login-signup-img/image1.png" alt="Login Image" className="w-3/4 h-[90%] object-cover rounded-[30px]" />
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-extrabold text-right" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                        Come in, feel at home
                    </div>
                </div>
            </div>
        </>
    );
}
