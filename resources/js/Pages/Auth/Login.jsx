import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [formDirty, setFormDirty] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutEndTime, setLockoutEndTime] = useState(null);

    useEffect(() => {
        const storedLockoutEnd = localStorage.getItem('loginLockoutEnd');
        if (storedLockoutEnd) {
            const endTime = parseInt(storedLockoutEnd);
            if (endTime > Date.now()) {
                setIsLocked(true);
                setLockoutEndTime(endTime);
            } else {
                localStorage.removeItem('loginLockoutEnd');
                localStorage.removeItem('loginAttempts');
            }
        }

        const storedAttempts = localStorage.getItem('loginAttempts');
        if (storedAttempts) {
            setLoginAttempts(parseInt(storedAttempts));
        }
    }, []);

    useEffect(() => {
        let timer;
        if (isLocked && lockoutEndTime) {
            timer = setInterval(() => {
                if (Date.now() >= lockoutEndTime) {
                    setIsLocked(false);
                    setLockoutEndTime(null);
                    setLoginAttempts(0);
                    localStorage.removeItem('loginLockoutEnd');
                    localStorage.removeItem('loginAttempts');
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLocked, lockoutEndTime]);

    const startLockout = () => {
        const lockoutDuration = 5 * 60 * 1000; // 5 minutes
        const endTime = Date.now() + lockoutDuration;
        setIsLocked(true);
        setLockoutEndTime(endTime);
        localStorage.setItem('loginLockoutEnd', endTime.toString());
    };

    const handleSecurityQuestion = async () => {
        const { value: name } = await Swal.fire({
            title: 'Security Question',
            text: 'Please enter your registered name for verification:',
            input: 'text',
            inputPlaceholder: 'Enter your name',
            showCancelButton: true,
            confirmButtonColor: '#84AAAC',
            cancelButtonColor: '#d33',
            inputValidator: (value) => {
                if (!value) return 'You need to enter your name!';
            }
        });

        if (name) {
            post(route('login.verify-name'), {
                name,
                email: data.email
            }, {
                onSuccess: () => {
                    setLoginAttempts(0);
                    localStorage.removeItem('loginAttempts');
                    Swal.fire({
                        title: 'Success!',
                        text: 'Name verified. You can now try logging in again.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                },
                onError: () => {
                    startLockout();
                    Swal.fire({
                        title: 'Error!',
                        text: 'Incorrect name. You are now locked out for 5 minutes.',
                        icon: 'error',
                        confirmButtonColor: '#84AAAC',
                    });
                }
            });
        }
    };

    const handleInputChange = (field, value) => {
        // Remove spaces from email and password fields
        if (field === 'email' || field === 'password') {
            value = value.replace(/\s/g, '');
        }
        setData(field, value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (isLocked) {
            const remainingTime = Math.ceil((lockoutEndTime - Date.now()) / 1000);
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            
            Swal.fire({
                title: 'Account Locked',
                text: `Please wait ${minutes}:${seconds.toString().padStart(2, '0')} before trying again.`,
                icon: 'warning',
                confirmButtonColor: '#84AAAC',
            });
            return;
        }

        // Validate no spaces
        if (data.email.includes(' ') || data.password.includes(' ')) {
            Swal.fire({
                title: 'Invalid Input',
                text: 'Email and password cannot contain spaces',
                icon: 'error',
                confirmButtonColor: '#84AAAC',
            });
            return;
        }

        post(route('login'), {
            onSuccess: () => {
                setFormDirty(false);
                setLoginAttempts(0);
                localStorage.removeItem('loginAttempts');
                if (!data.remember) {
                    localStorage.removeItem('login_email');
                    sessionStorage.removeItem('login_email');
                }
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully logged in!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            onError: () => {
                const newAttempts = loginAttempts + 1;
                setLoginAttempts(newAttempts);
                localStorage.setItem('loginAttempts', newAttempts.toString());

                if (newAttempts === 3) {
                    handleSecurityQuestion();
                } else if (newAttempts > 3) {
                    startLockout();
                    Swal.fire({
                        title: 'Account Locked',
                        text: 'Too many failed attempts. Please wait 5 minutes before trying again.',
                        icon: 'error',
                        confirmButtonColor: '#84AAAC',
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: `Invalid credentials. ${3 - newAttempts} attempts remaining.`,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#84AAAC',
                    });
                }
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex h-screen bg-gradient-to-r from-[#FFFFFF] to-[#84AAAC]">
                {/*Image */}
                <div className="w-1/2 flex justify-center items-center relative">
                    <img src="/login-signup-img/image1.png" alt="Login Image" className="w-3/4 h-[90%] object-cover rounded-[30px]" />
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-extrabold text-left" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                        Welcome! Feel right at home
                    </div>
                </div>

                {/*Login form */}
                <div className="w-1/2 flex flex-col items-center justify-center p-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Login
                    </h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form
                        onSubmit={submit}
                        className="w-full max-w-md p-6 rounded-lg"
                    >
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
                                autoComplete={data.remember ? "username" : "off"}
                                isFocused={true}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-8">
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
                                    autoComplete={data.remember ? "current-password" : "off"}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                />
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    className="ms-2"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-red-600 hover:text-red-900"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <div className="w-full flex justify-center">
                            <PrimaryButton
                                className="mt-4 w-full max-w-xs text-center"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
