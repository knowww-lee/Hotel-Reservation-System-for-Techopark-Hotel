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
        if (data.email || data.password) {
            setFormDirty(true);
        }
    }, [data]);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                setFormDirty(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully logged in!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid credentials. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#84AAAC',
                });
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
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
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
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
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

                    <div className="text-sm text-center">
                        <span className="text-gray-600">Haven't got an account? </span>
                        <Link
                            href="/register"
                            className="text-red-600 font-bold hover:text-red-900"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
