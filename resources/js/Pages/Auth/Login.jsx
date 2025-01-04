import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    //Password visibility
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex h-screen bg-gradient-to-r from-[#FFFFFF] to-[#84AAAC]">
                {/*Image */}
                <div className="w-1/2 flex justify-center items-center relative">
                    <img src="/loginresources/image1.png" alt="Login Image" className="w-3/4 h-[90%] object-cover rounded-[30px]" />
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
                    type={showPassword ? 'text' : 'password'} // Toggle between text and password
                    name="password"
                    placeholder="Enter your password"
                    value={data.password}
                    className="mt-1 block w-full placeholder-small"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                />

                <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
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

                    <div className="w-3/4 mt-6 text-center flex items-center justify-between">
                        <span className="text-gray-600 text-sm mx-6">Or sign in with</span>
                        <div className="flex space-x-4">
                        <Link href="#" className="bg-white rounded-full p-1 shadow-md hover:shadow-lg transition">
                                <FontAwesomeIcon icon={faGoogle} className="text-2xl text-red-600" />
                            </Link>
                            <Link href="#" className="bg-white rounded-full p-1 shadow-md hover:shadow-lg transition">
                                <FontAwesomeIcon icon={faFacebook} className="text-2xl text-blue-600" />
                            </Link>
                            <Link href="#" className="bg-white rounded-full p-1 shadow-md hover:shadow-lg transition">
                                <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-blue-700" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
