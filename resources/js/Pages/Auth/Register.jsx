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

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    //Password visibility
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                            
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
                                    type={showPassword ? 'text' : 'password'} 
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

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation">
                                Confirm Password<span className="p-1 text-red-600">*</span>
                            </InputLabel>

                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full placeholder-small"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-600"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
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

                    <div className="w-3/4 mt-1 text-center flex items-center justify-between">
                        <span className="text-gray-600 text-sm mx-6">Or sign up with</span>
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
                
                 {/*Image */}
                <div className="w-1/2 flex justify-center items-center relative">
                    <img src="/loginresources/image1.png" alt="Login Image" className="w-3/4 h-[90%] object-cover rounded-[30px]" />
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-extrabold text-right" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                        Come in, feel at home
                    </div>
                </div>
            </div>

            
        </>
    );
}
